import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Md5 } from 'md5-typescript'

import { User } from 'src/modules/backoffice/models/user.model'
import { Customer } from '../models/customer.model'

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async create(data: User): Promise<User> {
    const user = new this.userModel(data)
    return await user.save()
  }

  async findByUsername(username): Promise<User> {
    return await this.userModel.findOne({ username: username }).exec()
  }

  async findByDocument(document): Promise<User> {
    return await this.userModel.findOne({ document: document }).exec()
  }

  async update(username: string, data: any): Promise<User> {
    return await this.userModel.findOneAndUpdate({ username }, data)
  }

  async authenticate(username, password): Promise<Customer> {
    const customer = await this.customerModel
      .findOne({ document: username })
      .populate('user')
      .exec()

    const passHash = await Md5.init(`${password}${process.env.SALT_KEY}`)
    if (passHash.toString() === customer.user.password.toString()) {
      return customer
    } else {
      return null
    }
  }
}
