import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <nav className="flex flex-wrap justify-between md:justify-around items-center px-2 py-4 ">
      <div className="flex cursor-pointer hover:scale-105">
        <FontAwesomeIcon icon={faCheckToSlot} size="xl" />
        <h1 className="logo">Evoting</h1>
      </div>

      {/* middle navigation */}
      <ul className="hidden md:flex gap-4 ">
        <li>
          <a href="#features">Feature</a>
        </li>
        <li>
          <a href="#how-it-work">How it Works</a>
        </li>
        <li>
          <a href="#security">Security</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className="space-x-2">
        <button className="btn pry-btn border">Login</button>
        <button className="btn sec-btn">Get Started</button>
      </div>
    </nav>
  );
}

export default Header;
