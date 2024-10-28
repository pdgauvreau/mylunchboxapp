'use client'
import { useState } from 'react'

export default function CreatePage() {
  const [formData, setFormData] = useState({
    media: null,
    title: '',
    cookTime: '',
    ingredients: '',
    steps: '',
    isPublic: true
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    // Title is required for both public and private posts
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    // Media is required for both public and private posts
    if (!formData.media) {
      newErrors.media = 'Media is required'
    }

    // Additional validations for public posts
    if (formData.isPublic) {
      if (!formData.cookTime.trim()) {
        newErrors.cookTime = 'Cook time is required for public posts'
      }
      if (!formData.ingredients.trim()) {
        newErrors.ingredients = 'Ingredients are required for public posts'
      }
      if (!formData.steps.trim()) {
        newErrors.steps = 'Steps are required for public posts'
      }
    }

    return newErrors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
  }

  const handleVisibilityChange = (e) => {
    setFormData(prev => ({
      ...prev,
      isPublic: e.target.value === 'public'
    }))
    // Clear errors when switching visibility
    setErrors({})
  }

  const handleMediaUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        media: file
      }))
      setTouched(prev => ({
        ...prev,
        media: true
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Submit form logic here
      console.log('Form submitted:', formData)
    }
  }

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }))
    const newErrors = validateForm()
    setErrors(newErrors)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Post Visibility</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={formData.isPublic ? 'public' : 'private'}
            onChange={handleVisibilityChange}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            {formData.isPublic 
              ? "Public posts require all fields and will be visible to everyone"
              : "Private posts only require title and media, visible only to you"}
          </p>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Upload Photo/Video*</label>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              ${errors.media && touched.media ? 'border-red-500' : 'border-gray-300'}`}
            onClick={() => document.getElementById('media-upload').click()}
          >
            <input
              id="media-upload"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleMediaUpload}
            />
            <p className="text-gray-500">
              {formData.media ? formData.media.name : 'Click to upload or drag and drop'}
            </p>
          </div>
          {errors.media && touched.media && (
            <p className="text-red-500 text-sm mt-1">{errors.media}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold">Title*</label>
          <input
            type="text"
            name="title"
            className={`w-full p-2 border rounded-lg ${
              errors.title && touched.title ? 'border-red-500' : ''
            }`}
            placeholder="What did you make?"
            value={formData.title}
            onChange={handleInputChange}
            onBlur={() => handleBlur('title')}
          />
          {errors.title && touched.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Cook Time{formData.isPublic && '*'}
          </label>
          <input
            type="text"
            name="cookTime"
            className={`w-full p-2 border rounded-lg ${
              errors.cookTime && touched.cookTime ? 'border-red-500' : ''
            }`}
            placeholder="How long did it take?"
            value={formData.cookTime}
            onChange={handleInputChange}
            onBlur={() => handleBlur('cookTime')}
          />
          {errors.cookTime && touched.cookTime && (
            <p className="text-red-500 text-sm mt-1">{errors.cookTime}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Ingredients{formData.isPublic && '*'}
          </label>
          <textarea
            name="ingredients"
            className={`w-full p-2 border rounded-lg ${
              errors.ingredients && touched.ingredients ? 'border-red-500' : ''
            }`}
            rows="4"
            placeholder="List your ingredients..."
            value={formData.ingredients}
            onChange={handleInputChange}
            onBlur={() => handleBlur('ingredients')}
          />
          {errors.ingredients && touched.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Steps{formData.isPublic && '*'}
          </label>
          <textarea
            name="steps"
            className={`w-full p-2 border rounded-lg ${
              errors.steps && touched.steps ? 'border-red-500' : ''
            }`}
            rows="4"
            placeholder="How did you make it?"
            value={formData.steps}
            onChange={handleInputChange}
            onBlur={() => handleBlur('steps')}
          />
          {errors.steps && touched.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Share Post
        </button>
      </form>
    </div>
  )
}
