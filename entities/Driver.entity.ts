import { Entity, Index, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CarEntity } from './Car.entity.js';
import { CustomBaseEntity } from './Base.entity.js';

@Entity()
export class DriverEntity extends CustomBaseEntity{
  // @PrimaryKey()
  // @Index()
  // id: string = crypto.randomUUID();
  
  @OneToOne(() => CarEntity, (car) => car.driver, {
    orphanRemoval: true,
  })
  car: CarEntity;

  @Property()
  name: string;


}
