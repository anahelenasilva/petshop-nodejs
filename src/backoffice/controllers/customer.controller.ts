/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAddressContract } from '../contracts/customer/create-address.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreatePetContract } from '../contracts/customer/create-pet.contract';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { Address } from '../models/address.model';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService) { }

    @Get()
    async getAll() {
        const customers = await this.customerService.findAll();
        return new Result(null, true, customers, null);
    }

    @Get(':document')
    async getByDocument(@Param('document') document: string) {
        const customer = await this.customerService.find(document);
        return new Result(null, true, customer, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(new User(model.document, model.password, true));

            var customer = new Customer(model.name, model.document, model.email, [], null, null, null, user);
            const createdCustomer = await this.customerService.create(customer);

            return new Result('Cliente criado com sucesso', true, { user: user, customer: createdCustomer }, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao cadastrar o cliente', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/addresses/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.customerService.addBillingAddress(document, model);
            return new Result('Endereço de cobrança criado com sucesso', true, model, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao cadastrar o endereço de cobrança', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/addresses/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.customerService.addShippingAddress(document, model);
            return new Result('Endereço de Entrega criado com sucesso', true, model, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao cadastrar o endereço de entrega', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            await this.customerService.createPet(document, model);
            return new Result('Pet criado com sucesso', true, model, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao cadastrar o pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document/pets/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            await this.customerService.updatePet(document, id, model);
            return new Result('Pet alterado com sucesso', true, model, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao editar o pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document')
    put(@Param('document') document: string, @Body() body) {
        return new Result('Cliente atualizado com sucesso', true, body, null);
    }

    @Delete(':document')
    delete(@Param('document') document: string) {
        return new Result('Cliente removido com sucesso', true, document, null);
    }
}
