
import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* About */}
        <div>
          <img
            src={assets.logo}
            className="mb-5 w-32"
            alt="Forever"
          />

          <p className="w-full md:w-2/3 text-gray-600">
            Forever is your destination for modern fashion and everyday style.
            Discover a wide range of quality clothing for men, women, and kids.
            We are committed to providing stylish products, affordable prices,
            and a smooth shopping experience for every customer.
          </p>
        </div>

        {/* Company */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>

          <ul className="flex flex-col gap-2 text-gray-600"> 
            <li> <Link to="/" className="hover:text-black"> Home </Link> </li> 
            <li> <Link to="/about" className="hover:text-black"> About Us </Link> </li> 
            <li> <Link to="/collection" className="hover:text-black"> Shop </Link> </li> 
            <li> <Link to="/contact" className="hover:text-black"> Contact Us </Link> </li>
            <li> <Link to="/orders" className="hover:text-black"> My Orders </Link> </li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>

          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+880 1212-2256789</li>
            <li>support@forever.com</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div>
        <hr />

        <p className="py-5 text-sm text-center text-gray-600">
          © 2026 Forever.com — All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

