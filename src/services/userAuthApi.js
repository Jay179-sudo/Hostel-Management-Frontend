import { Add } from '@mui/icons-material'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/user/' }),
  endpoints: (builder) => ({
    registerSuperUser: builder.mutation({
      query: (user) => {
        return {
          url: 'superadminregister/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }), //superuser
    // login superuser
    loginSuperUser: builder.mutation({
      query: (user) => {
        return {
          url: 'superadminlogin/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

    registerHostelAdmin: builder.mutation({
      query: (user) => {
        return {
          url: 'hosteladminregister/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

    loginHostelAdmin: builder.mutation({
      query: (user) => {
        return {
          url: 'hosteladminlogin/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),


    registerStudent: builder.mutation({
      query: (user) => {
        return {
          url: 'studentregister/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    loginStudent: builder.mutation({
      query: (user) => {
        return {
          url: 'hosteladminlogin/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

    registerMessManager: builder.mutation({
      query: (user) => {
        return {
          url: 'messmanagerregister/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    loginMessManager: builder.mutation({
      query: (user) => {
        return {
          url: 'messmanagerlogin/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

    registerHostel: builder.mutation({
      query: (user) => {
        return {
          url: 'hostelregister/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),



    getLoggedUser: builder.query({
      query: (access_token) => {
        return {
          url: 'profile/',
          method: 'GET',
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      }
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'changepassword/',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      }
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: 'sendresetpasswordemail/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `/reset-password/${id}/${token}/`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    createLeaveRequest: builder.mutation({
      query: ({ email, start_date, end_date, Address, ReasonForLeave }) => {
        return {
          url: 'studentleavereq/',
          method: 'POST',
          body: JSON.stringify({
            email: email,
            start_date: start_date,
            end_date: end_date,
            Address: Address,
            ReasonForLeave: ReasonForLeave
          }),
          headers: {
            'Content-type': 'application/json',
          }

        }
      }
    }),
    updateHostelRoom: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'hosteladminroomallocation/',
          method: 'POST',
          body: JSON.stringify({
            email: actualData.email,
            room: actualData.room
          }),
          headers: {
            'authorization': `Bearer ${access_token}`,
            'Content-type': 'application/json',
          }

        }
      }
    }),
    uploadcsv: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'uploadcsv/',
          method: 'POST',
          body: JSON.stringify({
            csv: actualData.csv
          }),
          headers: {
            // 'authorization': `Bearer ${access_token}`,
            'Content-type': 'application/json',
          }

        }
      }
    }),
    markAbsent: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'createabsentrecord/',
          method: 'POST',
          body: JSON.stringify({
            email: actualData.email
          }),
          headers: {
            // 'authorization': `Bearer ${access_token}`,
            'Content-type': 'application/json',
          }

        }
      }
    }),

    // left to implement in auth.js
    // view students present yesterday. Do it first in Postman
    absentYesterday: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'createabsentrecord/',
          method: 'POST',
          body: JSON.stringify({
            email: actualData.email
          }),
          headers: {
            // 'authorization': `Bearer ${access_token}`,
            'Content-type': 'application/json',
          }

        }
      }
    }),
    absentviewtotal: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'AbsentDaysView/',
          method: 'POST',
          body: JSON.stringify({
            start_date: actualData.start_date,
            end_date: actualData.end_date
          }),
          headers: {
            // 'authorization': `Bearer ${access_token}`,
            'Content-type': 'application/json',
          }

        }
      }
    }),
    absentviewspecific: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'AbsentDaysSpecificView/',
          method: 'POST',
          body: JSON.stringify({
            email: actualData.email,
            start_date: actualData.start_date,
            end_date: actualData.end_date
          }),
          headers: {
            // 'authorization': `Bearer ${access_token}`,
            'Content-type': 'application/json',
          }

        }
      }
    }),
    // yo ta replace garnu paryo get room from email sanga
    getemailfromroom: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'getemailfromroom/',
          method: 'POST',
          body: JSON.stringify({
            room_number: actualData.room_number,
          }),
          headers: {
            // 'authorization': `Bearer ${access_token}`,
            'Content-type': 'application/json',
          }

        }
      }
    }),

    getroomdetails: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'getroomdetails/',
          method: 'POST',
          body: JSON.stringify({
            room_number: actualData.room_number,
          }),
          headers: {
            // 'authorization': `Bearer ${access_token}`,
            'Content-type': 'application/json',
          }

        }
      }
    }),

    getoccupiedrooms: builder.mutation({
      query: ({ access_token }) => {
        return {
          url: 'occupiedRooms/',
          method: 'GET',
          headers: {
            // 'authorization': `Bearer ${access_token}`,
            'Content-type': 'application/json',
          }

        }
      }
    }),

  }),
})

export const { useAbsentYesterdayMutation, useAbsentviewtotalMutation, useAbsentviewspecificMutation, useGetemailfromroomMutation, useGetroomdetailsMutation, useGetoccupiedroomsMutation, useRegisterSuperUserMutation, useLoginSuperUserMutation, useGetLoggedUserQuery, useChangeUserPasswordMutation, useSendPasswordResetEmailMutation, useResetPasswordMutation, useRegisterHostelAdminMutation, useRegisterStudentMutation, useLoginHostelAdminMutation, useLoginStudentMutation, useCreateLeaveRequestMutation, useUpdateHostelRoomMutation, useUploadcsvMutation, useRegisterHostelMutation, useMarkAbsentMutation } = userAuthApi