import * as R from 'ramda';
import { Injectable } from '@angular/core';
import { TdDialogService } from '@covalent/core';
import { TranslateService } from 'ng2-translate';
import * as i18n from '../i18n/';
import { pathProxy } from 'proxy-dsl';

@Injectable()
export class AppService {
  
  constructor(
    public dialogService: TdDialogService,
    public translate: TranslateService,
  ) {}

  get lang(): string {
    return this.translate.currentLang;
  }

  get raw(): any {
    return i18n[this.lang];
  }

  tr = pathProxy((path: string[], pars = {}) => {
    let target = R.pipe(
      R.length,
      R.range(0),
      <(ns: number[]) => string[]> R.map(R.flip(R.drop)(path)),
      R.find(R.flip(R.path)(this.raw)),
    )(path) || R.last(path);
    return R.pipe(
      JSON.stringify,
      R.replace(/{{\s?([^{}\s]*)\s?}}/g,
        (substr: string, b: string) => R.path(b.split('.'), pars) || substr
      ),
      JSON.parse,
    )(target);
  });

  confirm = (opts) => this.dialogService
      .openConfirm(R.merge(opts, {
        // cancelButton: this.tr.cancel(),
        // acceptButton: this.tr.confirm(),
      }))
      .afterClosed()
      .filter((accept: boolean) => accept)

}
