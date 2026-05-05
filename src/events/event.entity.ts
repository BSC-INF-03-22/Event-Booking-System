import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  location!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ default: 0 })
  capacity!: number;

  @Column({ default: true })
isActive!: boolean;
}