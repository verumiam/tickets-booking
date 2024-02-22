import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TicketsResponse } from '../../types/TicketsResponse';

const ticketsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: (builder) => ({
    getTickets: builder.query<TicketsResponse, void>({
      query: () => 'tickets',
    }),
  }),
});

export const { useGetTicketsQuery } = ticketsApi;

export default ticketsApi;
