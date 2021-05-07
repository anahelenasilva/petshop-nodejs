/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Customer } from '../models/customer.model';
@Controller('v1/customers')
export class CustomerController {

    @Get()
    get() {
        return 'Obter os clientes';
    }

    @Get(':document')
    getById(@Param('document') document: string) {
        return 'Obter o cliente ' + document;
    }

    @Post()
    post(@Body() body: Customer) {
        return body;
    }

    @Put(':document')
    put(@Param('document') document: string, @Body() body: Customer) {
        return {
            customer_document: document,
            data: body
        };
    }

    @Delete(':document')
    delete(@Param('document') document: string) {
        return document;
    }
}
