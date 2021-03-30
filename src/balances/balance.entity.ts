import { Column, Entity, OneToMany, Index } from 'typeorm';
import { CustomEntity } from '../base.entity';
import { Transaction } from '../transactions/transaction.entity';

@Entity({ name: 'balances' })
export class Balance extends CustomEntity {
  
    @Column({ type: 'float4', nullable: true })
    balance: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Index({unique: true})
  account: string;

  @OneToMany(() => Transaction, transaction => transaction.balance, { onDelete: 'CASCADE' })
  transactions: Transaction[];

}
