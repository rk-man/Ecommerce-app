export type type_user = {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
} | null;

export type type_authUser = {
  user: type_user;
  success: boolean;
  error: boolean;
  message: string;
};
