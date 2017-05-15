import { InjectionToken } from '@angular/core';
import { Obj } from 'ng2ls';

export let DISPATCHER = new InjectionToken<Obj<Obj<(pl: any) => void>>>('dispatcher');
