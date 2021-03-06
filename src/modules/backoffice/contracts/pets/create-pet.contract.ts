import { Injectable } from '@nestjs/common'
import { Pet } from 'src/modules/backoffice/models/pet.model'
import { Flunt } from 'src/utils/flunt'
import { IContract } from '../contract'

@Injectable()
export class CreatePetContract implements IContract {
  errors: any[]

  validate(model: Pet): boolean {
    const flunt = new Flunt()

    flunt.hasMinLen(model.name, 2, 'Nome inválido')
    flunt.hasMinLen(model.gender, 3, 'Gênero inválido')
    flunt.hasMinLen(model.kind, 3, 'Tipo inválido')
    flunt.hasMinLen(model.brand, 3, 'Raça inválida')

    this.errors = flunt.errors
    return flunt.isValid()
  }
}
