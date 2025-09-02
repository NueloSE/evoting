import { RxEnvelopeClosed } from "react-icons/rx";
import { BsTelephoneInbound } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

function Contact() {
  return (
    <div className=" px-4 py-24 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2>Get in Touch</h2>
        <p className="max-w-3xl mx-auto">
          Have questions about Evotes? Our team is here to help you get started
          with secure, transparent elections.
        </p>
      </div>

      <div className="mt-24 flex flex-col lg:flex-row items-center   gap-12">
        {/* contact information */}
        <div className="space-y-4 ">
          <h3>Contact Information</h3>
          {/* means of contact */}
          <div className="space-y-4">
            {/* email contact */}
            <div className="flex gap-4">
              <RxEnvelopeClosed className="text-xl text-black mt-1" />
              <div>
                <h4 className="my-0 text-black">Email Us</h4>
                <p className="text-slate-500">
                  support@evotes.com <br />
                  we'll respond within 24hours
                </p>
              </div>
            </div>
            {/* call  */}
            <div className="flex gap-4">
              <BsTelephoneInbound className="text-xl text-black mt-1" />
              <div>
                <h4 className="my-0 text-black">Call Us</h4>
                <p className="text-slate-500">
                  (+234)816-168-5012 <br />
                  Mon-Fri, 9AM-6PM WAT
                </p>
              </div>
            </div>
            {/* visit office */}

            <div className="flex gap-4">
              <IoLocationOutline className="text-xl text-black mt-1" />
              <div>
                <h4 className="my-0 text-black">Visit Us</h4>
                <p className="text-slate-500">
                  1 Nuelo Cresent <br />
                  Kaduna State, Nigeria
                </p>
              </div>
            </div>

            {/* solution */}
            <div className="bg-[#e8e8eb] px-6 py-3 rounded-xl lg:max-w-lg">
              <h4>Enterprise Solutions</h4>
              <p className="text-sm text-justify">
                Need a custom solution for your organization? Our enterprise
                team specializes in large-scale elections and complex voting
                requirements.
              </p>
              <button className="btn pry-btn bg-white my-3 font-bold">
                Contact Enterprise Team
              </button>
            </div>
          </div>
        </div>

        {/* the form */}
        <form className="bg-white p-4  rounded-2xl w-full">
          <h4>Send us a Message</h4>
          <div className="flex justify-between gap-2">
            <div>
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="fname"
                placeholder="Nuel"
                name="first-name"
              />
            </div>

            <div>
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lname"
                placeholder="Akanbe"
                name="last-name"
              />
            </div>
          </div>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="nuel@example.com"
            name="email"
          />

          <label htmlFor="organization">Organization</label>
          <input
            type="text"
            id="organization"
            placeholder="Your organization name"
            name="organization"
          />

          <label htmlFor="inquiryType">Inquiry Type</label>
          <select
            className="w-full bg-slate-200 py-2.5 px-4 rounded-sm"
            name="inquiry"
            id="inquiry"
            placeholder="Select inquiry type"
          >
            <option value="general">General Question</option>
            <option value="demo">Request Demo</option>
            <option value="pricing">Pricing Information</option>
            <option value="technical">Technical Support</option>
            <option value="enterprise">Enterprise Solution</option>
          </select>

          <label htmlFor="message">Message</label>
          <textarea
            className="bg-slate-200 w-full p-4 rounded-lg"
            name="message"
            id="message"
            placeholder="Tell us about your election needs or ask any questions..."
            rows="5"
          ></textarea>

          <button className="btn sec-btn w-full my-6">Send Message</button>
          <p className="text-xs text-center">
            By submitting this form, you agree to our privacy policy and terms
            of service.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Contact;
