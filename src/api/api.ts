import axios from "axios";
import {ProfileFormikType} from "../components/Profile/ProfileInfo/ProfileDataForm";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "65f7699b-6500-4214-ae2c-c06621a5a9d2"
    }
})
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`, {})
            .then(response => response.data)
    },
    getProfile(userId: number) {
        // return instance.get(`/profile/` + userId)
        //     .then(response => response.data)
        console.warn('obsolete method. use profile api obj')
        return profileAPI.getProfile(userId)
    }
}
export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
            .then(response => response.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();

        formData.append('image', photoFile);

        return instance
            .put('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => response.data);
    },
    saveProfile(profile:ProfileFormikType) {
        return instance.put('profile', profile)
            .then(response => response.data)
    }
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}
// export const friendsAPI = {
//     getUsers(currentPageFoundFriends: number, pageSize: number) {
//         return instance
//             .get<GetUserResponseType>(
//                 `users?page=${currentPageFoundFriends}&count=${pageSize}`,
//             )
//             .then(response => response.data)
//     },
//     followingUser(id: string) {
//         return instance.post<ResponseType>(`follow/${id}`)
//     },
//     unfollowingUser(id: string) {
//         return instance.delete<ResponseType>(`follow/${id}`)
//     },
// }

