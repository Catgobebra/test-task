import * as React from 'react'

interface LoadingProps {
    LoadingText: string
}
function Loading({LoadingText} : LoadingProps) {
  return (
    <div className='container mx-auto px-6 text-xl py-20 text-center'>{LoadingText}</div>
  )
}

export default Loading;