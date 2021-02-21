import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MAPBOX_API_KEY, // ngx-mapbox-gl uses this injection token to provide the accessToken
  NgxMapboxGLModule,
} from 'ngx-mapbox-gl';

export interface IMyLibMapModuleConfig {
  mapboxToken: string;
}

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule, NgxMapboxGLModule],
})
export class MapboxModule {
  static forRoot(
    config: IMyLibMapModuleConfig
  ): ModuleWithProviders<MapboxModule> {
    return {
      ngModule: MapboxModule,
      providers: [
        {
          provide: MAPBOX_API_KEY,
          useValue: config.mapboxToken,
        },
      ],
    };
  }
}
