import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Status } from './status/status.entity';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    StatusModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sqlite',
      synchronize: true,
      entities: [Status],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
