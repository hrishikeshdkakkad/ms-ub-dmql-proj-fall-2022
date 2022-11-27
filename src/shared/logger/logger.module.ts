import { Global, Module } from '@nestjs/common';

import { AppLogger } from './logger.service';

@Global()
@Module({
  imports: [],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class AppLoggerModule {}
