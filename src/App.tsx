import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PokeList from "./components/PokeList";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PokeList />
    </QueryClientProvider>
  );
};

export default App;
