import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useEffect, useState } from 'react';



const LoginPage = () => {
  const { user, login } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [responseError, setResponseError] = useState<string>();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user]);

  const onSubmit = async (data: any) => {
    try {
      const { email, password } = data;
      const result = await login(email, password);
      if (result === true || result === '{}') {
        //successfully logged in
        navigate(from, { replace: true })
      } else if (result === 'Invalid Credentials') {
        setResponseError(result);
      }
    } catch(err){
      console.log(`error: ${err}`)
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        
        <h2 className="text-4xl font-bold text-center mb-6 text-black">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="flex text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              id="email"
              type="email"
              autoFocus
              className={`border-2 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full ${
                errors.email ? 'border-red-500' : 'border-gray-400'
              }`}
              {...register("email", { required: true })} 
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>
          
          <div className="mb-4 pb-6">
            <label htmlFor="password" className="flex text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              id="password"
              type="password"
              className={`border-2 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full ${
                errors.password ? 'border-red-500' : 'border-gray-400'
              }`}
              {...register("password", { required: true,  minLength: 8 })} 
            />
            {errors.password && errors.password.type === 'required' && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <span className="text-red-500 text-sm">Password must be at least 8 characters long</span>
            )}
          </div>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full">Login</button>
          {responseError ? <div className='text-red-400 pt-4 text-2xl'>{responseError}</div> : null}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
