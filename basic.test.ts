import { test, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import { MikroORM } from '@mikro-orm/core';
import { CarEntity } from './entities/Car.entity.js';
import mikroOrmConfig from './mikro-orm.config.js';
import { DriverEntity } from './entities/Driver.entity.js';

let orm: MikroORM;

beforeAll(async () => {
  orm = await MikroORM.init(mikroOrmConfig);
  await orm.schema.refreshDatabase();
});

afterAll(async () => {
  await orm.close();
});

beforeEach(async () => {
  await orm.schema.clearDatabase();
});

test('persisting 1:1 relation issue', async () => {
  const em = orm.em.fork();

  let car = em.create(CarEntity, { brand: 'skoda' });
  await em.persist(car).flush();

  const carReference = em.getReference(CarEntity, car.id);

  let driver = em.create(DriverEntity, { name: 'John Doe', car: carReference }); 
  const driverId = driver.id;
  await em.persist(driver).flush();

  const managedCar = car;
  expect(managedCar.driver).toBeDefined();
  expect(managedCar.driver.id).toStrictEqual(driverId); // Driver is defined and has an id in managed entity

  const foundCar = await em.findOneOrFail(CarEntity, { id: car.id });
  expect (foundCar).toBeDefined();
  expect (foundCar.driver).not.toBeNull(); // Driver is null in found entity
});
