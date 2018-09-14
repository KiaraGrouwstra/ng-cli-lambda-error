declare let require;
import { Observable } from 'rxjs';
import { Component, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { make } from '../../factories';
import * as MyApp from '../../models'; // { Foo, FooItem }
import { DISPATCHER } from '../../di';
import { AppService } from '../../services/';
// reconsider as pug mixin?
@Component({
  selector: 'foo-shared',
  template: require('./foo.shared.pug'),
  styles: [],
  inputs: ['foo'],
})
export class FooSharedComp {
  disp: { [k: string]: (pl?: any) => void };
  tr: any = this.app.tr;
  @Input() foo: MyApp.Foo;
  // customers;

  constructor(
    public app: AppService,
    public route: ActivatedRoute,
    public store: Store<any>,
    @Inject(DISPATCHER) dispatcher: { crud: { [k: string]: (pl: any) => void } },
  ) {
    this.disp = dispatcher.crud;
  }

  ngOnInit() {
    // Object.assign(this, this.store.dispatcher); // update, remove
    // this.customers = this.store.select('customers');
  }

  create_item() {
    // this.disp.create_item(make.invoiceItem(this.foo.id));
  }

  openConfirm(): void {
    this.app.confirm({
      title: 'Confirm delete',
      message: 'delete this foo?',
    }).subscribe(() => {
      this.disp.remove();
    });
  }

}
