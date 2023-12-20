import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hoc/AuthProvider';

const Layout = () => {
  const { onChange } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    onChange(null);
    localStorage.clear();
    navigate('login', { replace: true });
  };

  return (
    <div className='text-[1.2vw]'>
      <header
        className={
          'flex flex-row border-b-[0.2rem] border-slate-700 m-full px-12 py-6 justify-end text-4xl text-slate-400'
        }
      >
        <nav>
          <ul className=' flex gap-10'>
            <li className=' inline-block'>
              <NavLink to={'/'} end={true}>
                About
              </NavLink>
            </li>
            <li className=' inline-block'>
              <NavLink to={'/notes'}>Notes</NavLink>
            </li>
            <li className=' inline-block mr-5'>
              <Link onClick={handleLogOut}>Log out</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className=' text-center my-24 min-h-[27rem]'>
        <Outlet />
      </main>
      <footer className=' border-t-[0.2rem] border-slate-700 flex items-center justify-between px-8 py-8'>
        <p>Created by: sssBless </p>
        <p>Copyright &copy; 2023, Community.com, All rigthts are reserved!</p>
      </footer>
    </div>
  );
};
export { Layout };
