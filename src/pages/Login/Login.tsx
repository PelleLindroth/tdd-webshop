import { useState } from 'react'
import { validateUser, IUser } from '../../mocks/users'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

const Login = (props: LoginProps) => {
  const { setUser } = props

  const [error, setError] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)

    if (email && password) {
      const user = validateUser(email, password)
      if (user) {
        setUser(user)
        navigate('/profile')
      } else {
        setError(true)
      }
    }
  }

  return (
    <>
      <h1>LOGIN</h1>
      <form name="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="text"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
        <button disabled={!email.length || !password.length}>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>Email and password does not match our records</p>}
    </>
  )
}

export default Login
