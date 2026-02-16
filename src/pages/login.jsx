import { Link, Navigate, useNavigate } from "react-router-dom"
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { useContext, useState } from "react"
import { AuthContext } from "../context/authContext"
import { toastError, toastSuccess } from "../utils/toast"


const Login = () => {
  const navigate = useNavigate()
  const { login, user } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  if (user){
    return <Navigate to='/' replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      const option = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, option)
      const data = await response.json()
      if (data.success) {
        toastSuccess(data.message);
        navigate('/')
        login(data.user, data.token)
        setEmail('')
        setPassword('')
      }
      else {
        toastError(data.message)
      }
    } catch (error) {
      console.error("Login Form Error: ", error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <div className="w-4/5 md:w-1/2 lg:w-2/5 bg-gray-100 rounded-3xl p-4 pt-6 pb-6 flex flex-col items-center shadow-2xl">
        <h1 className="text-black font-bold text-3xl font-sans mb-6">Log in</h1>
        <p className="text-gray-500 font-sans text-center w-5/6 text-[18px] mb-4">Enter your email and password to securely access your account and manage your services.</p>
        <form onSubmit={handleSubmit} className="min-w-11/12">
          <div className="w-4/5 h-14 flex gap-5 items-center m-auto bg-white pl-4 rounded-2xl mb-4">
            <MdEmail size={28} />
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="flex-1 h-full font-sans font-medium outline-none" required />
          </div>

          <div className="w-4/5 h-14 flex gap-5 items-center m-auto bg-white pl-4 rounded-2xl mb-4">
            <RiLockPasswordFill size={28} />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="flex-1 h-full font-sans font-medium outline-none" required minLength={6} />
          </div>
          <div className="w-4/5 h-12 flex justify-center gap-5 items-center m-auto bg-green-400 text-white rounded-2xl mb-4">
            <button type="submit" className="h-full w-full font-medium font-sans cursor-pointer" disabled={loading}>{loading ? 'Logging In...' : 'Login'}</button>
          </div>

        </form>
        <p className="font-medium text-gray-500">Don't have an account? <Link to="/signup"><span className="text-green-600">Sign Up here</span></Link></p>
      </div>
    </div>
  )
}

export default Login