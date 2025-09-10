import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function Hero() {
  return (
    <div className="py-24 px-4 bg-[#e7eeff] ">
      <div className="max-w-2xl mx-auto">
        <h2>Secure Digital Voting Made Simple</h2>
        <p className="py-5 font-light">
          Experience the future of democracy with our voting platform.
          Transparent, secure, and accessible voting for organizations of all
          sizes.
        </p>
        {/* buttons */}
        <div className="flex flex-col gap-4 md:flex-row md:w-fit">
          <button className="btn sec-btn ">Get Started</button>
          <button className="btn pry-btn  shadow-2xl">
            <a
              href="https://www.youtube.com/watch?v=fdnZZ_DEUGI"
              target="_blank"
            >
              <FontAwesomeIcon icon={faPlay} />
              Watch Demo
            </a>
          </button>
        </div>

        {/* list values */}
        <div className="pt-16 ">
          <ul className="flex flex-wrap gap-6">
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faShield} className="text-green-600" />
              <p>Bank-level Security</p>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faUserGroup} className="text-blue-600" />
              <p>1M+ Votes Cast</p>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-purple-600"
              />
              <p>99.9% Uptime</p>
            </li>
          </ul>
        </div>

        <div className="relative mt-12">
          <img
            className="rounded-2xl"
            src="/images/vote.jpeg"
            alt="a finger about to press a blue button on a keyboard with the key having the word vote"
          />

          <div className="absolute -right-4 -bottom-4 shadow-2xl bg-white px-4 py-2 rounded-xl text-center">
            <h3>Firebase</h3>
            <p>Security</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
