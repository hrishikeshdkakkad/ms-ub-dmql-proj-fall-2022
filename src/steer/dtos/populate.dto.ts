import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phonenumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}

export class CarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  licencenumber: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}

export class DriverDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phonenumber: string;
}

export class RideMeta {
  @IsString()
  @IsNotEmpty()
  fromLat: string;

  @IsString()
  @IsNotEmpty()
  toLat: string;

  @IsString()
  @IsNotEmpty()
  fromLng: string;

  @IsString()
  @IsNotEmpty()
  toLng: string;

  @IsNumber()
  @IsNotEmpty()
  distance: number;
}

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  mode: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
}

export class Ride {
  @IsString()
  @IsNotEmpty()
  startTimestamp: string;

  @IsString()
  @IsNotEmpty()
  endTimestamp: string;
}

export class PopulateDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CustomerDto)
  @IsNotEmpty()
  customer: CustomerDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CarDto)
  @IsNotEmpty()
  car: CarDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => DriverDto)
  @IsNotEmpty()
  driver: DriverDto;

  @IsNumber()
  @IsNotEmpty()
  carType: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => RideMeta)
  @IsNotEmpty()
  rideMeta: RideMeta;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => PaymentDto)
  @IsNotEmpty()
  payment: PaymentDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Ride)
  @IsNotEmpty()
  ride: Ride;
}
