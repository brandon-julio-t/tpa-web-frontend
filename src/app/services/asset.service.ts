import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private sanitizer: DomSanitizer) {}

  get(id: number | undefined): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      `${environment.apiUrl}/assets/${id}`
    );
  }
}
