export interface IUser {
  email: string
  password: string
}

export const usersDb: IUser[] = [
  {
    email: 'pelle@yahoo.com',
    password: 'grillkorv',
  },
  {
    email: 'emma@yahoo.com',
    password: 'bananpaj',
  },
  {
    email: 'renzo@yahoo.com',
    password: 'paco',
  },
]
