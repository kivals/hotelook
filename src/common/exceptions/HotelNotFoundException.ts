import { NotFoundException } from '@nestjs/common';

//TODO for example
export class HotelNotFoundException extends NotFoundException {
  constructor(hotelId: number) {
    super(`Hotel with id ${hotelId} not found`);
  }
}
