'use client'

import { useEffect, useState } from 'react'
import { songs, Song, Playlist, playlist } from '@/data/song'

export default function AudioWaveform({isPaused, playingSong}: {isPaused:boolean, playingSong: Song | null}) {

  const isPlaying = playingSong

  const [bars, setBars] = useState<{ positive: number; negative: number }[]>([])

  useEffect(() => {
    const initialBars = Array.from({ length: 35 }, () => ({
      positive: Math.random() * 60 + 10,
      negative: Math.random() * 60 + 10,
    }))
    setBars(initialBars)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && !isPaused) {
      interval = setInterval(() => {
        setBars(prevBars =>
          prevBars.map(() => {
            const basePositive = Math.random() * 50 + 15
            const baseNegative = Math.random() * 50 + 15
            const spikePositive = Math.random() > 0.8 ? Math.random() * 30 : 0
            const spikeNegative = Math.random() > 0.8 ? Math.random() * 30 : 0

            return {
              positive: Math.min(basePositive + spikePositive, 80),
              negative: Math.min(baseNegative + spikeNegative, 80),
            }
          })
        )
      }, 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, isPaused])

  return (
    <div className='flex items-center justify-center gap-1 mb-8 px-4 relative h-full col-span-3 row-span-2 col-start-1 row-start-6 bg-black'>
      {bars.map((bar, index) => (
        <div key={index} className='flex flex-col items-center relative'>
          <div
            className={`bg-accent transition-all duration-100 ease-out opacity-100 w-1 mb-px`}
            style={{
              height: `${bar.positive}px`,
              transform: isPlaying && !isPaused ? 'scaleY(1)' : 'scaleY(0.3)',
            }}
          />
        </div>
      ))}
    </div>
  )
}
