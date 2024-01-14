import { TSignIn } from "interfaces/auth/sign-in.type";
import { api } from "./api/axiosConfig";
import { TUser } from "interfaces/user/user.type";

class AuthService { 
    private authPath = 'auth';

    async login({email, password}: TSignIn) {
        const token = await api.post<{access_token: string, isAuth: boolean}>(`${this.authPath}/login`, {email, password});
        return token.data;
    }

    async registration () {}

    async authMe () {
      const me = await api.get<TUser>(`${this.authPath}/me`);
      return me.data;
      
    }
}

export const authService = new AuthService();