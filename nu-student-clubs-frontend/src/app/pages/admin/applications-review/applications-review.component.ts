import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applications-review',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-white p-8">
      <h1 class="text-3xl font-bold text-slate-900">Applications Review</h1>
      <p class="mt-2 text-slate-600">Review and approve club membership applications</p>
    </div>
  `,
})
export class ApplicationsReviewComponent {}
