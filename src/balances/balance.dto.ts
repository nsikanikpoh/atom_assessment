
import { IsNotEmpty, IsNumberString} from 'class-validator';

export class BalanceDto {
    @IsNumberString()
    account: string;

    @IsNotEmpty()
    balance: number;
}