import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-gray-800 text-white rounded flex flex-col justify-between">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Information */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Survey Shark</h2>
          <p className="mb-4">
            Survey Shark is a leading platform for conducting surveys and collecting valuable feedback.
          </p>
          <p className="mb-4">1234 Survey Lane, Data City, DC 56789</p>
          <p>Email: contact@surveyshark.com</p>
          <p>Phone: +1 (234) 567-890</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <nav className="grid grid-cols-1 gap-4">
            <a className="link link-hover">About Us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">Terms of Service</a>
            <a className="link link-hover">FAQ</a>
            <a className="link link-hover">Help Center</a>
          </nav>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
          <p className="mb-4">Get the latest updates and offers.</p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-md border-none"
            />
            <button className="btn bg-[#074B5c] text-white rounded-r-md px-4">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Follow us on:</h2>
        <div className="grid grid-flow-col gap-4">
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
        </div>
      </div>
      <div className="mt-10 text-center">
        <p>&copy; 2024 Survey Shark. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
