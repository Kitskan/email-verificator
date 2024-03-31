import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('email')
export class EmailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  email: string;

  @Column({ default: false, name: 'is_valid' })
  isValid: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  stamp: Date;
}
