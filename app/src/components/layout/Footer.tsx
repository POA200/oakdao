import { SiGithub, SiX, SiTelegram, SiGmail } from "@icons-pack/react-simple-icons"
export default function Footer() {
  return (
    <footer className="w-full border-t dark:border-gray-800 p-6 text-center text-sm text-muted-foreground mt-auto">
      <div className="container mx-auto flex flex-col items-center gap-8">
        <nav aria-label="Social media" className="flex items-center gap-8">
          <a
            href="https://github.com/POA200/oakdao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-foreground/5 transition-colors"
          >
            <SiGithub size={20} />
          </a>
          <a
            href="https://x.com/oak_crypt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-foreground/5 transition-colors"
          >
            <SiX size={20} />
          </a>
          <a
            href="https://t.me/oak_dao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-foreground/5 transition-colors"
          >
            <SiTelegram size={20} />
          </a>
          <a
            href="mailto:ipeter1010x@gmail.com"
            aria-label="Email"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-foreground/5 transition-colors"
          >
            <SiGmail size={20} />
          </a>
        </nav>
      <p>
        Built with love by iPeter_crx. &copy; {new Date().getFullYear()} OakDAO
      </p>
      </div>
    </footer>
  )
}
