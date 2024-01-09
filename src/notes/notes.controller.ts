// src/note/note.controller.ts
import { Controller, Get, Req, Post, Body, Patch, Param, Delete, ForbiddenException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { NoteService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Roles } from '../auth/decorators/roles.decorator'; // Import the Roles decorator
import { UserRole } from '../users/entities/role.enum'; // Adjust the path based on your project structure
import { CurrentUser } from '../auth/decorators/current-user.decorator'; // Import the CurrentUser decorator
import { User } from '../users/entities/user.entity'; // Adjust the path based on your project structure
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    const { title, content } = createNoteDto;
    const user = req.user;
    return this.noteService.create(user, title, content);
  }
  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }
//+id converts the idparameter to number before passing it
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  @Roles(UserRole.User, UserRole.Admin)
  async remove(@CurrentUser() currentUser: User, @Param('id') id: string) {
    const noteId = +id;

    // Admins can delete any note, users can only delete their own notes
    if (currentUser.role === UserRole.User) {
      const note = await this.noteService.findOne(noteId);

      if (!note || note.user.id !== currentUser.id) {
        throw new ForbiddenException('You can only delete your own notes.');
      }
    }

    return this.noteService.remove(currentUser, noteId);
  }
}
