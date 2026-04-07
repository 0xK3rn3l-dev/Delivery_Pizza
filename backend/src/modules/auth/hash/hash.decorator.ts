import { SetMetadata } from '@nestjs/common';
import { HashField } from './hash.enum';

export const HASH_FIELDS_KEY = 'hash_fields';
export const HashFields = (...fields: HashField[]) => SetMetadata(HASH_FIELDS_KEY, fields);