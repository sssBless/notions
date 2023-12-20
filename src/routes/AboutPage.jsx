import { Link } from 'react-router-dom';
import { getDate } from '../utils/getDate';
import { useAuth } from '../hoc/AuthProvider';

const AboutPage = () => {
  const { user } = useAuth();

  return (
    <div className='flex flex-col max-w-lg mx-[auto] text-3xl items-center'>
      <h1 className='font-semibold mb-4 text-5xl'>About me</h1>
      <h2 className=' mb-4'>
        <span className='font-semibold'>Name:</span> {user.name}
      </h2>

      <h2 className='mb-4'>
        <span className='font-semibold'>Username:</span> {user.username}
      </h2>

      <h2 className='mb-4'>
        <span className=' font-semibold'>Email: </span> {user.email}
      </h2>
      <h2>
        <span className=' font-semibold'>Date sign up: </span>
        {getDate(user.registrationDate)}
      </h2>
      <Link
        to='/notes'
        className='rounded px-6 py-3 bg-slate-200 w-40 text-xl mt-8'
      >
        Go to notes
      </Link>
    </div>
  );
};
export { AboutPage };
