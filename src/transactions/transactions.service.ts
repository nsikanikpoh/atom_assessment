import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionDto } from './transaction.dto';
import { Transaction } from './transaction.entity';
import { Balance } from '../balances/balance.entity';
import { Connection } from 'typeorm'

@Injectable()
export class TransactionsService {

    constructor(private connection: Connection) {
    }

    async saveTransaction(transactionDto: TransactionDto): Promise<any> {
        const { from, to, amount } = transactionDto;

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();

        // lets now open a new transaction:
        await queryRunner.startTransaction();

        try {

            const fromAccount = await queryRunner.manager.findOne(Balance, { where: { account: from }});
            const toAccount = await queryRunner.manager.findOne(Balance, { where: { account: to }});
    
            if (!fromAccount || !toAccount) {
                throw new NotFoundException(`Balance record with acount number '${fromAccount || toAccount}' not found`);
            }
            if (fromAccount.balance < amount) {  
                throw new Error('Insufficient Funds');  
            }  

            const transaction= new Transaction()
            transaction.balance=fromAccount;
            transaction.account=from;
            transaction.amount=amount
            fromAccount.balance -= amount;
            toAccount.balance += amount;

            await queryRunner.manager.save( transaction);
            await queryRunner.manager.update(Balance, toAccount.id, {balance: toAccount.balance});
            await queryRunner.manager.update(Balance, fromAccount.id, {balance: fromAccount.balance});
            await queryRunner.commitTransaction();
            return { success: true, transaction };

        } catch (err) {
            await queryRunner.rollbackTransaction();
            return { success: false, error: `${err.message || 'problem creating transaction at the moment please try again later'}`}
        } finally {
            await queryRunner.release();
        }
    }
}
