import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {  

  @PrimaryColumn()
  readonly id: string;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  email: string; 

  @Column()
  firstName: string; 

  @Exclude()
  @Column()
  hash: string;

  @Column()
  isAdmin: boolean;

  @Column()
  lastName: string; 

  _password: string;

  @Exclude()
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

export { User };
