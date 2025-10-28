import { Link } from "react-router-dom";
import '../App.css';

export function Header() {
  return (
    <header className="header">
      <div className="navbar">
        <h1>Checkpoint : frontend</h1>
        <Link to="/">Countries</Link>
      </div>
    </header>
  );
}
