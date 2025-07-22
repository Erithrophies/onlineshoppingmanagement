import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';


async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
