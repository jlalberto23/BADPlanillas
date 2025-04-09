export interface Role extends Pick<RoleTable, 'id' | 'name' | 'description'> {}

export interface Permission extends Pick<PermissionTable, 'id' | 'name' | 'description'> {}
