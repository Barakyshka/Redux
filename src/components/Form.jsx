import {
  Link,
  Form as RForm,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { Api } from "../utils/api";
export const Form = ({ title, submit, method }) => {
  const data = useActionData();
  const note = useLoaderData();
  return (
    <RForm method={method}>
      <div className="flex flex-col gap-3 w-2/3 mx-auto">
        <Link
          to="/notes"
          className="border-2 w-[100px] border-black px-2 py-1 text-2xl text-center"
        >
          Назад
        </Link>
        <h1 className="text-3xl text-center mb-3">{title}</h1>
        <input
          type="text"
          className="border-2 border-black py-2 px-1"
          name="title"
          defaultValue={note?.title}
        />
        {data?.errors?.message && (
          <div className="text-red-500 text-2xl">{data?.errors?.message}</div>
        )}
        <textarea
          className="border-2 border-black h-[40vh] px-1"
          name="content"
          defaultValue={note?.content}
        ></textarea>
        {data?.success?.message && (
          <div className="text-green-500 text-2xl">
            {data?.success?.message}
          </div>
        )}
        <button
          type="submit"
          className="border-2 border-black px-2 py-1 text-3xl self-center"
          name="intent"
          value={method}
        >
          {submit}
        </button>
      </div>
    </RForm>
  );
};
export const action = async ({ request, params: { id } }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const userId = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).user.id;
  if (!title.trim())
    return { errors: { message: "Название не должно быть пустым" } };
  switch (request.method) {
    case "PUT":
      await Api.putNote({
        title,
        content,
        id,
        userId,
      });
      return { success: { message: "Заметка успешно обновлена" } };
    case "POST":
      await Api.postNote({
        title,
        content,
        userId,
      });
      return redirect("/notes");
    default:
      break;
  }
  return null;
};

export const loader = async ({ params: { id } }) => {
  if (!id) {
    return null;
  }
  const userId = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).user.id;
  return Api.getNote({ id, userId });
};
