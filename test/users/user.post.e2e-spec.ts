
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';

import { dropDatabase } from '../helpers/drop-database.helper';
import { bootstrapNestApplication } from '../helpers/boostrap-nest-application.helper';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { completeUser, missingEmailUser, missingFirstNameUser, missingLastNameUser } from './user.post.e2e-spec.sample-data';

describe('[Users] POST /users', () => {
  let app: INestApplication<App>;
  let configService: ConfigService;
  let httpServer: App;
  beforeEach(async () => {
    app = await bootstrapNestApplication();
    configService = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer();
  });
  afterEach(async () => {
    await dropDatabase(configService);
   await app.close();
  });
 it('should create a user',() => {
  console.log(completeUser);
  return request(httpServer)
  .post('/users/create')
  .send(completeUser).then((res) => {
  expect(res.status).toBe(201);
  expect(res.body.data.firstName).toBeDefined();
  });
 });
//  it('should create a user with missing first name',() => {
//   console.log(missingFirstNameUser);
//   return request(httpServer)
//   .post('/users')
//   .send({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//   });
//  });
//  it('should create a user with missing last name',() => {
//   console.log(missingLastNameUser);
//   return request(httpServer)
//   .post('/users')
//   .send({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//   });
//  });
//  it('should create a user with missing email',() => {
//   console.log(missingEmailUser);
//   return request(httpServer)
//   .post('/users')
//   .send({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//   });
//  });
});
