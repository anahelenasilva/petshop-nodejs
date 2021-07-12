import { Injectable } from '@nestjs/common'
import { Flunt } from 'src/utils/flunt'
import { CreditCard } from '../../models/credit-card.model'
import { IContract } from '../contract'

@Injectable()
export class CreateCreditCardContract implements IContract {
  errors: any[]

  validate(model: CreditCard): boolean {
    const flunt = new Flunt()

    flunt.hasMinLen(model.holder, 5, 'Nome no cartão inválido')
    flunt.isFixedLen(model.number, 16, 'Número do cartão inválido')
    flunt.hasMinLen(model.expiration, 4, 'Data de expiração do cartão inválida')

    this.errors = flunt.errors
    return flunt.isValid()
  }
}
