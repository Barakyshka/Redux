import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { options } from "./../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getNotes } from "./../redux/notes/action";
const Notes = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, notes } = useSelector((state) => state.notes);
  useEffect(() => {
    dispatch(getNotes(user.id));
  }, [dispatch, user]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id, user.id));
  };

  if (loading) return <div>Loading</div>;

  if (!user?.id) {
    return <div>Войдите, чтобы увидеть свои заметки</div>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center mb-5">Notes</h1>
      <span className="flex justify-center">
        <Link
          to="add"
          className="border-2 text-center border-black px-2 text-2xl"
        >
          Добавить новую заметку
        </Link>
      </span>
      {notes.length ? (
        notes.map((note) => (
          <div
            key={note.id}
            className="text-3xl w-2/3 mx-auto my-3 flex justify-between cursor-pointer"
          >
            <Link to={`${note.id}`} className="flex-1">
              <span>{note.title}</span>
              <span className="ml-4 text-sm">
                {new Date(note.createdAt).toLocaleDateString("ru-Ru", options)}
              </span>
            </Link>
            <span>
              <Link to={`${note.id}/edit`}>✍️</Link>
              <button onClick={() => handleDelete(note.id)}>🗑</button>
            </span>
          </div>
        ))
      ) : (
        <div className="text-3xl mt-5">Нет заметок</div>
      )}
    </div>
  );
};

export default Notes;
