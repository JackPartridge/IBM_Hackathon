"use client";

import { useState } from 'react'
import Image from "next/image"

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = new useState(false)

  return (
    <div className= 'bg-primary shadow-inner'>
      <div className="relative isolate ">
         <div className="relative z-20 float-end flex flex-1 mt-[1px]">
          <img
            className = "border border-none"
            src='https://i.ibb.co/GvsB8YK/Studious-Owl-removebg-preview.png'        
            alt="Studious Owl"
            width="750px"
            height="750px"

          />
        </div>
        <div className="mx-auto max-w-2xl sm:py-48 lg:py-56 flex flex-1">
          <div className="text-center p-6 -mt-20">
            <p className="font-semibold text-green-700 -mt-10" style={{ fontFamily: 'Raleway, sans-serif' }}>
              AI GOVERNS THE FUTURE OF STUDYING
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Welcome to your personal University Hub
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Take your university experience to the tree tops with our new AI buddies and services!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="bg-secondary rounded-md px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-info focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Buddies 
              </a>
              <a href="#" className="ghost text-sm font-semibold leading-6 text-gray-900">
                Login <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true">
        </div>
      </div>
    </div>
  )
}
