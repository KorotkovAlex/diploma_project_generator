import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column()
  version: number;

  @Column({ name: 'backend-api', length: 100, nullable: true })
  backendApi: string;

  @ManyToMany(type => User)
  @JoinTable({ name: 'projects_users' })
  users: User[];
}
