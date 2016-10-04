import {Component} from 'angular2/core';
import 'rxjs/Rx';
import {contenteditableDirective} from './contenteditableDirective';
import {HeroComponent} from './HeroComponent';
import {TransactionService} from "./transactionService";
import {Note} from "./note";

@Component({
    selector: 'noteapp',
    directives: [contenteditableDirective,HeroComponent],
    templateUrl: 'partials/noteapp.html'
})

export class AppComponent {

    newNote: Note=new Note();
    changed=false;
    openNote=-1;

    constructor(private transService:TransactionService) {
        transService.sendGetList();
    }

    get notes() {
        return this.transService.getNotes();
    }

    inputChanged() {
        this.changed=true;
    }

    // Update a post (Called from UI)
    updatePost(postId) {
        var el=this.transService.byId(postId);
        this.transService.sendPut(el);
        this.openNote=-1;
    }

    // Save/create to the rest api (called from the UI layer). NOTE: Should close after save, but 2-way d-bind doesnt work for some reason.
    savePost(e) {
        this.transService.sendPost(this.newNote);
        this.newNote=new Note();
        this.openNote=-1;
    }

    //Close all open posts on UI
    closePosts() {
        this.openNote=-1;
    }

    //Delete a post
    deletePost(postId) {
        this.transService.sendDelete(postId);
    }

    //Opens a note on the UI. Resets the old one (might be changed w/o UPDATE)
    showNote(postId) {
        if (this.openNote>=0 && this.openNote<9999) { this.transService.sendGet(this.openNote); }
        this.changed=false;
        this.openNote=postId;
    }
}