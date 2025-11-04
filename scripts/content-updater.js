#!/usr/bin/env node
/**
 * OakDAO Content Updater
 *
 * Purpose
 * - Save markdown to app/src/content/<id>-<slug>.md
 * - Append a new lesson entry to app/src/data/lessons.ts (ALL_LESSONS)
 *
 * Usage
 *   node scripts/content-updater.js --input path/to/payload.json
 *   node scripts/content-updater.js --stdin
 * Options
 *   --dry-run    Do not write files; print planned changes
 *   --force      Overwrite existing markdown file if it already exists
 *
 * Input payload shape (JSON)
 * {
 *   "markdown": string,
 *   "lesson": {
 *     "title": string,
 *     "slug": string,           // kebab-case, used for filename
 *     "summary": string,
 *     "quizJson": [             // QuizQuestion[]
 *       { "id": number, "question": string, "options": string[], "correctAnswerIndex": number }
 *     ],
 *     "createdAt"?: string      // ISO; default: now
 *   }
 * }
 */

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = { input: undefined, stdin: false, dryRun: false, force: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--input' || a === '-i') {
      args.input = argv[++i];
    } else if (a === '--stdin') {
      args.stdin = true;
    } else if (a === '--dry-run' || a === '--dry') {
      args.dryRun = true;
    } else if (a === '--force' || a === '-f') {
      args.force = true;
    } else if (a === '--help' || a === '-h') {
      printHelpAndExit();
    } else {
      console.error(`Unknown arg: ${a}`);
      printHelpAndExit(1);
    }
  }
  if (!args.stdin && !args.input) {
    console.error('Error: provide --input <file> or --stdin');
    printHelpAndExit(1);
  }
  return args;
}

function printHelpAndExit(code = 0) {
  console.log(`Usage:\n  node scripts/content-updater.js --input payload.json [--dry-run] [--force]\n  node scripts/content-updater.js --stdin [--dry-run] [--force]\n`);
  process.exit(code);
}

function readPayload({ input, stdin }) {
  if (stdin) {
    const data = fs.readFileSync(0, 'utf8');
    return JSON.parse(data);
  }
  const abs = path.resolve(process.cwd(), input);
  const content = fs.readFileSync(abs, 'utf8');
  return JSON.parse(content);
}

function assertString(name, val) {
  if (typeof val !== 'string' || !val.trim()) {
    throw new Error(`${name} must be a non-empty string`);
  }
}

function assertArray(name, val) {
  if (!Array.isArray(val)) {
    throw new Error(`${name} must be an array`);
  }
}

function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be a JSON object');
  }
  assertString('markdown', payload.markdown);
  if (!payload.lesson || typeof payload.lesson !== 'object') {
    throw new Error('lesson must be provided');
  }
  const L = payload.lesson;
  assertString('lesson.title', L.title);
  assertString('lesson.slug', L.slug);
  assertString('lesson.summary', L.summary);
  assertArray('lesson.quizJson', L.quizJson);
  if (L.createdAt != null) assertString('lesson.createdAt', L.createdAt);
  validateSlug(L.slug);
  validateQuizArray(L.quizJson);
}

function resolveRepoPaths() {
  const repoRoot = path.resolve(__dirname, '..');
  const contentDir = path.join(repoRoot, 'app', 'src', 'content');
  const lessonsTs = path.join(repoRoot, 'app', 'src', 'data', 'lessons.ts');
  return { repoRoot, contentDir, lessonsTs };
}

function ensureDirs(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readLessonsFile(lessonsTs) {
  if (!fs.existsSync(lessonsTs)) {
    throw new Error(`Cannot find lessons file at ${lessonsTs}`);
  }
  return fs.readFileSync(lessonsTs, 'utf8');
}

function extractAllLessonsBlock(src) {
  const anchor = 'export const ALL_LESSONS';
  const start = src.indexOf(anchor);
  if (start === -1) throw new Error('Could not locate ALL_LESSONS in lessons.ts');
  const arrayStart = src.indexOf('[', start);
  if (arrayStart === -1) throw new Error('ALL_LESSONS array start not found');
  // Scan forward to find the matching closing bracket for this array
  let i = arrayStart;
  let depth = 0;
  let inStr = false;
  let strQuote = '';
  while (i < src.length) {
    const ch = src[i];
    const prev = i > 0 ? src[i - 1] : '';
    if (inStr) {
      if (ch === strQuote && prev !== '\\') inStr = false;
      i++; continue;
    }
    if (ch === '"' || ch === '\'' || ch === '`') {
      inStr = true; strQuote = ch; i++; continue;
    }
    if (ch === '[') depth++;
    if (ch === ']') {
      depth--;
      if (depth === 0) {
        // Expect a semicolon after ] somewhere soon
        const arrayEnd = i + 1; // position right after ']'
        const after = src.slice(arrayEnd).trimStart();
        if (!after.startsWith(';')) {
          // tolerate optional trailing comma before semicolon: '],\n];'
          // But for our file, it should be '];'
        }
        return { start, arrayStart, arrayEnd };
      }
    }
    i++;
  }
  throw new Error('Failed to locate end of ALL_LESSONS array');
}

function validateSlug(slug) {
  const re = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!re.test(slug)) {
    throw new Error(`lesson.slug must be kebab-case [a-z0-9-], got: ${slug}`);
  }
}

function validateQuizArray(quiz) {
  if (!Array.isArray(quiz)) throw new Error('lesson.quizJson must be an array');
  for (const [i, q] of quiz.entries()) {
    if (!q || typeof q !== 'object') throw new Error(`quizJson[${i}] must be an object`);
    if (typeof q.id !== 'number') throw new Error(`quizJson[${i}].id must be number`);
    if (typeof q.question !== 'string' || !q.question.trim()) throw new Error(`quizJson[${i}].question must be non-empty string`);
    if (!Array.isArray(q.options) || q.options.length < 2) throw new Error(`quizJson[${i}].options must be an array with at least 2 items`);
    for (const [j, opt] of q.options.entries()) {
      if (typeof opt !== 'string') throw new Error(`quizJson[${i}].options[${j}] must be string`);
    }
    if (typeof q.correctAnswerIndex !== 'number' || q.correctAnswerIndex < 0 || q.correctAnswerIndex >= q.options.length) {
      throw new Error(`quizJson[${i}].correctAnswerIndex must be a valid index into options`);
    }
  }
}

function slugExists(src, slug) {
  // naive check inside ALL_LESSONS block only
  const { arrayStart, arrayEnd } = extractAllLessonsBlock(src);
  const block = src.slice(arrayStart, arrayEnd);
  return new RegExp(`slug:\\s*\\"${escapeRegExp(slug)}\\"`).test(block);
}

function computeNextId(src) {
  // Use contentPath numeric prefixes across the file as source of truth
  const re = /contentPath:\s*"(\d+)-/g;
  let m; let max = 0;
  while ((m = re.exec(src)) !== null) {
    const n = parseInt(m[1], 10);
    if (!Number.isNaN(n)) max = Math.max(max, n);
  }
  return max + 1; // next id
}

function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function indent(text, spaces) {
  const pad = ' '.repeat(spaces);
  return text.split('\n').map((l, i) => (i === 0 ? l : pad + l)).join('\n');
}

function buildLessonObjectText({ id, title, slug, summary, contentPathName, createdAt, quizJson }) {
  const lines = [];
  lines.push('{');
  lines.push(`  id: ${id},`);
  lines.push(`  title: ${JSON.stringify(title)},`);
  lines.push(`  slug: ${JSON.stringify(slug)},`);
  lines.push(`  summary: ${JSON.stringify(summary)},`);
  lines.push(`  contentPath: ${JSON.stringify(contentPathName)},`);
  lines.push(`  createdAt: ${JSON.stringify(createdAt)},`);
  const quizStr = JSON.stringify(quizJson, null, 2);
  // indent quizStr by 2 spaces to align under property, plus base 2 inside object
  const quizIndented = indent(quizStr, 2);
  lines.push(`  quizJson: ${quizIndented}`);
  lines.push('},');
  // Wrap with array-level indent of two spaces
  return '  ' + lines.join('\n  ');
}

function insertLessonObject(src, newObjText) {
  const { arrayEnd } = extractAllLessonsBlock(src);
  const before = src.slice(0, arrayEnd);
  const after = src.slice(arrayEnd);
  // Ensure a newline before we insert, and keep trailing comma on inserted block
  const insertion = (before.endsWith('\n') ? '' : '\n') + newObjText + '\n';
  return before + insertion + after;
}

function backupFile(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const bak = path.join(dir, `${base}.bak.${stamp}`);
  fs.copyFileSync(filePath, bak);
  return bak;
}

function main() {
  try {
    const args = parseArgs(process.argv);
    const payload = readPayload(args);
    validatePayload(payload);

    const { repoRoot, contentDir, lessonsTs } = resolveRepoPaths();
    ensureDirs(contentDir);

    const L = payload.lesson;
    const markdown = payload.markdown;
    const lessonsSrc = readLessonsFile(lessonsTs);

    if (slugExists(lessonsSrc, L.slug)) {
      throw new Error(`A lesson with slug "${L.slug}" already exists in ALL_LESSONS.`);
    }

    const id = computeNextId(lessonsSrc);
    const contentPathName = `${id}-${L.slug}.md`;
    const contentAbs = path.join(contentDir, contentPathName);
    const createdAt = L.createdAt || new Date().toISOString();

    const newObjText = buildLessonObjectText({
      id,
      title: L.title,
      slug: L.slug,
      summary: L.summary,
      contentPathName,
      createdAt,
      quizJson: L.quizJson,
    });

    const updatedLessons = insertLessonObject(lessonsSrc, newObjText);

    console.log('Planned actions:');
    console.log(`- Write markdown -> ${path.relative(repoRoot, contentAbs)}`);
    console.log(`- Update lessons -> ${path.relative(repoRoot, lessonsTs)} (append id=${id})`);

    if (args.dryRun) {
      console.log('\nDry-run mode: no files written.');
      return;
    }

    // Write markdown
    if (fs.existsSync(contentAbs) && !args.force) {
      throw new Error(`Markdown file already exists: ${contentAbs} (use --force to overwrite)`);
    }
    fs.writeFileSync(contentAbs, markdown, 'utf8');

    // Backup and write lessons.ts
    const bak = backupFile(lessonsTs);
    fs.writeFileSync(lessonsTs, updatedLessons, 'utf8');

    console.log('\nSuccess!');
    console.log(`- Markdown saved: ${contentAbs}`);
    console.log(`- lessons.ts updated. Backup created: ${bak}`);
  } catch (err) {
    console.error('\nERROR:', err.message);
    process.exit(1);
  }
}

main();
