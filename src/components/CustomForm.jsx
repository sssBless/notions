import { Link, useNavigate } from 'react-router-dom';

const CustomForm = ({
  onSetBody,
  onSetTitle,
  noteBody,
  noteTitle,
  onUpdateData,
  title,
  errors,
  btnTitle,
}) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col max-w-5xl items-center mx-[auto] justify-center'>
      <span className='flex w-full items-center'>
        <Link
          onClick={() => navigate('/notes')}
          className='rounded px-10 py-1 h-9 bg-slate-200 mr-60 ml-11 mb-8'
        >
          Back
        </Link>

        <h1 className='text-4xl mb-8'>{title}</h1>
      </span>

      <input
        type='text'
        name='noteTitle'
        defaultValue={noteTitle}
        placeholder='Note title'
        onChange={onSetTitle}
        className='border-[0.2rem] w-11/12 mb-6 p-2 border-gray-500 rounded'
      />

      <textarea
        name='noteBody'
        defaultValue={noteBody}
        placeholder='Note body'
        cols={50}
        rows={6}
        onChange={onSetBody}
        className='border-[0.2rem] w-11/12 p-2 border-gray-500 mb-[1.5rem] rounded'
      />

      {errors?.error_msg && (
        <div className='text-red-500 mb-4'>Error: {errors?.error_msg}</div>
      )}
      {errors?.note_msg && (
        <div className='text-red-500 mb-4'>Error: {errors?.note_msg}</div>
      )}

      <button
        onClick={onUpdateData}
        className='rounded px-14 py-2 bg-slate-200'
      >
        {btnTitle}
      </button>
    </div>
  );
};

export { CustomForm };
