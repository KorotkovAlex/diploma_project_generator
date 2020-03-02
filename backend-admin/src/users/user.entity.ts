import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Project } from '../projects/project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  login: string;

  @Column({ length: 100 })
  password: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ length: 100, nullable: true })
  phone: string;

  @Column({ length: 100, nullable: true })
  firstName: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @CreateDateColumn({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ length: 100, nullable: true })
  gender: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<any> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject() {
    const { id, password, ...user } = this;

    return user;
  }

  @ManyToMany(
    type => Project,
    projects => projects.users,
  )
  @JoinTable({ name: 'projects_users' })
  projects: Project[];
}
