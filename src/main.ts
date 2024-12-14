import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app/app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-blue-500 shadow mb-4">
        <div class="container mx-auto px-4 py-6">
          <h1 class="text-2xl font-bold text-gray-900">
            Employee Management
          </h1>
        </div>
      </header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class App {
  name = 'Employee Management';
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});