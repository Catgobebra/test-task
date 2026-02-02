import * as React from 'react'

interface ButtonProps {
    buttonText: string
    onFunc?: () => void
}

function Button({buttonText, onFunc} : ButtonProps) {
  return (
    <button
    className='md:h-[45px] h-[28px] w-full md:w-[146px] 
    text-[12px]
    md:text-[16px] font-semibold
     bg-[#155da4] tracking-wide rounded-[4px]
     md:rounded-[8px] flex items-center justify-center
     cursor-pointer text-white-main-color
     hover:bg-[#2663a0]
     '
    onClick={onFunc}>
        {buttonText}
    </button>
  )
}

export default Button;