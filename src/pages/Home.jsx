import { Link } from "react-router-dom";
import { options } from "../utils/const";
import { useSelector } from "react-redux";
export const Home = () => {
  const {
    user: { email, createdAt },
  } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col mx-auto w-2/3 gap-2">
      <h1 className="text-3xl text-center">About</h1>
      <div className="flex flex-col my-5 gap-1">
        <span>
          <strong>Email: </strong>
          {email}
        </span>
        <span>
          <strong>Дата регистрации: </strong>
          {new Date(createdAt).toLocaleDateString("ru-Ru", options)}
        </span>
      </div>

      <Link
        to="notes"
        className="mt-4 border-2 self-center border-black px-2 py-1 text-3xl"
      >
        Go to notes
      </Link>
    </div>
  );
};
