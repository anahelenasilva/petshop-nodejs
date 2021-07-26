import { Injectable } from '@nestjs/common'
import { ProductArgsDto } from './dtos/product-args.dto'
import { Product } from './models/product.model'

@Injectable()
export class ReportService {
  async findOneById(id: string): Promise<Product> {
    return {
      id: id,
      title: 'Product 1',
      description: 'This is product 1'
    }
  }

  async findAll(args: ProductArgsDto): Promise<Product[]> {
    return [
      {
        id: '1',
        title: 'Product 1',
        description: 'This is product 1'
      },
      {
        id: '2',
        title: 'Product 2',
        description: 'This is product 2'
      }
    ] as Product[]
  }
}
