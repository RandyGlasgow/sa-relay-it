import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  Unique,
  BeforeInsert,
} from 'typeorm';

@Entity()
@Unique(['statusCode'])
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  statusCode: number;

  @Column()
  message: string;

  @Column()
  name: string;

  @Column()
  isActive: boolean;

  @AfterInsert()
  logInsert() {
    console.log('Inserted status: ', this);
  }

  @BeforeInsert()
  updateIsActive() {
    if (this.isActive === undefined) {
      return (this.isActive = false);
    }
    return (this.isActive = true);
  }
}
