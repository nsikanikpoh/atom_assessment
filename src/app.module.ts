import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './orm.config';
import { TransactionsModule } from './transactions/transactions.module';
import { BalancesModule } from './balances/balances.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [ThrottlerModule.forRoot({
    ttl: 300,
    limit: 1,
  }), TypeOrmModule.forRoot(config), TransactionsModule, BalancesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
