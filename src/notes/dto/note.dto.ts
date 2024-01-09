// src/note/dto/note.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
