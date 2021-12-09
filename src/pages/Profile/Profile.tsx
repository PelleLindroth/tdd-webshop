import { useNavigate } from 'react-router'
import { IUser } from '../../mocks/users'

interface ProfileProps {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

const Profile = (props: ProfileProps) => {
  const { user, setUser } = props
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/', { replace: true })
  }

  return (
    <>
      <h1>My Profile</h1>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Log out</button>
    </>
  )
}

export default Profile
