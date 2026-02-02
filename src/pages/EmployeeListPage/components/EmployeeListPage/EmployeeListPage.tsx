import * as React from 'react'
import { useState } from 'react';
import EmployeeListPageContent from '../EmployeeListPageContent/EmployeeListPageContent';
import Header from '../../../../components/Header/Header/Header';
import Loading from '../../../../ui/Loading';
import Error from '../../../../ui/Error';
import { useEmployeesQuery } from '../../hooks/useEmployeesQuery';
import { observer } from 'mobx-react-lite';
import {SearchStore} from '../../../../modules/Search'
import Breadcrumbs from '../../../../ui/Breadcrumbs';
import {Search} from '../../../../modules/Search';
import {MultiSelectMinimal} from '../../../../modules/Select'
import { GENDER, POSITION, STACK } from '../../constant/constants';
import Button from '../../../../ui/Button';
import filterStore from '../../../../modules/Select/stores/filter-store';
import Badge from '../../../../ui/Badge';
import type { FiltersState } from '../../../../types/employee';

const EmployeeListPage = observer(() => {
  const currentName = SearchStore.debouncedQuery
  const currentGender = filterStore.getFilterValues('gender')
  const currentPosition = filterStore.getFilterValues('position')
  const currentStack = filterStore.getFilterValues('stack')

  const [appliedFilters, setAppliedFilters] = useState<FiltersState>({
    name: undefined,
    gender: [],
    position: [],
    stack: [],
  })

  const handleApply = () => {
    setAppliedFilters({
      name: currentName || undefined,
      gender: currentGender,
      position: currentPosition,
      stack: currentStack,
    });
  }

  const {data : allEmployees = [],
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage} = useEmployeesQuery(appliedFilters)

  return (
    <>
    <Header />
    <div className='container mx-auto px-6 flex flex-col'>
      <div className='h-11 md:h-19.25 flex items-center px-3'><Breadcrumbs pageList={['Главная', 'Список сотрудников']} /></div>
      <p className='w-full flex justify-between items-center px-3 text-[20px] md:text-[40px] font-bold md:hidden'>Список сотрудников</p>
      <div className='w-full flex justify-between items-center px-3 order-4 mt-6 md:mt-0 md:0'>
        <p className='text-[20px] md:text-[40px] font-bold hidden md:block'>Список сотрудников</p>
        <div className='flex gap-[19px] md:gap-[32px] text-nowrap md:text-wrap'>
          <MultiSelectMinimal
      options={POSITION}
      value={filterStore.positions}
      name={"Должность"}
      onChange={filterStore.togglePosition}
       />
       <MultiSelectMinimal
      options={GENDER}
      value={filterStore.genders}
      name={"Пол"}
      onChange={filterStore.toggleGender}
       />
       <MultiSelectMinimal
      options={STACK}
      value={filterStore.stack}
      name={"Стек технологий"}
      onChange={filterStore.toggleStack}
       />
        </div>
      </div>
      <div className='px-3 mt-[28px]'><Search /></div>
    </div>
    <div className='mt-[28px] py-2 md:py-0 bg-[#3e3e3e] h-full min-h-[138px] md:min-h-[71px] flex items-center'>
      <div className='container h-full mx-auto px-9 flex flex-col gap-1 md:gap-0
       md:flex-row items-center justify-between flex-wrap'>
        <div className='flex flex-wrap gap-[16px] md:gap-[40px] items-center'>
          <p className='text-[14px] md:text-[20px]'>Выбранные фильтры: </p>
          <div className='flex gap-[16px] md:gap-[24px] flex-wrap'>
            {filterStore.AllFilter.map((element, index) => {
            return (<Badge key={index} onDelete={() => filterStore.removeFilter(element)} badgeText={element.label} />)
            })}
          </div>
        </div>
        <Button buttonText={'Найти'} onFunc={handleApply} />
      </div>
    </div>
    {isLoading && <Loading LoadingText="Загрузка списка сотрудников..." />}
    {isError && <Error errorMessage={error?.message} ErrorText="Не удалось загрузить" />}
    {!isLoading && allEmployees.length === 0 && <div className="text-center py-10">Сотрудники не найдены</div>}
    {!isLoading && !isError && allEmployees.length > 0 && <EmployeeListPageContent 
    fetchNextPage={fetchNextPage}
    hasNextPage={hasNextPage}
    isFetchingNextPage={isFetchingNextPage}
    employees={allEmployees}
     />} 
    </>
  )
})

export default EmployeeListPage
