import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { RegistretionForService } from './registretions-for-services.entity';
import { RegistretionsForServicesService } from './registretions-for-services.service';

@Crud({
  model: {
    type: RegistretionForService,
  },
})
@Controller('registretions-for-services')
export class RegistretionsForServicesController {
  constructor(public service: RegistretionsForServicesService) {}

  get base(): CrudController<RegistretionForService> {
    return this;
  }
}
