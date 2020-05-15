import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { AppPattern } from 'src/app_patterns/app_patterns.entity';
import { Files } from 'src/files/files.entity';
import { AboutCompany } from '../about-companies/about-company.entity';
import { ContactCompany } from 'src/contacts-companies/contacts-company.entity';
import { ServicesCompany } from 'src/services-companies/services-company.entity';

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

  @ManyToOne(
    type => AppPattern,
    appPattern => appPattern.projects,
  )
  appPattern: AppPattern;

  @OneToOne(type => Files, { nullable: true })
  @JoinColumn({ name: 'file_id' })
  projectPath: Files;

  @OneToOne(type => AboutCompany, { nullable: true })
  @JoinColumn({ name: 'about_id' })
  about: AboutCompany;

  @OneToOne(type => ContactCompany, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contacts: ContactCompany;

  @OneToMany(
    type => ServicesCompany,
    servicesCompany => servicesCompany.project,
  )
  services: ServicesCompany[];
}
