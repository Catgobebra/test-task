const BASE = 'https://frontend-test-api.stk8s.66bit.ru/api/Employee'

export async function fetchEmployeeDetails(id : number) {
    const res = await fetch(`${BASE}/${id}`)
    if (!res.ok) throw new Error('Failed to fetch employee details')
    return res.json()
}