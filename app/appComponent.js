System.register(['angular2/core', 'rxjs/Rx', './contenteditableDirective', './HeroComponent', "./transactionService", "./note"], function(exports_1, context_1) {
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
    var core_1, contenteditableDirective_1, HeroComponent_1, transactionService_1, note_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (contenteditableDirective_1_1) {
                contenteditableDirective_1 = contenteditableDirective_1_1;
            },
            function (HeroComponent_1_1) {
                HeroComponent_1 = HeroComponent_1_1;
            },
            function (transactionService_1_1) {
                transactionService_1 = transactionService_1_1;
            },
            function (note_1_1) {
                note_1 = note_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(transService) {
                    this.transService = transService;
                    this.newNote = new note_1.Note();
                    this.changed = false;
                    this.openNote = -1;
                    transService.sendGetList();
                }
                Object.defineProperty(AppComponent.prototype, "notes", {
                    get: function () {
                        return this.transService.getNotes();
                    },
                    enumerable: true,
                    configurable: true
                });
                AppComponent.prototype.inputChanged = function () {
                    this.changed = true;
                };
                // Update a post (Called from UI)
                AppComponent.prototype.updatePost = function (postId) {
                    var el = this.transService.byId(postId);
                    this.transService.sendPut(el);
                    this.openNote = -1;
                };
                // Save/create to the rest api (called from the UI layer). NOTE: Should close after save, but 2-way d-bind doesnt work for some reason.
                AppComponent.prototype.savePost = function (e) {
                    this.transService.sendPost(this.newNote);
                    this.newNote = new note_1.Note();
                    this.openNote = -1;
                };
                //Close all open posts on UI
                AppComponent.prototype.closePosts = function () {
                    this.openNote = -1;
                };
                //Delete a post
                AppComponent.prototype.deletePost = function (postId) {
                    this.transService.sendDelete(postId);
                };
                //Opens a note on the UI. Resets the old one (might be changed w/o UPDATE)
                AppComponent.prototype.showNote = function (postId) {
                    if (this.openNote >= 0 && this.openNote < 9999) {
                        this.transService.sendGet(this.openNote);
                    }
                    this.changed = false;
                    this.openNote = postId;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'noteapp',
                        directives: [contenteditableDirective_1.contenteditableDirective, HeroComponent_1.HeroComponent],
                        templateUrl: 'partials/noteapp.html'
                    }), 
                    __metadata('design:paramtypes', [transactionService_1.TransactionService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFhQTtnQkFNSSxzQkFBb0IsWUFBK0I7b0JBQS9CLGlCQUFZLEdBQVosWUFBWSxDQUFtQjtvQkFKbkQsWUFBTyxHQUFPLElBQUksV0FBSSxFQUFFLENBQUM7b0JBQ3pCLFlBQU8sR0FBQyxLQUFLLENBQUM7b0JBQ2QsYUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO29CQUdSLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDL0IsQ0FBQztnQkFFRCxzQkFBSSwrQkFBSzt5QkFBVDt3QkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDeEMsQ0FBQzs7O21CQUFBO2dCQUVELG1DQUFZLEdBQVo7b0JBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsaUNBQWlDO2dCQUNqQyxpQ0FBVSxHQUFWLFVBQVcsTUFBTTtvQkFDYixJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRUQsdUlBQXVJO2dCQUN2SSwrQkFBUSxHQUFSLFVBQVMsQ0FBQztvQkFDTixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxXQUFJLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsQ0FBQztnQkFFRCw0QkFBNEI7Z0JBQzVCLGlDQUFVLEdBQVY7b0JBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsQ0FBQztnQkFFRCxlQUFlO2dCQUNmLGlDQUFVLEdBQVYsVUFBVyxNQUFNO29CQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO2dCQUVELDBFQUEwRTtnQkFDMUUsK0JBQVEsR0FBUixVQUFTLE1BQU07b0JBQ1gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFBQyxDQUFDO29CQUN6RixJQUFJLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBQyxNQUFNLENBQUM7Z0JBQ3pCLENBQUM7Z0JBckRMO29CQUFDLGdCQUFTLENBQUM7d0JBQ1AsUUFBUSxFQUFFLFNBQVM7d0JBQ25CLFVBQVUsRUFBRSxDQUFDLG1EQUF3QixFQUFDLDZCQUFhLENBQUM7d0JBQ3BELFdBQVcsRUFBRSx1QkFBdUI7cUJBQ3ZDLENBQUM7O2dDQUFBO2dCQWtERixtQkFBQztZQUFELENBaERBLEFBZ0RDLElBQUE7WUFoREQsdUNBZ0RDLENBQUEiLCJmaWxlIjoiYXBwQ29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQgJ3J4anMvUngnO1xyXG5pbXBvcnQge2NvbnRlbnRlZGl0YWJsZURpcmVjdGl2ZX0gZnJvbSAnLi9jb250ZW50ZWRpdGFibGVEaXJlY3RpdmUnO1xyXG5pbXBvcnQge0hlcm9Db21wb25lbnR9IGZyb20gJy4vSGVyb0NvbXBvbmVudCc7XHJcbmltcG9ydCB7VHJhbnNhY3Rpb25TZXJ2aWNlfSBmcm9tIFwiLi90cmFuc2FjdGlvblNlcnZpY2VcIjtcclxuaW1wb3J0IHtOb3RlfSBmcm9tIFwiLi9ub3RlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbm90ZWFwcCcsXHJcbiAgICBkaXJlY3RpdmVzOiBbY29udGVudGVkaXRhYmxlRGlyZWN0aXZlLEhlcm9Db21wb25lbnRdLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9ub3RlYXBwLmh0bWwnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcclxuXHJcbiAgICBuZXdOb3RlOiBOb3RlPW5ldyBOb3RlKCk7XHJcbiAgICBjaGFuZ2VkPWZhbHNlO1xyXG4gICAgb3Blbk5vdGU9LTE7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc1NlcnZpY2U6VHJhbnNhY3Rpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdHJhbnNTZXJ2aWNlLnNlbmRHZXRMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG5vdGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zU2VydmljZS5nZXROb3RlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Q2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLmNoYW5nZWQ9dHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgYSBwb3N0IChDYWxsZWQgZnJvbSBVSSlcclxuICAgIHVwZGF0ZVBvc3QocG9zdElkKSB7XHJcbiAgICAgICAgdmFyIGVsPXRoaXMudHJhbnNTZXJ2aWNlLmJ5SWQocG9zdElkKTtcclxuICAgICAgICB0aGlzLnRyYW5zU2VydmljZS5zZW5kUHV0KGVsKTtcclxuICAgICAgICB0aGlzLm9wZW5Ob3RlPS0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNhdmUvY3JlYXRlIHRvIHRoZSByZXN0IGFwaSAoY2FsbGVkIGZyb20gdGhlIFVJIGxheWVyKS4gTk9URTogU2hvdWxkIGNsb3NlIGFmdGVyIHNhdmUsIGJ1dCAyLXdheSBkLWJpbmQgZG9lc250IHdvcmsgZm9yIHNvbWUgcmVhc29uLlxyXG4gICAgc2F2ZVBvc3QoZSkge1xyXG4gICAgICAgIHRoaXMudHJhbnNTZXJ2aWNlLnNlbmRQb3N0KHRoaXMubmV3Tm90ZSk7XHJcbiAgICAgICAgdGhpcy5uZXdOb3RlPW5ldyBOb3RlKCk7XHJcbiAgICAgICAgdGhpcy5vcGVuTm90ZT0tMTtcclxuICAgIH1cclxuXHJcbiAgICAvL0Nsb3NlIGFsbCBvcGVuIHBvc3RzIG9uIFVJXHJcbiAgICBjbG9zZVBvc3RzKCkge1xyXG4gICAgICAgIHRoaXMub3Blbk5vdGU9LTE7XHJcbiAgICB9XHJcblxyXG4gICAgLy9EZWxldGUgYSBwb3N0XHJcbiAgICBkZWxldGVQb3N0KHBvc3RJZCkge1xyXG4gICAgICAgIHRoaXMudHJhbnNTZXJ2aWNlLnNlbmREZWxldGUocG9zdElkKTtcclxuICAgIH1cclxuXHJcbiAgICAvL09wZW5zIGEgbm90ZSBvbiB0aGUgVUkuIFJlc2V0cyB0aGUgb2xkIG9uZSAobWlnaHQgYmUgY2hhbmdlZCB3L28gVVBEQVRFKVxyXG4gICAgc2hvd05vdGUocG9zdElkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3Blbk5vdGU+PTAgJiYgdGhpcy5vcGVuTm90ZTw5OTk5KSB7IHRoaXMudHJhbnNTZXJ2aWNlLnNlbmRHZXQodGhpcy5vcGVuTm90ZSk7IH1cclxuICAgICAgICB0aGlzLmNoYW5nZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vcGVuTm90ZT1wb3N0SWQ7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
