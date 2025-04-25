import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AgentModule } from './agent.module';

async function bootstrap() {
  const app = await NestFactory.create(AgentModule);
  app.useLogger(app.get(Logger));

  // await app.init();
  // apparently this line is required for debbuger to attach
  await app.listen(3000);
}
bootstrap();
