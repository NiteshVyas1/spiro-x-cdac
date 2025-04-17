import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Logo */}
        <div>
          <img
            src={assets.spiro}
            alt="spiro logo"
            className="h-20 w-40 bg"
          />
        </div>\\\

        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
          {/* Courses */}
          <div>
            <h3 className="font-semibold mb-2">Courses</h3>
            <ul className="space-y-1 text-gray-700">
              <li className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">Artificial Intelligence</li>
              <li className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">Data Science</li>
              <li className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">Machine Learning</li>
              <li className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">Cloud Computing</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul className="space-y-1 text-gray-700">
              <li className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">About us</li>
              <li className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">Contact us</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <div className="space-y-1 text-gray-700">
              <ul className='space-y-1'>
              <li><a href='#' className="hover:text-blue-600 transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">LinkedIn</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} SPIRO. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
