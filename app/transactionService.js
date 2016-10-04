System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var TransactionService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            // The Model
            TransactionService = (function () {
                function TransactionService(http) {
                    this.http = http;
                    this.baseDomain = 'https://cors-anywhere.herokuapp.com/http://timesheet-1172.appspot.com/';
                    this.basePath = 'e5764e9e/notes';
                    //    baseDomain='http://localhost:3004/'; // Used json-server locally as a fake REST API
                    //    basePath='notes';
                    this.notes = [];
                }
                TransactionService.prototype.getNotes = function () {
                    return this.notes;
                };
                // Helper function to get a note by its id
                TransactionService.prototype.byId = function (id) {
                    for (var i = 0; i < this.notes.length; i++) {
                        if (this.notes[i].id == id)
                            return this.notes[i];
                    }
                    return null;
                };
                /***
                 * Send a http GET request for the element postId contained in the defined URL endpoint -> baseDomain+basePath+postId.
                 * Expects response element as json data -> {"id","title","description"}
                 * @param postId
                 */
                TransactionService.prototype.sendGet = function (postId) {
                    var _this = this;
                    this.http.get(this.baseDomain + this.basePath + '/' + postId)
                        .map(function (res) { return res.json(); }).subscribe(function (data) {
                        var el = _this.byId(data.id);
                        el.title = data.title;
                        el.description = data.description;
                    }, function (err) { return console.error('DAOservice error on sendGet: ' + err); }, function () { return console.log('Retrieved item.'); });
                };
                /***
                 * Sends a http GET request for the URL endpoint -> baseDomain+basePath.
                 * Expects a json array list of available elements -> [ {id,title} , {...} ]
                 * adds description and editable(view related) property
                 */
                TransactionService.prototype.sendGetList = function () {
                    var _this = this;
                    this.http.get(this.baseDomain + this.basePath)
                        .map(function (res) { return res.json(); }).subscribe(function (data) { return _this.notes = data; }, function (err) { return console.log('DAOservice error on GetList: ', err); }, function () {
                        console.log('Retrieved list.');
                        //Fill in all the descriptions
                        _this.notes.forEach(function (note) {
                            _this.sendGet(note.id);
                        });
                    });
                };
                /***
                 * Sends a http Post request for the rest endpoint
                 * @param newNote - An instance of Note
                 */
                TransactionService.prototype.sendPost = function (newNote) {
                    var _this = this;
                    var postObject = { "title": newNote.title, "description": newNote.description };
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.post(this.baseDomain + this.basePath, JSON.stringify(postObject), { "headers": headers })
                        .map(function (res) { return res.json(); }).subscribe(function (data) { return _this.notes.push(data); }, function (err) { return console.error('DAOservice error on Post: ' + err); }, function () { return console.log("Created new item"); });
                };
                /***
                 * Sends a http PUT request for the URL endpoint -> baseDomain+basePath+postId.
                 * Updates a existing element with id=postId
                 * Json format assumed at server is: {"title","description"}
                 * Updates list
                 */
                TransactionService.prototype.sendPut = function (updateNote) {
                    var _this = this;
                    var postObject = { "title": updateNote.title, "description": updateNote.description };
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.put(this.baseDomain + this.basePath + '/' + updateNote.id, JSON.stringify(postObject), { headers: headers })
                        .map(function (res) { return res.json(); }).subscribe(function (data) {
                        var el = _this.byId(data.id);
                        el.title = data.title;
                        el.description = data.description;
                    }, function (err) { return console.log("DAOservice error on Put: " + err); }, function () { return console.log("Updated element."); });
                };
                /***
                 * Sends a http DELETE request for the URL endpoint -> baseDomain+basePath+postId.
                 * Server returns status code 204(success without any responsebody) upon successfull call.
                 * Updates list
                 */
                TransactionService.prototype.sendDelete = function (postId) {
                    var _this = this;
                    this.http.delete(this.baseDomain + this.basePath + '/' + postId).subscribe(function () {
                        _this.notes.forEach(function (el, i) {
                            if (el.id === postId) {
                                _this.notes.splice(i, 1);
                            }
                        });
                        console.log("Note deleted.");
                    });
                };
                TransactionService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TransactionService);
                return TransactionService;
            }());
            exports_1("TransactionService", TransactionService);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYW5zYWN0aW9uU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU9BLFlBQVk7WUFHWjtnQkFTSSw0QkFBb0IsSUFBUztvQkFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO29CQVI3QixlQUFVLEdBQUMsd0VBQXdFLENBQUM7b0JBQ3BGLGFBQVEsR0FBQyxnQkFBZ0IsQ0FBQztvQkFFOUIseUZBQXlGO29CQUN6Rix1QkFBdUI7b0JBRW5CLFVBQUssR0FBVyxFQUFFLENBQUM7Z0JBRWMsQ0FBQztnQkFFM0IscUNBQVEsR0FBZjtvQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCwwQ0FBMEM7Z0JBQ25DLGlDQUFJLEdBQVgsVUFBWSxFQUFFO29CQUNWLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUUsRUFBRSxDQUFDOzRCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0gsb0NBQU8sR0FBUCxVQUFRLE1BQU07b0JBQWQsaUJBV0M7b0JBVkcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLEdBQUcsR0FBQyxNQUFNLENBQUM7eUJBQ2xELEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQyxTQUFTLENBQzdCLFVBQUEsSUFBSTt3QkFDQSxJQUFJLEVBQUUsR0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDMUIsRUFBRSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNwQixFQUFFLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3BDLENBQUMsRUFDRCxVQUFBLEdBQUcsSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLEdBQUMsR0FBRyxDQUFDLEVBQWxELENBQWtELEVBQ3pELGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQTlCLENBQThCLENBQzNDLENBQUM7Z0JBQ04sQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSCx3Q0FBVyxHQUFYO29CQUFBLGlCQWNDO29CQWJHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzt5QkFDdkMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FDN0IsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFDLElBQUksRUFBZixDQUFlLEVBQ3ZCLFVBQUEsR0FBRyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBQyxHQUFHLENBQUMsRUFBaEQsQ0FBZ0QsRUFDdkQ7d0JBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO3dCQUM5Qiw4QkFBOEI7d0JBQzlCLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFFLFVBQUEsSUFBSTs0QkFDaEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQzFCLENBQUMsQ0FDSixDQUFDO29CQUNOLENBQUMsQ0FDSixDQUFDO2dCQUNWLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSCxxQ0FBUSxHQUFSLFVBQVMsT0FBYTtvQkFBdEIsaUJBVUM7b0JBVEcsSUFBSSxVQUFVLEdBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBQyxDQUFDO29CQUM3RSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO29CQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO29CQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBQyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsQ0FBQzt5QkFDdkYsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FDN0IsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBckIsQ0FBcUIsRUFDN0IsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixHQUFDLEdBQUcsQ0FBQyxFQUEvQyxDQUErQyxFQUN0RCxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUEvQixDQUErQixDQUM1QyxDQUFDO2dCQUNOLENBQUM7Z0JBRUQ7Ozs7O21CQUtHO2dCQUVILG9DQUFPLEdBQVAsVUFBUSxVQUFnQjtvQkFBeEIsaUJBY0M7b0JBYkcsSUFBSSxVQUFVLEdBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLFdBQVcsRUFBQyxDQUFDO29CQUNuRixJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO29CQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO29CQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsR0FBRyxHQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBQyxFQUFDLFNBQUEsT0FBTyxFQUFDLENBQUM7eUJBQzlGLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQyxTQUFTLENBQzdCLFVBQUEsSUFBSTt3QkFDQSxJQUFJLEVBQUUsR0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDMUIsRUFBRSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNwQixFQUFFLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3BDLENBQUMsRUFDRCxVQUFBLEdBQUcsSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUMsR0FBRyxDQUFDLEVBQTVDLENBQTRDLEVBQ25ELGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEVBQS9CLENBQStCLENBQzVDLENBQUM7Z0JBQ04sQ0FBQztnQkFFRDs7OzttQkFJRztnQkFFSCx1Q0FBVSxHQUFWLFVBQVcsTUFBTTtvQkFBakIsaUJBU0M7b0JBUkcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLEdBQUcsR0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ2hFO3dCQUNJLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBRSxFQUFFLENBQUM7NEJBQ3JCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQUMsQ0FBQzt3QkFDdEQsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDakMsQ0FBQyxDQUNKLENBQUM7Z0JBQ04sQ0FBQztnQkFySEw7b0JBQUMsaUJBQVUsRUFBRTs7c0NBQUE7Z0JBc0hiLHlCQUFDO1lBQUQsQ0FySEEsQUFxSEMsSUFBQTtZQXJIRCxtREFxSEMsQ0FBQSIsImZpbGUiOiJ0cmFuc2FjdGlvblNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBIYWRkb2NrIG9uIDIwMTYtMTAtMDQuXHJcbiAqL1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQge0h0dHAsIEhlYWRlcnMsIFJlc3BvbnNlfSBmcm9tICdhbmd1bGFyMi9odHRwJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL1J4JztcclxuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9ub3RlXCI7XHJcbi8vIFRoZSBNb2RlbFxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb25TZXJ2aWNlIHtcclxuICAgIGJhc2VEb21haW49J2h0dHBzOi8vY29ycy1hbnl3aGVyZS5oZXJva3VhcHAuY29tL2h0dHA6Ly90aW1lc2hlZXQtMTE3Mi5hcHBzcG90LmNvbS8nO1xyXG4gICAgYmFzZVBhdGg9J2U1NzY0ZTllL25vdGVzJztcclxuXHJcbi8vICAgIGJhc2VEb21haW49J2h0dHA6Ly9sb2NhbGhvc3Q6MzAwNC8nOyAvLyBVc2VkIGpzb24tc2VydmVyIGxvY2FsbHkgYXMgYSBmYWtlIFJFU1QgQVBJXHJcbi8vICAgIGJhc2VQYXRoPSdub3Rlcyc7XHJcblxyXG4gICAgbm90ZXM6IE5vdGVbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDpIdHRwKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Tm90ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm90ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGdldCBhIG5vdGUgYnkgaXRzIGlkXHJcbiAgICBwdWJsaWMgYnlJZChpZCkge1xyXG4gICAgICAgIGZvciAodmFyIGk9MDsgaTx0aGlzLm5vdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vdGVzW2ldLmlkPT1pZCkgcmV0dXJuIHRoaXMubm90ZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIFNlbmQgYSBodHRwIEdFVCByZXF1ZXN0IGZvciB0aGUgZWxlbWVudCBwb3N0SWQgY29udGFpbmVkIGluIHRoZSBkZWZpbmVkIFVSTCBlbmRwb2ludCAtPiBiYXNlRG9tYWluK2Jhc2VQYXRoK3Bvc3RJZC5cclxuICAgICAqIEV4cGVjdHMgcmVzcG9uc2UgZWxlbWVudCBhcyBqc29uIGRhdGEgLT4ge1wiaWRcIixcInRpdGxlXCIsXCJkZXNjcmlwdGlvblwifVxyXG4gICAgICogQHBhcmFtIHBvc3RJZFxyXG4gICAgICovXHJcbiAgICBzZW5kR2V0KHBvc3RJZCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlRG9tYWluK3RoaXMuYmFzZVBhdGgrJy8nK3Bvc3RJZClcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsPXRoaXMuYnlJZChkYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBlbC50aXRsZT1kYXRhLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmRlc2NyaXB0aW9uPWRhdGEuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0RBT3NlcnZpY2UgZXJyb3Igb24gc2VuZEdldDogJytlcnIpLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ1JldHJpZXZlZCBpdGVtLicpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBTZW5kcyBhIGh0dHAgR0VUIHJlcXVlc3QgZm9yIHRoZSBVUkwgZW5kcG9pbnQgLT4gYmFzZURvbWFpbitiYXNlUGF0aC5cclxuICAgICAqIEV4cGVjdHMgYSBqc29uIGFycmF5IGxpc3Qgb2YgYXZhaWxhYmxlIGVsZW1lbnRzIC0+IFsge2lkLHRpdGxlfSAsIHsuLi59IF1cclxuICAgICAqIGFkZHMgZGVzY3JpcHRpb24gYW5kIGVkaXRhYmxlKHZpZXcgcmVsYXRlZCkgcHJvcGVydHlcclxuICAgICAqL1xyXG4gICAgc2VuZEdldExpc3QoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmdldCh0aGlzLmJhc2VEb21haW4rdGhpcy5iYXNlUGF0aClcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB0aGlzLm5vdGVzPWRhdGEsXHJcbiAgICAgICAgICAgICAgICBlcnIgPT4gY29uc29sZS5sb2coJ0RBT3NlcnZpY2UgZXJyb3Igb24gR2V0TGlzdDogJyxlcnIpLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXRyaWV2ZWQgbGlzdC4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vRmlsbCBpbiBhbGwgdGhlIGRlc2NyaXB0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90ZXMuZm9yRWFjaCggbm90ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRHZXQobm90ZS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIFNlbmRzIGEgaHR0cCBQb3N0IHJlcXVlc3QgZm9yIHRoZSByZXN0IGVuZHBvaW50XHJcbiAgICAgKiBAcGFyYW0gbmV3Tm90ZSAtIEFuIGluc3RhbmNlIG9mIE5vdGVcclxuICAgICAqL1xyXG4gICAgc2VuZFBvc3QobmV3Tm90ZTogTm90ZSkge1xyXG4gICAgICAgIHZhciBwb3N0T2JqZWN0PSB7XCJ0aXRsZVwiOiBuZXdOb3RlLnRpdGxlLCBcImRlc2NyaXB0aW9uXCI6IG5ld05vdGUuZGVzY3JpcHRpb259O1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VEb21haW4rdGhpcy5iYXNlUGF0aCxKU09OLnN0cmluZ2lmeShwb3N0T2JqZWN0KSx7XCJoZWFkZXJzXCI6aGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4gdGhpcy5ub3Rlcy5wdXNoKGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0RBT3NlcnZpY2UgZXJyb3Igb24gUG9zdDogJytlcnIpLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coXCJDcmVhdGVkIG5ldyBpdGVtXCIpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBTZW5kcyBhIGh0dHAgUFVUIHJlcXVlc3QgZm9yIHRoZSBVUkwgZW5kcG9pbnQgLT4gYmFzZURvbWFpbitiYXNlUGF0aCtwb3N0SWQuXHJcbiAgICAgKiBVcGRhdGVzIGEgZXhpc3RpbmcgZWxlbWVudCB3aXRoIGlkPXBvc3RJZFxyXG4gICAgICogSnNvbiBmb3JtYXQgYXNzdW1lZCBhdCBzZXJ2ZXIgaXM6IHtcInRpdGxlXCIsXCJkZXNjcmlwdGlvblwifVxyXG4gICAgICogVXBkYXRlcyBsaXN0XHJcbiAgICAgKi9cclxuXHJcbiAgICBzZW5kUHV0KHVwZGF0ZU5vdGU6IE5vdGUpIHtcclxuICAgICAgICB2YXIgcG9zdE9iamVjdD0ge1widGl0bGVcIjogdXBkYXRlTm90ZS50aXRsZSwgXCJkZXNjcmlwdGlvblwiOiB1cGRhdGVOb3RlLmRlc2NyaXB0aW9ufTtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgICAgdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VEb21haW4rdGhpcy5iYXNlUGF0aCsnLycrdXBkYXRlTm90ZS5pZCxKU09OLnN0cmluZ2lmeShwb3N0T2JqZWN0KSx7aGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbD10aGlzLmJ5SWQoZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwudGl0bGU9ZGF0YS50aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICBlbC5kZXNjcmlwdGlvbj1kYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVyciA9PiBjb25zb2xlLmxvZyhcIkRBT3NlcnZpY2UgZXJyb3Igb24gUHV0OiBcIitlcnIpLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coXCJVcGRhdGVkIGVsZW1lbnQuXCIpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBTZW5kcyBhIGh0dHAgREVMRVRFIHJlcXVlc3QgZm9yIHRoZSBVUkwgZW5kcG9pbnQgLT4gYmFzZURvbWFpbitiYXNlUGF0aCtwb3N0SWQuXHJcbiAgICAgKiBTZXJ2ZXIgcmV0dXJucyBzdGF0dXMgY29kZSAyMDQoc3VjY2VzcyB3aXRob3V0IGFueSByZXNwb25zZWJvZHkpIHVwb24gc3VjY2Vzc2Z1bGwgY2FsbC5cclxuICAgICAqIFVwZGF0ZXMgbGlzdFxyXG4gICAgICovXHJcblxyXG4gICAgc2VuZERlbGV0ZShwb3N0SWQpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZGVsZXRlKHRoaXMuYmFzZURvbWFpbit0aGlzLmJhc2VQYXRoKycvJytwb3N0SWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3Rlcy5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5pZCA9PT0gcG9zdElkKSB7IHRoaXMubm90ZXMuc3BsaWNlKGksIDEpOyB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90ZSBkZWxldGVkLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
