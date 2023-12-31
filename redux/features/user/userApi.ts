import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // update user api
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-user-avatar",
                method: "PUT",
                body: { avatar },
                credentials: "include" as const,
            }),
        }),
        // edit profile
        editProfile: builder.mutation({
            query: ({ name, email }) => ({
                url: "update-user-info",
                method: "PUT",
                body: {
                    name,
                    email,
                },
                credentials: "include" as const,
            })
        }),
        // 
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "update-user-password",
                method: "PUT",
                body: {
                    oldPassword,
                    newPassword
                },
                credentials: "include" as const,
            })
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "get-all-users",
                method:"GET",
                credentials: "include" as const
            })
        }),

    })
});

export const {
    useUpdateAvatarMutation,
    useEditProfileMutation,
    useUpdatePasswordMutation,
    useGetAllUsersQuery,
} = userApi;