// src/notes/notes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async create(user: User, title: string, content: string): Promise<Note> {
    const note = this.noteRepository.create({ title, content, user });
    return this.noteRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async findOne(id: number): Promise<Note> {
    return this.noteRepository.findOneById(id);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepository.findOneById(id);

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    // Update the note properties here based on updateNoteDto
    // ...

    return this.noteRepository.save(note);
  }

  async remove(user: User, id: number): Promise<void> {
    const note = await this.noteRepository.findOneById(id);

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    // Check user permissions and delete the note
    // ...

    await this.noteRepository.remove(note);
  }
}
