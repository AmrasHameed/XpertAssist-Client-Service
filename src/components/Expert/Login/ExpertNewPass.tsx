import { Player } from '@lottiefiles/react-lottie-player';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axiosExpert from '../../../service/axios/axiosExpert';
import { LoginFormValues } from '../../../interfaces/interface';


const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ExpertNewPass = ({ email }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await formHandleSubmit(values);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const formHandleSubmit = async (values: LoginFormValues) => {
    try {
        console.log(email)
      const password = values.password;
      const { data } = await axiosExpert().post('/updatePassword', {
        email,
        password,
      });
      if (data.message === 'success') {
        toast.success('Password updated successfully!');
        navigate('/expert');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-between px-12">
      <div className="w-1/2 space-y-6">
        <h1 className="text-3xl font-garamond">X P E R T A S S I S T</h1>
        <h2 className="text-3xl font-semibold">Set New Password</h2>
        <p className="text-gray-600">Please set a new password to continue.</p>

        <form onSubmit={formik.handleSubmit} className="mt-6">
          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              className="peer w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black placeholder-transparent"
              placeholder="New Password"
            />
            <label
              htmlFor="password"
              className="absolute left-2 -top-3.5 text-sm text-gray-600 bg-white px-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-black"
            >
              New Password
            </label>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="confirmPassword"
              className="peer w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black placeholder-transparent"
              placeholder="Confirm Password"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-2 -top-3.5 text-sm text-gray-600 bg-white px-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-black"
            >
              Confirm Password
            </label>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800"
          >
            Update Password
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Remembered your password?{' '}
          <Link to={'/login'} className="text-blue-600">
            Login
          </Link>
        </p>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <Player
          autoplay
          loop
          src={'/Animation - 1726125252610.json'} // Ensure this path is correct
          style={{ height: '90%', width: '90%', background: 'transparent' }}
        />
      </div>
    </div>
  );
};

export default ExpertNewPass;