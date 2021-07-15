import { Entity, Column, PrimaryColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {  

  @PrimaryColumn()
  readonly id: string;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  email: string; 

  @Column()
  firstName: string; 

  @Column()
  hash: string;

  @Column()
  isAdmin: boolean;

  @Column()
  lastName: string; 

  _password: string;

  @Column()
  salt: string;

  @UpdateDateColumn()
  updateAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
} 
