import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';

@Entity()
@ObjectType()
@InputType('FilesInput')
export class Files {
  @Field(type => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ unique: true })
  path: string;
}
