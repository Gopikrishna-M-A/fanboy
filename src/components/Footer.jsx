"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Home, Search, Logs, Heart, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const NavItem = ({ id, Icon, label, path, isActive, onClick }) => (
  <Link
    href={path}
    className={`
      relative z-10 flex flex-col items-center justify-center w-12 h-12
      transition-all duration-300 ease-in-out
      ${isActive ? "text-white" : "text-gray-400 hover:text-gray-200"}
    `}
    onClick={() => onClick(id, path)}>
    <div className="relative">
      <Icon size={24} />
      {id === "cart" && cartItems > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 animate-pulse">
          {cartItems}
        </Badge>
      )}
    </div>
    <span className="text-xs mt-1">{label}</span>
  </Link>
)

const Footer = () => {
  const [activeIcon, setActiveIcon] = useState("home")
  const [cartItems, setCartItems] = useState(0)
  const router = useRouter()

  const handleNavClick = (id, path) => {
    setActiveIcon(id)
  }

  return (
    <nav className='fixed bottom-0 left-0 right-0 p-2'>
      <div className='relative flex justify-around items-center h-16 rounded-full bg-gray-800'>
        <svg className='absolute inset-0 w-full h-full'>
          <defs>
            <filter id='goo'>
              <feGaussianBlur
                in='SourceGraphic'
                stdDeviation='8'
                result='blur'
              />
              <feColorMatrix
                in='blur'
                mode='matrix'
                values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7'
                result='goo'
              />
              <feComposite in='SourceGraphic' in2='goo' operator='atop' />
            </filter>
          </defs>
        </svg>
        <NavItem
          id="home"
          Icon={Home}
          label="Home"
          path="/"
          isActive={activeIcon === "home"}
          onClick={handleNavClick}
        />
        <NavItem
          id="Logs"
          Icon={Logs}
          label="Orders"
          path="/orders"
          isActive={activeIcon === "Logs"}
          onClick={handleNavClick}
        />
        <NavItem
          id="favorites"
          Icon={Heart}
          label="Favorites"
          path="/favorites"
          isActive={activeIcon === "favorites"}
          onClick={handleNavClick}
        />
        <NavItem
          id="profile"
          Icon={User}
          label="Profile"
          path="/profile"
          isActive={activeIcon === "profile"}
          onClick={handleNavClick}
        />
      </div>
    </nav>
  )
}

export default Footer