import { useInfiniteQuery } from "@tanstack/react-query"
import type { EmployeeDetail } from "../../../types/employee"
import { fetchEmployeeList } from "../api/employee"
import { PAGE_SIZE, TIME_CACHE } from "../constant/constants"

interface useEmployeesQueryProps {
  name ?: string
  gender ?: string[]
  position ?: string[]
  stack ?: string[]
}

export const useEmployeesQuery = ({name, gender, position, stack} : useEmployeesQueryProps = {}) => {
    return useInfiniteQuery<EmployeeDetail[],
     Error,
     EmployeeDetail[],
     ['employees',string | undefined,string[] | undefined,string[] | undefined,string[] | undefined],
     number>({
      queryKey: ['employees',name, gender, position, stack],
      queryFn: async ({ pageParam = 1 } : {pageParam : number}) => {
        const employees = await fetchEmployeeList({
          Page: pageParam,
          Count: PAGE_SIZE,
          Name: name,
          Gender : gender,
          Position : position,
          Stack : stack
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