"use client"

import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function FoodPost({ post }) {
  const [showRecipe, setShowRecipe] = useState(false)

  return (
    <article className="mb-6">
      {/* Image with Overlaid User Info */}
      <div className="relative rounded-lg overflow-hidden">
        <div className="relative w-full aspect-square">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 470px"
            className="object-cover"
            priority
          />
        </div>
        <Link href={`/profile/${post.user.id}`} className="absolute top-4 left-4">
          <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/60 transition-all">
            <div className="relative w-8 h-8">
              <Image 
                src={post.user.avatar} 
                alt={post.user.name}
                fill
                sizes="32px"
                className="rounded-full border border-white/20"
              />
            </div>
            <span className="ml-3 font-medium text-sm text-white">{post.user.name}</span>
          </div>
        </Link>
      </div>

      {/* Actions */}
      <div className="px-1 pt-4">
        <div className="flex items-center space-x-4">
          <button className="text-primary-text hover:text-accent-red transition-like">
            <AiOutlineHeart size={28} />
          </button>
          <button className="text-primary-text hover:text-accent-teal transition-like">
            <AiOutlineComment size={28} />
          </button>
          <button className="text-primary-text hover:text-accent-pink transition-like">
            <AiOutlineShareAlt size={28} />
          </button>
          <div className="flex-grow"></div>
          <button className="text-primary-text hover:text-accent-teal transition-like">
            <BsBookmark size={24} />
          </button>
        </div>

        {/* Likes */}
        <div className="mt-3">
          <p className="font-semibold text-sm text-primary-text">{post.likes.toLocaleString()} likes</p>
        </div>

        {/* Caption */}
        <div className="mt-2">
          <Link href={`/profile/${post.user.id}`}>
            <span className="font-semibold text-sm mr-2 text-primary-text hover:text-accent-teal transition-colors">{post.user.name}</span>
          </Link>
          <span className="text-sm text-primary-text/90">{post.title}</span>
        </div>

        {/* Recipe Toggle */}
        <button 
          onClick={() => setShowRecipe(!showRecipe)}
          className="text-accent-teal text-sm mt-2 mb-3 font-medium hover:text-accent-pink transition-like"
        >
          {showRecipe ? 'Hide recipe' : 'View recipe'}
        </button>
      </div>

      {/* Recipe Details */}
      {showRecipe && (
        <div className="px-1 pb-4">
          <div className="mt-4 bg-primary-bg/50 p-4 rounded-lg text-sm border border-primary-text/10">
            <div className="mb-4 text-primary-text">
              <span className="font-semibold">Cook Time:</span> {post.recipe.cookTime}
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-accent-teal">Ingredients:</h3>
              <ul className="list-disc pl-5 text-primary-text">
                {post.recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-accent-teal">Steps:</h3>
              <ol className="list-decimal pl-5 text-primary-text">
                {post.recipe.steps.map((step, index) => (
                  <li key={index} className="mb-1">{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
