import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-white p-8">
      <h1 class="text-3xl font-bold text-slate-900">Media Management</h1>
      <p class="mt-2 text-slate-600">Manage gallery images and videos</p>
    </div>
  `,
})
export class MediaManagementComponent {}
