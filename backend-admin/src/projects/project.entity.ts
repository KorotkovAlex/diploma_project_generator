import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ unique: true })
  version: number;

  @Column({ name: 'backend-api', length: 100, nullable: true })
  backendApi: string;
}
