import React from 'react'
import { Song } from '@/data/song'
import { artists } from '@/data/artists'

const AboutArtist = ({ playingSong }: { playingSong: Song | null }) => {
  // artist from song 
  const artist = artists.find(a => a.name === playingSong?.artist)

  if (!playingSong) return <div className='col-span-6 row-span-3 col-start-7 row-start-10 bg-black p-4'></div>
  return (
    <div className='col-span-6 row-span-3 col-start-7 row-start-10 bg-black p-4'>
      <h1 className='mb-4'>About Artist</h1>
      <div className='font-medium text-sm truncate mb-2'>{artist?.name}</div>
      <div className='text-xs text-muted-foreground truncate text-wrap mb-3'>{artist?.description}</div>
      <div className='font-[family-name:var(--font-geist-mono)] opacity-75'>{artist?.listeners}</div>
    </div>
  )
}

export default AboutArtist