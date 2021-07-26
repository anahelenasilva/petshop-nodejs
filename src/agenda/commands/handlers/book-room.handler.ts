import { HttpException, HttpStatus } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RoomRepository } from 'src/agenda/repositories/room.repository'
import { BookRoomCommand } from '../book-room.command'

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
  constructor(private readonly repository: RoomRepository) {}

  async execute(command: BookRoomCommand) {
    const room = await this.repository.checkAvailability(
      command.roomId,
      command.date
    )

    if (room) {
      await room.book(command.customerId, command.date)
      await this.repository.book(room)
      return
    }

    throw new HttpException('Sala não disponível', HttpStatus.BAD_REQUEST)
  }
}
