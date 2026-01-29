import * as React from 'react'
import { ToggleSwitch } from '../../../modules/ThemeSwitch'
import Logo from '../../../assets/Логотип 66бит 1.svg'

function Header() {
  return (
    <header className='w-full shadow-lg shadow-[#main-bg-dark]-500/50'>
      <div className='container mx-auto px-6 md:px-3 h-13.5 md:h-22.5 flex justify-between items-center'>
        <img
          src={Logo} 
          className='w-20 md:w-25.25 h-auto' 
          alt="Logo" 
        />   
        <div className='flex items-center gap-4 md:gap-12'>
            <ul className='hidden sm:flex text-right  text-lg gap-16 lining-nums'>
                <li>+7 343 290 84 76</li>
                <li>info@66bit.ru</li>
            </ul>
            
            <ToggleSwitch />
        </div>
      </div>
    </header>
  )
}

export default Header;