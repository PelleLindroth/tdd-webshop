import { useState } from 'react'
import { usersDb, IUser } from '../../mocks/users'

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

const Login = (props: LoginProps) => {
  const { setUser } = props
  // const [email, setEmail] = useState('')

  return (
    <>
      <h1>LOGIN</h1>
      <form name="login-form">
        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="text" />
        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="text" />
        <button>Login</button>
      </form>
    </>
  )
}

export default Login
