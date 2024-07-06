"use client"
import Link from "next/link"
import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-green-500 shadow-md z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href='/' className="cursor-pointer flex gap-3 items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/images/logo.png" alt="Logo" />
            <AvatarFallback>FJ</AvatarFallback>
          </Avatar>
          <div className="text-2xl font-bold">Fanboy Jerseys</div>
        </Link>
      </div>
    </header>
  )
}

export default Header