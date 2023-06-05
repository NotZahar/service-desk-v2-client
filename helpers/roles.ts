export enum Role {
    CUSTOMER = 'customer',
    ADMIN = 'admin',
    DISPATCHER = 'dispatcher', 
    MANAGER = 'manager',
    SPECIALIST = 'specialist'
}

export type roleType = keyof typeof Role;

export enum EmployeeRole {
    ADMIN = 'admin',
    DISPATCHER = 'dispatcher', 
    MANAGER = 'manager',
    SPECIALIST = 'specialist'
}

export type employeeRoleType = keyof typeof EmployeeRole;
