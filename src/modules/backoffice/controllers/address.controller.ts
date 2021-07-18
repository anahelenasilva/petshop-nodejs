import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors
} from '@nestjs/common'
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor'
import { CreateAddressContract } from '../contracts/address/create-address.contract'
import { AddressType } from '../enums/address-type'
import { Address } from '../models/address.model'
import { Result } from '../models/result.model'
import { AddressService } from '../services/address.service'

@Controller('v1/addresses')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(@Param('document') document, @Body() model: Address) {
    try {
      await this.service.create(document, model, AddressType.Billing)
      return new Result(
        'Endereço de Cobrança criado com sucesso',
        true,
        model,
        null
      )
    } catch (error) {
      //rollback manual
      throw new HttpException(
        new Result(
          'Erro ao cadastrar o endereço de entrega',
          false,
          null,
          error
        ),
        HttpStatus.BAD_REQUEST
      )
    }
  }

  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document,
    @Body() model: Address
  ) {
    try {
      await this.service.create(document, model, AddressType.Shipping)
      return new Result(
        'Endereço de Entrega criado com sucesso',
        true,
        model,
        null
      )
    } catch (error) {
      //rollback manual
      throw new HttpException(
        new Result(
          'Erro ao cadastrar o endereço de entrega',
          false,
          null,
          error
        ),
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
