import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaType } from './enums/media-type.enum';
import { MediaStatus } from './enums/media-status.enum';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: MediaType;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column({ default: 'Active' })
  status: MediaStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
