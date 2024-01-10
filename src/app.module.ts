import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { User } from './users/entities/user.entity';
import { Note } from './notes/entities/note.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    NotesModule,
    TypeOrmModule.forRoot({
      // Your custom TypeORM configuration options here
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootroot',
      database: 'echo.notes',
      entities: [User, Note], // Specify the entity classes here
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
