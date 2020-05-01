import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Files } from '../files/files.entity';
import { Project } from '../projects/project.entity';

@Entity('app_patterns')
export class AppPattern {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @OneToOne(type => Files, { nullable: true })
  @JoinColumn({ name: 'file_id' })
  imageURL: Files;

  @OneToMany(
    type => Project,
    project => project.appPattern,
  )
  projects: AppPattern[];
}
