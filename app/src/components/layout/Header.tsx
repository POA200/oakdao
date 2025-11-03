import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="container mx-auto px-4 py-4 border-b mb-34">
      <Link to="/">
      <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-white">
        <span className="text-primary">Oak</span>DAO
      </h1>
      </Link>
    </header>
  )
}
