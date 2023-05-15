import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PokeList from "./components/PokeList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokeDetails, { loader as pokeDetailsLoader } from "./components/PokeDetails";
import ErrorComponent from "./components/ErrorComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokeList />
  },
  {
    path: "/pokemon/:pokeid",
    loader: pokeDetailsLoader,
    element: <PokeDetails />,
    errorElement: <ErrorComponent />
  }
])

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
