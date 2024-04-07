export type SignUp = {
  userId?: string;
  email: string;
  password?: string;
  nickname?: string;
  userType?: number;
};

export type JoinApi = {
  email: string;
  password: string;
};

export type SignIn = {
  userId?: string;
  email: string;
  password?: string;
  nickname?: string | null | undefined;
  userType?: number;
};
