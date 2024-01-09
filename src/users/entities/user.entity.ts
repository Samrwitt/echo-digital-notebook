// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from './role.enum';
import {Note} from '../../notes/entities/note.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;
  
  @OneToMany(() => Note, (note) => note.user, { cascade: true })
  notes: Note[];
}
