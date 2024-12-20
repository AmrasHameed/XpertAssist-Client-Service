import { Player } from '@lottiefiles/react-lottie-player';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { LoginFormValues } from '../../../interfaces/interface';
import { expertLogin } from '../../../service/redux/slices/expertAuthSlice';
import axiosExpert from '../../../service/axios/axiosExpert';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, SetIsLoading] = useState<boolean>(false)
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        SetIsLoading(true)
        await formHandleSubmit(values);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const formHandleSubmit = async (values: LoginFormValues) => {
    try {
      const { data } = await axiosExpert().post('/loginExpert', values);
      if (data.message === 'Success') {
        localStorage.setItem('expertToken', data.token);
        localStorage.setItem('expertRefreshToken', data.refreshToken);
        dispatch(
          expertLogin({
            expert: data.name,
            expertId: data._id,
            email: data.email,
            service: data.service,
            mobile: data.mobile,
            image: data.image,
            isVerified: data.isVerified,
            loggedIn: true,
          })
        );
        toast.success('Logged in Successfully');
        SetIsLoading(false)
        navigate('/expert');
      } else if (data.message === 'UserNotFound') {
        SetIsLoading(false)
        toast.error('User Not Found');
      } else if (data.message === 'passwordNotMatched') {
        SetIsLoading(false)
        toast.error('Entered password is wrong');
      } else if (data.message === 'blocked') {
        SetIsLoading(false)
        toast.info('Your Account is Blocked');
      } else {
        SetIsLoading(false)
        toast.error('User is not Registered, Please Sign Up!');
      }
    } catch (error) {
      SetIsLoading(false)
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  const googleLogin = async (datas: CredentialResponse) => {
    try {
      const token: string | undefined = datas.credential;
      if (token) {
        const decode = jwtDecode(token) as any;
        const { data } = await axiosExpert().post('/googleLoginExpert', {
          email: decode.email,
        });
        if (data.message === 'Success') {
          localStorage.setItem('expertToken', data.token);
          localStorage.setItem('expertRefreshToken', data.refreshToken);
          dispatch(
            expertLogin({
              expert: data.name,
              expertId: data._id,
              email: data.email,
              service: data.service,
              mobile: data.mobile,
              image: data.image,
              isVerified: data.isVerified,
              loggedIn: true,
            })
          );
          toast.success('Logged in Successfully');
          navigate('/expert');
        } else if (data.message === 'UserNotFound') {
          toast.error('User Not Found');
        } else if (data.message === 'blocked') {
          toast.info('Your Account is Blocked');
        } else {
          toast.error('User is not Registered, Please Sign Up!');
        }
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
  <div className="w-full md:w-1/2 space-y-6">
    <h1 className="text-3xl font-garamond text-center md:text-left">X P E R T A S S I S T</h1>
    <h2 className="text-3xl font-semibold text-center md:text-left">Expert Login</h2>
    <p className="text-gray-600 text-center md:text-left">
      Please login to continue to your account.
    </p>

    <form onSubmit={formik.handleSubmit} className="mt-6">
      <div className="relative mb-6">
        <input
          type="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          className="peer w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black placeholder-transparent"
          placeholder="Email"
        />
        <label
          htmlFor="email"
          className="absolute left-2 -top-3.5 text-sm text-gray-600 bg-white px-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-black"
        >
          Email
        </label>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="relative mb-6">
        <input
          type="password"
          id="password"
          className="peer w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black placeholder-transparent"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label
          htmlFor="password"
          className="absolute left-2 -top-3.5 text-sm text-gray-600 bg-white px-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-black"
        >
          Password
        </label>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">
            {formik.errors.password}
          </div>
        ) : null}
      </div>
      <div className="text-left -mt-2 mb-4">
        <Link
          to={'/expert/forgot-password'}
          className="text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 flex items-center justify-center"
      >
       {isLoading && <FaSpinner className="animate-spin mr-2" />} Sign in
      </button>
    </form>

    <div className="mt-4 flex items-center justify-center">
      <span className="text-gray-400">or</span>
    </div>

    <div className="w-full mt-3 flex items-center justify-center">
      <GoogleLogin
        ux_mode="popup"
        onSuccess={googleLogin}
        size="large"
        shape="pill"
        theme="filled_black"
      />
    </div>

    <p className="mt-6 text-center text-gray-600">
      Don't have an account?{' '}
      <Link to={'/expert/signup'} className="text-blue-600">
        Sign Up
      </Link>
    </p>
  </div>

  <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
    <Player
      autoplay
      loop
      src={'/Animation - 1726125252610.json'}
      style={{ height: '90%', width: '90%', background: 'transparent' }}
    />
  </div>
</div>

  );
};

export default Login;
