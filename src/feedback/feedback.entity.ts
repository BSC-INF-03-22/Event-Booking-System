import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  eventId!: number;

  @Column()
  message!: string;

  @Column()
  rating!: number;

  @CreateDateColumn()
  createdAt!: Date;
}