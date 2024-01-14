type TProfile = { 
    id: number;
    phone: string;
    manager_id:number;
    manager_name: string;
    source_id: number;
    source_name: string

}
 

export type TUser = {
    email:string;
    password: string;
    name: string;
    profile: TProfile;
}