import { join } from 'path';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { HttpModule } from './libs/http/http.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://username:pass@localhost:8081',
        dbName: 'pokedb',
      }),
    }),
    PokemonModule,
    CommonModule,
    SeedModule,
    HttpModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
