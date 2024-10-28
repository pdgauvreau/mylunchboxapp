'use client'

import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState(null)
  const [name, setName] = useState('Your Name')
  const [bio, setBio] = useState('Food enthusiast | Home chef')
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 200
  })
  const [preferences, setPreferences] = useState([
    'Vegetarian',
    'Gluten-free',
    'Low-carb',
    'High-protein'
  ])
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Fetch profile data when component mounts
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        setName(data.name)
        setBio(data.bio)
        setGoals(data.goals)
        setPreferences(data.preferences)
        if (data.profileImage) {
          setProfileImage(data.profileImage)
        }
      })
      .catch(error => {
        console.error('Error fetching profile:', error)
      })
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          bio,
          goals,
          preferences,
          profileImage
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-bold text-center w-full mb-2"
            />
          ) : (
            <h1 className="text-xl font-bold">{name}</h1>
          )}
          {isEditing ? (
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="text-gray-500 text-center w-full"
            />
          ) : (
            <p className="text-gray-500">{bio}</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Diet Goals</h2>
          <div className="space-y-4">
            {Object.entries(goals).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="capitalize">{key} Goal</span>
                {isEditing ? (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setGoals(prev => ({
                      ...prev,
                      [key]: parseInt(e.target.value)
                    }))}
                    className="w-24 text-right border rounded p-1"
                  />
                ) : (
                  <span className="font-semibold">
                    {value}{key === 'calories' ? ' kcal' : 'g'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Dietary Preferences</h2>
          {isEditing ? (
            <div className="space-y-2">
              {preferences.map((pref, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pref}
                    onChange={(e) => {
                      const newPrefs = [...preferences]
                      newPrefs[index] = e.target.value
                      setPreferences(newPrefs)
                    }}
                    className="border rounded p-1 flex-1"
                  />
                  <button
                    onClick={() => setPreferences(preferences.filter((_, i) => i !== index))}
                    className="text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => setPreferences([...preferences, ''])}
                className="text-blue-500 mt-2"
              >
                + Add Preference
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {preferences.map((pref) => (
                <span
                  key={pref}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {pref}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          {isEditing ? (
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className={`${
                isSaving ? 'bg-gray-400' : 'bg-blue-500'
              } text-white px-6 py-2 rounded-full`}
            >
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Your Posts</h2>
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
