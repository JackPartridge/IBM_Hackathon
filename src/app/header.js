'use client'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link' // Import Link

export default function Header () {
  const router = useRouter()
  const pathName = usePathname()

  const isActive = (path) => {
    if (path === pathName) {
      return 'border-b-2 border-info pb-2'
    } else {
      return 'border-transparent pb-2'
    }
  }

  return (
    <div
      className="navbar bg-secondary drop-shadow-xl outline outline-1 shadow-black navbar-style justify-between pl-24 pr-24">
      <div className="navbar-start flex ">
        <div className="dropdown">
          <div tabIndex={ 0 } role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
          </div>
          <ul tabIndex={ 0 }
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">IBM Hackathon</a>
      </div>
      <div className="navbar-center hidden lg:flex float-right">
        <ul className="menu menu-horizontal px-1 font-bold">
          <li>
            <Link href="/" className={ `hover:border-b-2 hover:border-info pb-2 border-b-2 ${ isActive('/') }` }>
              Home
            </Link>
          </li>
          <li>
            <Link href="/buddies"
                  className={ `hover:border-b-2 hover:border-info pb-2 border-b-2 ${ isActive('/buddies') }` }>
              Buddies
            </Link>
          </li>
          <li>
            <Link href="/tutors"
                  className={ `hover:border-b-2 hover:border-info pb-2 border-b-2 ${ isActive('/tutors') }` }>
              Tutors
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}