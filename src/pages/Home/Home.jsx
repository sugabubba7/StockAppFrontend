import Header from '@/components/Header'
import React from 'react'
import { MacbookScroll } from '@/components/ui/macbook-scroll'

function Home() {
  return (
    <div className='bg-slate-900'>
      <MacbookScroll></MacbookScroll>
        <div className='bg-black'>
          Yaha Par Landing Scrren Banayenge
        </div>
    </div>
  )
}

export default Home
