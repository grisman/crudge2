///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './appComponent';
import {HTTP_BINDINGS} from "angular2/http";
import {TransactionService} from "./transactionService";

bootstrap(AppComponent, [HTTP_BINDINGS, TransactionService]);