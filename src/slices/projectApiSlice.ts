import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({baseUrl: "/api/projects"}),
    endpoints: (builder) => ({
        createProject: builder.mutation({
            query: (data) => ({
                url: '/',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
        }),
        getAllProjects: builder.query({
            query: () => ({
                url: '/',
                method: "GET",
            })
        })
    })
});

export const {useCreateProjectMutation, useGetAllProjectsQuery} = projectApi;