import React from "react";
import { rest } from "msw";
import usePokemonListQuery from "./usePokemonListQuery";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { PokemonListResponse } from "../api";

let page0Response: PokemonListResponse = {
  pokemon: [
    {
      name: "stench",
      url: "https://pokeapi.co/api/v2/ability/1/",
    },
  ],
  nextPage: 1,
};

let page1Response: PokemonListResponse = {
  pokemon: [
    {
      name: "pikachu",
      url: "https://pokeapi.co/api/v2/ability/2/",
    },
  ],
  nextPage: 2,
};

const server = setupServer(
  rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
    console.log(req.url.searchParams.get("offset"))
    const offset = req.url.searchParams.get("offset");
    let response;
    if (offset === "0") {
      response = page0Response;
    } else if (offset === "20") {
      response = page1Response;
    }
    return res(ctx.status(200), ctx.json(response));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("query hook", () => {
  test("succesful query hook for getting pokemon list", async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => usePokemonListQuery(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isFetched).toBe(true));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    console.log(result.current.data?.pages);
    expect(result.current.data?.pages[0]).toStrictEqual(page0Response);
  });
});
