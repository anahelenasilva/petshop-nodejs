import { Body, Post } from '@nestjs/common'
import { RoomBookService } from '../services/room-book.service'

export class AgendaController {
  constructor(private readonly agendaService: RoomBookService) {}

  @Post()
  async Book(@Body() body: any) {
    await this.agendaService.Book(body.customerId, body.roomId)
  }
}
