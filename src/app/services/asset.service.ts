import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { AssetFile } from '../models/asset-file';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private sanitizer: DomSanitizer) {}

  isVideo(file: AssetFile): boolean {
    return file.contentType.includes('video');
  }

  isImage(file: AssetFile): boolean {
    return file.contentType.includes('image');
  }

  get(id: number | undefined | null): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      `${environment.apiUrl}/assets/${id}`
    );
  }
}
