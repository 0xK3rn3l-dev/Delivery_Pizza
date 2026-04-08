import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PhoneEncryption {
    private readonly ENCRYPTION_KEY: string;
    private readonly ALGORITHM = 'aes-256-gcm';

    constructor() {
        const key = process.env.PHONE_ENCRYPTION_KEY;

        if (!key) {
            throw new Error('PHONE_ENCRYPTION_KEY is not set in environment variables');
        }

        if (key.length !== 64) {
            throw new Error('PHONE_ENCRYPTION_KEY must be 32 bytes (64 hex characters) for AES-256');
        }
        this.ENCRYPTION_KEY = key;
    }

    public encryptPhone(phone: string): {encryptedData: string; iv: string; authTag: string;} {
        try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(
                this.ALGORITHM, 
                Buffer.from(this.ENCRYPTION_KEY, 'hex'), 
                iv
            );

            let encrypted = cipher.update(phone, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            
            const authTag = cipher.getAuthTag();
            
            return {
                encryptedData: encrypted,
                iv: iv.toString('hex'),
                authTag: authTag.toString('hex')
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to encrypt phone: ${message}`);
        }
    }

    public decryptPhone(
        encryptedData: string, 
        iv: string, 
        authTag: string
    ): string {
        try {
            const decipher = crypto.createDecipheriv(
                this.ALGORITHM,
                Buffer.from(this.ENCRYPTION_KEY, 'hex'),
                Buffer.from(iv, 'hex')
            );
            
            decipher.setAuthTag(Buffer.from(authTag, 'hex'));
            
            let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            
            return decrypted;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to decrypt phone: ${message}`);
        }
    }

    public encryptPhoneToString(phone: string): string {
        const result = this.encryptPhone(phone);
        return `${result.iv}:${result.authTag}:${result.encryptedData}`;
    }

    public decryptPhoneFromString(encryptedString: string): string {
        const [iv, authTag, encryptedData] = encryptedString.split(':');
        if (!iv || !authTag || !encryptedData) {
            throw new Error('Invalid encrypted string format');
        }
        return this.decryptPhone(encryptedData, iv, authTag);
    }
}