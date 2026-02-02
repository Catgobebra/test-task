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
    if (params.Stack && Array.isArray(params.Stack) && params.Stack.length > 0) {
        params.Stack.forEach(pos => {
        query.append('Stack', pos.trim()); 
        });
    }
    if (params.Gender && Array.isArray(params.Gender) && params.Gender.length > 0) {
        params.Gender.forEach(pos => {
        query.append('Gender', pos.trim()); 
        });
    }
    if (params.Position && Array.isArray(params.Position) && params.Position.length > 0) {
        params.Position.forEach(pos => {
        query.append('Position', pos.trim()); 
        });
    }

    const res = await fetch(`${BASE}?${query.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch employee details')
    return res.json()
}