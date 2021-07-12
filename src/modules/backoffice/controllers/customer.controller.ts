/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { QueryDto } from '../dtos/query.dto';
import { Customer } from '../models/customer.model';
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

            const customer = new Customer(model.name, model.document, model.email, [], null, null, null, user);
            const createdCustomer = await this.customerService.create(customer);

            return new Result('Cliente criado com sucesso', true, { user: user, customer: createdCustomer }, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao cadastrar o cliente', false, null, error), HttpStatus.BAD_REQUEST);
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

    @Post('query')
    async query(@Body() model: QueryDto) {
        try {
           const customers = await this.customerService.query(model);
            return new Result(null, true, customers, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao executar a query', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
