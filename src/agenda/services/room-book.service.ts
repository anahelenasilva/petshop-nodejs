import { CommandBus } from '@nestjs/cqrs'
import { BookRoomCommand } from '../commands/book-room.command'

export class RoomService {
  constructor(private readonly commandBus: CommandBus) {}

  async Book(customerId: string, roomId: string) {
    return this.commandBus.execute(new BookRoomCommand(customerId, roomId))
  }
}
