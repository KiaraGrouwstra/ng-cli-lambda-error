import * as R from 'ramda';
import * as L from 'partial.lenses';
import { domainMeta, genNgrx, mergeNgrx, searchMatches, Rest } from 'ng2ls';

let { foo } = domainMeta({
  foo: {},
});

// todo:
// - handle additional effects: `fail`, navigation upon success
// - authorization: which properties, links and buttons to show in the UI? how to make the guards? base on same DAX expressions as in the back? predicate per class/prop?

// api: { foos: Rest<Foo> }

let obj = {
  crud: {
    init: {
      [foo.plural]: {},
    },
    reducers: {},
    selectors: {
      /*fooIndex*/ [foo.plural]: L.get(foo.plural), // L.collect([foo.plural, L.values]), // this selector is obvious, generate?
      fooSearch: [
        ['query', 'fooIndex'],
        ([qry, foos]) => foos.filter(searchMatches(qry)),
      ],
    },
    // class FooEffects extends MyEffects { data = {
    //   index: {
    //     read: true,
    //     fn: api.foos.get, // if nested, pass in needed id
    //     ok: foo.merge,
    //   },
    // } }
    effects: {
      fooIndex: {
        read: true,
        fn: function() { return this.api.foos.get() }, // if nested, pass in needed id
        ok: foo.merge,
      },
      fooDetail: {
        read: true,
        fn: function(x) { return this.api.foos[foo.rId(x)].get() }, // if nested, pass in needed ids
        ok: foo.set,
      },
      // fooSearch: {
      //   read: true,
      //   // fallback: [],
      //   fn: function(qry) { return this.api.foos['customSearchSubPath'].get({ q: qry }) },
      //   ok: ,
      // },
      fooCreate: {
        fn: function() { return this.api.foos.post() },
        ok: foo.set,
        // router.navigate([foo.plural, foo.lId(x)])
      },
      fooEdit: {
        fn: function(x) { return this.api.foos[foo.rId(x)].put(x) }, // or patch -- handle filtering at form, no reference point here
        ok: foo.set,
        // router.navigate([foo.plural, foo.lId(x)]) // n/a if auto-save
      },
      fooDelete: {
        fn: function(x) { return this.api.foos[foo.rId(x)].delete() },
        // ok: (x) => L.remove(foo.localNav(x)),
        ok: foo.remove,
        // router.navigate([foo.plural]) // if deleted from local view, not if deleted from some parent
      },

      // https://github.com/ngrx/example-app/blob/master/src/app/effects/collection.ts
      // @Effect({ dispatch: false }) openDB$ = defer(() => this.db.open('books_app'))
      fooOpenDb: {
        defer: true, // { dispatch: false }, wrap fn in defer(), skip out on action subscribing
        fn: function() { return this.db.open('foo_app') },
      },
      fooLoad: {
        read: true,
        init: null, // load from start, no param
        fn: function() { return this.db.query(foo.plural).toArray() },
        ok: foo.merge,
      },
      fooAdd: {
        fn: function(x) { return {
          obs: this.db.insert(foo.plural, [x]),
          ok: x,
          fail: x,
        } },
        ok: foo.set,
      },
      fooRemove: {
        fn: function(x) { return {
          obs: this.db.executeWrite(foo.plural, 'delete', [foo.lId(x)]),
          ok: x,
          fail: x,
        } },
        ok: foo.remove,
      },

    },
  },
};

export let ngrxStuff = genNgrx(obj);

// export let { actions, reducers, selectors, effects, dispatchers, initialState } = mergeNgrx(ngrxStuff);
export let mergedNgrx = mergeNgrx(ngrxStuff);

// problem: above code uses lambdas, not allowed in AoT
console.log(mergedNgrx);
