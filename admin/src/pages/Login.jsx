import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ClientContext } from '../context/ClientContext'

const Login = () => {

  const [state, setState] = useState('Client')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setCToken } = useContext(ClientContext)

  // handler of login client or admin
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/auth/admin/login`, { email, password })

        console.log(data);
        
        if (data.success ) {
          localStorage.setItem('aToken', data.aToken)
          setAToken(data.aToken)
          toast.success('Login successfully')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/client/login`, { email, password })

        console.log(data);
        if (data.success) {
          localStorage.setItem('cToken', data.cToken)
          setCToken(data.cToken)

          toast.success('Login successfully')
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
          <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
          <div className='w-full'>
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-zinc-300  rounded w-full p-2 mt-1' type="email" required />
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" required />
          </div>
          <button className='bg-blue text-white w-full py-2 rounded-md text-base'>Login</button>
          {
            state === 'Admin'
              ? <p>Login as client? <span className='text-primary underline cursor-pointer' onClick={() => { setState('Client') }}>Click here</span></p>
              : <>
                <p>Login as admin ? <span className='text-primary underline cursor-pointer' onClick={() => { setState('Admin') }}>Click here</span></p>
              </>
          }
        </div>
      </form>
    </div>
  )
}

export default Login
