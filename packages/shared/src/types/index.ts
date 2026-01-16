// Shared types between web and mobile
// These types should match your database schema

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Add your shared types here
// Example:
// export interface Post {
//   id: string;
//   title: string;
//   content: string | null;
//   authorId: string;
//   createdAt: Date;
// }

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
