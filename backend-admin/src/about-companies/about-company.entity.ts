import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('about_companies')
export class AboutCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}
