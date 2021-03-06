import { AggregateRoot } from '@nestjs/cqrs'
import { RoomBookedEvent } from '../events/room-booked.event'

export class Room extends AggregateRoot {
  constructor(private readonly id: string) {
    super()
  }

  book(customerId: string, date: Date) {
    //regras de negócio

    this.apply(new RoomBookedEvent(customerId, this.id))
  }
}
