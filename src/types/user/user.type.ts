import { TRole } from "./role.type";

type TProfile = { 
    id: number;
    phone: string;
    manager_id:number;
    manager_name: string;
    source_id: number;
    source_name: string

}
 

export type TUser = {
    id: number;
    email:string;
    password: string;
    name: string;
    profile: TProfile;
    role: TRole;
}