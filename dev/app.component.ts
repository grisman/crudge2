import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {contenteditableDirective} from './contenteditableDirective';

@Component({
    selector: 'noteapp',
    directives: [contenteditableDirective],
    template: `
        <div class="jumbotron hero" [ngStyle]="heroStyle">
            <div class="container">
                <h1>Notes galore<i class="fa fa-chevron-right" aria-hidden="true"></i><i class="fa fa-chevron-right" aria-hidden="true"></i><i class="fa fa-chevron-right" aria-hidden="true"></i></h1>
                <p>The future and past notes.</p>
            </div>
        </div>
        <section>
            <div class="container">
                <div class="col-sm-4" *ngFor="let note of arrayNotes">
                    <div (click)="showNote($event,note.id)" class="notebox">
                        <h2 *ngIf="note.editable" contenteditable [(modelContent)]="note.title"></h2>
                        <h2 *ngIf="!note.editable">{{note.title}}</h2>
                        <p *ngIf="note.editable" contenteditable [(modelContent)]="note.description" [textContent]="note.description"></p>
                        <button class="upd" *ngIf="note.editable" (click)="updatePost(note.id)">Update</button>
                        <button class="del" *ngIf="note.editable" (click)="deletePost(note.id)">Delete</button>
                        <div class="clearfix"></div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="notebox" (click)="openCreatePost()">
                        <h2><i class="fa fa-plus fa-5" aria-hidden="true"></i></h2>
                        <h2 *ngIf="createNote" class="inputfield" contenteditable [(modelContent)]="createNoteContent.title">Title</h2>
                        <p *ngIf="createNote" class="inputfield" contenteditable [(modelContent)]="createNoteContent.description">Description</p>
                        <button *ngIf="createNote" class="save" (click)="savePost()">Save</button>                        
                    </div>
                </div>            
            </div>
        </section>
    `
})

export class AppComponent {
    baseDomain='https://cors-anywhere.herokuapp.com/http://timesheet-1172.appspot.com/';
    basePath='e5764e9e/notes';

    //baseDomain='http://localhost:3004/'; // Used json-server locally as a fake REST API
    //basePath='notes/';

    //Data vars
    arrayNotes=[];
    createNoteContent={"title":"","description":""};
    createNote=false;

    //Background image changer vars
    backgrounds=[{"img":"img/photo-1452421822248-d4c2b47f0c81.jpg"},{"img":"img/photo-1454166155302-ef4863c27e70.jpg"},{"img":"img/photo-1475506631979-72412c606f4d.jpg"}];
    activeBackground=0;
    heroStyle={"background-image" : "url("+this.backgrounds[this.activeBackground].img+")" };


    constructor(public http: Http) {
        this.sendGetList();
        this.runAwesomeBackgroundChanger();
    }

    //Switches backgrounds for the hero
    runAwesomeBackgroundChanger() {
        Observable.interval(1500)
            .subscribe(() => {
                this.activeBackground=(++this.activeBackground)%this.backgrounds.length;
                this.heroStyle={"background-image" : "url("+this.backgrounds[this.activeBackground].img+")" };
            });
    }

    // Open the create post box for input
    openCreatePost() {
        this.closePosts();
        this.createNote=true;
    }

    // Update a post (Called from UI)
    updatePost(postId) {
        var el=this.getElementWithId(this.arrayNotes,postId);
        this.sendPutThenGetList(el.id,el.title,el.description);
    }

    // Save/create to the rest api (called from the UI layer). NOTE: Should close after save, but 2-way d-bind doesnt work for some reason.
    savePost(e) {
        this.sendPostThenGetList(this.createNoteContent.title,this.createNoteContent.description);
        this.createNoteContent.title="";
        this.createNoteContent.description="";
        this.createNote=false;
    }

    //Close all open posts on UI
    closePosts() {
        this.arrayNotes.forEach(el => el.editable=false );
    }

    //Delete a post (called from UI)
    deletePost(postId) {
        this.sendDeleteThenGetList(postId);
    }
    //Opens a note on the UI and loads the description from the rest api.
    showNote(e,postId) {
        var el=this.getElementWithId(this.arrayNotes,postId);
        if (el.editable==true) return;
        this.arrayNotes.forEach(element => element.editable=false );
        this.deleteDescriptions();
        this.sendGet(postId);
        el.editable=true;
    }

    // Clear out all descriptions. Descriptions are made available as a post is opened.
    // Reason for that is that the API does not deliver descriptions on listing but rather has to be sync'ed
    // one at a time. This way the frontend reflects the rest api functionality.
    deleteDescriptions() {
        this.arrayNotes.forEach( el => el.description="" );
    }

    // Standard REST verb - POST, GET, PUT, DELETE -> CREATE, RETRIEVE, UPDATE, DELETE

    /***
     * Send a http GET request for the element postId contained in the defined URL endpoint -> baseDomain+basePath+postId.
     * Expects response element as json data -> {"id","title","description"}
     * @param postId
     */
    sendGet(postId) {
        this.http.get(this.baseDomain+this.basePath+'/'+postId)
            .map(res => res.json())
            .subscribe(
                data => this.storeDescription(data),
                err => this.logError("GET REQUEST NOT VALID, ERROR: ",err),
                () => console.log('Retrieval of element with id='+postId+' completed.')
            );
    }

    /***
     * Sends a http GET request for the URL endpoint -> baseDomain+basePath.
     * Expects a json array list of available elements -> [ {id,title} , {...} ]
     */
    sendGetList() {
        this.http.get(this.baseDomain+this.basePath)
            .map(res => res.json())
            .subscribe(
                data => this.outputResultArray(data),
                err => this.logError("CANNOT RETRIEVE ELEMENT LIST, ERROR: ",err),
                () => console.log('Retrieval of all elements completed.')
            );
    }

    /***
     * Sends a http POST request for the URL endpoint -> baseDomain+basePath.
     * Json format assumed at server is: {"title","description"}
     * Always remember to set the http headers with correct content type <--- IMPORTANT
     */
    sendPost(title, description) {
        var postObject= {"title": title, "description": description};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.baseDomain+this.basePath,JSON.stringify(postObject),{"headers":headers})
            .map(res => res.json())
            .subscribe(
                data => this.outputText("ADDED ELEMENT WITH ID="+data.id),
                err => this.logError("CREATE REQUEST NOT VALID, ERROR: ", err),
                () => console.log('Added element.')
            );
    }

    sendPostThenGetList(title, description) {
        var postObject= {"title": title, "description": description};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.baseDomain+this.basePath,JSON.stringify(postObject),{"headers":headers})
            .map(res => res.json())
            .subscribe(
                data => this.outputText("ADDED ELEMENT WITH ID="+data.id),
                err => this.logError("CREATE REQUEST NOT VALID, ERROR: ", err),
                () => this.sendGetList()
            );
    }

    /***
     * Sends a http PUT request for the URL endpoint -> baseDomain+basePath+postId.
     * Updates a existing element with id=postId
     * Json format assumed at server is: {"title","description"}
     */
    sendPut(postId, title, description) {
        var postObject= {"title": title, "description": description};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.put(this.baseDomain+this.basePath+'/'+postId,JSON.stringify(postObject),{headers})
            .map(res => res.json())
            .subscribe(
                data => this.outputText("UPDATED ELEMENT WITH ID="+data.id),
                err => this.logError("UPDATE REQUEST NOT VALID, ERROR CODE: ",err),
                () => console.log('Updated element.')
            );
    }

    sendPutThenGetList(postId, title, description) {
        var postObject= {"title": title, "description": description};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.put(this.baseDomain+this.basePath+'/'+postId,JSON.stringify(postObject),{headers})
            .map(res => res.json())
            .subscribe(
                data => this.outputText("UPDATED ELEMENT WITH ID="+data.id),
                err => this.logError("UPDATE REQUEST NOT VALID, ERROR CODE: ",err),
                () => this.sendGetList()
            );
    }

    /***
     * Sends a http DELETE request for the URL endpoint -> baseDomain+basePath+postId.
     * Server returns status code 204(success without any responsebody) upon successfull call.
     */
    sendDelete(postId) {
        this.http.delete(this.baseDomain+this.basePath+'/'+postId)
            .map(res => res.json())
            .subscribe(
                data => this.outputText("DELETED ELEMENT."),
                err => this.logError("DELETE REQUEST NOT VALID, ERROR CODE: ",err),
                () => console.log('Deleted element.')
            );
    }

    sendDeleteThenGetList(postId) {
        this.http.delete(this.baseDomain+this.basePath+'/'+postId)
            .subscribe(
                () => this.sendGetList()
            );
    }


    /***
     * HELPER FUNCTIONS
     */

    // Helper function to get the element that has a certain ID from an array
    getElementWithId(arr,id) {
        for (var j=0; j<arr.length; j++) {
            if (arr[j].id==id) return arr[j];
        }
        return null;
    }

    // Helper function to copy description and title properties from an object
    storeDescription(data) {
        var el=this.getElementWithId(this.arrayNotes,data.id);
        el.description=data.description;
        el.title=data.title;

    }

    // Helper function to output errors to the console
    logError(text,err) {
        console.error('Error: ' + err);
    }

    // Helper function to output messages to User, not used atm.
    outputText(text) {
   //     print(text); newline();
    }

    // Helper function to output object props - title and description to user, not used atm.
    outputResult(data) {
    //    print("TITLE: "+data.title); newline();
    //    print("DESCRIPTION: "+data.description); newline();
    }

    // Helper function to store and prepare the data for presentational layer.
    outputResultArray(data) {
        this.arrayNotes=data;
        this.deleteDescriptions();
        this.arrayNotes.forEach(el => { el.editable=false });
    }
}