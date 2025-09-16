import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';
import { Order } from './order.entity';


const { sendOrderNotification } = require("./order-notification.service");

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
   const order = await this.orderService.create(createOrderDto);

  // Trigger Pusher notification
  const customerId = order.customer; // get the actual saved customer's ID
  sendOrderNotification(customerId, `Your order #${order.id} has been successfully placed!`);

  return order; // finally return the saved order
  }
}