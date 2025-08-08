'use client'
import React, { useState } from 'react'
import { Pause, SkipForward, SkipBack, Shuffle, Repeat, Play } from 'lucide-react'

import { songs, Song, Playlist, playlist } from '@/data/song'
import { cn } from '@/lib/utils'
type Props = {
  isPaused: boolean
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
  playingSong: Song | null
}
const PlaybackControls = ({isPaused, setIsPaused, playingSong}: Props) => {
  const [mode, setMode] = useState<'repeat' | 'shuffle' | 'none'>('none')
  const isShuffleOn = mode === 'shuffle'
  const isRepeatOn = mode === 'repeat'
  // const isPaused = true

  const changeTrack = (action: 'next' | 'prev') => { }
  // const onPlayPause = () => {}
  

  return (
    <>
      <ButtonContainer onClick={() => setMode(mode === 'none' ? 'shuffle' : 'none')} className={cn('col-start-4 row-start-6 bg-black', isShuffleOn && '!bg-accent')}>
        <Shuffle className={cn('justify-self-center self-center', isShuffleOn && 'stroke-black')} size={30} strokeWidth={2} absoluteStrokeWidth />
      </ButtonContainer>
      <ButtonContainer onClick={() => setMode(mode === 'none' ? 'repeat' : 'none')} className={cn('col-start-4 row-start-7 bg-black', isRepeatOn && '!bg-accent')}>
        <Repeat className={cn('justify-self-center self-center', isRepeatOn && 'stroke-black')} size={30} strokeWidth={2} absoluteStrokeWidth />
      </ButtonContainer>
      <ButtonContainer onClick={() => changeTrack('next')} className='col-start-6 row-start-6'>
        <SkipForward fill='currentColor' className='justify-self-center self-center' size={30} strokeWidth={1} absoluteStrokeWidth />
      </ButtonContainer>
      <ButtonContainer onClick={() => changeTrack('prev')} className='col-start-6 row-start-7'>
        <SkipBack fill='currentColor' className='justify-self-center self-center' size={30} strokeWidth={1} absoluteStrokeWidth />
      </ButtonContainer>
      <ButtonContainer onClick={()=> {if(playingSong) setIsPaused(prev => !prev)}} className='row-span-2 col-start-5 row-start-6'>
        {!isPaused ? <Pause fill='currentColor' className='justify-self-center self-center' size={50} strokeWidth={1} absoluteStrokeWidth /> : <Play fill='currentColor' className='justify-self-center self-center' size={50} strokeWidth={1} absoluteStrokeWidth />}
      </ButtonContainer>
    </>
  )
}

const ButtonContainer = ({ children, className, onClick }: { children: React.ReactNode; className: string; onClick: () => void }) => (
  <div className={`bg-black ${className}`}>
    <button onClick={onClick} className='cursor-pointer border-none outline-none bg-none w-full h-full flex justify-center items-center hover:bg-popover-foreground/20 text-accent'>
      {children}
    </button>
  </div>
)

export default PlaybackControls
