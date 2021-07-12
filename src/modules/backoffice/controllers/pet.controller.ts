/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreatePetContract } from '../contracts/pets/create-pet.contract';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { PetService } from '../services/pet.service';

@Controller('v1/pets')
export class PetController {

    constructor(
        private readonly service: PetService) { }

   
    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            await this.service.create(document, model);
            return new Result('Pet criado com sucesso', true, model, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao cadastrar o pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            await this.service.update(document, id, model);
            return new Result('Pet alterado com sucesso', true, model, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao editar o pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
