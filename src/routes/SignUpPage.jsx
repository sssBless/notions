import { useCallback, useState } from 'react';
import { z } from 'zod';
import { userSchema } from '../utils/validation';
import { hashPassword } from '../utils/validation';
import { Link, useNavigate } from 'react-router-dom';
import { Api } from '../utils/Api';

const SignUpPage = () => {
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const addUser = async (user) => {
    if (!(await Api.checkUser(user))) {
      Api.addUser(user).catch();

      setErrors(null);
      navigate('/login', { replace: true });
    } else {
      setErrors({
        ...errors,
        exist_msg: 'A user with this email address already exists',
      });
    }
  };

  const handleUserProcessing = async ({
    password,
    confirmPassword,
    email,
    name,
    username,
  }) => {
    try {
      const user = userSchema.parse({
        email,
        password,
        confirmPassword,
        registrationDate: Date.now(),
      });

      user.password = await hashPassword(password);

      addUser({
        name,
        username,
        ...user,
      }).catch(() =>
        setErrors({
          ...errors,
          usr_error: "There's some problem with adding a user",
        })
      );

      setErrors(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors({ ...err.format(), ...errors });
      }
    }
  };

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const form = event.target;

    handleUserProcessing({
      email: form.email?.value,
      password: form.password?.value,
      confirmPassword: form.confirmPassword?.value,
      name: form.name?.value,
      username: form.username?.value,
    });
  }, []);

  return (
    <>
      <header className='p-4 underline text-2xl'>
        <Link to='/login'>Login</Link>
      </header>

      <div className='flex flex-col gap-8 w-1/3 border-4 mx-[auto] items-center mt-12 py-12 text-3xl rounded-md'>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            required
            className='border-[0.2rem] w-80 p-1 border-gray-500 mb-6 rounded text-xl'
          />

          <input
            type='text'
            name='username'
            placeholder='Username'
            required
            className='border-[0.2rem] w-80 p-1 border-gray-500 mb-6 rounded text-xl'
          />

          <input
            type='text'
            name='email'
            placeholder='Email'
            required
            className='border-[0.2rem] w-80 p-1 border-gray-500 mb-6 rounded text-xl'
          />

          {errors?.email && (
            <div className='text-xl mb-[1rem] text-red-500'>
              Error: {errors?.email?._errors}
            </div>
          )}

          <input
            type='password'
            name='password'
            placeholder='Password'
            className='border-[0.2rem] w-80 p-1 border-gray-500 mb-6 rounded text-xl'
            required
          />

          <input
            type='password'
            name='confirmPassword'
            placeholder='Repeat password'
            className='border-[0.2rem] w-80 p-1 border-gray-500 mb-6 rounded text-xl'
            required
          />

          <div className='text-red-500 mb-4 text-xl'>
            {errors?.password && (
              <>
                {errors?.password?._errors.map((err) => (
                  <div key={err}>Error: {err}</div>
                ))}
              </>
            )}
            {errors?.passwd_msg && <div>Error: {errors?.passwd_msg}</div>}
            {errors?.exist_msg && <div>Error: {errors?.exist_msg}</div>}
            {errors?.confirmPassword && (
              <div>Error: {errors?.confirmPassword?._errors}</div>
            )}
            {errors?.usr_error && <div>Error: {errors?.usr_error}</div>}
          </div>

          <button
            type='submit'
            className='rounded px-14 py-2 bg-slate-200 w-48 text-xl'
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};
export { SignUpPage };
