import { NestFactory } from '@nestjs/core';
import { ProcessModule } from './process.module';

async function bootstrap() {
  const app = await NestFactory.create(ProcessModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
