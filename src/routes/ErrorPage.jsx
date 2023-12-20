import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className='flex flex-col items-center text-3xl mt-32'>
      <h1 className='font-medium'>{error.status || 404}</h1>

      <h2 className='text-4xl'>{error.statusText || 'Something goes wrong'}</h2>

      <div className='text-2xl'>
        Go to page{' '}
        <Link to='/' className='underline'>
          About me
        </Link>
      </div>
    </div>
  );
};
export { ErrorPage };
