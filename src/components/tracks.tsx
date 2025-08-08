'use client'
import React from 'react'
import Image from 'next/image'

import { Play } from 'lucide-react'

import { songs, Song, Playlist, playlist } from '@/data/song'
import { cn } from '@/lib/utils'

type Props = {
  currentPlayList: Playlist
  playingSong: Song | null
  setPlayingSong: React.Dispatch<React.SetStateAction<Song|null>>
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
}

const Tracks = ({ currentPlayList, playingSong, setPlayingSong, setIsPaused }: Props) => {
  // const playingSong = {}
  // const tracks = songs
  // filtering according playlist
  const tracks = songs.filter(song => currentPlayList.tracks.includes(song.id))
  
  const playSong = (track: Song) => {
    setPlayingSong(track)
    setIsPaused(false)
  }

  return (
    <div className='col-span-6 row-span-5 col-start-1 row-start-8 bg-black p-4'>
      <h1 className='mb-2'>Tracks in the playlist</h1>
      <div className='overflow-y-auto h-[calc(100%-36px)] custom-scroll'>
        {tracks.map(track => (
          <div key={track.id} onClick={() => playSong(track)} className={cn('group flex items-center gap-4 p-2 hover:bg-accent/30 transition-colors cursor-pointer', track.id === playingSong?.id && 'bg-accent/20 border border-accent')}>
            <div className='flex items-center gap-4 flex-1 min-w-0'>
              <div className='relative'>
                <div className='w-full h-full absolute top-0 left-0 bg-accent z-10 mix-blend-color'></div>
                <Image src={track.cover} alt={`${track.title} cover`} width={48} height={48} className='object-cover' />
                <div className={cn('absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-accent', track.id === playingSong?.id && 'opacity-100')}>
                  <Play className='h-4 w-4 fill-current' />
                </div>
              </div>
              <div className='flex-1 min-w-0'>
                <div className='font-medium text-sm truncate'>{track.title}</div>
                <div className='text-xs text-muted-foreground truncate'>{track.artist}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tracks
