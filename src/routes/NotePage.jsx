import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Api } from '../utils/Api';

import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { useAuth } from '../hoc/AuthProvider';

const NotePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const note = await Api.getNote(id, user);
      if (!note[0]) navigate('/*');
      setNote(note[0]);
    };
    fetchData();
  }, []);

  const handleDeleteNote = () => {
    Api.deleteNote(id);
    navigate('/notes', { replace: true });
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex w-2/5 justify-between px-8 items-center text-2xl mb-16'>
        <Link
          onClick={() => navigate('/notes')}
          className='rounded px-6 py-[.5vw] bg-slate-200 w-40 text-xl'
        >
          Back
        </Link>

        <span className='flex w-28 justify-between'>
          <Link to={`edit`}>
            <FaRegEdit />
          </Link>

          <Link onClick={handleDeleteNote}>
            <AiOutlineDelete />
          </Link>
        </span>
      </div>
      <>
        <h1 className='text-3xl mb-6'>{note?.title}</h1>
        <h2 className='text-2xl font-light'>{note?.body}</h2>
      </>
    </div>
  );
};

export { NotePage };
