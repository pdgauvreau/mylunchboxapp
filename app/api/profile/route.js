import { NextResponse } from 'next/server'

// This is a mock database for demonstration
// TODO: Replace with actual database connection
let profileData = null

export async function GET() {
  return NextResponse.json(profileData || {
    name: 'Your Name',
    bio: 'Food enthusiast | Home chef',
    goals: {
      calories: 2000,
      protein: 150,
      carbs: 200
    },
    preferences: [
      'Vegetarian',
      'Gluten-free',
      'Low-carb',
      'High-protein'
    ],
    profileImage: null
  })
}

export async function POST(request) {
  const data = await request.json()
  
  // Validate the data
  if (!data.name || !data.bio) {
    return NextResponse.json(
      { error: 'Name and bio are required' },
      { status: 400 }
    )
  }

  // Store the data
  profileData = {
    ...data,
    updatedAt: new Date().toISOString()
  }

  return NextResponse.json(profileData)
}
