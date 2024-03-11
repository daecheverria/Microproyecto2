import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import App from "./pages/app";
import Club from "./pages/Club";
import Perfil from "./pages/Perfil";
import Videojuego from "./pages/Videojuego";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/app",
        element: <App />,
    },
    {
        path: "/app/clubes/:id",
        element: <Club />,
    }
    ,
    {
        path: "/app/perfil",
        element: <Perfil />,


    },{
        path: "/app/search/:nombre",
        element: <Videojuego />,

    }

]
)