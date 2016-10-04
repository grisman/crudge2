System.register(['./transactionService', "angular2/src/core/di/decorators"], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var transactionService_1, decorators_1;
    var Model;
    return {
        setters:[
            function (transactionService_1_1) {
                transactionService_1 = transactionService_1_1;
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            }],
        execute: function() {
            /**
             * Created by Haddock on 2016-10-04.
             */
            // Model layer with transactions
            Model = (function () {
                function Model(transactionService) {
                    //baseDomain='https://cors-anywhere.herokuapp.com/http://timesheet-1172.appspot.com/';
                    //basePath='e5764e9e/notes';
                    //baseDomain='http://localhost:3004/'; // Used json-server locally as a fake REST API
                    //basePath='notes/';
                    //Data vars
                    this.arrayNotes = [];
                    //this.sendGetList();
                }
                /***
                 * Finds and returns an element from the array arr with given id
                 * @param arr - An array with id property
                 * @param id - A id number
                 * @returns {element from array @arr with @id}
                 */
                Model.prototype.replaceData = function (data) {
                    this.arrayNotes = data;
                    this.arrayNotes.forEach(function (el) { return el.description = ""; });
                    this.arrayNotes.forEach(function (el) { el.editable = false; });
                };
                Model.prototype.list = function () { return this.arrayNotes; };
                Model.prototype.byId = function (id) {
                    for (var j = 0; j < this.arrayNotes.length; j++) {
                        if (this.arrayNotes[j].id == id)
                            return this.arrayNotes[j];
                    }
                    return null;
                };
                /***
                 * Send a http GET request for the element postId contained in the defined URL endpoint -> baseDomain+basePath+postId.
                 * Expects response element as json data -> {"id","title","description"}
                 * @param postId
                 */
                /*    sendGet(postId) {
                        this.http.get(this.baseDomain+this.basePath+'/'+postId)
                            .map(res => res.json())
                            .subscribe(
                                data => {
                                    var el=this.byId(data.id);
                                    el.description=data.description;
                                    el.title=data.title;
                                },
                                err => console.error("GET REQUEST NOT VALID, ERROR: ",err),
                                () => console.log('Retrieval of element with id='+postId+' completed.')
                            );
                    }
                
                    /***
                     * Sends a http GET request for the URL endpoint -> baseDomain+basePath.
                     * Expects a json array list of available elements -> [ {id,title} , {...} ]
                     * adds description and editable(view related) property
                     */
                /*  sendGetList() {
                      this.http.get(this.baseDomain+this.basePath)
                          .map(res => res.json())
                          .subscribe(
                              data => {
                                  this.arrayNotes=data;
                                  this.arrayNotes.forEach( el => el.description="" );
                                  this.arrayNotes.forEach(el => { el.editable=false });
                              },
                              err => console.error("CANNOT RETRIEVE ELEMENT LIST, ERROR: ",err),
                              () => console.log('Retrieval of all elements completed.')
                          );
                  }
              
                  /***
                   * Sends a http POST request for the URL endpoint -> baseDomain+basePath.
                   * Json format assumed at server is: {"title","description"}
                   * Always remember to set the http headers with correct content type <--- IMPORTANT
                   * Updates the whole list
                   */
                /*    sendPostThenGetList(title, description) {
                        var postObject= {"title": title, "description": description};
                        var headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                        this.http.post(this.baseDomain+this.basePath,JSON.stringify(postObject),{"headers":headers})
                            .map(res => res.json())
                            .subscribe(
                                data => console.log("ADDED ELEMENT WITH ID="+data.id),
                                err => console.error("CREATE REQUEST NOT VALID, ERROR: ", err),
                                () => this.sendGetList()
                            );
                    }
                
                    /***
                     * Sends a http PUT request for the URL endpoint -> baseDomain+basePath+postId.
                     * Updates a existing element with id=postId
                     * Json format assumed at server is: {"title","description"}
                     * Updates list
                     */
                /*    sendPutThenGetList(postId, title, description) {
                        var postObject= {"title": title, "description": description};
                        var headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                        this.http.put(this.baseDomain+this.basePath+'/'+postId,JSON.stringify(postObject),{headers})
                            .map(res => res.json())
                            .subscribe(
                                data => console.log("UPDATED ELEMENT WITH ID="+data.id),
                                err => console.error("UPDATE REQUEST NOT VALID, ERROR CODE: ",err),
                                () => this.sendGetList()
                            );
                    }
                
                    /***
                     * Sends a http DELETE request for the URL endpoint -> baseDomain+basePath+postId.
                     * Server returns status code 204(success without any responsebody) upon successfull call.
                     * Updates list
                     */
                /*   sendDeleteThenGetList(postId) {
                       this.http.delete(this.baseDomain+this.basePath+'/'+postId)
                           .subscribe(
                               err => console.log("DELETE REQUEST ERROR, ERROR CODE: ", err) ,
                               () => this.sendGetList()
                           );
                   }
               */
                // Clear out all descriptions. Descriptions are made available as a post is opened.
                // Reason for that is that the API does not deliver descriptions on listing but rather has to be sync'ed
                // one at a time. This way the frontend reflects the rest api functionality.
                Model.prototype.deleteDescriptions = function () {
                    this.arrayNotes.forEach(function (el) { return el.description = ""; });
                };
                Model = __decorate([
                    __param(0, decorators_1.Inject(transactionService_1.TransactionService)), 
                    __metadata('design:paramtypes', [Object])
                ], Model);
                return Model;
            }());
            exports_1("Model", Model);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRUE7O2VBRUc7WUFDSCxnQ0FBZ0M7WUFFaEM7Z0JBVUksZUFBd0Msa0JBQWtCO29CQVQxRCxzRkFBc0Y7b0JBQ3RGLDRCQUE0QjtvQkFFNUIscUZBQXFGO29CQUNyRixvQkFBb0I7b0JBRXBCLFdBQVc7b0JBQ1gsZUFBVSxHQUFhLEVBQUUsQ0FBQztvQkFHdEIscUJBQXFCO2dCQUN6QixDQUFDO2dCQUVEOzs7OzttQkFLRztnQkFFSSwyQkFBVyxHQUFsQixVQUFtQixJQUFJO29CQUNuQixJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQztvQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUUsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsV0FBVyxHQUFDLEVBQUUsRUFBakIsQ0FBaUIsQ0FBRSxDQUFDO29CQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUUsSUFBTSxFQUFFLENBQUMsUUFBUSxHQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxDQUFDO2dCQUVNLG9CQUFJLEdBQVgsY0FBZ0IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUVsQyxvQkFBSSxHQUFYLFVBQVksRUFBRTtvQkFDVixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFFLEVBQUUsQ0FBQzs0QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0QsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVEOzs7O21CQUlHO2dCQUNQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBa0JPO2dCQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQW1CSztnQkFFUDs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQWtCTztnQkFFUDs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBaUJPO2dCQUVOOzs7Ozs7O2lCQU9DO2dCQUNFLG1GQUFtRjtnQkFDbkYsd0dBQXdHO2dCQUN4Ryw0RUFBNEU7Z0JBQzVFLGtDQUFrQixHQUFsQjtvQkFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBRSxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxXQUFXLEdBQUMsRUFBRSxFQUFqQixDQUFpQixDQUFFLENBQUM7Z0JBQ3ZELENBQUM7Z0JBM0hXOytCQUFDLG1CQUFNLENBQUMsdUNBQWtCLENBQUM7O3lCQUFBO2dCQTZIM0MsWUFBQztZQUFELENBdklBLEFBdUlDLElBQUE7WUF2SUQseUJBdUlDLENBQUEiLCJmaWxlIjoiTW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RyYW5zYWN0aW9uU2VydmljZX0gZnJvbSAnLi90cmFuc2FjdGlvblNlcnZpY2UnXHJcbmltcG9ydCB7SW5qZWN0fSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvZGkvZGVjb3JhdG9yc1wiO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBIYWRkb2NrIG9uIDIwMTYtMTAtMDQuXHJcbiAqL1xyXG4vLyBNb2RlbCBsYXllciB3aXRoIHRyYW5zYWN0aW9uc1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcclxuICAgIC8vYmFzZURvbWFpbj0naHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vaHR0cDovL3RpbWVzaGVldC0xMTcyLmFwcHNwb3QuY29tLyc7XHJcbiAgICAvL2Jhc2VQYXRoPSdlNTc2NGU5ZS9ub3Rlcyc7XHJcblxyXG4gICAgLy9iYXNlRG9tYWluPSdodHRwOi8vbG9jYWxob3N0OjMwMDQvJzsgLy8gVXNlZCBqc29uLXNlcnZlciBsb2NhbGx5IGFzIGEgZmFrZSBSRVNUIEFQSVxyXG4gICAgLy9iYXNlUGF0aD0nbm90ZXMvJztcclxuXHJcbiAgICAvL0RhdGEgdmFyc1xyXG4gICAgYXJyYXlOb3RlczogQXJyYXk8YW55Pj1bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFRyYW5zYWN0aW9uU2VydmljZSkgdHJhbnNhY3Rpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgLy90aGlzLnNlbmRHZXRMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICogRmluZHMgYW5kIHJldHVybnMgYW4gZWxlbWVudCBmcm9tIHRoZSBhcnJheSBhcnIgd2l0aCBnaXZlbiBpZFxyXG4gICAgICogQHBhcmFtIGFyciAtIEFuIGFycmF5IHdpdGggaWQgcHJvcGVydHlcclxuICAgICAqIEBwYXJhbSBpZCAtIEEgaWQgbnVtYmVyXHJcbiAgICAgKiBAcmV0dXJucyB7ZWxlbWVudCBmcm9tIGFycmF5IEBhcnIgd2l0aCBAaWR9XHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgcmVwbGFjZURhdGEoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuYXJyYXlOb3Rlcz1kYXRhO1xyXG4gICAgICAgIHRoaXMuYXJyYXlOb3Rlcy5mb3JFYWNoKCBlbCA9PiBlbC5kZXNjcmlwdGlvbj1cIlwiICk7XHJcbiAgICAgICAgdGhpcy5hcnJheU5vdGVzLmZvckVhY2goZWwgPT4geyBlbC5lZGl0YWJsZT1mYWxzZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGlzdCgpIHsgcmV0dXJuIHRoaXMuYXJyYXlOb3RlczsgfVxyXG5cclxuICAgIHB1YmxpYyBieUlkKGlkKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaj0wOyBqPHRoaXMuYXJyYXlOb3Rlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hcnJheU5vdGVzW2pdLmlkPT1pZCkgcmV0dXJuIHRoaXMuYXJyYXlOb3Rlc1tqXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICogU2VuZCBhIGh0dHAgR0VUIHJlcXVlc3QgZm9yIHRoZSBlbGVtZW50IHBvc3RJZCBjb250YWluZWQgaW4gdGhlIGRlZmluZWQgVVJMIGVuZHBvaW50IC0+IGJhc2VEb21haW4rYmFzZVBhdGgrcG9zdElkLlxyXG4gICAgICogRXhwZWN0cyByZXNwb25zZSBlbGVtZW50IGFzIGpzb24gZGF0YSAtPiB7XCJpZFwiLFwidGl0bGVcIixcImRlc2NyaXB0aW9uXCJ9XHJcbiAgICAgKiBAcGFyYW0gcG9zdElkXHJcbiAgICAgKi9cclxuLyogICAgc2VuZEdldChwb3N0SWQpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZURvbWFpbit0aGlzLmJhc2VQYXRoKycvJytwb3N0SWQpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWw9dGhpcy5ieUlkKGRhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmRlc2NyaXB0aW9uPWRhdGEuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgZWwudGl0bGU9ZGF0YS50aXRsZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnIgPT4gY29uc29sZS5lcnJvcihcIkdFVCBSRVFVRVNUIE5PVCBWQUxJRCwgRVJST1I6IFwiLGVyciksXHJcbiAgICAgICAgICAgICAgICAoKSA9PiBjb25zb2xlLmxvZygnUmV0cmlldmFsIG9mIGVsZW1lbnQgd2l0aCBpZD0nK3Bvc3RJZCsnIGNvbXBsZXRlZC4nKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIFNlbmRzIGEgaHR0cCBHRVQgcmVxdWVzdCBmb3IgdGhlIFVSTCBlbmRwb2ludCAtPiBiYXNlRG9tYWluK2Jhc2VQYXRoLlxyXG4gICAgICogRXhwZWN0cyBhIGpzb24gYXJyYXkgbGlzdCBvZiBhdmFpbGFibGUgZWxlbWVudHMgLT4gWyB7aWQsdGl0bGV9ICwgey4uLn0gXVxyXG4gICAgICogYWRkcyBkZXNjcmlwdGlvbiBhbmQgZWRpdGFibGUodmlldyByZWxhdGVkKSBwcm9wZXJ0eVxyXG4gICAgICovXHJcbiAgLyogIHNlbmRHZXRMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlRG9tYWluK3RoaXMuYmFzZVBhdGgpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5Tm90ZXM9ZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5Tm90ZXMuZm9yRWFjaCggZWwgPT4gZWwuZGVzY3JpcHRpb249XCJcIiApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlOb3Rlcy5mb3JFYWNoKGVsID0+IHsgZWwuZWRpdGFibGU9ZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJDQU5OT1QgUkVUUklFVkUgRUxFTUVOVCBMSVNULCBFUlJPUjogXCIsZXJyKSxcclxuICAgICAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdSZXRyaWV2YWwgb2YgYWxsIGVsZW1lbnRzIGNvbXBsZXRlZC4nKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIFNlbmRzIGEgaHR0cCBQT1NUIHJlcXVlc3QgZm9yIHRoZSBVUkwgZW5kcG9pbnQgLT4gYmFzZURvbWFpbitiYXNlUGF0aC5cclxuICAgICAqIEpzb24gZm9ybWF0IGFzc3VtZWQgYXQgc2VydmVyIGlzOiB7XCJ0aXRsZVwiLFwiZGVzY3JpcHRpb25cIn1cclxuICAgICAqIEFsd2F5cyByZW1lbWJlciB0byBzZXQgdGhlIGh0dHAgaGVhZGVycyB3aXRoIGNvcnJlY3QgY29udGVudCB0eXBlIDwtLS0gSU1QT1JUQU5UXHJcbiAgICAgKiBVcGRhdGVzIHRoZSB3aG9sZSBsaXN0XHJcbiAgICAgKi9cclxuXHJcbi8qICAgIHNlbmRQb3N0VGhlbkdldExpc3QodGl0bGUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgdmFyIHBvc3RPYmplY3Q9IHtcInRpdGxlXCI6IHRpdGxlLCBcImRlc2NyaXB0aW9uXCI6IGRlc2NyaXB0aW9ufTtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgICAgdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlRG9tYWluK3RoaXMuYmFzZVBhdGgsSlNPTi5zdHJpbmdpZnkocG9zdE9iamVjdCkse1wiaGVhZGVyc1wiOmhlYWRlcnN9KVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiBjb25zb2xlLmxvZyhcIkFEREVEIEVMRU1FTlQgV0lUSCBJRD1cIitkYXRhLmlkKSxcclxuICAgICAgICAgICAgICAgIGVyciA9PiBjb25zb2xlLmVycm9yKFwiQ1JFQVRFIFJFUVVFU1QgTk9UIFZBTElELCBFUlJPUjogXCIsIGVyciksXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLnNlbmRHZXRMaXN0KClcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBTZW5kcyBhIGh0dHAgUFVUIHJlcXVlc3QgZm9yIHRoZSBVUkwgZW5kcG9pbnQgLT4gYmFzZURvbWFpbitiYXNlUGF0aCtwb3N0SWQuXHJcbiAgICAgKiBVcGRhdGVzIGEgZXhpc3RpbmcgZWxlbWVudCB3aXRoIGlkPXBvc3RJZFxyXG4gICAgICogSnNvbiBmb3JtYXQgYXNzdW1lZCBhdCBzZXJ2ZXIgaXM6IHtcInRpdGxlXCIsXCJkZXNjcmlwdGlvblwifVxyXG4gICAgICogVXBkYXRlcyBsaXN0XHJcbiAgICAgKi9cclxuXHJcbi8qICAgIHNlbmRQdXRUaGVuR2V0TGlzdChwb3N0SWQsIHRpdGxlLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHZhciBwb3N0T2JqZWN0PSB7XCJ0aXRsZVwiOiB0aXRsZSwgXCJkZXNjcmlwdGlvblwiOiBkZXNjcmlwdGlvbn07XHJcbiAgICAgICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICAgIHRoaXMuaHR0cC5wdXQodGhpcy5iYXNlRG9tYWluK3RoaXMuYmFzZVBhdGgrJy8nK3Bvc3RJZCxKU09OLnN0cmluZ2lmeShwb3N0T2JqZWN0KSx7aGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKFwiVVBEQVRFRCBFTEVNRU5UIFdJVEggSUQ9XCIrZGF0YS5pZCksXHJcbiAgICAgICAgICAgICAgICBlcnIgPT4gY29uc29sZS5lcnJvcihcIlVQREFURSBSRVFVRVNUIE5PVCBWQUxJRCwgRVJST1IgQ09ERTogXCIsZXJyKSxcclxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMuc2VuZEdldExpc3QoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIFNlbmRzIGEgaHR0cCBERUxFVEUgcmVxdWVzdCBmb3IgdGhlIFVSTCBlbmRwb2ludCAtPiBiYXNlRG9tYWluK2Jhc2VQYXRoK3Bvc3RJZC5cclxuICAgICAqIFNlcnZlciByZXR1cm5zIHN0YXR1cyBjb2RlIDIwNChzdWNjZXNzIHdpdGhvdXQgYW55IHJlc3BvbnNlYm9keSkgdXBvbiBzdWNjZXNzZnVsbCBjYWxsLlxyXG4gICAgICogVXBkYXRlcyBsaXN0XHJcbiAgICAgKi9cclxuXHJcbiAvKiAgIHNlbmREZWxldGVUaGVuR2V0TGlzdChwb3N0SWQpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZGVsZXRlKHRoaXMuYmFzZURvbWFpbit0aGlzLmJhc2VQYXRoKycvJytwb3N0SWQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBlcnIgPT4gY29uc29sZS5sb2coXCJERUxFVEUgUkVRVUVTVCBFUlJPUiwgRVJST1IgQ09ERTogXCIsIGVycikgLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5zZW5kR2V0TGlzdCgpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICB9XHJcbiovXHJcbiAgICAvLyBDbGVhciBvdXQgYWxsIGRlc2NyaXB0aW9ucy4gRGVzY3JpcHRpb25zIGFyZSBtYWRlIGF2YWlsYWJsZSBhcyBhIHBvc3QgaXMgb3BlbmVkLlxyXG4gICAgLy8gUmVhc29uIGZvciB0aGF0IGlzIHRoYXQgdGhlIEFQSSBkb2VzIG5vdCBkZWxpdmVyIGRlc2NyaXB0aW9ucyBvbiBsaXN0aW5nIGJ1dCByYXRoZXIgaGFzIHRvIGJlIHN5bmMnZWRcclxuICAgIC8vIG9uZSBhdCBhIHRpbWUuIFRoaXMgd2F5IHRoZSBmcm9udGVuZCByZWZsZWN0cyB0aGUgcmVzdCBhcGkgZnVuY3Rpb25hbGl0eS5cclxuICAgIGRlbGV0ZURlc2NyaXB0aW9ucygpIHtcclxuICAgICAgICB0aGlzLmFycmF5Tm90ZXMuZm9yRWFjaCggZWwgPT4gZWwuZGVzY3JpcHRpb249XCJcIiApO1xyXG4gICAgfVxyXG5cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
