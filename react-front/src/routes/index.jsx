import { HomePage, SignIn, NotFound, PageLayout } from "@/pages";

const routes = [
  {
    element: <PageLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/sign-in", element: <SignIn /> },
      {
        path: "/about-us",
        element: <HomePage />
      },
      {
        path: "/services",
        element: <HomePage />
      },
      {
        path: "/blog",
        element: <HomePage />
      },
      {
        path: "/contact-us",
        element: <HomePage />
      }
    ]
  },

  { path: "/*", element: <NotFound /> }
];

export { routes };
