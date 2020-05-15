import { Controller } from '@nestjs/common';
import { ServicesCompaniesService } from './services-companies.service';
import { CrudController, Crud } from '@nestjsx/crud';
import { ServicesCompany } from './services-company.entity';

@Crud({
  model: {
    type: ServicesCompany,
  },
})
@Controller('services-companies')
export class ServicesCompaniesController {
  constructor(public service: ServicesCompaniesService) {}

  get base(): CrudController<ServicesCompany> {
    return this;
  }
}
