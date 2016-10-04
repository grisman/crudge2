System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', './contenteditableDirective'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Rx_1, contenteditableDirective_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (contenteditableDirective_1_1) {
                contenteditableDirective_1 = contenteditableDirective_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http) {
                    this.http = http;
                    this.baseDomain = 'https://cors-anywhere.herokuapp.com/http://timesheet-1172.appspot.com/';
                    this.basePath = 'e5764e9e/notes';
                    //baseDomain='http://localhost:3004/'; // Used json-server locally as a fake REST API
                    //basePath='notes/';
                    //Data vars
                    this.arrayNotes = [];
                    this.createNoteContent = { "title": "", "description": "" };
                    this.createNote = false;
                    //Background image changer vars
                    this.backgrounds = [{ "img": "img/photo-1452421822248-d4c2b47f0c81.jpg" }, { "img": "img/photo-1454166155302-ef4863c27e70.jpg" }, { "img": "img/photo-1475506631979-72412c606f4d.jpg" }];
                    this.activeBackground = 0;
                    this.heroStyle = { "background-image": "url(" + this.backgrounds[this.activeBackground].img + ")" };
                    this.sendGetList();
                    this.runAwesomeBackgroundChanger();
                }
                //Switches backgrounds for the hero
                AppComponent.prototype.runAwesomeBackgroundChanger = function () {
                    var _this = this;
                    Rx_1.Observable.interval(1500)
                        .subscribe(function () {
                        _this.activeBackground = (++_this.activeBackground) % _this.backgrounds.length;
                        _this.heroStyle = { "background-image": "url(" + _this.backgrounds[_this.activeBackground].img + ")" };
                    });
                };
                // Open the create post box for input
                AppComponent.prototype.openCreatePost = function () {
                    this.closePosts();
                    this.createNote = true;
                };
                // Update a post (Called from UI)
                AppComponent.prototype.updatePost = function (postId) {
                    var el = this.getElementWithId(this.arrayNotes, postId);
                    this.sendPutThenGetList(el.id, el.title, el.description);
                };
                // Save/create to the rest api (called from the UI layer). NOTE: Should close after save, but 2-way d-bind doesnt work for some reason.
                AppComponent.prototype.savePost = function (e) {
                    this.sendPostThenGetList(this.createNoteContent.title, this.createNoteContent.description);
                    this.createNoteContent.title = "";
                    this.createNoteContent.description = "";
                    this.createNote = false;
                };
                //Close all open posts on UI
                AppComponent.prototype.closePosts = function () {
                    this.arrayNotes.forEach(function (el) { return el.editable = false; });
                };
                //Delete a post (called from UI)
                AppComponent.prototype.deletePost = function (postId) {
                    this.sendDeleteThenGetList(postId);
                };
                //Opens a note on the UI and loads the description from the rest api.
                AppComponent.prototype.showNote = function (e, postId) {
                    var el = this.getElementWithId(this.arrayNotes, postId);
                    if (el.editable == true)
                        return;
                    this.arrayNotes.forEach(function (element) { return element.editable = false; });
                    this.deleteDescriptions();
                    this.sendGet(postId);
                    el.editable = true;
                };
                // Clear out all descriptions. Descriptions are made available as a post is opened.
                // Reason for that is that the API does not deliver descriptions on listing but rather has to be sync'ed
                // one at a time. This way the frontend reflects the rest api functionality.
                AppComponent.prototype.deleteDescriptions = function () {
                    this.arrayNotes.forEach(function (el) { return el.description = ""; });
                };
                // Standard REST verb - POST, GET, PUT, DELETE -> CREATE, RETRIEVE, UPDATE, DELETE
                /***
                 * Send a http GET request for the element postId contained in the defined URL endpoint -> baseDomain+basePath+postId.
                 * Expects response element as json data -> {"id","title","description"}
                 * @param postId
                 */
                AppComponent.prototype.sendGet = function (postId) {
                    var _this = this;
                    this.http.get(this.baseDomain + this.basePath + '/' + postId)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.storeDescription(data); }, function (err) { return _this.logError("GET REQUEST NOT VALID, ERROR: ", err); }, function () { return console.log('Retrieval of element with id=' + postId + ' completed.'); });
                };
                /***
                 * Sends a http GET request for the URL endpoint -> baseDomain+basePath.
                 * Expects a json array list of available elements -> [ {id,title} , {...} ]
                 */
                AppComponent.prototype.sendGetList = function () {
                    var _this = this;
                    this.http.get(this.baseDomain + this.basePath)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.outputResultArray(data); }, function (err) { return _this.logError("CANNOT RETRIEVE ELEMENT LIST, ERROR: ", err); }, function () { return console.log('Retrieval of all elements completed.'); });
                };
                /***
                 * Sends a http POST request for the URL endpoint -> baseDomain+basePath.
                 * Json format assumed at server is: {"title","description"}
                 * Always remember to set the http headers with correct content type <--- IMPORTANT
                 */
                AppComponent.prototype.sendPost = function (title, description) {
                    var _this = this;
                    var postObject = { "title": title, "description": description };
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.post(this.baseDomain + this.basePath, JSON.stringify(postObject), { "headers": headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.outputText("ADDED ELEMENT WITH ID=" + data.id); }, function (err) { return _this.logError("CREATE REQUEST NOT VALID, ERROR: ", err); }, function () { return console.log('Added element.'); });
                };
                AppComponent.prototype.sendPostThenGetList = function (title, description) {
                    var _this = this;
                    var postObject = { "title": title, "description": description };
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.post(this.baseDomain + this.basePath, JSON.stringify(postObject), { "headers": headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.outputText("ADDED ELEMENT WITH ID=" + data.id); }, function (err) { return _this.logError("CREATE REQUEST NOT VALID, ERROR: ", err); }, function () { return _this.sendGetList(); });
                };
                /***
                 * Sends a http PUT request for the URL endpoint -> baseDomain+basePath+postId.
                 * Updates a existing element with id=postId
                 * Json format assumed at server is: {"title","description"}
                 */
                AppComponent.prototype.sendPut = function (postId, title, description) {
                    var _this = this;
                    var postObject = { "title": title, "description": description };
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.put(this.baseDomain + this.basePath + '/' + postId, JSON.stringify(postObject), { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.outputText("UPDATED ELEMENT WITH ID=" + data.id); }, function (err) { return _this.logError("UPDATE REQUEST NOT VALID, ERROR CODE: ", err); }, function () { return console.log('Updated element.'); });
                };
                AppComponent.prototype.sendPutThenGetList = function (postId, title, description) {
                    var _this = this;
                    var postObject = { "title": title, "description": description };
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.put(this.baseDomain + this.basePath + '/' + postId, JSON.stringify(postObject), { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.outputText("UPDATED ELEMENT WITH ID=" + data.id); }, function (err) { return _this.logError("UPDATE REQUEST NOT VALID, ERROR CODE: ", err); }, function () { return _this.sendGetList(); });
                };
                /***
                 * Sends a http DELETE request for the URL endpoint -> baseDomain+basePath+postId.
                 * Server returns status code 204(success without any responsebody) upon successfull call.
                 */
                AppComponent.prototype.sendDelete = function (postId) {
                    var _this = this;
                    this.http.delete(this.baseDomain + this.basePath + '/' + postId)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.outputText("DELETED ELEMENT."); }, function (err) { return _this.logError("DELETE REQUEST NOT VALID, ERROR CODE: ", err); }, function () { return console.log('Deleted element.'); });
                };
                AppComponent.prototype.sendDeleteThenGetList = function (postId) {
                    var _this = this;
                    this.http.delete(this.baseDomain + this.basePath + '/' + postId)
                        .subscribe(function () { return _this.sendGetList(); });
                };
                /***
                 * HELPER FUNCTIONS
                 */
                // Helper function to get the element that has a certain ID from an array
                AppComponent.prototype.getElementWithId = function (arr, id) {
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j].id == id)
                            return arr[j];
                    }
                    return null;
                };
                // Helper function to copy description and title properties from an object
                AppComponent.prototype.storeDescription = function (data) {
                    var el = this.getElementWithId(this.arrayNotes, data.id);
                    el.description = data.description;
                    el.title = data.title;
                };
                // Helper function to output errors to the console
                AppComponent.prototype.logError = function (text, err) {
                    console.error('Error: ' + err);
                };
                // Helper function to output messages to User, not used atm.
                AppComponent.prototype.outputText = function (text) {
                    //     print(text); newline();
                };
                // Helper function to output object props - title and description to user, not used atm.
                AppComponent.prototype.outputResult = function (data) {
                    //    print("TITLE: "+data.title); newline();
                    //    print("DESCRIPTION: "+data.description); newline();
                };
                // Helper function to store and prepare the data for presentational layer.
                AppComponent.prototype.outputResultArray = function (data) {
                    this.arrayNotes = data;
                    this.deleteDescriptions();
                    this.arrayNotes.forEach(function (el) { el.editable = false; });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'noteapp',
                        directives: [contenteditableDirective_1.contenteditableDirective],
                        template: "\n        <div class=\"jumbotron hero\" [ngStyle]=\"heroStyle\">\n            <div class=\"container\">\n                <h1>Notes galore<i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></h1>\n                <p>The future and past notes.</p>\n            </div>\n        </div>\n        <section>\n            <div class=\"container\">\n                <div class=\"col-sm-4\" *ngFor=\"let note of arrayNotes\">\n                    <div (click)=\"showNote($event,note.id)\" class=\"notebox\">\n                        <h2 *ngIf=\"note.editable\" contenteditable [(modelContent)]=\"note.title\"></h2>\n                        <h2 *ngIf=\"!note.editable\">{{note.title}}</h2>\n                        <p *ngIf=\"note.editable\" contenteditable [(modelContent)]=\"note.description\" [textContent]=\"note.description\"></p>\n                        <button class=\"upd\" *ngIf=\"note.editable\" (click)=\"updatePost(note.id)\">Update</button>\n                        <button class=\"del\" *ngIf=\"note.editable\" (click)=\"deletePost(note.id)\">Delete</button>\n                        <div class=\"clearfix\"></div>\n                    </div>\n                </div>\n\n                <div class=\"col-sm-4\">\n                    <div class=\"notebox\" (click)=\"openCreatePost()\">\n                        <h2><i class=\"fa fa-plus fa-5\" aria-hidden=\"true\"></i></h2>\n                        <h2 *ngIf=\"createNote\" class=\"inputfield\" contenteditable [(modelContent)]=\"createNoteContent.title\">Title</h2>\n                        <p *ngIf=\"createNote\" class=\"inputfield\" contenteditable [(modelContent)]=\"createNoteContent.description\">Description</p>\n                        <button *ngIf=\"createNote\" class=\"save\" (click)=\"savePost()\">Save</button>                        \n                    </div>\n                </div>            \n            </div>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,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QUNuQixVQUFVLEVBQUUsQ0FBQyxtREFBd0IsQ0FBQzt3QkFDdEMsUUFBUSxFQUFFLHEvREE4QlQ7cUJBQ0osQ0FBQzs7Z0NBQUE7Z0JBOE9GLG1CQUFDO1lBQUQsQ0E1T0EsQUE0T0MsSUFBQTtZQTVPRCx1Q0E0T0MsQ0FBQSIsImZpbGUiOiJhcHAuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQge0h0dHAsIEhlYWRlcnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvUngnO1xyXG5pbXBvcnQge2NvbnRlbnRlZGl0YWJsZURpcmVjdGl2ZX0gZnJvbSAnLi9jb250ZW50ZWRpdGFibGVEaXJlY3RpdmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25vdGVhcHAnLFxyXG4gICAgZGlyZWN0aXZlczogW2NvbnRlbnRlZGl0YWJsZURpcmVjdGl2ZV0sXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJqdW1ib3Ryb24gaGVyb1wiIFtuZ1N0eWxlXT1cImhlcm9TdHlsZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aDE+Tm90ZXMgZ2Fsb3JlPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9oMT5cclxuICAgICAgICAgICAgICAgIDxwPlRoZSBmdXR1cmUgYW5kIHBhc3Qgbm90ZXMuPC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8c2VjdGlvbj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS00XCIgKm5nRm9yPVwibGV0IG5vdGUgb2YgYXJyYXlOb3Rlc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cInNob3dOb3RlKCRldmVudCxub3RlLmlkKVwiIGNsYXNzPVwibm90ZWJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgKm5nSWY9XCJub3RlLmVkaXRhYmxlXCIgY29udGVudGVkaXRhYmxlIFsobW9kZWxDb250ZW50KV09XCJub3RlLnRpdGxlXCI+PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyICpuZ0lmPVwiIW5vdGUuZWRpdGFibGVcIj57e25vdGUudGl0bGV9fTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwICpuZ0lmPVwibm90ZS5lZGl0YWJsZVwiIGNvbnRlbnRlZGl0YWJsZSBbKG1vZGVsQ29udGVudCldPVwibm90ZS5kZXNjcmlwdGlvblwiIFt0ZXh0Q29udGVudF09XCJub3RlLmRlc2NyaXB0aW9uXCI+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidXBkXCIgKm5nSWY9XCJub3RlLmVkaXRhYmxlXCIgKGNsaWNrKT1cInVwZGF0ZVBvc3Qobm90ZS5pZClcIj5VcGRhdGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbFwiICpuZ0lmPVwibm90ZS5lZGl0YWJsZVwiIChjbGljayk9XCJkZWxldGVQb3N0KG5vdGUuaWQpXCI+RGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGVib3hcIiAoY2xpY2spPVwib3BlbkNyZWF0ZVBvc3QoKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+PGkgY2xhc3M9XCJmYSBmYS1wbHVzIGZhLTVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyICpuZ0lmPVwiY3JlYXRlTm90ZVwiIGNsYXNzPVwiaW5wdXRmaWVsZFwiIGNvbnRlbnRlZGl0YWJsZSBbKG1vZGVsQ29udGVudCldPVwiY3JlYXRlTm90ZUNvbnRlbnQudGl0bGVcIj5UaXRsZTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwICpuZ0lmPVwiY3JlYXRlTm90ZVwiIGNsYXNzPVwiaW5wdXRmaWVsZFwiIGNvbnRlbnRlZGl0YWJsZSBbKG1vZGVsQ29udGVudCldPVwiY3JlYXRlTm90ZUNvbnRlbnQuZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImNyZWF0ZU5vdGVcIiBjbGFzcz1cInNhdmVcIiAoY2xpY2spPVwic2F2ZVBvc3QoKVwiPlNhdmU8L2J1dHRvbj4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICBgXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcclxuICAgIGJhc2VEb21haW49J2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHA6Ly90aW1lc2hlZXQtMTE3Mi5hcHBzcG90LmNvbS8nO1xyXG4gICAgYmFzZVBhdGg9J2U1NzY0ZTllL25vdGVzJztcclxuXHJcbiAgICAvL2Jhc2VEb21haW49J2h0dHA6Ly9sb2NhbGhvc3Q6MzAwNC8nOyAvLyBVc2VkIGpzb24tc2VydmVyIGxvY2FsbHkgYXMgYSBmYWtlIFJFU1QgQVBJXHJcbiAgICAvL2Jhc2VQYXRoPSdub3Rlcy8nO1xyXG5cclxuICAgIC8vRGF0YSB2YXJzXHJcbiAgICBhcnJheU5vdGVzPVtdO1xyXG4gICAgY3JlYXRlTm90ZUNvbnRlbnQ9e1widGl0bGVcIjpcIlwiLFwiZGVzY3JpcHRpb25cIjpcIlwifTtcclxuICAgIGNyZWF0ZU5vdGU9ZmFsc2U7XHJcblxyXG4gICAgLy9CYWNrZ3JvdW5kIGltYWdlIGNoYW5nZXIgdmFyc1xyXG4gICAgYmFja2dyb3VuZHM9W3tcImltZ1wiOlwiaW1nL3Bob3RvLTE0NTI0MjE4MjIyNDgtZDRjMmI0N2YwYzgxLmpwZ1wifSx7XCJpbWdcIjpcImltZy9waG90by0xNDU0MTY2MTU1MzAyLWVmNDg2M2MyN2U3MC5qcGdcIn0se1wiaW1nXCI6XCJpbWcvcGhvdG8tMTQ3NTUwNjYzMTk3OS03MjQxMmM2MDZmNGQuanBnXCJ9XTtcclxuICAgIGFjdGl2ZUJhY2tncm91bmQ9MDtcclxuICAgIGhlcm9TdHlsZT17XCJiYWNrZ3JvdW5kLWltYWdlXCIgOiBcInVybChcIit0aGlzLmJhY2tncm91bmRzW3RoaXMuYWN0aXZlQmFja2dyb3VuZF0uaW1nK1wiKVwiIH07XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwKSB7XHJcbiAgICAgICAgdGhpcy5zZW5kR2V0TGlzdCgpO1xyXG4gICAgICAgIHRoaXMucnVuQXdlc29tZUJhY2tncm91bmRDaGFuZ2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9Td2l0Y2hlcyBiYWNrZ3JvdW5kcyBmb3IgdGhlIGhlcm9cclxuICAgIHJ1bkF3ZXNvbWVCYWNrZ3JvdW5kQ2hhbmdlcigpIHtcclxuICAgICAgICBPYnNlcnZhYmxlLmludGVydmFsKDE1MDApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVCYWNrZ3JvdW5kPSgrK3RoaXMuYWN0aXZlQmFja2dyb3VuZCkldGhpcy5iYWNrZ3JvdW5kcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9TdHlsZT17XCJiYWNrZ3JvdW5kLWltYWdlXCIgOiBcInVybChcIit0aGlzLmJhY2tncm91bmRzW3RoaXMuYWN0aXZlQmFja2dyb3VuZF0uaW1nK1wiKVwiIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE9wZW4gdGhlIGNyZWF0ZSBwb3N0IGJveCBmb3IgaW5wdXRcclxuICAgIG9wZW5DcmVhdGVQb3N0KCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VQb3N0cygpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTm90ZT10cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBhIHBvc3QgKENhbGxlZCBmcm9tIFVJKVxyXG4gICAgdXBkYXRlUG9zdChwb3N0SWQpIHtcclxuICAgICAgICB2YXIgZWw9dGhpcy5nZXRFbGVtZW50V2l0aElkKHRoaXMuYXJyYXlOb3Rlcyxwb3N0SWQpO1xyXG4gICAgICAgIHRoaXMuc2VuZFB1dFRoZW5HZXRMaXN0KGVsLmlkLGVsLnRpdGxlLGVsLmRlc2NyaXB0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTYXZlL2NyZWF0ZSB0byB0aGUgcmVzdCBhcGkgKGNhbGxlZCBmcm9tIHRoZSBVSSBsYXllcikuIE5PVEU6IFNob3VsZCBjbG9zZSBhZnRlciBzYXZlLCBidXQgMi13YXkgZC1iaW5kIGRvZXNudCB3b3JrIGZvciBzb21lIHJlYXNvbi5cclxuICAgIHNhdmVQb3N0KGUpIHtcclxuICAgICAgICB0aGlzLnNlbmRQb3N0VGhlbkdldExpc3QodGhpcy5jcmVhdGVOb3RlQ29udGVudC50aXRsZSx0aGlzLmNyZWF0ZU5vdGVDb250ZW50LmRlc2NyaXB0aW9uKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZU5vdGVDb250ZW50LnRpdGxlPVwiXCI7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVOb3RlQ29udGVudC5kZXNjcmlwdGlvbj1cIlwiO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTm90ZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL0Nsb3NlIGFsbCBvcGVuIHBvc3RzIG9uIFVJXHJcbiAgICBjbG9zZVBvc3RzKCkge1xyXG4gICAgICAgIHRoaXMuYXJyYXlOb3Rlcy5mb3JFYWNoKGVsID0+IGVsLmVkaXRhYmxlPWZhbHNlICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9EZWxldGUgYSBwb3N0IChjYWxsZWQgZnJvbSBVSSlcclxuICAgIGRlbGV0ZVBvc3QocG9zdElkKSB7XHJcbiAgICAgICAgdGhpcy5zZW5kRGVsZXRlVGhlbkdldExpc3QocG9zdElkKTtcclxuICAgIH1cclxuICAgIC8vT3BlbnMgYSBub3RlIG9uIHRoZSBVSSBhbmQgbG9hZHMgdGhlIGRlc2NyaXB0aW9uIGZyb20gdGhlIHJlc3QgYXBpLlxyXG4gICAgc2hvd05vdGUoZSxwb3N0SWQpIHtcclxuICAgICAgICB2YXIgZWw9dGhpcy5nZXRFbGVtZW50V2l0aElkKHRoaXMuYXJyYXlOb3Rlcyxwb3N0SWQpO1xyXG4gICAgICAgIGlmIChlbC5lZGl0YWJsZT09dHJ1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuYXJyYXlOb3Rlcy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5lZGl0YWJsZT1mYWxzZSApO1xyXG4gICAgICAgIHRoaXMuZGVsZXRlRGVzY3JpcHRpb25zKCk7XHJcbiAgICAgICAgdGhpcy5zZW5kR2V0KHBvc3RJZCk7XHJcbiAgICAgICAgZWwuZWRpdGFibGU9dHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbGVhciBvdXQgYWxsIGRlc2NyaXB0aW9ucy4gRGVzY3JpcHRpb25zIGFyZSBtYWRlIGF2YWlsYWJsZSBhcyBhIHBvc3QgaXMgb3BlbmVkLlxyXG4gICAgLy8gUmVhc29uIGZvciB0aGF0IGlzIHRoYXQgdGhlIEFQSSBkb2VzIG5vdCBkZWxpdmVyIGRlc2NyaXB0aW9ucyBvbiBsaXN0aW5nIGJ1dCByYXRoZXIgaGFzIHRvIGJlIHN5bmMnZWRcclxuICAgIC8vIG9uZSBhdCBhIHRpbWUuIFRoaXMgd2F5IHRoZSBmcm9udGVuZCByZWZsZWN0cyB0aGUgcmVzdCBhcGkgZnVuY3Rpb25hbGl0eS5cclxuICAgIGRlbGV0ZURlc2NyaXB0aW9ucygpIHtcclxuICAgICAgICB0aGlzLmFycmF5Tm90ZXMuZm9yRWFjaCggZWwgPT4gZWwuZGVzY3JpcHRpb249XCJcIiApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN0YW5kYXJkIFJFU1QgdmVyYiAtIFBPU1QsIEdFVCwgUFVULCBERUxFVEUgLT4gQ1JFQVRFLCBSRVRSSUVWRSwgVVBEQVRFLCBERUxFVEVcclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBTZW5kIGEgaHR0cCBHRVQgcmVxdWVzdCBmb3IgdGhlIGVsZW1lbnQgcG9zdElkIGNvbnRhaW5lZCBpbiB0aGUgZGVmaW5lZCBVUkwgZW5kcG9pbnQgLT4gYmFzZURvbWFpbitiYXNlUGF0aCtwb3N0SWQuXHJcbiAgICAgKiBFeHBlY3RzIHJlc3BvbnNlIGVsZW1lbnQgYXMganNvbiBkYXRhIC0+IHtcImlkXCIsXCJ0aXRsZVwiLFwiZGVzY3JpcHRpb25cIn1cclxuICAgICAqIEBwYXJhbSBwb3N0SWRcclxuICAgICAqL1xyXG4gICAgc2VuZEdldChwb3N0SWQpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZURvbWFpbit0aGlzLmJhc2VQYXRoKycvJytwb3N0SWQpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHRoaXMuc3RvcmVEZXNjcmlwdGlvbihkYXRhKSxcclxuICAgICAgICAgICAgICAgIGVyciA9PiB0aGlzLmxvZ0Vycm9yKFwiR0VUIFJFUVVFU1QgTk9UIFZBTElELCBFUlJPUjogXCIsZXJyKSxcclxuICAgICAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdSZXRyaWV2YWwgb2YgZWxlbWVudCB3aXRoIGlkPScrcG9zdElkKycgY29tcGxldGVkLicpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICogU2VuZHMgYSBodHRwIEdFVCByZXF1ZXN0IGZvciB0aGUgVVJMIGVuZHBvaW50IC0+IGJhc2VEb21haW4rYmFzZVBhdGguXHJcbiAgICAgKiBFeHBlY3RzIGEganNvbiBhcnJheSBsaXN0IG9mIGF2YWlsYWJsZSBlbGVtZW50cyAtPiBbIHtpZCx0aXRsZX0gLCB7Li4ufSBdXHJcbiAgICAgKi9cclxuICAgIHNlbmRHZXRMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlRG9tYWluK3RoaXMuYmFzZVBhdGgpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHRoaXMub3V0cHV0UmVzdWx0QXJyYXkoZGF0YSksXHJcbiAgICAgICAgICAgICAgICBlcnIgPT4gdGhpcy5sb2dFcnJvcihcIkNBTk5PVCBSRVRSSUVWRSBFTEVNRU5UIExJU1QsIEVSUk9SOiBcIixlcnIpLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ1JldHJpZXZhbCBvZiBhbGwgZWxlbWVudHMgY29tcGxldGVkLicpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICogU2VuZHMgYSBodHRwIFBPU1QgcmVxdWVzdCBmb3IgdGhlIFVSTCBlbmRwb2ludCAtPiBiYXNlRG9tYWluK2Jhc2VQYXRoLlxyXG4gICAgICogSnNvbiBmb3JtYXQgYXNzdW1lZCBhdCBzZXJ2ZXIgaXM6IHtcInRpdGxlXCIsXCJkZXNjcmlwdGlvblwifVxyXG4gICAgICogQWx3YXlzIHJlbWVtYmVyIHRvIHNldCB0aGUgaHR0cCBoZWFkZXJzIHdpdGggY29ycmVjdCBjb250ZW50IHR5cGUgPC0tLSBJTVBPUlRBTlRcclxuICAgICAqL1xyXG4gICAgc2VuZFBvc3QodGl0bGUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgdmFyIHBvc3RPYmplY3Q9IHtcInRpdGxlXCI6IHRpdGxlLCBcImRlc2NyaXB0aW9uXCI6IGRlc2NyaXB0aW9ufTtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblxyXG4gICAgICAgIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZURvbWFpbit0aGlzLmJhc2VQYXRoLEpTT04uc3RyaW5naWZ5KHBvc3RPYmplY3QpLHtcImhlYWRlcnNcIjpoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4gdGhpcy5vdXRwdXRUZXh0KFwiQURERUQgRUxFTUVOVCBXSVRIIElEPVwiK2RhdGEuaWQpLFxyXG4gICAgICAgICAgICAgICAgZXJyID0+IHRoaXMubG9nRXJyb3IoXCJDUkVBVEUgUkVRVUVTVCBOT1QgVkFMSUQsIEVSUk9SOiBcIiwgZXJyKSxcclxuICAgICAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdBZGRlZCBlbGVtZW50LicpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VuZFBvc3RUaGVuR2V0TGlzdCh0aXRsZSwgZGVzY3JpcHRpb24pIHtcclxuICAgICAgICB2YXIgcG9zdE9iamVjdD0ge1widGl0bGVcIjogdGl0bGUsIFwiZGVzY3JpcHRpb25cIjogZGVzY3JpcHRpb259O1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VEb21haW4rdGhpcy5iYXNlUGF0aCxKU09OLnN0cmluZ2lmeShwb3N0T2JqZWN0KSx7XCJoZWFkZXJzXCI6aGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHRoaXMub3V0cHV0VGV4dChcIkFEREVEIEVMRU1FTlQgV0lUSCBJRD1cIitkYXRhLmlkKSxcclxuICAgICAgICAgICAgICAgIGVyciA9PiB0aGlzLmxvZ0Vycm9yKFwiQ1JFQVRFIFJFUVVFU1QgTk9UIFZBTElELCBFUlJPUjogXCIsIGVyciksXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLnNlbmRHZXRMaXN0KClcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBTZW5kcyBhIGh0dHAgUFVUIHJlcXVlc3QgZm9yIHRoZSBVUkwgZW5kcG9pbnQgLT4gYmFzZURvbWFpbitiYXNlUGF0aCtwb3N0SWQuXHJcbiAgICAgKiBVcGRhdGVzIGEgZXhpc3RpbmcgZWxlbWVudCB3aXRoIGlkPXBvc3RJZFxyXG4gICAgICogSnNvbiBmb3JtYXQgYXNzdW1lZCBhdCBzZXJ2ZXIgaXM6IHtcInRpdGxlXCIsXCJkZXNjcmlwdGlvblwifVxyXG4gICAgICovXHJcbiAgICBzZW5kUHV0KHBvc3RJZCwgdGl0bGUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgdmFyIHBvc3RPYmplY3Q9IHtcInRpdGxlXCI6IHRpdGxlLCBcImRlc2NyaXB0aW9uXCI6IGRlc2NyaXB0aW9ufTtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgICAgdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VEb21haW4rdGhpcy5iYXNlUGF0aCsnLycrcG9zdElkLEpTT04uc3RyaW5naWZ5KHBvc3RPYmplY3QpLHtoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4gdGhpcy5vdXRwdXRUZXh0KFwiVVBEQVRFRCBFTEVNRU5UIFdJVEggSUQ9XCIrZGF0YS5pZCksXHJcbiAgICAgICAgICAgICAgICBlcnIgPT4gdGhpcy5sb2dFcnJvcihcIlVQREFURSBSRVFVRVNUIE5PVCBWQUxJRCwgRVJST1IgQ09ERTogXCIsZXJyKSxcclxuICAgICAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdVcGRhdGVkIGVsZW1lbnQuJylcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kUHV0VGhlbkdldExpc3QocG9zdElkLCB0aXRsZSwgZGVzY3JpcHRpb24pIHtcclxuICAgICAgICB2YXIgcG9zdE9iamVjdD0ge1widGl0bGVcIjogdGl0bGUsIFwiZGVzY3JpcHRpb25cIjogZGVzY3JpcHRpb259O1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICB0aGlzLmh0dHAucHV0KHRoaXMuYmFzZURvbWFpbit0aGlzLmJhc2VQYXRoKycvJytwb3N0SWQsSlNPTi5zdHJpbmdpZnkocG9zdE9iamVjdCkse2hlYWRlcnN9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB0aGlzLm91dHB1dFRleHQoXCJVUERBVEVEIEVMRU1FTlQgV0lUSCBJRD1cIitkYXRhLmlkKSxcclxuICAgICAgICAgICAgICAgIGVyciA9PiB0aGlzLmxvZ0Vycm9yKFwiVVBEQVRFIFJFUVVFU1QgTk9UIFZBTElELCBFUlJPUiBDT0RFOiBcIixlcnIpLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5zZW5kR2V0TGlzdCgpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICogU2VuZHMgYSBodHRwIERFTEVURSByZXF1ZXN0IGZvciB0aGUgVVJMIGVuZHBvaW50IC0+IGJhc2VEb21haW4rYmFzZVBhdGgrcG9zdElkLlxyXG4gICAgICogU2VydmVyIHJldHVybnMgc3RhdHVzIGNvZGUgMjA0KHN1Y2Nlc3Mgd2l0aG91dCBhbnkgcmVzcG9uc2Vib2R5KSB1cG9uIHN1Y2Nlc3NmdWxsIGNhbGwuXHJcbiAgICAgKi9cclxuICAgIHNlbmREZWxldGUocG9zdElkKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmRlbGV0ZSh0aGlzLmJhc2VEb21haW4rdGhpcy5iYXNlUGF0aCsnLycrcG9zdElkKVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB0aGlzLm91dHB1dFRleHQoXCJERUxFVEVEIEVMRU1FTlQuXCIpLFxyXG4gICAgICAgICAgICAgICAgZXJyID0+IHRoaXMubG9nRXJyb3IoXCJERUxFVEUgUkVRVUVTVCBOT1QgVkFMSUQsIEVSUk9SIENPREU6IFwiLGVyciksXHJcbiAgICAgICAgICAgICAgICAoKSA9PiBjb25zb2xlLmxvZygnRGVsZXRlZCBlbGVtZW50LicpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VuZERlbGV0ZVRoZW5HZXRMaXN0KHBvc3RJZCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5kZWxldGUodGhpcy5iYXNlRG9tYWluK3RoaXMuYmFzZVBhdGgrJy8nK3Bvc3RJZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMuc2VuZEdldExpc3QoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBIRUxQRVIgRlVOQ1RJT05TXHJcbiAgICAgKi9cclxuXHJcbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSBlbGVtZW50IHRoYXQgaGFzIGEgY2VydGFpbiBJRCBmcm9tIGFuIGFycmF5XHJcbiAgICBnZXRFbGVtZW50V2l0aElkKGFycixpZCkge1xyXG4gICAgICAgIGZvciAodmFyIGo9MDsgajxhcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycltqXS5pZD09aWQpIHJldHVybiBhcnJbal07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb3B5IGRlc2NyaXB0aW9uIGFuZCB0aXRsZSBwcm9wZXJ0aWVzIGZyb20gYW4gb2JqZWN0XHJcbiAgICBzdG9yZURlc2NyaXB0aW9uKGRhdGEpIHtcclxuICAgICAgICB2YXIgZWw9dGhpcy5nZXRFbGVtZW50V2l0aElkKHRoaXMuYXJyYXlOb3RlcyxkYXRhLmlkKTtcclxuICAgICAgICBlbC5kZXNjcmlwdGlvbj1kYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGVsLnRpdGxlPWRhdGEudGl0bGU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byBvdXRwdXQgZXJyb3JzIHRvIHRoZSBjb25zb2xlXHJcbiAgICBsb2dFcnJvcih0ZXh0LGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOiAnICsgZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gb3V0cHV0IG1lc3NhZ2VzIHRvIFVzZXIsIG5vdCB1c2VkIGF0bS5cclxuICAgIG91dHB1dFRleHQodGV4dCkge1xyXG4gICAvLyAgICAgcHJpbnQodGV4dCk7IG5ld2xpbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gb3V0cHV0IG9iamVjdCBwcm9wcyAtIHRpdGxlIGFuZCBkZXNjcmlwdGlvbiB0byB1c2VyLCBub3QgdXNlZCBhdG0uXHJcbiAgICBvdXRwdXRSZXN1bHQoZGF0YSkge1xyXG4gICAgLy8gICAgcHJpbnQoXCJUSVRMRTogXCIrZGF0YS50aXRsZSk7IG5ld2xpbmUoKTtcclxuICAgIC8vICAgIHByaW50KFwiREVTQ1JJUFRJT046IFwiK2RhdGEuZGVzY3JpcHRpb24pOyBuZXdsaW5lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHN0b3JlIGFuZCBwcmVwYXJlIHRoZSBkYXRhIGZvciBwcmVzZW50YXRpb25hbCBsYXllci5cclxuICAgIG91dHB1dFJlc3VsdEFycmF5KGRhdGEpIHtcclxuICAgICAgICB0aGlzLmFycmF5Tm90ZXM9ZGF0YTtcclxuICAgICAgICB0aGlzLmRlbGV0ZURlc2NyaXB0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuYXJyYXlOb3Rlcy5mb3JFYWNoKGVsID0+IHsgZWwuZWRpdGFibGU9ZmFsc2UgfSk7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
