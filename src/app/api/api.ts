import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = `https://swapi.dev/api`;

export const api = createApi({
  reducerPath: 'myApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<{ type: string }, string>({
      query: (params) => `people?${params}`,
    }),
  }),
});

export const { useGetAllPeopleQuery } = api;
