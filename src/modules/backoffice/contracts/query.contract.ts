import { Injectable } from '@nestjs/common'
import { Pet } from 'src/modules/backoffice/models/pet.model'
import { Flunt } from 'src/utils/flunt'
import { QueryDto } from '../dtos/query.dto'
import { IContract } from './contract'

@Injectable()
export class QueryContract implements IContract {
  errors: any[]

  validate(model: QueryDto): boolean {
    const flunt = new Flunt()

    if (!model.query) {
      model.query = {}
    }

    flunt.isGreaterThan(
      model.take,
      1000,
      'Sua query não pode retornar mais que 1000 registros'
    )

    this.errors = flunt.errors
    return flunt.isValid()
  }
}
