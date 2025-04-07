import React from 'react'

const ProfileCertificationStatus = () => {
  return (
      <div className="bg-white rounded-lg shadow p-6 mr-20">
      <h2 className="text-lg font-semibold mb-4">Certification Status</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-200 h-20 rounded-lg animate-pulse" />
        <div className="bg-gray-200 h-20 rounded-lg animate-pulse" />
        <div className="bg-gray-200 h-20 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

export default ProfileCertificationStatus
