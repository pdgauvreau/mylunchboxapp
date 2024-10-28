export default function SharePage() {
  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Messages</h1>
          <button className="text-blue-500">New Message</button>
        </div>

        <div className="space-y-4">
          {['Alice', 'Bob', 'Charlie', 'David'].map((user) => (
            <div
              key={user}
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="ml-4">
                <h3 className="font-semibold">{user}</h3>
                <p className="text-gray-500 text-sm">Shared a recipe with you</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
