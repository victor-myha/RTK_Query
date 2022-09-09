import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type SendData = {
  name: string;
  email: string;
};

export type User = {
  id: number | string;
  name: string;
  email: string;
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    addUser: builder.mutation<User, SendData>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUser: builder.mutation<User, User['id']>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

// hooks
export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } =
  usersApi;
