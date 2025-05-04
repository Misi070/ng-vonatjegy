import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernameFromEmail',
  standalone: true
})
export class UsernameFromEmailPipe implements PipeTransform {
  transform(email: string): string {
    if (!email || typeof email !== 'string') return '';
    const atIndex = email.indexOf('@');
    return atIndex > -1 ? email.substring(0, atIndex) : email;
  }
}
