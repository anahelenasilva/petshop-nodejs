import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ana:ana123@cluster0.yzgzr.azure.mongodb.net/petdb?retryWrites=true&w=majority',
    ),
    BackofficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
