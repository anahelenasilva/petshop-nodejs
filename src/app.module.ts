import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BackofficeModule } from 'src/modules/backoffice/backoffice.module'
import { StoreModule } from 'src/modules/store/store.module'
import { ReportsModule } from 'src/modules/reports/reports.module'
import { AgendaModule } from './agenda/agenda.module'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql'
    }),
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ana123',
      database: 'petshop',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    BackofficeModule,
    StoreModule,
    AgendaModule,
    ReportsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
