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
  Page?: number;
  Count?: number;
  Name?: string;
  Gender?: 'Male' | 'Female' | ('Male' | 'Female')[];
  Position?: string | string[];
  Stack?: string | string[];
}