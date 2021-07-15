import * as swaggerJsDoc from 'swagger-jsdoc';
import { OAS3Options } from 'swagger-jsdoc';

export const swaggerConfig: OAS3Options = {
  apis: ['./src/modules/**/*.ts'],
  definition: {
    info: {
      contact: {
        email: 'williamcesar.andrade@outlook.com'
      },
      description:
        'The project APP Lançamentos consist in an personal economy administrator, dedicated at assistence in control off users expenses.',
      title: 'API - APP Lançamentos',
      version: '0.0.1'
    },
    openapi: '3.0.3',
    servers: [
      {
        description: 'DEV',
        url: 'http://localhost:3000/'
      }
    ]
  }
};

export const swaggerDocs = swaggerJsDoc(swaggerConfig);
