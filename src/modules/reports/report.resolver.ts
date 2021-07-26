import { Args, Query, Resolver } from '@nestjs/graphql'
import { ProductArgsDto } from './dtos/product-args.dto'
import { Product } from './models/product.model'
import { ReportService } from './reports.service'

@Resolver((of) => Product)
export class ReportResolver {
  constructor(private readonly service: ReportService) {}

  @Query((returns) => Product)
  async product(@Args('id') id: string): Promise<Product> {
    const product = await this.service.findOneById(id)
    return product
  }

  @Query((returns) => [Product])
  async products(@Args('id') args: ProductArgsDto): Promise<Product[]> {
    const products = await this.service.findAll(args)
    return products
  }
}
