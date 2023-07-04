import {  Index, PrimaryKey, Property } from '@mikro-orm/core';
import * as crypto from 'crypto';

export abstract class CustomBaseEntity {
  @PrimaryKey()
  @Index()
  id: string = crypto.randomUUID();

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ version: true })
  version!: number;
}
