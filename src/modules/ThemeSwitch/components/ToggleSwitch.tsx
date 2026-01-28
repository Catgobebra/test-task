import * as React from 'react'
import { observer } from 'mobx-react-lite'
import ThemeStore from '../stores/theme-store'
import sunIcon from '../../../assets/sun.svg'
import moonIcon from '../../../assets/Moon.svg'

const ToggleSwitch = observer(() => {
  return (
    <label className="relative inline-block w-13.75 h-6.5">
        <input type="checkbox" checked={ThemeStore.isDark} onChange={() => ThemeStore.toggle()}  className="peer opacity-0 w-0 h-0" />
        <span className="absolute cursor-pointer inset-0 bg-[#155DA4] transition-[.4s] rounded-full before:content-[''] before:absolute before:h-5 before:w-5 before:left-0.75 before:bottom-0.75  before:bg-white before:transition-[.4s] before:rounded-full peer-checked:before:translate-x-7.25 shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)]"/>
        <div className='absolute left-0.25 top-0.25 w-6 h-6 bg-no-repeat bg-center bg-contain transition-[.4s] pointer-events-none select-none peer-checked:translate-x-7.25'
        style={{ backgroundImage: `url("${ThemeStore.isDark ? moonIcon : sunIcon}")`,
        backgroundSize: '60%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'}} />
    </label>
  );
})

export default ToggleSwitch;