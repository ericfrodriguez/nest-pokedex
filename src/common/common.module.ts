import { Module } from '@nestjs/common';
import { HttpModule } from 'src/libs/http/http.module';

@Module({
    imports: [HttpModule],
    exports: [HttpModule],
})
export class CommonModule {}
