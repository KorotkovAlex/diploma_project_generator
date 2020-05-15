import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ServicesCompany } from '../services-companies/services-company.entity';
import { User } from '../users/user.entity';

@Entity('registretions-for-services')
export class RegistretionForService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  registrationOn: Date;

  @Column({ nullable: true })
  price: string;

  @ManyToOne(
    type => ServicesCompany,
    servicesCompany => servicesCompany.registrations,
  )
  service: ServicesCompany;

  @ManyToOne(
    type => User,
    servicesCompany => servicesCompany.registrations,
  )
  user: User;
}
