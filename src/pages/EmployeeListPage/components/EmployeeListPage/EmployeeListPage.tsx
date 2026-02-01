import * as React from 'react'
import EmployeeListPageContent from '../EmployeeListPageContent/EmployeeListPageContent';
import Header from '../../../../components/Header/Header/Header';
import Loading from '../../../../ui/Loading';
import Error from '../../../../ui/Error';
import { useEmployeesQuery } from '../../hooks/useEmployeesQuery';

function EmployeeListPage() {
 const {data : allEmployees = [],
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage} = useEmployeesQuery()

  return (
    <>
    <Header />
    {isLoading && <Loading LoadingText="Загрузка списка сотрудников..." />}
    {isError && <Error errorMessage={error?.message} ErrorText="Не удалось загрузить" />}
    {allEmployees.length === 0 && <div className="text-center py-10">Сотрудники не найдены</div>}
    {!isLoading && !isError && allEmployees.length > 0 && <EmployeeListPageContent 
    fetchNextPage={fetchNextPage}
    hasNextPage={hasNextPage}
    isFetchingNextPage={isFetchingNextPage}
    employees={allEmployees}
     />} 
    </>
  )
}

export default EmployeeListPage
