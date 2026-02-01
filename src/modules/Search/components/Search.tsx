import * as React from 'react'
import { observer } from 'mobx-react-lite';
import SearchStore from '../stores/search-store'
const Search = observer(() => {

    return (
        <input className='p-[10px] w-full h-[34px] md:h-[43px] text-[#b0b0b0] text-[12px] md:text-[20px] rounded-[5px]
         border-[0.50px] outline-none border-[#b0b0b0]
         focus:border-[#155da4]' type="text"
         name="input" 
         placeholder='Поиск'
         onChange={(e) => SearchStore.setSearch(e.target.value)}
         value={SearchStore.search}/>
    )
})

export default Search;