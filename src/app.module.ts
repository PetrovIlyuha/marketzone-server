import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormModule } from './db/typeorm.module';
import { ConfigModule } from './config.module';
import { UserModule } from './entities/user/user.module';

@Module({
  imports: [TypeormModule, ConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
