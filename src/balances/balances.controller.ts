import { Controller, Post, UsePipes, ValidationPipe, Body, Patch, Param} from '@nestjs/common';
import { BalancesService } from './balances.service'
import { BalanceDto } from './balance.dto'

@Controller('balances')
export class BalancesController {

    constructor(private transactionsService: BalancesService,
        ) {  
    }

    @Post()
    @UsePipes(ValidationPipe)
    saveTransaction(
        @Body() bal: BalanceDto,
    ): Promise<any> {
        return this.transactionsService.saveBalanceRecord(bal);
    }
}
