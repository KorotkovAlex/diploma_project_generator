import { Controller } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { AboutCompaniesService } from './about-companies.service';
import { AboutCompany } from './about-company.entity';

@Crud({
  model: {
    type: AboutCompany,
  },
})
@Controller('about-companies')
export class AboutCompaniesController {
  constructor(public service: AboutCompaniesService) {}

  get base(): CrudController<AboutCompany> {
    return this;
  }
}
