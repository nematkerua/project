// Define all employee-related types
export interface Employee {
  id?: number;
  name: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export type EmployeeFormData = {
  name: string;
  role: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

export const EMPLOYEE_ROLES = [
  'Developer',
  'Designer',
  'Manager'
] as const;

export type EmployeeRole = typeof EMPLOYEE_ROLES[number];