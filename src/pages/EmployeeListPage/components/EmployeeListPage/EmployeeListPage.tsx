import * as React from 'react'
import EmployeeListPageContent from '../EmployeeListPageContent/EmployeeListPageContent';
import Header from '../../../../components/Header/Header/Header';
import Loading from '../../../../ui/Loading';
import Error from '../../../../ui/Error';
import { useEmployeesQuery } from '../../hooks/useEmployeesQuery';
import { observer } from 'mobx-react-lite';
import {SearchStore} from '../../../../modules/Search'
import Breadcrumbs from '../../../../ui/Breadcrumbs';
import {Search} from '../../../../modules/Search';

const EmployeeListPage = observer(() => {
  const {data : allEmployees = [],
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage} = useEmployeesQuery({name: SearchStore.debouncedQuery})

  return (
    <>
    <Header />
    <div className='container mx-auto px-6'>
      <div className='h-11 md:h-19.25 flex items-center px-3'><Breadcrumbs pageList={['Главная', 'Список сотрудников']} /></div>
      <div className='px-3'><Search /></div>
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
