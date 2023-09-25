import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./navbar.css";
export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Nearby Marketplace
      </Link>
      <ul className="site-menue">
        <CustomLink to="/pricing">Marketplace</CustomLink>
        <CustomLink to="/about">Management</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}