import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module'
import { StoreModule } from 'src/modules/store/store.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ana:ana123@cluster0.yzgzr.azure.mongodb.net/petdb?retryWrites=true&w=majority'
    ),
    BackofficeModule,
    StoreModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
