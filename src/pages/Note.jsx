import { useDispatch, useSelector } from "react-redux";
import { Api } from "../utils/api";
import {
  useLoaderData,
  Link,
  redirect,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { deleteNote } from "../redux/notes/action";
export const Note = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { title, content, id } = useLoaderData();
  const handlerDelete = async (id) => {
    dispatch(deleteNote(id, user.id));
    navigate("/notes");
  };
  return (
    <div>
      <div className="flex flex-row justify-between">
        <Link to="/notes" className="border-2 border-black px-2 py-1 text-3xl">
          Назад
        </Link>
        <h1 className="text-5xl">{title}</h1>
        <div className="text-3xl">
          <button onClick={() => handlerDelete(id)}>🗑</button>
          <Link to={`edit`}>✍️</Link>
        </div>
      </div>
      <div className="mt-4 text-2xl border-t border-black p-2">{content}</div>
    </div>
  );
};

export const loader = async ({ params: { id } }) => {
  const userId = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).user.id;
  if (userId) {
    const data = await Api.getNote({ id, userId });
    return data?.id ? data : redirect("/notes");
  }
};
