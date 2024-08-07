import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';
import { createCanBoundTo } from '@casl/react';
import { TUser } from 'types/user/user.type';

export type Actions = 'create_order' | 'manage_catalog' | 'modify_clients' | 'view_all' | 'manage' ;
export type Subjects = 'orders' | 'catalog' | 'clients' | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export const defineAbilityFor = (user: TUser): AppAbility => {
    const { can, rules } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.role) {
        if (user.role.accepted_all) {
            can('manage', 'all');
        }
        user.role.permissions.forEach(permission => {
            const action = permission.name as Actions;
            const subject = permission.group_name as Subjects;
            can(action, subject);
        });
    }

    return createMongoAbility(rules);
};

const initialAbility = defineAbilityFor({} as TUser); 

export const Can = createCanBoundTo(initialAbility);

