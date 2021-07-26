import { CommandBus } from '@nestjs/cqrs'
import { BookRoomCommand } from '../commands/book-room.command'

export class RoomBookService {
  constructor(private readonly commandBus: CommandBus) {}

  async Book(command: BookRoomCommand) {
    return this.commandBus.execute(command)
  }
}
