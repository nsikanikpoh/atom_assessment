import { Controller, Post, UsePipes, ValidationPipe, Body, Patch, Param} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './transaction.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(private transactionsService: TransactionsService,
        ) {  
    }

    @Post()
    @UsePipes(ValidationPipe)
    saveTransaction(
        @Body() transactionDto: TransactionDto,
    ): Promise<any> {
        return this.transactionsService.saveTransaction(transactionDto);
    }

}
