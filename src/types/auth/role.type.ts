import { TPermission } from "./permission.type";

export type TRole = {
    id: number;
    name: string;
    color: string;
    alias: string;
    is_reserved: boolean;
    statuses_all: boolean;
    accepted_all: boolean;
    permissions: TPermission[];
}