import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  SWAGGER_API_ROOT,
  SWAGGER_API_NAME,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_AUTH_NAME,
  SWAGGER_API_AUTH_LOCATION,
  SWAGGER_API_SCHEMES,
} from './constants';
import { isProdMode } from '../../app.environment';

export const setupSwagger = (app: INestApplication) => {
  if (!isProdMode) {
    const options = new DocumentBuilder()
      .setTitle(SWAGGER_API_NAME)
      .setDescription(SWAGGER_API_DESCRIPTION)
      .setVersion(SWAGGER_API_CURRENT_VERSION)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
  }
};
