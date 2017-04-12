import { NgModule, OpaqueToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { CovalentCoreModule } from '@covalent/core';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { schema } from './db';

/* ng2-translate */
import { TranslateModule } from 'ng2-translate';
import { TranslateService, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/src/translate.service';
export function translateLoaderFactory(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
export function langProvider() {
  return {
    storage: window.localStorage,
    storageKey: '--lang--',
    get: (): string => this.storage.getItem(this.storageKey),
    set: (lang: string): void => this.storage.setItem(this.storageKey, lang),
  };
};

import { AppComponent } from './app.component';

export const routes: Routes = [
];

// ./app/app.routing.ts
export const routing = RouterModule.forRoot(routes);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: translateLoaderFactory,
      deps: [Http],
    }),
    MaterialModule,
    CovalentCoreModule,
    routing,

    RouterModule.forRoot(routes, { useHash: true }),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    // DBModule.provideDB(schema),
  ],
  providers: [
    { provide: 'customer.lang', useFactory: langProvider },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
