import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { IContract } from 'src/modules/backoffice/contracts/contract'
import { Result } from 'src/modules/backoffice/models/result.model'

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public contract: IContract) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const body = context.switchToHttp().getRequest().body
    const valid = this.contract.validate(body)

    if (!valid) {
      throw new HttpException(
        new Result(
          'Ops... Algo saiu errado',
          false,
          null,
          this.contract.errors
        ),
        HttpStatus.BAD_REQUEST
      )
    }

    return next.handle()
  }
}
