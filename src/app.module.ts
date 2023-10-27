import { join } from 'path';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://ericrodriguez:topito2009@localhost:8081',
        dbName: 'pokedb',
      }),
    }),
    PokemonModule,
    CommonModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
