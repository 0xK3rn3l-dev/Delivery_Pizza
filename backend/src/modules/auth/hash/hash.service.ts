// hash/hash.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { HashField } from './hash.enum';

@Injectable()
export class HashService {
  private readonly SALT_ROUNDS = 10;

  // ========== BCRYPT (для паролей) ==========
  
  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.SALT_ROUNDS);
  }
  
  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }

  // ========== SHA-256 (для поиска по телефону) ==========
  
  /**
   * Детерминированный хэш для поиска по телефону
   * Всегда возвращает одинаковый результат для одного входа
   */
  public hashPhone(phone: string): string {
    return crypto.createHash('sha256').update(phone).digest('hex');
  }

  // ========== Утилиты ==========
  
  async hashFields<T extends object>(data: T, fields: HashField[]): Promise<T> {
    const hashedData = { ...data };
    for (const field of fields) {
      if (hashedData[field]) {
        hashedData[field] = await this.hash(hashedData[field]);
      }
    }
    return hashedData;
  }

  async hashFieldsInArray<T extends object>(items: T[], fields: HashField[]): Promise<T[]> {
    return Promise.all(items.map(item => this.hashFields(item, fields)));
  }
}