import { useInfiniteQuery } from "@tanstack/react-query"
import type { EmployeeDetail } from "../../../types/employee"
import { fetchEmployeeList } from "../api/employee"
import { PAGE_SIZE, TIME_CACHE } from "../constant/constants"

interface useEmployeesQueryProps {
  name ?: string
}

export const useEmployeesQuery = ({name} : useEmployeesQueryProps = {}) => {
    return useInfiniteQuery<EmployeeDetail[],
     Error,
     EmployeeDetail[],
     ['employees',string | undefined],
     number>({
      queryKey: ['employees',name],
      queryFn: async ({ pageParam = 1 } : {pageParam : number}) => {
        const employees = await fetchEmployeeList({
          Page: pageParam,
          Count: PAGE_SIZE,
          Name: name,
        })
        return employees
      },
      staleTime: 1000 * TIME_CACHE,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < PAGE_SIZE) {
          return undefined
        }
      return allPages.length + 1
    },
    select: (infiniteData) => infiniteData.pages.flat()
  })
}