import { Injectable } from '@nestjs/common';
import { google, drive_v3 } from 'googleapis';

@Injectable()
export class GoogleDrive { 
    private drive: drive_v3.Drive
    auth() {
        const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY_DRIVE,
        },
        scopes: ['https://www.googleapis.com/auth/drive'],
        });
        this.drive = google.drive({ version: 'v3', auth });

        return this.drive
    }
}
