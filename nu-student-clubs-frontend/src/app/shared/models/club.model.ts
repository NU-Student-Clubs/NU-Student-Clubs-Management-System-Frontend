// Backend Response Model
export interface Club {
  id: number;
  name: string;
  description: string;
  president: string;
  email: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

// DTO for creating/updating clubs
export interface ClubRequest {
  name: string;
  description?: string;
  president: string;
  email: string;
  category: string;
}

export interface ClubResponse extends Club {}

// For filtering
export interface ClubFilters {
  category?: string;
  searchQuery?: string;
}
