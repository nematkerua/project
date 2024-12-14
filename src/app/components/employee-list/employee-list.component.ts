import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeCardComponent } from './employee-card.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, EmployeeCardComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Employee List</h1>
        <button 
          class="bg-blue-500 text-white px-4 py-2 rounded"
          routerLink="/add">
          Add Employee
        </button>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <app-employee-card
          *ngFor="let employee of activeEmployees()"
          [employee]="employee"
          (onDelete)="deleteEmployee($event)">
        </app-employee-card>
      </div>
    </div>
  `
})
export class EmployeeListComponent {
  private employeeService = inject(EmployeeService);
  
  activeEmployees = computed(() => 
    this.employeeService.employees().filter(e => e.isActive)
  );

  async deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      await this.employeeService.deleteEmployee(id);
    }
  }
}