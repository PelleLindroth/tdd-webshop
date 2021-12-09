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


export const validateUser = (email: string, password: string) => {
  const user = usersDb.find(user => user.email === email)
  if (user) {
    return user.password === password ? user : null
  } else {
    return null
  }
} 