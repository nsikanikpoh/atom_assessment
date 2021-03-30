
import { IsNotEmpty, IsNumberString} from 'class-validator';

export class TransactionDto {
   
    @IsNotEmpty()
    @IsNumberString()
    from: string;

    @IsNotEmpty()
    @IsNumberString()
    to: string;

    @IsNotEmpty()
    amount: number;
}