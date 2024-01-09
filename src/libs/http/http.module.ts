import { Module } from '@nestjs/common';
import { HttpAdapter } from './http.adapter';

@Module({
  providers: [HttpAdapter],
  exports: [HttpAdapter]
})
export class HttpModule {}
