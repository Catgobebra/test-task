import * as React from 'react'

interface ErrorProps {
    ErrorText: string
    errorMessage : string
}
function Error({ErrorText, errorMessage} : ErrorProps) {
  return (
    <div className='container mx-auto px-6 py-20 text-center'>
      <div className='text-xl font-bold'>{ErrorText}</div>
      <div>{errorMessage}</div>
    </div>
  )
}

export default Error;