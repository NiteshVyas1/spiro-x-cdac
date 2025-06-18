import React from 'react'

const ProfileCertificationStatus = () => {
  const certifications = [
    { title: "React Developer", issuer: "Coursera", date: "Jan 2023" },
    { title: "JavaScript Expert", issuer: "Udemy", date: "Mar 2023" },
    { title: "Full Stack Developer", issuer: "edX", date: "May 2023" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Certification Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-blue-700">{cert.title}</h3>
            <p className="text-sm text-blue-600">{cert.issuer}</p>
            <p className="text-xs text-blue-500">{cert.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileCertificationStatus
