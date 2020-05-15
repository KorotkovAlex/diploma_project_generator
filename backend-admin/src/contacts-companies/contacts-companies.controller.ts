import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ContactCompany } from './contacts-company.entity';
import { ContactsCompaniesService } from './contacts-companies.service';

@Crud({
  model: {
    type: ContactCompany,
  },
})
@Controller('contacts-companies')
export class ContactsCompaniesController {
  constructor(public service: ContactsCompaniesService) {}

  get base(): CrudController<ContactCompany> {
    return this;
  }
}
