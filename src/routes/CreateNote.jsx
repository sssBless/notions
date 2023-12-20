import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../utils/Api';
import { nanoid } from 'nanoid';
import { useAuth } from '../hoc/AuthProvider';
import { CustomForm } from '../components/CustomForm';

const CreateNote = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [errors, setErrors] = useState(null);

  const handleSetTitle = useCallback((ev) => {
    setNoteTitle(ev.target.value);
  }, []);

  const handleSetBody = useCallback((ev) => {
    setNoteBody(ev.target.value);
  }, []);

  const handleAddNote = () => {
    const id = nanoid();
    if (!noteTitle.trim().length || !noteBody.trim().length) {
      setErrors({
        ...errors,
        error_msg: "Field can't be empty or with spaces",
      });
    } else {
      Api.addNote({
        id,
        userId: user.id,
        title: noteTitle,
        body: noteBody,
        createdAt: Date.now(),
      }).catch(() =>
        setErrors({
          ...errors,
          note_msg: "There's some problem with adding a note",
        })
      );
      setErrors(null);
      setNoteBody('');
      setNoteTitle('');
      navigate(`/notes/${id}`);
    }
  };

  return (
    <CustomForm
      onSetBody={handleSetBody}
      onSetTitle={handleSetTitle}
      noteBody={noteBody}
      noteTitle={noteTitle}
      title={'Create new note'}
      btnTitle={'Create'}
      onUpdateData={handleAddNote}
      errors={errors}
    />
  );
};

export { CreateNote };
