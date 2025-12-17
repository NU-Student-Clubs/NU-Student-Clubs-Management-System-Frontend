import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clubs-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-white p-8">
      <h1 class="text-3xl font-bold text-slate-900">Clubs Management</h1>
      <p class="mt-2 text-slate-600">Create and manage student clubs</p>
    </div>
  `,
})
export class ClubsManagementComponent {}
