import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee, EMPLOYEE_ROLES, EmployeeFormData } from '../../types/employee.types';
import { formatDateForInput, parseInputDate } from '../../utils/date.utils';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h2 class="text-2xl font-bold mb-6">
          {{isEditing ? 'Edit' : 'Add'}} Employee Details
        </h2>

        <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              formControlName="name" placeholder="Employee Name"
              class="w-full px-3 py-2 border rounded">
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Role</label>
            <select 
              formControlName="role" placeholder="Select Role"
              class="w-full px-3 py-2 border rounded">
              <option value="" >Select Role</option>
              <option  *ngFor="let role of roles" [value]="role">
                {{role}}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Start Date</label>
            <input 
              type="date"  placeholder="Start Date"
              formControlName="startDate"
              class="w-full px-3 py-2 border rounded">
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-2">End Date</label>
            <input 
              type="date" 
              formControlName="endDate" placeholder="End Date"
              class="w-full px-3 py-2 border rounded">
          </div>

          <div class="flex justify-end gap-2">
            <button 
              type="button"
              class="px-4 py-2 text-gray-600"
              (click)="cancelButton()">
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded"
              [disabled]="employeeForm.invalid">
              {{isEditing ? 'Update' : 'Add'}} Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class EmployeeFormComponent {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isEditing = false;
  employeeId?: number;
  roles = EMPLOYEE_ROLES;

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: [''],
    isActive: [true]
  });

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.employeeId = +id;
      const employee = this.employeeService.employees()
        .find(e => e.id === this.employeeId);
      if (employee) {
        this.employeeForm.patchValue({
          name: employee.name,
          role: employee.role,
          startDate: formatDateForInput(employee.startDate),
          endDate: employee.endDate ? formatDateForInput(employee.endDate) : '',
          isActive: employee.isActive
        });
      }
    }
  }

  async onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value as EmployeeFormData;
      
      const employeeData: Employee = {
        name: formValue.name,
        role: formValue.role,
        startDate: parseInputDate(formValue.startDate),
        endDate: formValue.endDate ? parseInputDate(formValue.endDate) : undefined,
        isActive: formValue.isActive
      };

      if (this.isEditing && this.employeeId) {
        await this.employeeService.updateEmployee({
          ...employeeData,
          id: this.employeeId
        });
      } else {
        await this.employeeService.addEmployee(employeeData);
      }

      this.router.navigate(['/']);
    }
  }

  cancelButton(){
    this.router.navigate(['/']);
  }
}