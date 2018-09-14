declare let require;
import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { make } from '../../factories';
import * as MyApp from '../../models'; // { Foo, FooItem }
import { DISPATCHER } from '../../di';
import { AppService } from '../../services/';

@Component({
  selector: 'foos',
  template: require('./foo.index.pug'),
  styles: [],
})
export class FoosComp {
  disp: { [k: string]: (pl?: any) => void };
  tr: any = this.app.tr;
  foos$: Observable<MyApp.Foo[]> = this.store.select('foos');

  constructor(
    public app: AppService,
    public route: ActivatedRoute,
    public store: Store<any>,
    @Inject(DISPATCHER) dispatcher: { crud: { [k: string]: (pl: any) => void } },
  ) {
    console.log('dispatcher', dispatcher);
    this.disp = dispatcher.crud;
  }

  ngOnInit() {
    // Object.assign(this, dispatcher.foos);
    this.route.params.subscribe((params) => {
      this.disp.fooIndex(); // +params['inv_id']
    });
  }

  create() {
    this.disp.create(make.foo());
  }

}
