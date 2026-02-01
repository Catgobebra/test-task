import { useInfiniteQuery } from "@tanstack/react-query"
import type { EmployeeDetail } from "../../../types/employee"
import { fetchEmployeeList } from "../api/employee"
import { PAGE_SIZE } from "../constant/constants"

export const useEmployeesQuery = () => {
    return useInfiniteQuery<EmployeeDetail[], Error, EmployeeDetail[], ['employees'], number>({
      queryKey: ['employees'],
      queryFn: async ({ pageParam = 1 } : {pageParam : number}) => {
        const employees = await fetchEmployeeList({
          Page: pageParam,
          Count: PAGE_SIZE,
        })
        return employees
      },
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