import  type {EmployeeListParams}  from "../../../types/employee"
const BASE = 'https://frontend-test-api.stk8s.66bit.ru/api/Employee'

export async function fetchEmployeeList(params: EmployeeListParams = {}) {
    const query = new URLSearchParams()
    query.set('Page', String(params.Page ?? 1))
    if (params.Count !== undefined) {
        query.set('Count', String(params.Count));
    }
    if (params.Name?.trim()) {
        query.set('Name', params.Name.trim());
    }

    const res = await fetch(`${BASE}?${query.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch employee details')
    return res.json()
}