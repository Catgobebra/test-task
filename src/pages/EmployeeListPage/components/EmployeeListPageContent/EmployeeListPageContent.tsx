import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import type { EmployeeDetail } from '../../../../types/employee';
import formatDate from '../../helpers/formatDate';
import {useEffect, useRef } from 'react';

interface EmployeeListPageContentProps {
  employees: EmployeeDetail[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

function EmployeeListPageContent({employees,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
} : EmployeeListPageContentProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

    useEffect(() => {
    const loaderElement = loaderRef.current
    if (!loaderElement || !hasNextPage || isFetchingNextPage) {
        return
    }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    {
      root: null,
      rootMargin: '10px 0px',
      threshold: 0.1,
    }
  )

    observer.observe(loaderElement)

    return () => {
        observer.unobserve(loaderElement)
        observer.disconnect()
    }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <main className='container mx-auto px-6'>
        <div className='pb-[20px] '>
            <table className='w-full text-left'>
                <thead className='text-[10px] md:text-[20px]'>
                    <tr className='[&>th]:py-[12px] md:[&>th]:py-[26px] [&>th]:px-[12px] text-[#b0b0b0] [&>th]:font-medium md:align-top'>
                    <th scope="col">ФИО</th>
                    <th scope="col">Должность</th>
                    <th scope="col">Телефон</th>
                    <th scope="col">Дата рождения</th>
                    </tr>
                </thead>
                <tbody className='text-[12px] md:text-[20px]'>
                    {employees?.map((employee) => {
                        return(
                        <tr key={employee.id}  className='hover:bg-[#f2f2f2] hover:dark:bg-[#3e3e3e] border-b border-b-[#f2f2f2] [&>td]:py-[12px] md:[&>td]:py-6.5 [&>td]:px-3 hover:border-b-transparent
                         hover:border-t-transparent first:border-t first:border-t-[#f2f2f2] transition-colors duration-150
                         cursor-pointer align-top'
                        onClick={() => navigate(`/employees/${employee.id}`)}>
                        <td className=''>{employee.name}</td>
                        <td className=''>{employee.position}</td>
                        <td className='whitespace-nowrap'>{employee.phone}</td>
                        <td className=''>{formatDate(employee.birthdate)}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div ref={loaderRef} className='text-center text-xl pt-[10px] min-h-[1px]'>{isFetchingNextPage && <span>Загрузка...</span>}</div>
        </div>
    </main>
  )
}

export default EmployeeListPageContent