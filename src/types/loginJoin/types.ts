export type SignUp = {
  userId?: string;
  email: string;
  password?: string;
  nickname?: string;
};

export type JoinApi = {
  email: string;
  password: string;
};
