'use client'

import Image from 'next/image'
import { Song } from '@/data/song'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const PlayerMain = ({ playingSong }: { playingSong: Song | null }) => {
  const [isLiked, setIsLiked] = useState(false)
  // like unlike songs 
  const handleLike = () => { 
    setIsLiked(prev => !prev);
  }
 
  if (!playingSong) return <div className='col-span-6 row-span-9 col-start-7 row-start-1 bg-black p-4'></div>
  return (
    <div className='col-span-6 row-span-9 col-start-7 row-start-1 bg-black p-4'>
      <h2 className='text-4xl tracking-tight h-10'>{playingSong?.title}</h2>
      <div className='font-[family-name:var(--font-geist-mono)] opacity-75 h-6'>{playingSong?.artist}</div>
      <div className='relative mx-auto'>
        <div className='w-full h-full absolute top-0 left-0 bg-accent z-10 mix-blend-color'></div>
        <Image className='z-0 mx-auto' priority unoptimized src='/orb.gif' width={500} height={500} alt='my gif' style={{ filter: 'hue-rotate(265deg)' }} />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <h2 className='text-8xl tracking-tight'>1:20</h2>
        <button onClick={handleLike} className={cn('cursor-pointer border-none outline-none bg-none justify-center items-center text-transparent', isLiked && 'text-accent')}>
          <Heart fill='currentColor' className='stroke-accent' size={70} strokeWidth={2} absoluteStrokeWidth />
        </button>
      </div>
      <div className='h-1 bg-white/30 w-full mt-4'>
        <div className='h-1 bg-white' style={{ width: `${(80 * 100) / 150}%` }}></div>
      </div>
    </div>
  )
}

export default PlayerMain
