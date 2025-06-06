export type Permission = Pick<PermissionTable, 'id' | 'name' | 'description'>

export interface Role extends Pick<RoleTable, 'id' | 'name' | 'description'> {
  permissions: Permission[]
}
