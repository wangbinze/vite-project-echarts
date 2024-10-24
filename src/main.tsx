import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from './routes/root.jsx';
import ErrorPage from './ErrorPage.jsx';
import About from "./view/about/About.tsx";
import Home from "./view/home/Home.tsx";
import Index1 from "./view/index1/Index1.tsx";
import Index2 from "./view/index2/Index2.tsx";
import Index3 from "./view/index3/Index3.tsx";
import Index4 from "./view/index4/Index4.tsx";
import Index5 from "./view/index5/Index5.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <Home/>},
            {
                path: "about",
                element: <About/>,
            },
            {
                path: "index1",
                element: <Index1/>,
            },
            {
                path: "index2",
                element: <Index2/>,
            },
            {
                path: "index3",
                element: <Index3/>,
            },
            {
                path: "index4",
                element: <Index4/>
            },
            {
                path: "index5",
                element: <Index5/>
            }
        ]
    },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
