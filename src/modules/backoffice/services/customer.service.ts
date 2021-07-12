import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto'
import { QueryDto } from '../dtos/query.dto'
import { Customer } from '../models/customer.model'

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>
  ) {}

  async create(data: Customer): Promise<Customer> {
    const user = new this.model(data)
    return await user.save()
  }

  async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
    return await this.model.findOneAndUpdate({ document }, data)
  }

  async findAll(): Promise<Customer[]> {
    return await this.model
      .find({}, 'name email document')
      .sort('name') //para ordenar decrescente usar '-name'
      .exec() //para retornar todos os campos menos o "name", por exemplo: '-name'
  }

  async find(document: string): Promise<Customer> {
    return await this.model
      .findOne({ document })
      .populate('user', 'username')
      .exec()
  }

  async query(model: QueryDto): Promise<Customer[]> {
    return await this.model
      .find(model.query, model.fields, { skip: model.skip, limit: model.take })
      .sort(model.sort)
      .exec()
  }
}
