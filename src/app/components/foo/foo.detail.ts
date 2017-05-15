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
  selector: 'foo',
  template: require('./foo.detail.pug'),
  styles: [],
})
export class FooComp {
  disp: { [k: string]: (pl?: any) => void };
  tr: any = this.app.tr;
  foo$: Observable<MyApp.Foo>;

  constructor(
    public app: AppService,
    public route: ActivatedRoute,
    public store: Store<any>,
    @Inject(DISPATCHER) dispatcher: { foo: { [k: string]: (pl: any) => void } },
  ) {
    this.disp = dispatcher.foo;
  }

  ngOnInit() {
    // Object.assign(this, dispatcher.foos);
    this.foo$ = this.store.select('foos'); // id
    this.route.params.subscribe((params) => {
      this.disp.fooDetail({ invoice_id: +params['inv_id'], id: +params['id'] });
      // .then(x => {
      //   this.item = makeInvoiceItem(x);
      // });
    });
  }

}

