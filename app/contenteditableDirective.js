System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var contenteditableDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            contenteditableDirective = (function () {
                function contenteditableDirective(el, renderer) {
                    this.el = el;
                    this.renderer = renderer;
                    this.modelContentChange = new core_1.EventEmitter();
                }
                contenteditableDirective.prototype.update = function (event) {
                    this.modelContentChange.emit(this.el.nativeElement.innerText);
                };
                contenteditableDirective.prototype.ngOnInit = function () {
                    this.el.nativeElement.innerText = this.modelContent;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], contenteditableDirective.prototype, "modelContent", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], contenteditableDirective.prototype, "modelContentChange", void 0);
                contenteditableDirective = __decorate([
                    core_1.Directive({
                        selector: '[contenteditable]',
                        host: {
                            '(input)': 'update($event)'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
                ], contenteditableDirective);
                return contenteditableDirective;
            }());
            exports_1("contenteditableDirective", contenteditableDirective);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRlbnRlZGl0YWJsZURpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVFBO2dCQUtJLGtDQUFvQixFQUFjLEVBQVUsUUFBa0I7b0JBQTFDLE9BQUUsR0FBRixFQUFFLENBQVk7b0JBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtvQkFGcEQsdUJBQWtCLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO2dCQUVILENBQUM7Z0JBRW5FLHlDQUFNLEdBQU4sVUFBTyxLQUFLO29CQUNSLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xFLENBQUM7Z0JBRUQsMkNBQVEsR0FBUjtvQkFDSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDeEQsQ0FBQztnQkFYRDtvQkFBQyxZQUFLLEVBQUU7OzhFQUFBO2dCQUNSO29CQUFDLGFBQU0sRUFBRTs7b0ZBQUE7Z0JBVGI7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDUCxRQUFRLEVBQUUsbUJBQW1CO3dCQUM3QixJQUFJLEVBQUU7NEJBQ0YsU0FBUyxFQUFFLGdCQUFnQjt5QkFDOUI7cUJBQ0osQ0FBQzs7NENBQUE7Z0JBZUYsK0JBQUM7WUFBRCxDQWRBLEFBY0MsSUFBQTtZQWRELCtEQWNDLENBQUEiLCJmaWxlIjoiY29udGVudGVkaXRhYmxlRGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbnB1dCwgT3V0cHV0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyLCBFdmVudEVtaXR0ZXIsIE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSdcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbY29udGVudGVkaXRhYmxlXScsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJyhpbnB1dCknOiAndXBkYXRlKCRldmVudCknXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBjb250ZW50ZWRpdGFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgLy9Gb3VuZCB0aGlzIHNuaXBwZXQgb24gdGhlIHdlYiBhdDogaHR0cDovL3d3dy5zdGVwaGFubWlsbGVyLmNvbS8yMDE2LzA5L2NyZWF0aW5nLWFuLWFuZ3VsYXIyLWNvbnRlbnQtZWRpdGFibGUtZGlyZWN0aXZlL1xyXG4gICAgQElucHV0KCkgbW9kZWxDb250ZW50O1xyXG4gICAgQE91dHB1dCgpIG1vZGVsQ29udGVudENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHsgfVxyXG5cclxuICAgIHVwZGF0ZShldmVudCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxDb250ZW50Q2hhbmdlLmVtaXQodGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVyVGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVyVGV4dCA9IHRoaXMubW9kZWxDb250ZW50O1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
