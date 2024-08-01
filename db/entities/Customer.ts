import { Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity } from 'typeorm';

@Entity("customer")

export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    mobilePhone: string;

    @Column()
    balance: number;
}
