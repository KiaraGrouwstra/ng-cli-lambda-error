import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
// import { CovalentCoreModule } from '@covalent/core';
import {
  // CovalentChipsModule,
  // CovalentJsonFormatterModule,
  // CovalentMediaModule,
  // CovalentMenuModule,
  // CovalentNotificationsModule,
  // CovalentPagingModule,
  // CovalentExpansionPanelModule,
  // CovalentSearchModule,
  // CovalentStepsModule,
  // CovalentDialogsModule,
  // CovalentFileModule,
  // CovalentLoadingModule,
  // CovalentCommonModule,
  // CovalentDataTableModule,
  // CovalentLayoutModule,
  // CovalentHighlightModule,
  // CovalentMarkdownModule,
} from '@covalent/core'; // https://github.com/Teradata/covalent/blob/master/src/platform/core/index.ts
// import { CovalentHttpModule } from '@covalent/http';
// import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { schema } from './db';
import { trace } from 'ng2ls';
import { DISPATCHER } from './di';

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
// import { FooComp, FoosComp, FooSharedComp } from './components/foo/';

// import { reducers, effects, initialState, dispatchers } from '../../ngrx';
import { mergedNgrx } from '../../ngrx';
// let { reducers, effects, initialState, dispatchers } = mergedNgrx;
let reducers = mergedNgrx.reducers;
let effects = mergedNgrx.effects;
let initialState = mergedNgrx.initialState;
let dispatchers = mergedNgrx.dispatchers;

export let dispatcherFactory = (store: any/*Store<any>*/) => dispatchers(store);

export const routes: Routes = [
];

// ./app/app.routing.ts
export const routing = RouterModule.forRoot(routes);

export function counterReducer(state: number = 0, action /*: Action*/) {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;

		case 'DECREMENT':
			return state - 1;

		case 'RESET':
			return 0;

		default:
			return state;
	}
}

@NgModule(trace('stuff', {
  declarations: [
    AppComponent,
    FooComp,
    FoosComp,
    FooSharedComp,
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
    // CovalentCoreModule,
    // CovalentDialogsModule,
    routing,
    // StoreModule.provideStore(reducers, initialState),
    StoreModule.provideStore({ counter: counterReducer }),
    // StoreModule.forFeature('foo', reducers.foo, { initialState: initialState.foo }),

    RouterModule.forRoot(routes, { useHash: true }),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(effects.crud),
    // DBModule.provideDB(schema),
  ],
  providers: [
    { provide: 'customer.lang', useFactory: langProvider },
    { provide: DISPATCHER, useFactory: dispatcherFactory, deps: [Store] },
  ],
  bootstrap: [AppComponent]
}))
export class AppModule { }
