import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class Base64Service {
  constructor(private sanitizer: DomSanitizer) {}

  image(base64: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      `data:image/png;base64, ${base64}`
    );
  }

  video(base64: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      `data:video/mp4;base64, ${base64}`
    );
  }
}
