import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Employee } from '../../types/employee.types';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white p-4 rounded shadow">
      <h3 class="text-lg font-semibold">{{employee.name}}</h3>
      <p class="text-gray-600">{{employee.role}}</p>
      <p class="text-sm text-gray-500">
        Started: {{employee.startDate | date}}
      </p>
      <div class="mt-4 flex justify-end gap-2">
        <button 
          class="text-blue-500"
          [routerLink]="['/edit', employee.id]">
          Edit
        </button>
        <button 
          class="text-red-500"
          (click)="onDelete.emit(employee.id)">
          Delete
        </button>
      </div>
    </div>
  `
})
export class EmployeeCardComponent {
  @Input({ required: true }) employee!: Employee;
  @Output() onDelete = new EventEmitter<number>();
}