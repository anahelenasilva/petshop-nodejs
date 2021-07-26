import {
  Body,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards
} from '@nestjs/common'
import { Result } from 'src/modules/backoffice/models/result.model'
import { JwtAuthGuard } from 'src/shared/guards/auth.guard'
import { BookRoomCommand } from '../commands/book-room.command'
import { BookRoomDto } from '../dtos/book-room.dto'
import { RoomBookService } from '../services/room-book.service'

export class AgendaController {
  constructor(private readonly agendaService: RoomBookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async Book(@Req() request, @Body() model: BookRoomDto) {
    try {
      const command = new BookRoomCommand(
        request.user.document,
        model.roomId,
        model.date
      )

      await this.agendaService.Book(command)
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível reserver sua sala', false, null, error),
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
