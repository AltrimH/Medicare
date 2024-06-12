import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Doctors"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `api/v1/general/user/${id}`,
      providesTags: ["User"],
    }),
    getDoctors: build.query({
      query: () => "api/v1/client/doctors",
      providesTags: ["Doctors"],
    }),
    addDoctor: build.mutation({
      query: (doctor) => ({
        url: `api/v1/doctors/add-doctor`,
        method: 'POST',
        doctor,
      }),
      providesTags: ["Doctors"],
    }),
    updateDoctor: build.mutation({
      query: (doctor) => `api/v1/doctors/update-doctor`,
      providesTags: ["Doctors"],
    }),
    deleteDoctor: build.mutation({
      query: (id) => `api/v1/doctors/delete-doctor`,
      providesTags: ["Doctors"],
    }),
  }),
});

export const { useGetUserQuery, useGetDoctorsQuery, useAddDoctorQuery } = api;
