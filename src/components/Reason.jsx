import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faMobileButton } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";


function Reason() {
  return (
    <div className="text-center px-4 py-24 max-w-3xl mx-auto">
      <h2>Why Choose SecureVote?</h2>
      <p>
        Our platform combines cutting-edge technology with user-friendly design
        to deliver the most secure and accessible voting experience
      </p>

      <div className="grid md:grid-cols-2 gap-10  py-24">
        {/* first reason */}
        <div className="p-8 text-left md:text-lg mx-auto rounded-2xl shadow-2xl">
          <div>
            <FontAwesomeIcon
              icon={faShield}
              className="bg-gray-200/70 p-2 rounded-md text-xl text-green-600"
            />
          </div>
          <h3 className="py-4">Military-Grade Security</h3>
          <p>
            End-to-end encryption with Firebase technology ensures every vote is
            secure and tamper-proof.
          </p>
        </div>

        {/* second reason */}
        <div className="p-8 text-left md:text-lg mx-auto rounded-2xl shadow-2xl">
          <div>
            <FontAwesomeIcon
              icon={faEye}
              className="bg-gray-200/70 p-2 rounded-md text-xl text-blue-600"
            />
          </div>
          <h3 className="py-4">Full Transparency</h3>
          <p>
            Real-time results and audit trails provide complete transparency
            while maintaining voter privacy.
          </p>
        </div>

        {/* third reason */}
        <div className="p-8 text-left md:text-lg mx-auto rounded-2xl shadow-2xl">
          <div>
            <FontAwesomeIcon
              icon={faMobileButton}
              className="bg-gray-200/70 p-2 rounded-md text-xl text-purple-600"
            />
          </div>
          <h3 className="py-4">Multi-Device Access</h3>
          <p>
            Vote securely from any device - desktop, tablet, or smartphone with
            our responsive platform.
          </p>
        </div>

        {/* forth reason */}
        <div className="p-8 text-left md:text-lg mx-auto rounded-2xl shadow-2xl">
          <div>
            <FontAwesomeIcon
              icon={faClock}
              className="bg-gray-200/70 p-2 rounded-md text-xl text-rose-600"
            />
          </div>
          <h3 className="py-4">Real-Time Results</h3>
          <p>
            Get instant, accurate results as votes are cast with our live
            dashboard and analytics.
          </p>
        </div>

        {/* fifth reason */}
        <div className="p-8 text-left md:text-lg mx-auto rounded-2xl shadow-2xl">
          <div>
            <FontAwesomeIcon
              icon={faUserGroup}
              className="bg-gray-200/70 p-2 rounded-md text-xl text-cyan-600"
            />
          </div>
          <h3 className="py-4">Scalable Platform</h3>
          <p>
            From small team decision to large-scale elections, our platform
            scales to meet your needs.
          </p>
        </div>

        {/* sixth reason */}
        <div className="p-8 text-left md:text-lg mx-auto rounded-2xl shadow-2xl">
          <div>
            <FontAwesomeIcon
              icon={faLock}
              className="bg-gray-200/70 p-2 rounded-md text-xl text-red-600"
            />
          </div>
          <h3 className="py-4">Privacy Protected</h3>
          <p>
            Anonymization ensures voter privacy while maintaining the integrity
            of the election.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reason;
