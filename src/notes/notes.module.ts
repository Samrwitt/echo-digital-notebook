import { Module } from '@nestjs/common';
import { NoteService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
  controllers: [NotesController],
  providers: [NoteService],
})
export class NotesModule {}
