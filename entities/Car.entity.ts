import { Entity, Property, OneToOne, Index, PrimaryKey } from "@mikro-orm/core";
import { DriverEntity } from "./Driver.entity.js";
import { CustomBaseEntity } from "./Base.entity.js";

@Entity()
export class CarEntity extends CustomBaseEntity{

  
  @Property()
  brand: string;

  @OneToOne({ nullable: true, type: "DriverEntity" })
  driver?: DriverEntity;


}
