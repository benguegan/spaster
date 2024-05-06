import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  @ApiProperty({ example: 'Kitty', description: 'The name of the cat' })
  name: string;

  @ApiProperty({ example: 1, description: 'The age of the cat' })
  age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  breed: string;
}
