'use client';
import Image from 'next/image'
import React from 'react'
import {MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Avatar from 'react-avatar';


const Header = () => {
  return (
    <header className=''>
        <div className='p-5 flex flex-col md:flex-row gap-2 md:justify-between md:items-center  bg-gray-400/10'>
            <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50'/>
            <div className='flex items-center gap-2'>
                <Image src='https://asset.brandfetch.io/idToc8bDY1/idbJOx5uma.png?updated=1667574635898' alt='Taskero Header logo' width={300} height={80} className='w-12 object-contain rounded-lg'/>
                <h1 className='text-2xl'>Taskero</h1>
            </div>
            <div className='flex gap-3 items-center'>
                {/* search */}
                <form action="" className='flex items-center space-x-5 bg-white shadow-md p-2 rounded-md flex-1 md:flex-initial'>
                    <MagnifyingGlassIcon className='h-6 w-6 text-gray-400'/>
                    <input type="text" placeholder='Search' className='outline-none p-1 flex-1'/>
                    <button hidden type='submit'>search</button>
                </form>
                <Avatar name='Webster' size='48' round color='#0065FF'/>
            </div>
        </div>
        {/* summary suggestion GPT-4 integration*/}
        <div className='flex items-center justify-center px-5 md:py-5 mt-3'>
            <p className='flex items-center text-sm font-light p-5 shadow-xl bg-white rounded-xl italic max-w-3xl text-[#0065FF]'><span>Chat GPT is summarizing your tasks...</span></p>
        </div>
    </header>
  )
}

export default Header
