import FoodPost from './components/FoodPost'

export default function Home() {
  // Mock data for demonstration
  const posts = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'Gordon Ramsay',
        avatar: 'https://picsum.photos/50/50?random=1',
      },
      image: 'https://picsum.photos/400/400?random=1',
      title: 'Perfect Beef Wellington',
      likes: 1234,
      recipe: {
        cookTime: '2 hours',
        ingredients: ['Beef tenderloin', 'Mushroom duxelles', 'Prosciutto', 'Puff pastry'],
        steps: ['Sear the beef', 'Spread mushroom mixture', 'Wrap in prosciutto', 'Bake until golden']
      }
    },
    {
      id: 2,
      user: {
        id: 2,
        name: 'Jamie Oliver',
        avatar: 'https://picsum.photos/50/50?random=2',
      },
      image: 'https://picsum.photos/400/400?random=2',
      title: '15-Minute Pasta',
      likes: 856,
      recipe: {
        cookTime: '15 minutes',
        ingredients: ['Pasta', 'Cherry tomatoes', 'Basil', 'Olive oil'],
        steps: ['Boil pasta', 'Sauté tomatoes', 'Mix together', 'Add fresh basil']
      }
    },
  ]

  return (
    <main className="bg-primary-bg min-h-screen pb-16">
      <div className="max-w-[470px] mx-auto pt-4 px-0 sm:px-2">
        {posts.map(post => (
          <FoodPost key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}
