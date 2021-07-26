import { Injectable } from '@nestjs/common'
import { Room } from '../models/room.model'

@Injectable()
export class RoomRepository {
  async checkAvailability(id: string, date: Date): Promise<Room> {
    console.log('RoomRepository.findOneById() - recuperando a sala....')

    //ler do banco
    return new Room('123456789')
  }

  async book(room: Room) {
    //salvar no banco
  }
}
