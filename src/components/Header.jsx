import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <nav className="flex flex-wrap justify-between md:justify-around items-center px-2 py-4  fixed top-0 w-full z-10 bg-[#e7eeff]">
      <div className="flex cursor-pointer hover:scale-105">
        <FontAwesomeIcon icon={faCheckToSlot} size="xl" />
        <h1 className="logo">EVotes</h1>
      </div>

      {/* middle navigation */}
      <ul className="hidden md:flex gap-12 ">
        <li>
          <a href="#features">Feature</a>
        </li>
        <li>
        <a href="#how-it-work">How it Works</a>
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
