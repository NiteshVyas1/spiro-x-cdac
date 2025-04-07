import React from 'react';
import { Pencil } from 'lucide-react';

const PersonalDetails = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mr-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Personal detail</h2>
        <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" />
      </div>
      <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
        <div>
          <span className="text-gray-500">First and Last name</span>
          <p>Vedangi Mhatre</p>
        </div>
        <div>
          <span className="text-gray-500">College Email</span>
          <p>vedangi@sakec.ac.in</p>
        </div>
        <div>
          <span className="text-gray-500">Phone</span>
          <p>+91 9988776655</p>
        </div>
        <div>
          <span className="text-gray-500">Branch</span>
          <p>Electronics and computer science</p>
        </div>
        <div>
          <span className="text-gray-500">Age</span>
          <p>18</p>
        </div>
        <div>
          <span className="text-gray-500">Education</span>
          <p>SY at SAKEC</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
