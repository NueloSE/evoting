import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div className="bg-[#101828] text-slate-400 px-4 pt-14 pb-8 ">
      <div className="grid place-content-center md:grid-cols-6 md:max-w-6xl  mx-auto">
        {/* first category */}
        <div className="col-span-2">
          <div className="flex cursor-pointer hover:scale-105">
            <FontAwesomeIcon
              icon={faCheckToSlot}
              size="xl"
              className="text-[#4384d0]"
            />
            <h1 className="logo text-white">Evoting</h1>
          </div>
          <p className="max-w-md">
            Empowering democracy through secure, transparent, and accessible
            digital voting solutions for organizations worldwide.
          </p>
          <small>&copy; 2025 Evotes</small>
        </div>

        {/* second category */}
        <div>
          <h4 className="text-white">Product</h4>
          <ul>
            <li>Features</li>
            <li>Security</li>
            <li>Pricing</li>
          </ul>
        </div>

        {/* third category */}
        <div>
          <h4 className="text-white">Solutions</h4>
          <ul>
            <li>Government Voting</li>
            <li>Association Elections</li>
            <li>Academic Elections</li>
          </ul>
        </div>

        {/* forth category */}
        <div>
          <h4 className="text-white">Resources</h4>
          <ul>
            <li>Help Center</li>
            <li>Best Practices</li>
            <li>Webinars</li>
          </ul>
        </div>

        {/* fifth category */}
        <div>
          <h4 className="text-white">Company</h4>
          <ul>
            <li>About Us</li>
            <li>Press Kit</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-600 my-8  "></div>

      <div className="flex flex-col justify-between max-w-3xl mx-auto  md:flex-row space-y-4   ">
        <ul className="flex    gap-8 text-sm max-w-sm  md: mx-auto">
          <li>
            <a className="hover:text-white" href="#">
              Privacy Policy
            </a>
          </li>
          <li>
            <a className="hover:text-white" href="#">
              Terms of Service
            </a>
          </li>
          <li>
            <a className="hover:text-white" href="#">
              Security Policy
            </a>
          </li>
        </ul>
        <small className="text-center">
          Built with security and transparency in mind
        </small>
      </div>
    </div>
  );
}

export default Footer;
