import { NotFoundException } from '@nestjs/common';

//TODO for example
export class HotelNotFoundException extends NotFoundException {
  constructor(hotelId: string) {
    super(`Hotel with id ${hotelId} not found`);
  }
}
