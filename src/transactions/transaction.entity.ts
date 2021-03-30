import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CustomEntity } from '../base.entity';
import { Balance } from '../balances/balance.entity';

@Entity({ name: 'transactions' })
export class Transaction extends CustomEntity {

    @Column({ type: 'float4', nullable: true })
    amount: number;

    @Column({ type: 'varchar', length: 300, nullable: true })
    account: string;

    @ManyToOne(type => Balance, { nullable: true })
    @JoinColumn({ name: 'balance_id' })
    balance: Balance;
}
