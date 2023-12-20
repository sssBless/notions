import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Api } from '../utils/Api';
import { useAuth } from '../hoc/AuthProvider';
import { CustomForm } from '../components/CustomForm';

const EditNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [errors, setErrors] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const note = await Api.getNote(id, user);
      if (!note) navigate('/*');
      setNote(note[0]);
    };
    fetchData();
  }, []);

  const handleSetTitle = useCallback((ev) => {
    setNoteTitle(ev.target.value);
  }, []);
  const handleSetBody = useCallback((ev) => {
    setNoteBody(ev.target.value);
  }, []);

  useEffect(() => {
    setNoteBody(note?.body);
    setNoteTitle(note?.title);
  }, [note]);

  const handleUpdateNote = () => {
    if (!noteTitle.trim().length || !noteBody.trim().length) {
      setErrors({
        ...errors,
        error_msg: "Field can't be empty or with spaces",
      });
    } else {
      Api.updateNote({ id, noteTitle, noteBody }).catch(() =>
        setErrors({
          ...errors,
          note_msg: "There's some problems with updating a note",
        })
      );
      setErrors(null);
      navigate(`/notes/${id}`);
    }
  };
  return (
    <CustomForm
      onSetBody={handleSetBody}
      onSetTitle={handleSetTitle}
      noteBody={noteBody}
      noteTitle={noteTitle}
      onUpdateData={handleUpdateNote}
      title={'Edit note'}
      errors={errors}
      btnTitle={'Save'}
    />
  );
};

export { EditNote };
