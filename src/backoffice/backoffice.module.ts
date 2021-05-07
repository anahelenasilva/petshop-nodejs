/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CustomerController } from './contollers/customer.controller';

@Module({
  controllers: [CustomerController],
})
export class BackofficeModule {}
