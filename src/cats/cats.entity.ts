import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sharedate: Date;
}
