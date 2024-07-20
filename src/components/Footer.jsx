"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  Layers2,
  Logs,
  Mail,
  MapPin,
  Phone,
  ShoppingCart,
  User,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useCart } from "@/contexts/cart"
import { FaWhatsapp, FaInstagram } from "react-icons/fa"
const NavItem = ({ id, Icon, label, path, isActive, onClick }) => {
  const { cart } = useCart()
  return (
    <Link
      href={path}
      className={`
      relative z-20 flex flex-col items-center justify-center w-12 h-12
      transition-all duration-300 ease-in-out
      ${isActive ? "text-white" : "text-gray-400 hover:text-gray-200"}
    `}
      onClick={() => onClick(id, path)}>
      <div className='relative'>
        <Icon size={24} />
        {id === "cart" && cart?.items?.length > 0 && (
          <Badge
            variant='destructive'
            className='absolute -top-2 -right-2 animate-pulse'>
            {cart.items.length}
          </Badge>
        )}
      </div>
      <span className='text-xs mt-1'>{label}</span>
    </Link>
  )
}

const Footer = () => {
  const [activeIcon, setActiveIcon] = useState("home")
  const [cartItems, setCartItems] = useState(0)
  const router = useRouter()
  const today = new Date()
  const currentYear = today.getFullYear()

  const handleNavClick = (id, path) => {
    setActiveIcon(id)
  }

  return (
    <nav className='fixed bottom-0 left-0 right-0 p-2 md:static z-50'>
      <div className='relative flex justify-around items-center h-16 rounded-full bg-gray-800 md:hidden'>
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
          id='home'
          Icon={Home}
          label='Home'
          path='/'
          isActive={activeIcon === "home"}
          onClick={handleNavClick}
        />
        <NavItem
          id='Logs'
          Icon={Logs}
          label='Orders'
          path='/orders'
          isActive={activeIcon === "Logs"}
          onClick={handleNavClick}
        />
        <NavItem
          id='cart'
          Icon={ShoppingCart}
          label='Cart'
          path='/cart'
          isActive={activeIcon === "cart"}
          onClick={handleNavClick}
        />
        <NavItem
          id='profile'
          Icon={User}
          label='Profile'
          path='/profile'
          isActive={activeIcon === "profile"}
          onClick={handleNavClick}
        />
      </div>

      {/* larger screen footer */}

      <footer className='bg-white hidden md:block'>
        <div className='mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            <div>
              <div className='flex justify-center font-bold text-4xl text-green-500 sm:justify-start'>
                {/* logo */}
                FanBoy Jeyseys
              </div>

              <p className='mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left'>
                Where Fan's Meets a Fan
              </p>

              <ul className='mt-8 flex justify-center gap-4 sm:justify-start md:gap-4'>
                <li>
                  <Link
                    href='https://wa.me/9446931531'
                    target='_blank'
                    className='text-green-500 transition hover:text-green-700/75'>
                    <span className='sr-only'>WhatsApp</span>
                    <FaWhatsapp className='h-6 w-6' />
                  </Link>
                </li>

                <li>
                  <Link
                    href='https://www.instagram.com/fnbyjrsy'
                    target='_blank'
                    className='text-green-500 transition hover:text-green-700/75'>
                    <span className='sr-only'>Instagram</span>
                    <FaInstagram className='h-6 w-6' />
                  </Link>
                </li>
              </ul>
            </div>

            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2'>
              <div className='text-center sm:text-left'>
                <p className='text-lg font-medium text-gray-900'>
                  Helpful Links
                </p>

                <ul className='mt-8 space-y-4 text-sm'>
                  <li>
                    <Link
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/cancellation-and-refund-policy'>
                      {" "}
                      Cancellation & Refund{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/shipping-and-delivery-policy'>
                      {" "}
                      Shipping & Delivery{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/contact'>
                      {" "}
                      Support{" "}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className='text-center sm:text-left'>
                <p className='text-lg font-medium text-gray-900'>Contact Us</p>

                <ul className='mt-8 space-y-4 text-sm'>
                  <li>
                    <Link
                      className='flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end'
                      href='mailto:fanboysale@gmail.com'>
                      <Mail className='size-5' />

                      <span className='flex-1 text-gray-700'>
                        fanboysale@gmail.com
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className='flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end'
                      href='tel:9446931531'>
                      <Phone className='size-5' />

                      <span className='flex-1 text-gray-700'>
                        +91 9446931531
                      </span>
                    </Link>
                  </li>

                  <li className='flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end'>
                    <MapPin className='size-5' />

                    <address className='-mt-0.5 flex-1 not-italic text-gray-700'>
                      Ernakulam kerala India
                    </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='mt-12 border-t border-gray-100 pt-6'>
            <div className='text-center sm:flex sm:justify-between sm:text-left'>
              <p className='text-sm text-gray-500'>
                <span className='block sm:inline'>All rights reserved.</span>

                <Link
                  className='inline-block text-green-500 underline transition hover:text-green-500/75'
                  href='/terms-and-conditions'>
                  Terms & Conditions
                </Link>

                <span>&middot;</span>

                <Link
                  className='inline-block text-green-500 underline transition hover:text-green-500/75'
                  href='/privacy-policy'>
                  Privacy Policy
                </Link>
              </p>

              <p className='mt-4 text-sm text-gray-500 sm:order-first sm:mt-0'>
                &copy; {currentYear} Fanboy Jerseys
              </p>
            </div>
          </div>
        </div>
      </footer>
    </nav>
  )
}

export default Footer
