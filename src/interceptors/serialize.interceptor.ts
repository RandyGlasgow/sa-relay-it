import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

/**
 * Returns a serialized version of the given DTO and data.
 * @param dto
 * @param data
 * @returns data of type dto
 */
export function serialize<T>(dto: ClassConstructor, data: T) {
  return plainToClass(dto, data, {
    // only show the items noted by the @Expose() decorator
    excludeExtraneousValues: true,
  });
}

export class SerializeInterceptor implements NestInterceptor {
  // instantiate object and define the dto to use
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return serialize(this.dto, data);
      }),
    );
  }
}

// generic serialize
// given a class and a data object, return a new object with the class
