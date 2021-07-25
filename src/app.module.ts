import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module'
import { StoreModule } from 'src/modules/store/store.module'

@Module({
  imports: [
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
    StoreModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
