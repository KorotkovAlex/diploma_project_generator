import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Files {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  path: string;
}
