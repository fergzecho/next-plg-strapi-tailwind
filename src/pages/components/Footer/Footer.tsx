import React from 'react'

export default function Footer() {
  return (
    <footer className=''>
      <div className="flex flex-row space-between w-full justify-between p-12">
        <p>Fernando Besa</p>

        <ul className='flex row text-base text-white gap-3'>
          <li className="hover:text-gray-600">About Me</li>
          <li className="hover:text-gray-600">Projects</li>
          <li className="hover:text-gray-600">Hire Me</li>
        </ul>
      </div>
    </footer>
  )
}
