import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderDetails } from './order-details.entity';
import { CreateOrderDto } from './order.dto';
import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const customer = await this.customersRepository.findOne({ where: { id: createOrderDto.customerId } });
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    const order = this.ordersRepository.create({ customer });
    let totalPrice = 0;

    const orderDetails: OrderDetails[] = [];
    for (const item of createOrderDto.items) {
      const product = await this.productsRepository.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new HttpException(`Product with ID ${item.productId} not found`, HttpStatus.NOT_FOUND);
      }
      
      const detail = this.orderDetailsRepository.create({
        quantity: item.quantity,
        priceAtTime: product.price,
        product,
        order,
      });

      orderDetails.push(detail);
      totalPrice += detail.priceAtTime * detail.quantity;
    }

    order.totalPrice = totalPrice;
    await this.ordersRepository.save(order);
    await this.orderDetailsRepository.save(orderDetails);

    const createdOrder = await this.ordersRepository.findOne({ 
      where: { id: order.id },
      relations: ['customer', 'items', 'items.product']
    });

    if (!createdOrder) {
        throw new HttpException('Order not found after creation', HttpStatus.INTERNAL_SERVER_ERROR);
    }

   

    return createdOrder;
  }
}