import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module'
import { StoreModule } from 'src/modules/store/store.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ana:ana123@cluster0.yzgzr.azure.mongodb.net/petdb?retryWrites=true&w=majority'
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
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
