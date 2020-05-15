import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Project } from 'src/projects/project.entity';
import { RegistretionForService } from 'src/registretions-for-services/registretions-for-services.entity';

@Entity('services_companies')
export class ServicesCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  price: string;

  @ManyToOne(
    type => Project,
    project => project.services,
  )
  project: Project;

  @OneToMany(
    type => RegistretionForService,
    registretionForService => registretionForService.service,
  )
  registrations: RegistretionForService[];
}
