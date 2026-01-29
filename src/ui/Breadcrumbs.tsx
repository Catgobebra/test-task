import * as React from 'react'
interface BreadcrumbsProps{
    pageList : string[]
}
function Breadcrumbs({pageList} : BreadcrumbsProps) {
  return (
    <ul className="text-[#b0b0b0] flex text-[12px] md:text-[18px]
     font-medium max-w-full  overflow-hidden">
        {pageList.map((page,index) =>
          {
            const isFirst = index === 0;
            const isLast = index === pageList.length - 1;
            return(<li key={index} 
              className={`${isFirst ? 'hidden md:flex' : ''} flex items-center min-w-0 ${!isLast ? 'shrink-0' : 'flex-1'}`}
              >
                <span className={isLast ? 'truncate max-w-45 md:max-w-75' : ''}>
                    {isLast && window.innerWidth < 300 ? '…' : page}
                </span>

                {!isLast && (
                    <span className="mx-3 md:mx-2 text-[12px] md:text-[18px] font-bold shrink-0">
                        &gt;
                    </span>
                )}
              </li>)
          }
        )}
    </ul>
  )
}

export default Breadcrumbs;