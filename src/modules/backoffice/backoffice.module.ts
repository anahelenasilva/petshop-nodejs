import { CacheModule, HttpModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from 'src/shared/services/auth.service'
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy'
import { AccountController } from './controllers/account.controller'

import { AddressController } from './controllers/address.controller'
import { CustomerController } from './controllers/customer.controller'
import { PetController } from './controllers/pet.controller'

import { CustomerSchema } from './schemas/customer.schema'
import { UserSchema } from './schemas/user.schemas'

import { AccountService } from './services/account.service'
import { AddressService } from './services/address.service'
import { CustomerService } from './services/customer.service'
import { PetService } from './services/pet.service'

@Module({
  imports: [
    HttpModule,
    CacheModule.register(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrKeyProvider: () => 'secretkey',
      signOptions: { expiresIn: 3600 }
    }),
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema
      },
      {
        name: 'User',
        schema: UserSchema
      }
    ])
  ],
  controllers: [
    AccountController,
    AddressController,
    CustomerController,
    PetController
  ],
  providers: [
    AccountService,
    AddressService,
    CustomerService,
    PetService,
    AuthService,
    JwtStrategy
  ]
})
export class BackofficeModule {}
