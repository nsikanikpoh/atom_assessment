import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { BalanceRepository } from '../balances/balance.repository';


@Module({
  providers: [TransactionsService, TransactionsRepository, BalanceRepository],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
