import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Api } from '../utils/Api';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { GoPlusCircle } from 'react-icons/go';
import { getNoteDate } from '../utils/getDate';
import { useAuth } from '../hoc/AuthProvider';

const NotesPage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const unsortedNotes = await Api.getNotes(user.id);
      setNotes(unsortedNotes.sort((a, b) => b.createdAt - a.createdAt));
    };
    fetchData();
  }, [user.id]);

  const deleteNote = (id) => {
    Api.deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-5xl'>Notes</h1>

      <Link
        to='new'
        className=' rounded px-12 py-4 bg-slate-200 flex items-center my-6'
      >
        Add new note <GoPlusCircle className='ml-4' />
      </Link>

      <ul className=' text-left w-3/4 mx-[auto] flex flex-col gap-5'>
        {notes?.map((note) => {
          const noteDate = getNoteDate(note.createdAt);
          return (
            <li
              key={note.id}
              className=' bg-gray-200 py-5 px-8 flex justify-between rounded'
            >
              <Link to={`/notes/${note.id}`} className='px-8'>
                {note.title} {noteDate}
              </Link>

              <span className='flex justify-between w-20 items-center'>
                <Link to={`/notes/${note.id}/edit`}>
                  <FaRegEdit />
                </Link>

                <button onClick={() => deleteNote(note.id)}>
                  <AiOutlineDelete />
                </button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export { NotesPage };
