import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center text-3xl mt-32'>
      <h1 className='font-medium'>404</h1>

      <h2 className='text-4xl'>Page not found</h2>

      <div className='text-2xl'>
        Go to page{' '}
        <Link to='/' className='underline'>
          About me
        </Link>
      </div>
    </div>
  );
};
export { NotFoundPage };
