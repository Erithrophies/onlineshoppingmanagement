import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Order } from '../order/order.entity';
import { CreatePaymentDto } from './payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const order = await this.ordersRepository.findOne({ where: { id: createPaymentDto.orderId } });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    
    const newPayment = this.paymentsRepository.create({
      ...createPaymentDto,
      status: 'completed',
      order,
    });

    return this.paymentsRepository.save(newPayment);
  }
}