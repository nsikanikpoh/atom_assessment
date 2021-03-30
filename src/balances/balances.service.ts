import { Injectable } from '@nestjs/common';
import { BalanceDto } from './balance.dto'
import { Connection } from 'typeorm'
import { Balance } from './balance.entity'

@Injectable()
export class BalancesService {


    constructor(
        private connection: Connection,
        
    ) {
    }


    async saveBalanceRecord(balDto: BalanceDto): Promise<any> {
        const { account, balance } = balDto;

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();

        const rec= new Balance()
        rec.balance=balance;
        rec.account=account;

        // lets now open a new transaction:
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(rec);
            await queryRunner.commitTransaction();
            return { success: true, balance: rec };

        } catch (err) {
            await queryRunner.rollbackTransaction();
            return { success: false, error: `${err.message || 'problem creating record at the moment please try again later'}`}
        } finally {
            await queryRunner.release();
        }
    }

}
