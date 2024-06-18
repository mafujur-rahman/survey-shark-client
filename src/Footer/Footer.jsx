import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-gray-800 text-white rounded flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-start w-full mb-10 space-y-10 md:space-y-0">
        {/* Company Information */}
        <div className="md:w-1/4">
          <h2 className="text-2xl font-bold mb-4">Survey Shark</h2>
          <p className="mb-4">
            Survey Shark is a leading platform for conducting surveys and collecting valuable feedback.
          </p>
          <p className="mb-4">1234 Survey Lane, Data City, DC 56789</p>
          <p>Email: contact@surveyshark.com</p>
          <p>Phone: +1 (234) 567-890</p>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/4">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <nav className="grid grid-cols-1 gap-2">
            <a className="link link-hover">About Us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">Terms of Service</a>
            <a className="link link-hover">FAQ</a>
            <a className="link link-hover">Help Center</a>
          </nav>
        </div>

        {/* Newsletter Subscription */}
        <div className="md:w-1/4">
          <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
          <p className="mb-4">Get the latest updates and offers.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-md border-none"
            />
            <button className="btn bg-[#074B5c] text-white rounded-r-md px-4">Subscribe</button>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="md:w-1/4 lg:ml-10">
          <h2 className="text-2xl font-bold mb-4">Follow us on:</h2>
          <nav className="flex space-x-4">
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebook className="w-6 h-6 fill-current" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter className="w-6 h-6 fill-current" />
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <FaYoutube className="w-6 h-6 fill-current" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedin className="w-6 h-6 fill-current" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram className="w-6 h-6 fill-current" />
            </a>
          </nav>
        </div>
      </div>
      <div className="text-center mt-auto">
        <p>&copy; 2024 Survey Shark. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
