import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Club, ClubResponse, ClubRequest } from '../../shared/models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  // Mock data for testing when backend is unavailable
  private mockClubs: Club[] = [
    {
      id: 1,
      name: 'Tech Club',
      description: 'A club for technology enthusiasts interested in programming, web development, and AI.',
      president: 'Ahmed Hassan',
      email: 'tech@nu.edu.eg',
      category: 'Technology',
      createdAt: '2024-01-15',
      updatedAt: '2024-12-19'
    },
    {
      id: 2,
      name: 'Arts & Culture',
      description: 'Celebrate diverse cultures through art, music, and traditional performances.',
      president: 'Layla Mohamed',
      email: 'arts@nu.edu.eg',
      category: 'Arts',
      createdAt: '2024-02-10',
      updatedAt: '2024-12-19'
    },
    {
      id: 3,
      name: 'Sports League',
      description: 'Join us for various sports activities, competitions, and team building events.',
      president: 'Omar Khalil',
      email: 'sports@nu.edu.eg',
      category: 'Sports',
      createdAt: '2024-01-20',
      updatedAt: '2024-12-19'
    },
    {
      id: 4,
      name: 'Debate Society',
      description: 'Develop public speaking and critical thinking skills through engaging debates.',
      president: 'Nour Saad',
      email: 'debate@nu.edu.eg',
      category: 'Academic',
      createdAt: '2024-03-05',
      updatedAt: '2024-12-19'
    },
    {
      id: 5,
      name: 'Environmental Club',
      description: 'Work towards sustainability and environmental conservation through projects and awareness.',
      president: 'Sara Ahmed',
      email: 'environment@nu.edu.eg',
      category: 'Environmental',
      createdAt: '2024-02-28',
      updatedAt: '2024-12-19'
    },
    {
      id: 6,
      name: 'Business Club',
      description: 'Network, learn business skills, and explore entrepreneurship opportunities.',
      president: 'Karim Ali',
      email: 'business@nu.edu.eg',
      category: 'Business',
      createdAt: '2024-01-10',
      updatedAt: '2024-12-19'
    }
  ];

  constructor(private api: ApiService) { }

  // GET /clubs - Get all clubs with pagination
  getAllClubs(page: number = 0, size: number = 10): Observable<any> {
    return this.api.get<any>(`/clubs?page=${page}&size=${size}`).pipe(
      catchError(err => {
        console.warn('Backend unavailable, using mock data');
        return of({
          content: this.mockClubs.slice(page * size, (page + 1) * size),
          totalElements: this.mockClubs.length,
          totalPages: Math.ceil(this.mockClubs.length / size),
          currentPage: page
        });
      })
    );
  }

  // GET /clubs/{id} - Get club by ID
  getClubById(id: number): Observable<ClubResponse> {
    return this.api.get<ClubResponse>(`/clubs/${id}`).pipe(
      catchError(err => {
        const club = this.mockClubs.find(c => c.id === id);
        if (club) {
          return of(club as ClubResponse);
        }
        return throwError(() => new Error('Club not found'));
      })
    );
  }

  // GET /clubs/search?name=X - Search clubs by name
  searchClubsByName(name: string): Observable<ClubResponse[]> {
    return this.api.get<ClubResponse[]>(`/clubs/search?name=${name}`).pipe(
      catchError(err => {
        const filtered = this.mockClubs.filter(c => 
          c.name.toLowerCase().includes(name.toLowerCase())
        );
        return of(filtered as ClubResponse[]);
      })
    );
  }

  // GET /clubs/category?category=X - Get clubs by category
  getClubsByCategory(category: string): Observable<ClubResponse[]> {
    return this.api.get<ClubResponse[]>(`/clubs/category?category=${category}`).pipe(
      catchError(err => {
        const filtered = this.mockClubs.filter(c => c.category === category);
        return of(filtered as ClubResponse[]);
      })
    );
  }

  // POST /clubs - Create new club (admin only)
  createClub(club: ClubRequest): Observable<ClubResponse> {
    return this.api.post<ClubResponse>('/clubs', club);
  }

  // PUT /clubs/{id} - Update club (admin only)
  updateClub(id: number, club: ClubRequest): Observable<ClubResponse> {
    return this.api.put<ClubResponse>(`/clubs/${id}`, club);
  }

  // DELETE /clubs/{id} - Delete club (admin only)
  deleteClub(id: number): Observable<void> {
    return this.api.delete<void>(`/clubs/${id}`);
  }
}
