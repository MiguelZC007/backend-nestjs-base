import { Injectable, ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TransformationPipe implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toTransform(metatype)) {
      return value;
    }

    return plainToInstance(metatype, value, {
      excludeExtraneousValues: true,
    });
  }

  private toTransform(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
