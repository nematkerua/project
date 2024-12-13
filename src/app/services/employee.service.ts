import { Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee.model';
import { IndexDBService } from './indexdb.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees = signal<Employee[]>([]);

  constructor(private indexDBService: IndexDBService) {
    this.loadEmployees();
  }

  async loadEmployees() {
    const employees = await this.indexDBService.getAllEmployees();
    this.employees.set(employees);
  }

  async addEmployee(employee: Employee) {
    const newEmployee = await this.indexDBService.addEmployee(employee);
    this.employees.update(employees => [...employees, newEmployee]);
  }

  async updateEmployee(employee: Employee) {
    await this.indexDBService.updateEmployee(employee);
    this.employees.update(employees =>
      employees.map(e => (e.id === employee.id ? employee : e))
    );
  }

  async deleteEmployee(id: number) {
    await this.indexDBService.deleteEmployee(id);
    this.employees.update(employees => 
      employees.filter(e => e.id !== id)
    );
  }
}