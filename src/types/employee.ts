export interface EmployeeDetail {
  id: number
  name: string
  gender: string
  position: string
  photo: string
  phone: string
  birthdate: string
  dateOfEmployment: string
  stack: string[]
}

export interface EmployeeListParams {
  Page?: number
  Count?: number
  Name?: string
  Gender?: string | string[]
  Position?: string | string[]
  Stack?: string | string[]
}

export interface EmployeeListParams {
  Page?: number
  Count?: number
  Name?: string
  Gender?: string | string[]
  Position?: string | string[]
  Stack?: string | string[]
}

export interface Filter {
  label: string
  value: string
  type: 'position' | 'gender' | 'stack'
}

export interface FiltersState {
  name: string | undefined;
  gender: string[];
  position: string[];
  stack: string[];
}