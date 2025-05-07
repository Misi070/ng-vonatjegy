import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'email',
  standalone: true
})
export class EmailPipe implements PipeTransform {
  transform(email: string): string {
    if (!email) return '';
    const [username, domain] = email.split('@');
    const obfuscatedUsername = username.length > 3 ? username.slice(0, 3) + '...' : username;
    return `${obfuscatedUsername}@${domain}`;
  }
}
