import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateQueueDto {
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly email: string;
}
