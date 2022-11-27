import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { SteerModule } from './steer/steer.module';

@Module({
  imports: [SharedModule, AuthModule, SteerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
