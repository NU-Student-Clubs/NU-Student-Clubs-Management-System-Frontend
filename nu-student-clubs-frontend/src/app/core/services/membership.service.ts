import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Membership, MembershipResponse, MembershipRequest } from '../../shared/models/membership.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  // Mock data for testing
  private mockMemberships: Membership[] = [
    {
      id: 1,
      userId: 1,
      clubId: 1,
      joinedAt: '2024-09-15T10:30:00'
    },
    {
      id: 2,
      userId: 1,
      clubId: 3,
      joinedAt: '2024-10-20T14:45:00'
    },
    {
      id: 3,
      userId: 1,
      clubId: 5,
      joinedAt: '2024-11-05T09:15:00'
    }
  ];

  constructor(private api: ApiService) { }

  // GET /applications - Get all memberships
  getAllMemberships(): Observable<MembershipResponse[]> {
    return this.api.get<MembershipResponse[]>('/applications').pipe(
      catchError(err => {
        console.warn('Backend unavailable, using mock data');
        return of(this.mockMemberships as MembershipResponse[]);
      })
    );
  }

  // GET /applications/{id} - Get membership by ID
  getMembershipById(id: number): Observable<MembershipResponse> {
    return this.api.get<MembershipResponse>(`/applications/${id}`).pipe(
      catchError(err => {
        const membership = this.mockMemberships.find(m => m.id === id);
        if (membership) {
          return of(membership as MembershipResponse);
        }
        return throwError(() => new Error('Membership not found'));
      })
    );
  }

  // POST /applications - Create new membership application
  applyForMembership(request: MembershipRequest): Observable<MembershipResponse> {
    return this.api.post<MembershipResponse>('/applications', request).pipe(
      catchError(err => {
        // Mock: create membership in memory
        const newMembership: Membership = {
          id: Math.max(...this.mockMemberships.map(m => m.id), 0) + 1,
          userId: request.userId,
          clubId: request.clubId,
          joinedAt: new Date().toISOString()
        };
        this.mockMemberships.push(newMembership);
        return of(newMembership as MembershipResponse);
      })
    );
  }

  // DELETE /applications/{id} - Delete membership (withdraw application)
  deleteMembership(id: number): Observable<void> {
    return this.api.delete<void>(`/applications/${id}`).pipe(
      catchError(err => {
        // Mock: remove from memory
        const index = this.mockMemberships.findIndex(m => m.id === id);
        if (index > -1) {
          this.mockMemberships.splice(index, 1);
          return of(void 0);
        }
        return throwError(() => new Error('Membership not found'));
      })
    );
  }

  // Get user's memberships (filter by userId on frontend)
  getMyMemberships(userId: number): Observable<MembershipResponse[]> {
    return this.getAllMemberships().pipe(
      catchError(err => of([]))
    );
  }
}
