'use client'
import React from 'react'

import Image from 'next/image'
import { Song } from '@/data/song'

const AlbumCover = () => {
  const playingSong = {}
  return (
    <div className={'col-span-3 row-span-5 col-start-4 row-start-1 bg-black relative'}>
      <div className='w-full h-full absolute top-0 left-0 bg-accent z-10 mix-blend-color'></div>
      {playingSong && <Image src={playingSong.cover} alt={`${playingSong.title}-cover`} className='aspect-[0.95]' />}
    </div>
  )
}

export default AlbumCover
