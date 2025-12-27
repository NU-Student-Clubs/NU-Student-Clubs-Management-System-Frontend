import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../../core/services/admin.service';
import { BoardMemberService } from '../../../core/services/board-member.service';
import { CommitteeService } from '../../../core/services/committee.service';
import { AdminResponse } from '../../../shared/models/admin.model';
import { BoardMemberResponse } from '../../../shared/models/board-member.model';
import { CommitteeResponse } from '../../../shared/models/committee.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  activeTab: 'overview' | 'admins' | 'board-members' | 'committees' = 'overview';
  
  admins: AdminResponse[] = [];
  boardMembers: BoardMemberResponse[] = [];
  committees: CommitteeResponse[] = [];
  
  loading = false;
  error: string | null = null;
  success: string | null = null;

  // simple form state for add actions
  showAddAdmin = false;
  showAddBoardMember = false;
  showAddCommittee = false;

  editingAdminId: number | null = null;
  editingBoardMemberId: number | null = null;
  editingCommitteeId: number | null = null;

  adminForm = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    department: '',
    adminLevel: '',
    permissions: '' // comma separated
  };

  // Edit form for admin (without email and password)
  adminEditForm = {
    firstName: '',
    lastName: '',
    department: '',
    adminLevel: ''
  };

  boardMemberForm = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    clubId: '',
    position: '',
    joinDate: '',
    season: new Date().getFullYear().toString()
  };

  committeeForm = {
    name: '',
    clubId: '',
    description: '',
    headId: ''
  };

  stats = {
    totalAdmins: 0,
    totalBoardMembers: 0,
    totalCommittees: 0,
    activeBoardMembers: 0
  };

  currentYear = new Date().getFullYear();

  constructor(
    private adminService: AdminService,
    private boardMemberService: BoardMemberService,
    private committeeService: CommitteeService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = null;

    this.adminService.getAllAdmins().subscribe({
      next: (data: AdminResponse[]) => {
        this.admins = data;
        this.stats.totalAdmins = data.length;
      },
      error: (err: any) => {
        this.error = 'Failed to load admins';
        console.error(err);
      }
    });

    this.boardMemberService.getAllBoardMembers().subscribe({
      next: (data: BoardMemberResponse[]) => {
        this.boardMembers = data;
        this.stats.totalBoardMembers = data.length;
        this.stats.activeBoardMembers = data.filter(m => m.isActive).length;
      },
      error: (err: any) => {
        this.error = 'Failed to load board members';
        console.error(err);
      }
    });

    this.committeeService.getAllCommittees().subscribe({
      next: (data: CommitteeResponse[]) => {
        this.committees = data;
        this.stats.totalCommittees = data.length;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load committees';
        console.error(err);
        this.loading = false;
      }
    });
  }

  setActiveTab(tab: 'overview' | 'admins' | 'board-members' | 'committees'): void {
    this.activeTab = tab;
  }

  openAddAdmin(): void {
    this.success = null;
    this.showAddAdmin = true;
    this.activeTab = 'admins';
  }

  openAddBoardMember(): void {
    this.success = null;
    this.showAddBoardMember = true;
    this.activeTab = 'board-members';
  }

  openAddCommittee(): void {
    this.success = null;
    this.showAddCommittee = true;
    this.activeTab = 'committees';
  }

  submitAdmin(): void {
    this.error = null;
    this.success = null;

    if (this.editingAdminId) {
      // Edit mode - use adminEditForm without email and password
      const request = {
        firstName: this.adminEditForm.firstName,
        lastName: this.adminEditForm.lastName,
        department: this.adminEditForm.department,
        adminLevel: this.adminEditForm.adminLevel
      };

      this.adminService.updateAdmin(this.editingAdminId.toString(), request as any).subscribe({
        next: (updated) => {
          const index = this.admins.findIndex(a => a.id === this.editingAdminId!);
          if (index >= 0) {
            this.admins = [...this.admins.slice(0, index), updated, ...this.admins.slice(index + 1)];
          }
          this.showAddAdmin = false;
          this.editingAdminId = null;
          this.adminEditForm = { firstName: '', lastName: '', department: '', adminLevel: '' };
          this.success = 'Admin updated successfully';
        },
        error: () => {
          this.error = 'Failed to update admin';
        }
      });
    } else {
      // Create mode - use adminForm with email and password
      const permissionsArray = this.adminForm.permissions
        .split(',')
        .map(p => p.trim())
        .filter(Boolean);

      const request = {
        email: this.adminForm.email,
        password: this.adminForm.password,
        firstName: this.adminForm.firstName,
        lastName: this.adminForm.lastName,
        department: this.adminForm.department,
        adminLevel: this.adminForm.adminLevel,
        permissions: permissionsArray
      };
      this.adminService.createAdmin(request).subscribe({
        next: created => {
          this.showAddAdmin = false;
          this.adminForm = { email: '', password: '', firstName: '', lastName: '', department: '', adminLevel: '', permissions: '' };
          this.admins = [...this.admins, created as any];
          this.stats.totalAdmins = this.admins.length;
          this.success = 'Admin added successfully';
        },
        error: err => {
          this.error = 'Failed to create admin';
          console.error(err);
        }
      });
    }
  }

  editAdmin(admin: any): void {
    this.editingAdminId = admin.id;
    this.adminEditForm = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      department: admin.department || '',
      adminLevel: admin.adminLevel || ''
    };
    this.showAddAdmin = true;
    this.activeTab = 'admins';
    this.success = null;
  }

  deleteAdmin(id: number): void {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.adminService.deleteAdmin(id.toString()).subscribe({
        next: () => {
          this.admins = this.admins.filter((a) => a.id !== id);
          this.stats.totalAdmins = this.admins.length;
          this.success = 'Admin deleted successfully';
        },
        error: () => {
          this.error = 'Failed to delete admin';
        }
      });
    }
  }

  submitBoardMember(): void {
    this.error = null;
    this.success = null;
    const request = {
      email: this.boardMemberForm.email,
      password: this.boardMemberForm.password,
      firstName: this.boardMemberForm.firstName,
      lastName: this.boardMemberForm.lastName,
      position: this.boardMemberForm.position,
      joinDate: this.boardMemberForm.joinDate,
      club: { id: Number(this.boardMemberForm.clubId) }
    };

    if (this.editingBoardMemberId) {
      this.boardMemberService.updateBoardMember(this.editingBoardMemberId.toString(), request as any).subscribe({
        next: (updated) => {
          const index = this.boardMembers.findIndex((m) => m.id === this.editingBoardMemberId!);
          if (index >= 0) {
            this.boardMembers = [...this.boardMembers.slice(0, index), updated, ...this.boardMembers.slice(index + 1)];
          }
          this.showAddBoardMember = false;
          this.editingBoardMemberId = null;
          this.boardMemberForm = { email: '', password: '', firstName: '', lastName: '', clubId: '', position: '', joinDate: '', season: new Date().getFullYear().toString() };
          this.success = 'Board member updated successfully';
        },
        error: () => {
          this.error = 'Failed to update board member';
        }
      });
    } else {
      this.boardMemberService.createBoardMember(request).subscribe({
        next: (created) => {
          this.boardMembers = [...this.boardMembers, created as any];
          this.stats.totalBoardMembers = this.boardMembers.length;
          this.stats.activeBoardMembers = this.boardMembers.filter(m => m.isActive).length;
          this.showAddBoardMember = false;
          this.boardMemberForm = { email: '', password: '', firstName: '', lastName: '', clubId: '', position: '', joinDate: '', season: new Date().getFullYear().toString() };
          this.success = 'Board member added successfully';
        },
        error: () => {
          this.error = 'Failed to create board member';
        }
      });
    }
  }

  editBoardMember(member: any): void {
    this.editingBoardMemberId = member.id;
    this.boardMemberForm = {
      email: member.email,
      password: '',
      firstName: member.firstName,
      lastName: member.lastName,
      clubId: member.clubId || '',
      position: member.position,
      joinDate: member.joinDate,
      season: member.season || new Date().getFullYear().toString()
    };
    this.showAddBoardMember = true;
    this.activeTab = 'board-members';
    this.success = null;
  }

  deleteBoardMember(id: number): void {
    if (confirm('Are you sure you want to delete this board member?')) {
      this.boardMemberService.deleteBoardMember(id.toString()).subscribe({
        next: () => {
          this.boardMembers = this.boardMembers.filter((m) => m.id !== id);
          this.stats.totalBoardMembers = this.boardMembers.length;
          this.stats.activeBoardMembers = this.boardMembers.filter(m => m.isActive).length;
          this.success = 'Board member deleted successfully';
        },
        error: () => {
          this.error = 'Failed to delete board member';
        }
      });
    }
  }

  submitCommittee(): void {
    this.error = null;
    this.success = null;
    const request = {
      name: this.committeeForm.name,
      description: this.committeeForm.description,
      club: { id: Number(this.committeeForm.clubId) },
      headId: this.committeeForm.headId
    };

    if (this.editingCommitteeId) {
      this.committeeService.updateCommittee(this.editingCommitteeId.toString(), request as any).subscribe({
        next: (updated) => {
          const index = this.committees.findIndex((c) => c.id === this.editingCommitteeId!);
          if (index >= 0) {
            this.committees = [...this.committees.slice(0, index), updated, ...this.committees.slice(index + 1)];
          }
          this.showAddCommittee = false;
          this.editingCommitteeId = null;
          this.committeeForm = { name: '', clubId: '', description: '', headId: '' };
          this.success = 'Committee updated successfully';
        },
        error: () => {
          this.error = 'Failed to update committee';
        }
      });
    } else {
      this.committeeService.createCommittee(request).subscribe({
        next: (created) => {
          this.committees = [...this.committees, created as any];
          this.stats.totalCommittees = this.committees.length;
          this.showAddCommittee = false;
          this.committeeForm = { name: '', clubId: '', description: '', headId: '' };
          this.success = 'Committee created successfully';
        },
        error: err => {
          this.error = 'Failed to create committee';
          console.error(err);
        }
      });
    }
  }

  editCommittee(committee: any): void {
    this.editingCommitteeId = committee.id;
    this.committeeForm = {
      name: committee.name,
      clubId: committee.clubId || '',
      description: committee.description,
      headId: committee.headId || ''
    };
    this.showAddCommittee = true;
    this.activeTab = 'committees';
    this.success = null;
  }

  deleteCommittee(id: number): void {
    if (confirm('Are you sure you want to delete this committee?')) {
      this.committeeService.deleteCommittee(id.toString()).subscribe({
        next: () => {
          this.committees = this.committees.filter((c) => c.id !== id);
          this.stats.totalCommittees = this.committees.length;
          this.success = 'Committee deleted successfully';
        },
        error: () => {
          this.error = 'Failed to delete committee';
        }
      });
    }
  }
}
