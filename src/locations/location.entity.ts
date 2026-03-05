import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('locations')
@Index(['user', 'visitedAt'])
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.locations, { onDelete: 'CASCADE' })
  user: User;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column('double precision', { nullable: true })
  accuracy: number;

  @Column({ type: 'bigint' })
  visitedAt: number;

  @CreateDateColumn()
  createdAt: Date;
}
