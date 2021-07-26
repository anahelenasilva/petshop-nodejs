import { Args, Resolver } from '@nestjs/graphql'
import { Product } from './models/product.model'
import { ReportService } from './reports.service'

@Resolver((of) => Product)
export class ReportResolver {
  constructor(private readonly service: ReportService) {}

  async product(@Args('id') id: string): Promise<Product> {
    const product = await this.service.findOneById(id)
    return product
  }
}
