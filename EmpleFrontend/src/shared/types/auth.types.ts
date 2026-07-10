export type UserRole = "user" | "admin";

export interface CurrentUser {
  id: string;
  descopeId?: string;
  email: string;
  role: UserRole;
}