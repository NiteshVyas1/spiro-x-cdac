import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">SPIRO</h1>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
          {/* Courses */}
          <div>
            <h3 className="font-semibold mb-2">Courses</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Artificial Intelligence</li>
              <li>Data Science</li>
              <li>Machine Learning</li>
              <li>Cloud Computing</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul className="space-y-1 text-gray-700">
              <li>About us</li>
              <li>Contact us</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
