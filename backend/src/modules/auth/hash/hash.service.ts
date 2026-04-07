import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashField } from './hash.enum';

@Injectable()
export class HashService {
  private readonly SALT_ROUNDS = 10;

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.SALT_ROUNDS);
  }
  
  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }

  async hashFields<T extends object>(data: T, fields: HashField[]): Promise<T> {
    const hashedData = { ...data };
    for (const field of fields) {
      if (hashedData[field]) {
        hashedData[field] = await this.hash(hashedData[field]);
      }
    }
    return hashedData;
  }

  // Для массового хеширования массива объектов
  async hashFieldsInArray<T extends object>(items: T[], fields: HashField[]): Promise<T[]> {
    return Promise.all(items.map(item => this.hashFields(item, fields)));
  }
}