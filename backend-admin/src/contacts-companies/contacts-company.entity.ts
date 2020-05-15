import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact_companies')
export class ContactCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  price: string;
}
