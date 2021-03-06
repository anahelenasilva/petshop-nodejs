import { Min, Max } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class ProductArgsDto {
  @Field((type) => Int)
  @Min(0)
  skip = 0

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  take = 25
}
