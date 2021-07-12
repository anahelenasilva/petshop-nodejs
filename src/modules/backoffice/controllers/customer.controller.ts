/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCreditCardContract } from '../contracts/customer/create-credit-card.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contract';
import { QueryContract } from '../contracts/query.contract';
import { CreateCustomerDto } from '../dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { QueryDto } from '../dtos/query.dto';
import { CreditCard } from '../models/credit-card.model';
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

    @Put()
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async put(@Param('document') document: string, @Body() model: UpdateCustomerDto) {
        try {
            await this.customerService.update(document, model);
            return new Result('Cliente alterado com sucesso', true, model, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao alterar o cliente', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':document')
    delete(@Param('document') document: string) {
        return new Result('Cliente removido com sucesso', true, document, null);
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        try {
           const customers = await this.customerService.query(model);
            return new Result(null, true, customers, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao executar a query', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createCreditCard(@Param('document') document: string, @Body() model: CreditCard) {
        try {
            await this.customerService.saveOrUpdateCreditCard(document, model);
            return new Result('Cartão de crédito criado com sucesso', true, model, null);
        } catch (error) {
            //rollback manual
            throw new HttpException(new Result('Erro ao cadastrar o cartão de crédito', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
