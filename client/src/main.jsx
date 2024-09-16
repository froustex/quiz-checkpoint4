import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import App from "./App";
import Register, { action as registerAction } from "./pages/Register";
import Login, { action as loginAction } from "./pages/Login";
import Error from "./pages/Error";
import AuthProvider from "./services/useAuth";
import Landing from "./pages/Landing";
import QuizTest, { loader as quizTestLoader } from "./pages/QuizTest";
import QuizPage, { loader as quizPageLoader } from "./pages/QuizPage";
import QuizList, { loader as quizListLoader } from "./pages/QuizList";

const checkAuth = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/verify-admin`,
      {
        credentials: "include",
      }
    );
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
};

function protectedRoute(routeConfig) {
  return {
    ...routeConfig,
    loader: async (args) => {
      const isAllowed = await checkAuth();

      if (!isAllowed) {
        return redirect("/login");
      }

      if (routeConfig.loader) {
        return routeConfig.loader(args);
      }
      return null;
    },
  };
}

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
      {
        path: "/quiztest",
        element: <QuizTest />,
        loader: quizTestLoader,
      },
    ],
  },
  {
    path: "/quizlist",
    element: <QuizList />,
    loader: quizListLoader,
  },
  {
    path: "/quiz/:theme/:difficulty",
    loader: quizPageLoader,
    element: <QuizPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
