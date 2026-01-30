import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchEmployeeDetails } from '../../api/employee';
import type { EmployeeDetail } from '../../../../types/employee';
import Header from '../../../../components/Header/Header/Header';
import EmployeeDetailContent from '../EmployeeDetailContent/EmployeeDetailContent';
import Loading from '../../../../ui/Loading';
import Error from '../../../../ui/Error';

function EmployeeDetailPage() {
  const { id } = useParams()
  const employeeId = Number(id) 

  const {data : employee, isLoading, isError, error} = useQuery<EmployeeDetail,Error>({
      queryFn : () => fetchEmployeeDetails(employeeId),
      queryKey: ['employee',employeeId],
      enabled: !Number.isNaN(employeeId),
  })

  return (
    <>
    <Header />
    {isLoading && <Loading LoadingText="Загрузка сотрудника..." />}
    {isError && <Error errorMessage={error?.message} ErrorText="Не удалось загрузить" />}
    {Number.isNaN(employeeId) && <Error errorMessage="Некорректный ID сотрудника" ErrorText="Ошибка" />}
    {!isLoading && !isError && employee && <EmployeeDetailContent employee={employee} />}
    </>
  )
}

export default EmployeeDetailPage;