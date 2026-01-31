import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import EmployeeListPageContent from '../EmployeeListPageContent/EmployeeListPageContent';
import Header from '../../../../components/Header/Header/Header';
import Loading from '../../../../ui/Loading';
import Error from '../../../../ui/Error';
import type { EmployeeDetail } from '../../../../types/employee';
import { fetchEmployeeList } from '../../api/employee';

function EmployeeListPage() {
 const {data : employees, isLoading, isError, error} = useQuery<EmployeeDetail[],Error>({
      queryFn : () => fetchEmployeeList(),
      queryKey: ['employees'],
  })

  return (
    <>
    <Header />
    {isLoading && <Loading LoadingText="Загрузка списка сотрудников..." />}
    {isError && <Error errorMessage={error?.message} ErrorText="Не удалось загрузить" />}
    {!isLoading && !isError && employees && <EmployeeListPageContent employees={employees} />} 
    </>
  )
}

export default EmployeeListPage;