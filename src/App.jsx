import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import { RequireAuth } from "./components/RequireAuth";
import {
  action as formAction,
  Form,
  loader as formLoader,
} from "./components/Form";
import { Note, loader as noteLoader } from "./pages/Note";
import { NotFound } from "./pages/NotFound";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "about",
        loader: () => redirect("/"),
      },
      {
        path: "notes",
        children: [
          {
            index: true,
            element: <Notes />,
          },
          {
            path: "add",
            element: (
              <RequireAuth>
                <Form title="Add" submit="Create" method={"post"} />
              </RequireAuth>
            ),
            action: formAction,
            loader: formLoader,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: (
                  <RequireAuth>
                    <Note />
                  </RequireAuth>
                ),
                loader: noteLoader,
              },
              {
                path: "edit",
                element: (
                  <RequireAuth>
                    <Form title="Edit" submit="Save" method={"put"} />
                  </RequireAuth>
                ),
                action: formAction,
                loader: formLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
