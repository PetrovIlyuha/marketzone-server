import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { User_Gender_Enum } from './types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'login', type: 'varchar' })
  login: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'name_first', type: 'varchar' })
  nameFirst: string;

  @Column({ name: 'name_last', type: 'varchar' })
  nameLast: string;

  @Column({ name: 'birth_date', type: 'timestamp', nullable: true })
  birthDate: Date;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: User_Gender_Enum,
    nullable: true,
  })
  gender: User_Gender_Enum | null;
}
