// src/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users') // Specifies the database table name as 'users'
export class User {
  @PrimaryGeneratedColumn('uuid') // Uses UUID for unique IDs
  id: string;

  @Column({ unique: true, nullable: false }) // Email must be unique and non-nullable
  email: string;

  @Column({ nullable: false }) // Password hash is required
  password: string;

  @Column({ nullable: true }) // First name is optional
  first_name: string;

  @Column({ nullable: true }) // Last name is optional
  last_name: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  last_login_at: Date;
}