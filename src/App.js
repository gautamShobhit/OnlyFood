import "../index.css";
import { lazy, Suspense, useContext, useEffect } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";
import ResMenu from "./components/ResMenu.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext.js";
import { Provider, useSelector, useDispatch } from "react-redux";
import appStore from "./utils/appStore.js";
import Cart from "./components/Cart.js";
import FavRes from "./components/FavRes.js";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import { toggleTheme } from "./utils/themeSlice.js";

const About = lazy(() => import("./components/About.js"));

//Create a parent FC to hold entire app
const AppLayout = () => {
  const { loggedInUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const darkMode = useSelector((store) => store.theme.darkMode);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark"); // adds to <html>
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <UserContext.Provider value={{ loggedInUser: "Ronit" }}>
      <div
        className={`p-2 bg-cyan-200 dark:bg-cyan-900 dark:text-white min-h-screen `}
      >
        <ScrollToTop />
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense
            fallback={
              <h1 className="md:pt-40 pt-[100px] p-4 flex justify-center font-poppins text-center md:text-lg text-sm font-semibold  ">
                Loading....
              </h1>
            }
          >
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        //:resId --> dynamic Id that changes with restaurant
        path: "/restaurant/:resId",
        element: <ResMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/favourites",
        element: <FavRes />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<RouterProvider router={appRouter} />);
root.render(
  <Provider store={appStore}>
    {" "}
    {/* Provider wraps entire app */}
    <RouterProvider router={appRouter} />
  </Provider>
);
