'use client'
import React, { useState } from 'react'
import { Pause, SkipForward, SkipBack, Shuffle, Repeat, Play } from 'lucide-react'

import { songs, Song, Playlist, playlist } from '@/data/song'
import { cn } from '@/lib/utils'
type Props = {
  isPaused: boolean
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
  playingSong: Song | null
  setPlayingSong: React.Dispatch<React.SetStateAction<Song | null>>
  currentPlayList: Playlist
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist>>
}
const PlaybackControls = ({ isPaused, setIsPaused, playingSong, setPlayingSong, currentPlayList, setPlaylist }: Props) => {
  const [mode, setMode] = useState<'repeat' | 'shuffle' | 'none'>('none')
  const isShuffleOn = mode === 'shuffle'
  const isRepeatOn = mode === 'repeat'

  const changeTrack = (action: 'next' | 'prev') => {
    // songs in current playlist
    const currentSongs = songs.filter(song => currentPlayList.tracks.includes(song.id))
    // index of current song 
    const currentSongIndex = currentSongs.findIndex(song => song.id === playingSong?.id)

    let newSong: Song | null = null
    let newPlaylist = currentPlayList

    if (action === 'next') {
      // play next song of same playlist
      if (currentSongIndex < currentSongs.length - 1) {
        newSong = currentSongs[currentSongIndex + 1]
      } else {
        // Move to first song of next playlist
        // current playlist index of song
        const currentPlaylistIndex = playlist.findIndex(p => p.id === currentPlayList.id)

        let nextPlaylistIndex

        if (currentPlaylistIndex === playlist.length - 1) {
          nextPlaylistIndex = 0 // move to the first playlist
        } else {
          nextPlaylistIndex = currentPlaylistIndex + 1
        }

        newPlaylist = playlist[nextPlaylistIndex]
        const nextSongs = songs.filter(song => newPlaylist.tracks.includes(song.id))
        newSong = nextSongs[0] || null
      }
    }

    if (action === 'prev') {
      if (currentSongIndex > 0) {
        // Play previous song in playlist
        newSong = currentSongs[currentSongIndex - 1]
      } else {
        // Move to last song playlist
        const currentPlaylistIndex = playlist.findIndex(p => p.id === currentPlayList.id)

        let prevPlaylistIndex

        if (currentPlaylistIndex === 0) {
          prevPlaylistIndex = playlist.length - 1 // move to last playlist
        } else {
          prevPlaylistIndex = currentPlaylistIndex - 1
        }

        newPlaylist = playlist[prevPlaylistIndex]
        const prevTracks = songs.filter(song => newPlaylist.tracks.includes(song.id))
        newSong = prevTracks[prevTracks.length - 1] || null
      }
    }

    if (newSong) {
      setPlayingSong(newSong)
      setIsPaused(false)

      if (newPlaylist.id !== currentPlayList.id) {
        setPlaylist(newPlaylist)
      }
    }
  }

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
      <ButtonContainer onClick={() => { if (playingSong) setIsPaused(prev => !prev) }} className='row-span-2 col-start-5 row-start-6'>
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
