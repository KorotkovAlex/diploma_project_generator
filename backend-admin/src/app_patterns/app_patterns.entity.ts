import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_patterns')
export class AppPattern {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;
}
