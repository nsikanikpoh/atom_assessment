import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './transactions.repository';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repository: TransactionsRepository;
  const mockTransactionRepository = () => ({
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService, {
        provide: TransactionsRepository,
        useFactory: mockTransactionRepository,
      },],
    }).compile();

    service = await module.get<TransactionsService>(TransactionsService);
    repository = await module.get<TransactionsRepository>(TransactionsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveTransaction', () => {
    it('should save a trasaction in the database', async () => {
      expect(repository.save).not.toHaveBeenCalled();
      const newTransactionDto = {
        from: '765432',
        to: '234567',
        amount: 2000,
      };
      const createTransactionDto = {
        account: '765432',
        amount: 2000,
      };
      const result = await service.saveTransaction(newTransactionDto);
      expect(repository.save).toHaveBeenCalledWith(
        createTransactionDto,
      );
      expect(result).toHaveProperty('success');
      expect(result).toMatchObject({ success: true});
      expect(result).toHaveProperty('transaction');
    });
  });



});
