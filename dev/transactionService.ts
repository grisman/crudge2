/**
 * Created by Haddock on 2016-10-04.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {Note} from "./note";
// The Model

@Injectable()
export class TransactionService {
    baseDomain='https://cors-anywhere.herokuapp.com/http://timesheet-1172.appspot.com/';
    basePath='e5764e9e/notes';

//    baseDomain='http://localhost:3004/'; // Used json-server locally as a fake REST API
//    basePath='notes';

    notes: Note[] = [];

    constructor(private http:Http) { }

    public getNotes() {
        return this.notes;
    }

    // Helper function to get a note by its id
    public byId(id) {
        for (var i=0; i<this.notes.length; i++) {
            if (this.notes[i].id==id) return this.notes[i];
        }
        return null;
    }

    /***
     * Send a http GET request for the element postId contained in the defined URL endpoint -> baseDomain+basePath+postId.
     * Expects response element as json data -> {"id","title","description"}
     * @param postId
     */
    sendGet(postId) {
        this.http.get(this.baseDomain+this.basePath+'/'+postId)
            .map(res => res.json()).subscribe(
                data => {
                    var el=this.byId(data.id);
                    el.title=data.title;
                    el.description=data.description;
                },
                err => console.error('DAOservice error on sendGet: '+err),
                () => console.log('Retrieved item.')
        );
    }

    /***
     * Sends a http GET request for the URL endpoint -> baseDomain+basePath.
     * Expects a json array list of available elements -> [ {id,title} , {...} ]
     * adds description and editable(view related) property
     */
    sendGetList() {
        this.http.get(this.baseDomain+this.basePath)
            .map(res => res.json()).subscribe(
                data => this.notes=data,
                err => console.log('DAOservice error on GetList: ',err),
                () => {
                    console.log('Retrieved list.')
                    //Fill in all the descriptions
                    this.notes.forEach( note => {
                            this.sendGet(note.id);
                        }
                    );
                }
            );
    }

    /***
     * Sends a http Post request for the rest endpoint
     * @param newNote - An instance of Note
     */
    sendPost(newNote: Note) {
        var postObject= {"title": newNote.title, "description": newNote.description};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this.baseDomain+this.basePath,JSON.stringify(postObject),{"headers":headers})
            .map(res => res.json()).subscribe(
                data => this.notes.push(data),
                err => console.error('DAOservice error on Post: '+err),
                () => console.log("Created new item")
        );
    }

    /***
     * Sends a http PUT request for the URL endpoint -> baseDomain+basePath+postId.
     * Updates a existing element with id=postId
     * Json format assumed at server is: {"title","description"}
     * Updates list
     */

    sendPut(updateNote: Note) {
        var postObject= {"title": updateNote.title, "description": updateNote.description};
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.put(this.baseDomain+this.basePath+'/'+updateNote.id,JSON.stringify(postObject),{headers})
            .map(res => res.json()).subscribe(
                data => {
                    var el=this.byId(data.id);
                    el.title=data.title;
                    el.description=data.description;
                },
                err => console.log("DAOservice error on Put: "+err),
                () => console.log("Updated element.")
        );
    }

    /***
     * Sends a http DELETE request for the URL endpoint -> baseDomain+basePath+postId.
     * Server returns status code 204(success without any responsebody) upon successfull call.
     * Updates list
     */

    sendDelete(postId) {
        this.http.delete(this.baseDomain+this.basePath+'/'+postId).subscribe(
            () => {
                this.notes.forEach((el, i) => {
                    if (el.id === postId) { this.notes.splice(i, 1); }
                });
                console.log("Note deleted.");
            }
        );
    }
}