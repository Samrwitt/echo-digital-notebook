// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/entities/role.enum'; // Adjust the path based on your project structure

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
