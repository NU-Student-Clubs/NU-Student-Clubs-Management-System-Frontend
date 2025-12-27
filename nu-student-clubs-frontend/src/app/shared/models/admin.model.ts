export interface Admin {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profilePicture?: string;
  active: boolean;
  department?: string;
  adminLevel?: string;
  canManageAdmins: boolean;
  canManageApplications: boolean;
  canManageClubs: boolean;
  roles: string[];
  createdAt: number;
  updatedAt: number;
}

export interface AdminResponse {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profilePicture?: string;
  active: boolean;
  department?: string;
  adminLevel?: string;
  canManageAdmins: boolean;
  canManageApplications: boolean;
  canManageClubs: boolean;
  roles: string[];
  createdAt: number;
  updatedAt: number;
}

export interface CreateAdminRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  department?: string;
  adminLevel?: string;
  permissions?: string[];
}

export interface UpdateAdminRequest {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  department?: string;
  adminLevel?: string;
  permissions?: string[];
}
