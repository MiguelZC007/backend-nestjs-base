import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const { code, meta } = exception;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (code) {
      case 'P2025': {
        status = HttpStatus.NOT_FOUND;
        message = 'Registro no existe';
        break;
      }

      case 'P2002': {
        status = HttpStatus.CONFLICT;
        message = 'El registro ya existe con el atributo ' + meta.target;
        break;
      }

      case 'P1000': {
        status = HttpStatus.BAD_GATEWAY;
        message = 'Error de conexión con la base de datos';
        break;
      }

      case 'P2000': {
        status = HttpStatus.BAD_REQUEST;
        message =
          'El valor proporcionado para la columna es demasiado largo para el tipo de columna.';
        break;
      }

      case 'P2001': {
        status = HttpStatus.NOT_FOUND;
        message = 'El registro buscado no existe';
        break;
      }

      case 'P2003': {
        status = HttpStatus.BAD_REQUEST;
        message = 'La restricción de la Foreign Key no se cumple';
        break;
      }

      case 'P2022': {
        status = HttpStatus.BAD_GATEWAY;
        message = `La columna ${meta.column} no existe en la base de datos actual.`;
        break;
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
      exception,
    });
  }
}
