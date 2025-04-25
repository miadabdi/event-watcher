import { Controller } from '@nestjs/common';
import { ProcessService } from './process.service';

@Controller()
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}
}
