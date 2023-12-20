import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Api } from '../utils/Api';
import { useAuth } from '../hoc/AuthProvider';

/* PASWORDS:
1. Sincere@april.biz: zo[z-NK1
2. Shanna@melissa.tv: X_&1j,v2o[H
3. Nathan@yesenia.net: 3Fpubh9|
4. Julianne.OConner@kory.org: u[3p4iS,=6on
5. Lucio_Hettinger@annie.ca: w!cZ8w[=8
6. Karley_Dach@jasper.info: )mM*6@j[Lv
7. Telly.Hoeger@billy.biz: K0|FDbQE;v
8. Sherwood@rosamond.me: pp^56!0;^Q
9. Chaim_McDermott@dana.io: !5T{[I8UKvDG
10. Rey.Padberg@karina.biz: xb#YDG4odp-E
11. top123@mail.com: aA34!678
12. test@mail.com: 123123Aa
*/

const LoginPage = () => {
  const { onChange } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSetEmail = useCallback((ev) => {
    setEmail(ev.target.value);
  }, []);

  const handleSetPassword = useCallback((ev) => {
    setPassword(ev.target.value);
  }, []);

  const handleLogIn = async () => {
    const user = await Api.getUser({ email, password }).catch(() =>
      setErrors({
        ...errors,
        user_msg: "There's some problems with getting a userdata",
      })
    );
    if (user) {
      onChange(user);
      setErrors(null);
      navigate('/', { replace: true });
    } else {
      setErrors({ ...errors, data_msg: 'Please enter correct data' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogIn();
  };

  return (
    <>
      <header className='p-4 underline text-2xl'>
        <Link to='/signUp'>SignUp</Link>
      </header>

      <div className='flex flex-col gap-8 w-1/3 border-4 mx-[auto] items-center mt-12 py-12 text-3xl rounded-md'>
        <h1>Login</h1>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col text-2xl items-center'
        >
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={handleSetEmail}
            className='border-[0.2rem] w-80 p-1 border-gray-500 mb-6 rounded text-xl'
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleSetPassword}
            className='border-[0.2rem] w-80 p-1 border-gray-500 mb-6 rounded text-xl'
          />

          {errors?.data_msg && (
            <div className='text-red-500 mb-4'>Error: {errors?.data_msg}</div>
          )}
          {errors?.user_msg && (
            <div className='text-red-500 mb-4'>Error: {errors?.user_msg}</div>
          )}

          <button
            type='submit'
            className='rounded px-14 py-2 bg-slate-200 w-48 text-xl'
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
};

export { LoginPage };
