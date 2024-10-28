import Link from 'next/link'
import { AiFillHome, AiOutlineSearch, AiOutlinePlusCircle, AiOutlineMessage, AiOutlineUser } from 'react-icons/ai'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary-bg border-t border-primary-text/10 backdrop-blur-sm bg-opacity-90">
      <div className="flex justify-around items-center">
        <Link href="/" className="nav-item group">
          <AiFillHome className="text-2xl group-hover:text-accent-red transition-colors" />
          <span className="text-xs group-hover:text-accent-red transition-colors">Home</span>
        </Link>
        
        <Link href="/search" className="nav-item group">
          <AiOutlineSearch className="text-2xl group-hover:text-accent-teal transition-colors" />
          <span className="text-xs group-hover:text-accent-teal transition-colors">Find</span>
        </Link>
        
        <Link href="/create" className="nav-item group">
          <AiOutlinePlusCircle className="text-2xl group-hover:text-accent-pink transition-colors" />
          <span className="text-xs group-hover:text-accent-pink transition-colors">Create</span>
        </Link>
        
        <Link href="/share" className="nav-item group">
          <AiOutlineMessage className="text-2xl group-hover:text-accent-teal transition-colors" />
          <span className="text-xs group-hover:text-accent-teal transition-colors">Share</span>
        </Link>
        
        <Link href="/profile" className="nav-item group">
          <AiOutlineUser className="text-2xl group-hover:text-accent-red transition-colors" />
          <span className="text-xs group-hover:text-accent-red transition-colors">Profile</span>
        </Link>
      </div>
    </nav>
  )
}
