import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RoomRepository } from 'src/agenda/repositories/room.repository'
import { BookRoomCommand } from '../book-room.command'

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
  constructor(private readonly repository: RoomRepository) {}

  async execute(command: BookRoomCommand) {
    const room = await this.repository.findOneById(command.roomId)

    if (room) {
      room.book(command.customerId)
      //room.commit()
    }
  }
}
