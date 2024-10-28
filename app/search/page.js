export default function SearchPage() {
  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <input
          type="search"
          placeholder="Search recipes, users, or ingredients..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
        />
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Popular Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Vegetarian', 'Quick Meals'].map((category) => (
              <button
                key={category}
                className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
