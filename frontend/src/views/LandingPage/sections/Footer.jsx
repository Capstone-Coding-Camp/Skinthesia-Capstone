import { Mail, MapPin, Phone, Copyright } from "lucide-react";
import { motion } from "framer-motion";

const FooterView = ({ contact, exploreLinks, socialLinks, aboutText }) => {
  return (
    <motion.footer
      id="contact"
      className="bg-pink text-white py-10 px-6 md:px-12 lg:px-20 text-sm"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-x-20">
        {/* Explore */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2">
            {exploreLinks.map(link => (
              <li key={link.label}>
                <a href={link.href} className="hover:underline">{link.label}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Keep in Touch */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h3 className="text-lg font-semibold mb-4">Keep in Touch</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-1" />
              {contact.email}
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1" />
              {contact.address}
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-1" />
              {contact.phone}
            </li>
          </ul>
        </motion.div>

        {/* About Us */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">{aboutText}</p>
          <div className="flex mt-4 space-x-4">
            {socialLinks.map(link => (
              <a key={link.label} href={link.href} className="hover:underline">{link.label}</a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="border-t border-white my-6"></div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex flex-col md:flex-row justify-between items-center text-xs gap-3">
        <div className="flex items-center gap-2">
          <Copyright className="w-4 h-4" />
          <span>2025. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms Of Use</a>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default FooterView;
