import * as React from 'react'
import Breadcrumbs from '../../../../ui/Breadcrumbs';
import Badge from '../../../../ui/Badge';
import type { EmployeeDetail } from '../../../../types/employee';
import { formatDate } from '../../helpers/formatDate';

interface EmployeeDetailContentProps {
    employee : EmployeeDetail
}

function EmployeeDetailContent({employee} : EmployeeDetailContentProps) {
  return (
    <main className='container mx-auto px-6'>
      <div className='h-11 md:h-19.25 flex items-center'>
        <Breadcrumbs pageList={['Главная', 'Список сотрудников',employee.name]} />
      </div>
      <div className='flex flex-col gap-4 mt-4 '>
        <div className='flex items-center flex-wrap gap-4 md:gap-10.5 mt-4 '>
          <img
          src={employee.photo}
          className='h-25 w-25 md:h-40.75 md:w-40.75 rounded-full object-cover'
          alt="Фото сотрудника" />
          <div className='h-auto w-[120px] md:h-38.5 md:w-163.75 leading-none'>
            <h1 className='font-bold text-[20px] md:text-[40px]'>{employee.name}</h1>
            <p className='text-[14px] md:text-[24px] mt-4 md:h-[28px] font-medium'>{employee.position}</p>
            <div className='mt-6 flex gap-4 hidden md:flex'>
              {employee.stack.map((stack : string, index : number) => 
                <Badge key={index} badgeText={stack} variant="v2" />
              )}
            </div>
          </div>
        </div>
        <div className='flex gap-2 md:hidden'>
            {employee.stack.map((stack, index) => 
              <Badge key={index} badgeText={stack} variant="v2" />
            )}
        </div>
      </div>
      <hr className='max-[650px]:-mx-6 text-[#f2f2f2] md:dark:text-[#3E3E3E] mt-5 md:mt-10' />
      <div className='mt-5 md:mt-10'>
        <p className='text-[16px] md:text-[32px] font-semibold'>Основная информация</p>
        <dl className='grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 text-[14px] md:text-[24px] mt-4 md:mt-8'>
          <dt className='font-medium whitespace-nowrap'>Контактный телефон:</dt>
          <dd className="whitespace-nowrap">{employee.phone}</dd>
          <dt className='font-medium'>Дата рождения:</dt>
          <dd>{formatDate(employee.birthdate)}</dd>
          <dt className='font-medium'>Дата устройства:</dt>
          <dd>{formatDate(employee.dateOfEmployment)}</dd>
        </dl>   
      </div>
    </main>
  )
}

export default EmployeeDetailContent;