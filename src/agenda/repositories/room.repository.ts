import { Injectable } from '@nestjs/common'
import { Room } from '../models/room.model'

@Injectable()
export class RoomRepository {
  async findOneById(id: string): Promise<Room> {
    console.log('RoomRepository.findOneById() - recuperando a sala....')

    return new Room('123456789')
  }
}