System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', './contenteditableDirective', './helper'], function(exports_1, context_1) {
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
    var core_1, http_1, Rx_1, contenteditableDirective_1, helper_1;
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
            },
            function (helper_1_1) {
                helper_1 = helper_1_1;
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
                    var el = helper_1.Helpers.getElementWithId(this.arrayNotes, postId);
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
                    var el = helper_1.Helpers.getElementWithId(this.arrayNotes, postId);
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
                // Helper function to copy description and title properties from an object
                AppComponent.prototype.storeDescription = function (data) {
                    var el = helper_1.Helpers.getElementWithId(this.arrayNotes, data.id);
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

//# sourceMappingURL=data:application/json;base64,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b0JBQ2hDLEVBQUUsQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFFeEIsQ0FBQztnQkFFRCxrREFBa0Q7Z0JBQ2xELCtCQUFRLEdBQVIsVUFBUyxJQUFJLEVBQUMsR0FBRztvQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFFRCw0REFBNEQ7Z0JBQzVELGlDQUFVLEdBQVYsVUFBVyxJQUFJO29CQUNoQiw4QkFBOEI7Z0JBQzdCLENBQUM7Z0JBRUQsd0ZBQXdGO2dCQUN4RixtQ0FBWSxHQUFaLFVBQWEsSUFBSTtvQkFDakIsNkNBQTZDO29CQUM3Qyx5REFBeUQ7Z0JBQ3pELENBQUM7Z0JBRUQsMEVBQTBFO2dCQUMxRSx3Q0FBaUIsR0FBakIsVUFBa0IsSUFBSTtvQkFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29CQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUUsSUFBTSxFQUFFLENBQUMsUUFBUSxHQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxDQUFDO2dCQXZRTDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNQLFFBQVEsRUFBRSxTQUFTO3dCQUNuQixVQUFVLEVBQUUsQ0FBQyxtREFBd0IsQ0FBQzt3QkFDdEMsUUFBUSxFQUFFLHEvREE4QlQ7cUJBQ0osQ0FBQzs7Z0NBQUE7Z0JBc09GLG1CQUFDO1lBQUQsQ0FwT0EsQUFvT0MsSUFBQTtZQXBPRCx1Q0FvT0MsQ0FBQSIsImZpbGUiOiJhcHAuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQge0h0dHAsIEhlYWRlcnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvUngnO1xyXG5pbXBvcnQge2NvbnRlbnRlZGl0YWJsZURpcmVjdGl2ZX0gZnJvbSAnLi9jb250ZW50ZWRpdGFibGVEaXJlY3RpdmUnO1xyXG5pbXBvcnQge0hlbHBlcnN9IGZyb20gJy4vaGVscGVyJ1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbm90ZWFwcCcsXHJcbiAgICBkaXJlY3RpdmVzOiBbY29udGVudGVkaXRhYmxlRGlyZWN0aXZlXSxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImp1bWJvdHJvbiBoZXJvXCIgW25nU3R5bGVdPVwiaGVyb1N0eWxlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxoMT5Ob3RlcyBnYWxvcmU8aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2gxPlxyXG4gICAgICAgICAgICAgICAgPHA+VGhlIGZ1dHVyZSBhbmQgcGFzdCBub3Rlcy48L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxzZWN0aW9uPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTRcIiAqbmdGb3I9XCJsZXQgbm90ZSBvZiBhcnJheU5vdGVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiAoY2xpY2spPVwic2hvd05vdGUoJGV2ZW50LG5vdGUuaWQpXCIgY2xhc3M9XCJub3RlYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiAqbmdJZj1cIm5vdGUuZWRpdGFibGVcIiBjb250ZW50ZWRpdGFibGUgWyhtb2RlbENvbnRlbnQpXT1cIm5vdGUudGl0bGVcIj48L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgKm5nSWY9XCIhbm90ZS5lZGl0YWJsZVwiPnt7bm90ZS50aXRsZX19PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgKm5nSWY9XCJub3RlLmVkaXRhYmxlXCIgY29udGVudGVkaXRhYmxlIFsobW9kZWxDb250ZW50KV09XCJub3RlLmRlc2NyaXB0aW9uXCIgW3RleHRDb250ZW50XT1cIm5vdGUuZGVzY3JpcHRpb25cIj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ1cGRcIiAqbmdJZj1cIm5vdGUuZWRpdGFibGVcIiAoY2xpY2spPVwidXBkYXRlUG9zdChub3RlLmlkKVwiPlVwZGF0ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsXCIgKm5nSWY9XCJub3RlLmVkaXRhYmxlXCIgKGNsaWNrKT1cImRlbGV0ZVBvc3Qobm90ZS5pZClcIj5EZWxldGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90ZWJveFwiIChjbGljayk9XCJvcGVuQ3JlYXRlUG9zdCgpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj48aSBjbGFzcz1cImZhIGZhLXBsdXMgZmEtNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgKm5nSWY9XCJjcmVhdGVOb3RlXCIgY2xhc3M9XCJpbnB1dGZpZWxkXCIgY29udGVudGVkaXRhYmxlIFsobW9kZWxDb250ZW50KV09XCJjcmVhdGVOb3RlQ29udGVudC50aXRsZVwiPlRpdGxlPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgKm5nSWY9XCJjcmVhdGVOb3RlXCIgY2xhc3M9XCJpbnB1dGZpZWxkXCIgY29udGVudGVkaXRhYmxlIFsobW9kZWxDb250ZW50KV09XCJjcmVhdGVOb3RlQ29udGVudC5kZXNjcmlwdGlvblwiPkRlc2NyaXB0aW9uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiY3JlYXRlTm90ZVwiIGNsYXNzPVwic2F2ZVwiIChjbGljayk9XCJzYXZlUG9zdCgpXCI+U2F2ZTwvYnV0dG9uPiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuICAgIGBcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gICAgYmFzZURvbWFpbj0naHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cDovL3RpbWVzaGVldC0xMTcyLmFwcHNwb3QuY29tLyc7XHJcbiAgICBiYXNlUGF0aD0nZTU3NjRlOWUvbm90ZXMnO1xyXG5cclxuICAgIC8vYmFzZURvbWFpbj0naHR0cDovL2xvY2FsaG9zdDozMDA0Lyc7IC8vIFVzZWQganNvbi1zZXJ2ZXIgbG9jYWxseSBhcyBhIGZha2UgUkVTVCBBUElcclxuICAgIC8vYmFzZVBhdGg9J25vdGVzLyc7XHJcblxyXG4gICAgLy9EYXRhIHZhcnNcclxuICAgIGFycmF5Tm90ZXM9W107XHJcbiAgICBjcmVhdGVOb3RlQ29udGVudD17XCJ0aXRsZVwiOlwiXCIsXCJkZXNjcmlwdGlvblwiOlwiXCJ9O1xyXG4gICAgY3JlYXRlTm90ZT1mYWxzZTtcclxuXHJcbiAgICAvL0JhY2tncm91bmQgaW1hZ2UgY2hhbmdlciB2YXJzXHJcbiAgICBiYWNrZ3JvdW5kcz1be1wiaW1nXCI6XCJpbWcvcGhvdG8tMTQ1MjQyMTgyMjI0OC1kNGMyYjQ3ZjBjODEuanBnXCJ9LHtcImltZ1wiOlwiaW1nL3Bob3RvLTE0NTQxNjYxNTUzMDItZWY0ODYzYzI3ZTcwLmpwZ1wifSx7XCJpbWdcIjpcImltZy9waG90by0xNDc1NTA2NjMxOTc5LTcyNDEyYzYwNmY0ZC5qcGdcIn1dO1xyXG4gICAgYWN0aXZlQmFja2dyb3VuZD0wO1xyXG4gICAgaGVyb1N0eWxlPXtcImJhY2tncm91bmQtaW1hZ2VcIiA6IFwidXJsKFwiK3RoaXMuYmFja2dyb3VuZHNbdGhpcy5hY3RpdmVCYWNrZ3JvdW5kXS5pbWcrXCIpXCIgfTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHApIHtcclxuICAgICAgICB0aGlzLnNlbmRHZXRMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5ydW5Bd2Vzb21lQmFja2dyb3VuZENoYW5nZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1N3aXRjaGVzIGJhY2tncm91bmRzIGZvciB0aGUgaGVyb1xyXG4gICAgcnVuQXdlc29tZUJhY2tncm91bmRDaGFuZ2VyKCkge1xyXG4gICAgICAgIE9ic2VydmFibGUuaW50ZXJ2YWwoMTUwMClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUJhY2tncm91bmQ9KCsrdGhpcy5hY3RpdmVCYWNrZ3JvdW5kKSV0aGlzLmJhY2tncm91bmRzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb1N0eWxlPXtcImJhY2tncm91bmQtaW1hZ2VcIiA6IFwidXJsKFwiK3RoaXMuYmFja2dyb3VuZHNbdGhpcy5hY3RpdmVCYWNrZ3JvdW5kXS5pbWcrXCIpXCIgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3BlbiB0aGUgY3JlYXRlIHBvc3QgYm94IGZvciBpbnB1dFxyXG4gICAgb3BlbkNyZWF0ZVBvc3QoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZVBvc3RzKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVOb3RlPXRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIGEgcG9zdCAoQ2FsbGVkIGZyb20gVUkpXHJcbiAgICB1cGRhdGVQb3N0KHBvc3RJZCkge1xyXG4gICAgICAgIHZhciBlbD1IZWxwZXJzLmdldEVsZW1lbnRXaXRoSWQodGhpcy5hcnJheU5vdGVzLHBvc3RJZCk7XHJcbiAgICAgICAgdGhpcy5zZW5kUHV0VGhlbkdldExpc3QoZWwuaWQsZWwudGl0bGUsZWwuZGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNhdmUvY3JlYXRlIHRvIHRoZSByZXN0IGFwaSAoY2FsbGVkIGZyb20gdGhlIFVJIGxheWVyKS4gTk9URTogU2hvdWxkIGNsb3NlIGFmdGVyIHNhdmUsIGJ1dCAyLXdheSBkLWJpbmQgZG9lc250IHdvcmsgZm9yIHNvbWUgcmVhc29uLlxyXG4gICAgc2F2ZVBvc3QoZSkge1xyXG4gICAgICAgIHRoaXMuc2VuZFBvc3RUaGVuR2V0TGlzdCh0aGlzLmNyZWF0ZU5vdGVDb250ZW50LnRpdGxlLHRoaXMuY3JlYXRlTm90ZUNvbnRlbnQuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTm90ZUNvbnRlbnQudGl0bGU9XCJcIjtcclxuICAgICAgICB0aGlzLmNyZWF0ZU5vdGVDb250ZW50LmRlc2NyaXB0aW9uPVwiXCI7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVOb3RlPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vQ2xvc2UgYWxsIG9wZW4gcG9zdHMgb24gVUlcclxuICAgIGNsb3NlUG9zdHMoKSB7XHJcbiAgICAgICAgdGhpcy5hcnJheU5vdGVzLmZvckVhY2goZWwgPT4gZWwuZWRpdGFibGU9ZmFsc2UgKTtcclxuICAgIH1cclxuXHJcbiAgICAvL0RlbGV0ZSBhIHBvc3QgKGNhbGxlZCBmcm9tIFVJKVxyXG4gICAgZGVsZXRlUG9zdChwb3N0SWQpIHtcclxuICAgICAgICB0aGlzLnNlbmREZWxldGVUaGVuR2V0TGlzdChwb3N0SWQpO1xyXG4gICAgfVxyXG4gICAgLy9PcGVucyBhIG5vdGUgb24gdGhlIFVJIGFuZCBsb2FkcyB0aGUgZGVzY3JpcHRpb24gZnJvbSB0aGUgcmVzdCBhcGkuXHJcbiAgICBzaG93Tm90ZShlLHBvc3RJZCkge1xyXG4gICAgICAgIHZhciBlbD1IZWxwZXJzLmdldEVsZW1lbnRXaXRoSWQodGhpcy5hcnJheU5vdGVzLHBvc3RJZCk7XHJcbiAgICAgICAgaWYgKGVsLmVkaXRhYmxlPT10cnVlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5hcnJheU5vdGVzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmVkaXRhYmxlPWZhbHNlICk7XHJcbiAgICAgICAgdGhpcy5kZWxldGVEZXNjcmlwdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnNlbmRHZXQocG9zdElkKTtcclxuICAgICAgICBlbC5lZGl0YWJsZT10cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENsZWFyIG91dCBhbGwgZGVzY3JpcHRpb25zLiBEZXNjcmlwdGlvbnMgYXJlIG1hZGUgYXZhaWxhYmxlIGFzIGEgcG9zdCBpcyBvcGVuZWQuXHJcbiAgICAvLyBSZWFzb24gZm9yIHRoYXQgaXMgdGhhdCB0aGUgQVBJIGRvZXMgbm90IGRlbGl2ZXIgZGVzY3JpcHRpb25zIG9uIGxpc3RpbmcgYnV0IHJhdGhlciBoYXMgdG8gYmUgc3luYydlZFxyXG4gICAgLy8gb25lIGF0IGEgdGltZS4gVGhpcyB3YXkgdGhlIGZyb250ZW5kIHJlZmxlY3RzIHRoZSByZXN0IGFwaSBmdW5jdGlvbmFsaXR5LlxyXG4gICAgZGVsZXRlRGVzY3JpcHRpb25zKCkge1xyXG4gICAgICAgIHRoaXMuYXJyYXlOb3Rlcy5mb3JFYWNoKCBlbCA9PiBlbC5kZXNjcmlwdGlvbj1cIlwiICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RhbmRhcmQgUkVTVCB2ZXJiIC0gUE9TVCwgR0VULCBQVVQsIERFTEVURSAtPiBDUkVBVEUsIFJFVFJJRVZFLCBVUERBVEUsIERFTEVURVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIFNlbmQgYSBodHRwIEdFVCByZXF1ZXN0IGZvciB0aGUgZWxlbWVudCBwb3N0SWQgY29udGFpbmVkIGluIHRoZSBkZWZpbmVkIFVSTCBlbmRwb2ludCAtPiBiYXNlRG9tYWluK2Jhc2VQYXRoK3Bvc3RJZC5cclxuICAgICAqIEV4cGVjdHMgcmVzcG9uc2UgZWxlbWVudCBhcyBqc29uIGRhdGEgLT4ge1wiaWRcIixcInRpdGxlXCIsXCJkZXNjcmlwdGlvblwifVxyXG4gICAgICogQHBhcmFtIHBvc3RJZFxyXG4gICAgICovXHJcbiAgICBzZW5kR2V0KHBvc3RJZCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlRG9tYWluK3RoaXMuYmFzZVBhdGgrJy8nK3Bvc3RJZClcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4gdGhpcy5zdG9yZURlc2NyaXB0aW9uKGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgZXJyID0+IHRoaXMubG9nRXJyb3IoXCJHRVQgUkVRVUVTVCBOT1QgVkFMSUQsIEVSUk9SOiBcIixlcnIpLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ1JldHJpZXZhbCBvZiBlbGVtZW50IHdpdGggaWQ9Jytwb3N0SWQrJyBjb21wbGV0ZWQuJylcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBTZW5kcyBhIGh0dHAgR0VUIHJlcXVlc3QgZm9yIHRoZSBVUkwgZW5kcG9pbnQgLT4gYmFzZURvbWFpbitiYXNlUGF0aC5cclxuICAgICAqIEV4cGVjdHMgYSBqc29uIGFycmF5IGxpc3Qgb2YgYXZhaWxhYmxlIGVsZW1lbnRzIC0+IFsge2lkLHRpdGxlfSAsIHsuLi59IF1cclxuICAgICAqL1xyXG4gICAgc2VuZEdldExpc3QoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmdldCh0aGlzLmJhc2VEb21haW4rdGhpcy5iYXNlUGF0aClcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4gdGhpcy5vdXRwdXRSZXN1bHRBcnJheShkYXRhKSxcclxuICAgICAgICAgICAgICAgIGVyciA9PiB0aGlzLmxvZ0Vycm9yKFwiQ0FOTk9UIFJFVFJJRVZFIEVMRU1FTlQgTElTVCwgRVJST1I6IFwiLGVyciksXHJcbiAgICAgICAgICAgICAgICAoKSA9PiBjb25zb2xlLmxvZygnUmV0cmlldmFsIG9mIGFsbCBlbGVtZW50cyBjb21wbGV0ZWQuJylcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBTZW5kcyBhIGh0dHAgUE9TVCByZXF1ZXN0IGZvciB0aGUgVVJMIGVuZHBvaW50IC0+IGJhc2VEb21haW4rYmFzZVBhdGguXHJcbiAgICAgKiBKc29uIGZvcm1hdCBhc3N1bWVkIGF0IHNlcnZlciBpczoge1widGl0bGVcIixcImRlc2NyaXB0aW9uXCJ9XHJcbiAgICAgKiBBbHdheXMgcmVtZW1iZXIgdG8gc2V0IHRoZSBodHRwIGhlYWRlcnMgd2l0aCBjb3JyZWN0IGNvbnRlbnQgdHlwZSA8LS0tIElNUE9SVEFOVFxyXG4gICAgICovXHJcbiAgICBzZW5kUG9zdCh0aXRsZSwgZGVzY3JpcHRpb24pIHtcclxuICAgICAgICB2YXIgcG9zdE9iamVjdD0ge1widGl0bGVcIjogdGl0bGUsIFwiZGVzY3JpcHRpb25cIjogZGVzY3JpcHRpb259O1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHJcbiAgICAgICAgdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlRG9tYWluK3RoaXMuYmFzZVBhdGgsSlNPTi5zdHJpbmdpZnkocG9zdE9iamVjdCkse1wiaGVhZGVyc1wiOmhlYWRlcnN9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB0aGlzLm91dHB1dFRleHQoXCJBRERFRCBFTEVNRU5UIFdJVEggSUQ9XCIrZGF0YS5pZCksXHJcbiAgICAgICAgICAgICAgICBlcnIgPT4gdGhpcy5sb2dFcnJvcihcIkNSRUFURSBSRVFVRVNUIE5PVCBWQUxJRCwgRVJST1I6IFwiLCBlcnIpLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ0FkZGVkIGVsZW1lbnQuJylcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kUG9zdFRoZW5HZXRMaXN0KHRpdGxlLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHZhciBwb3N0T2JqZWN0PSB7XCJ0aXRsZVwiOiB0aXRsZSwgXCJkZXNjcmlwdGlvblwiOiBkZXNjcmlwdGlvbn07XHJcbiAgICAgICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICAgIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZURvbWFpbit0aGlzLmJhc2VQYXRoLEpTT04uc3RyaW5naWZ5KHBvc3RPYmplY3QpLHtcImhlYWRlcnNcIjpoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4gdGhpcy5vdXRwdXRUZXh0KFwiQURERUQgRUxFTUVOVCBXSVRIIElEPVwiK2RhdGEuaWQpLFxyXG4gICAgICAgICAgICAgICAgZXJyID0+IHRoaXMubG9nRXJyb3IoXCJDUkVBVEUgUkVRVUVTVCBOT1QgVkFMSUQsIEVSUk9SOiBcIiwgZXJyKSxcclxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMuc2VuZEdldExpc3QoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIFNlbmRzIGEgaHR0cCBQVVQgcmVxdWVzdCBmb3IgdGhlIFVSTCBlbmRwb2ludCAtPiBiYXNlRG9tYWluK2Jhc2VQYXRoK3Bvc3RJZC5cclxuICAgICAqIFVwZGF0ZXMgYSBleGlzdGluZyBlbGVtZW50IHdpdGggaWQ9cG9zdElkXHJcbiAgICAgKiBKc29uIGZvcm1hdCBhc3N1bWVkIGF0IHNlcnZlciBpczoge1widGl0bGVcIixcImRlc2NyaXB0aW9uXCJ9XHJcbiAgICAgKi9cclxuICAgIHNlbmRQdXQocG9zdElkLCB0aXRsZSwgZGVzY3JpcHRpb24pIHtcclxuICAgICAgICB2YXIgcG9zdE9iamVjdD0ge1widGl0bGVcIjogdGl0bGUsIFwiZGVzY3JpcHRpb25cIjogZGVzY3JpcHRpb259O1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICB0aGlzLmh0dHAucHV0KHRoaXMuYmFzZURvbWFpbit0aGlzLmJhc2VQYXRoKycvJytwb3N0SWQsSlNPTi5zdHJpbmdpZnkocG9zdE9iamVjdCkse2hlYWRlcnN9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB0aGlzLm91dHB1dFRleHQoXCJVUERBVEVEIEVMRU1FTlQgV0lUSCBJRD1cIitkYXRhLmlkKSxcclxuICAgICAgICAgICAgICAgIGVyciA9PiB0aGlzLmxvZ0Vycm9yKFwiVVBEQVRFIFJFUVVFU1QgTk9UIFZBTElELCBFUlJPUiBDT0RFOiBcIixlcnIpLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ1VwZGF0ZWQgZWxlbWVudC4nKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmRQdXRUaGVuR2V0TGlzdChwb3N0SWQsIHRpdGxlLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHZhciBwb3N0T2JqZWN0PSB7XCJ0aXRsZVwiOiB0aXRsZSwgXCJkZXNjcmlwdGlvblwiOiBkZXNjcmlwdGlvbn07XHJcbiAgICAgICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICAgIHRoaXMuaHR0cC5wdXQodGhpcy5iYXNlRG9tYWluK3RoaXMuYmFzZVBhdGgrJy8nK3Bvc3RJZCxKU09OLnN0cmluZ2lmeShwb3N0T2JqZWN0KSx7aGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHRoaXMub3V0cHV0VGV4dChcIlVQREFURUQgRUxFTUVOVCBXSVRIIElEPVwiK2RhdGEuaWQpLFxyXG4gICAgICAgICAgICAgICAgZXJyID0+IHRoaXMubG9nRXJyb3IoXCJVUERBVEUgUkVRVUVTVCBOT1QgVkFMSUQsIEVSUk9SIENPREU6IFwiLGVyciksXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLnNlbmRHZXRMaXN0KClcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBTZW5kcyBhIGh0dHAgREVMRVRFIHJlcXVlc3QgZm9yIHRoZSBVUkwgZW5kcG9pbnQgLT4gYmFzZURvbWFpbitiYXNlUGF0aCtwb3N0SWQuXHJcbiAgICAgKiBTZXJ2ZXIgcmV0dXJucyBzdGF0dXMgY29kZSAyMDQoc3VjY2VzcyB3aXRob3V0IGFueSByZXNwb25zZWJvZHkpIHVwb24gc3VjY2Vzc2Z1bGwgY2FsbC5cclxuICAgICAqL1xyXG4gICAgc2VuZERlbGV0ZShwb3N0SWQpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZGVsZXRlKHRoaXMuYmFzZURvbWFpbit0aGlzLmJhc2VQYXRoKycvJytwb3N0SWQpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHRoaXMub3V0cHV0VGV4dChcIkRFTEVURUQgRUxFTUVOVC5cIiksXHJcbiAgICAgICAgICAgICAgICBlcnIgPT4gdGhpcy5sb2dFcnJvcihcIkRFTEVURSBSRVFVRVNUIE5PVCBWQUxJRCwgRVJST1IgQ09ERTogXCIsZXJyKSxcclxuICAgICAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdEZWxldGVkIGVsZW1lbnQuJylcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kRGVsZXRlVGhlbkdldExpc3QocG9zdElkKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmRlbGV0ZSh0aGlzLmJhc2VEb21haW4rdGhpcy5iYXNlUGF0aCsnLycrcG9zdElkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5zZW5kR2V0TGlzdCgpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKipcclxuICAgICAqIEhFTFBFUiBGVU5DVElPTlNcclxuICAgICAqL1xyXG5cclxuICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb3B5IGRlc2NyaXB0aW9uIGFuZCB0aXRsZSBwcm9wZXJ0aWVzIGZyb20gYW4gb2JqZWN0XHJcbiAgICBzdG9yZURlc2NyaXB0aW9uKGRhdGEpIHtcclxuICAgICAgICB2YXIgZWw9SGVscGVycy5nZXRFbGVtZW50V2l0aElkKHRoaXMuYXJyYXlOb3RlcyxkYXRhLmlkKTtcclxuICAgICAgICBlbC5kZXNjcmlwdGlvbj1kYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGVsLnRpdGxlPWRhdGEudGl0bGU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byBvdXRwdXQgZXJyb3JzIHRvIHRoZSBjb25zb2xlXHJcbiAgICBsb2dFcnJvcih0ZXh0LGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOiAnICsgZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gb3V0cHV0IG1lc3NhZ2VzIHRvIFVzZXIsIG5vdCB1c2VkIGF0bS5cclxuICAgIG91dHB1dFRleHQodGV4dCkge1xyXG4gICAvLyAgICAgcHJpbnQodGV4dCk7IG5ld2xpbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gb3V0cHV0IG9iamVjdCBwcm9wcyAtIHRpdGxlIGFuZCBkZXNjcmlwdGlvbiB0byB1c2VyLCBub3QgdXNlZCBhdG0uXHJcbiAgICBvdXRwdXRSZXN1bHQoZGF0YSkge1xyXG4gICAgLy8gICAgcHJpbnQoXCJUSVRMRTogXCIrZGF0YS50aXRsZSk7IG5ld2xpbmUoKTtcclxuICAgIC8vICAgIHByaW50KFwiREVTQ1JJUFRJT046IFwiK2RhdGEuZGVzY3JpcHRpb24pOyBuZXdsaW5lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHN0b3JlIGFuZCBwcmVwYXJlIHRoZSBkYXRhIGZvciBwcmVzZW50YXRpb25hbCBsYXllci5cclxuICAgIG91dHB1dFJlc3VsdEFycmF5KGRhdGEpIHtcclxuICAgICAgICB0aGlzLmFycmF5Tm90ZXM9ZGF0YTtcclxuICAgICAgICB0aGlzLmRlbGV0ZURlc2NyaXB0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuYXJyYXlOb3Rlcy5mb3JFYWNoKGVsID0+IHsgZWwuZWRpdGFibGU9ZmFsc2UgfSk7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
