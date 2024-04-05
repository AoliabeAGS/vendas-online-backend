import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentEntity } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDTO } from '../order/dtos/create-order.dto';
import { Repository } from 'typeorm';
import { PaymentCreditCardEntity } from './entities/payment-credit-card.entity';
import { PaymentType } from '../payment-status/enums/payment-type.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async createPayment(createOderDTO: CreateOrderDTO): Promise<PaymentEntity> {
    if (createOderDTO.amountPayments) {
      const paymentCreditCard = new PaymentCreditCardEntity(
        PaymentType.Done,
        0,
        0,
        0,
        createOderDTO,
      );
      return this.paymentRepository.save(paymentCreditCard);
    } else if (createOderDTO.codePix && createOderDTO.datePayment) {
      const paymentPix = new PaymentCreditCardEntity(
        PaymentType.Done,
        0,
        0,
        0,
        createOderDTO,
      );
      return this.paymentRepository.save(paymentPix);
    }
    throw new BadRequestException(
      'Amount Payments or Pix Code and Date Payment not foud',
    );
  }
}
