export interface LoginResponse {
  data: {
    userId: number;
    token: string;
  };
  message: string;
  status: boolean;
}
