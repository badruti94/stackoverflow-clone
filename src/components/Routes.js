import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import QuestionPage from "../pages/QuestionPage";
import RegisterPage from "../pages/RegisterPage";
import CreateQuestionPage from "../pages/CreateQuestionPage";
import ViewQuestionPage from "../pages/ViewQuestionPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <QuestionPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/question",
        element: <QuestionPage />
    },
    {
        path: "/question/:id",
        element: <ViewQuestionPage />
    },
    {
        path: "/question/create",
        element: <CreateQuestionPage />
    },
]);

const Routes = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes