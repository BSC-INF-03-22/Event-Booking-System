import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryColumn({ type: 'number' })
  id!: number;

  @Column()
  userId!: number;

  @Column()
  message!: string;

  @Column({ default: false })
  isRead!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @BeforeInsert()
  setId() {
    this.id = Date.now();
  }
}