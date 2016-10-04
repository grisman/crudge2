System.register(["angular2/core", "rxjs/Rx"], function(exports_1, context_1) {
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
    var core_1, Rx_1;
    var HeroComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            HeroComponent = (function () {
                function HeroComponent() {
                    //Background image changer vars
                    this.backgrounds = [{ "img": "img/photo-1452421822248-d4c2b47f0c81.jpg" }, { "img": "img/photo-1454166155302-ef4863c27e70.jpg" }, { "img": "img/photo-1475506631979-72412c606f4d.jpg" }];
                    this.activeBackground = 0;
                    this.heroStyle = { "background-image": "url(" + this.backgrounds[this.activeBackground].img + ")" };
                    this.runAwesomeBackgroundChanger();
                }
                //Switches backgrounds for the hero
                HeroComponent.prototype.runAwesomeBackgroundChanger = function () {
                    var _this = this;
                    Rx_1.Observable.interval(1500)
                        .subscribe(function () {
                        _this.activeBackground = (++_this.activeBackground) % _this.backgrounds.length;
                        _this.heroStyle = { "background-image": "url(" + _this.backgrounds[_this.activeBackground].img + ")" };
                    });
                };
                HeroComponent = __decorate([
                    core_1.Component({
                        selector: 'herocomponent',
                        templateUrl: 'partials/herocomponent.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeroComponent);
                return HeroComponent;
            }());
            exports_1("HeroComponent", HeroComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlcm9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFRQTtnQkFNSTtvQkFMQSwrQkFBK0I7b0JBQy9CLGdCQUFXLEdBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQywwQ0FBMEMsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLDBDQUEwQyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsMENBQTBDLEVBQUMsQ0FBQyxDQUFDO29CQUN2SyxxQkFBZ0IsR0FBQyxDQUFDLENBQUM7b0JBQ25CLGNBQVMsR0FBQyxFQUFDLGtCQUFrQixFQUFHLE1BQU0sR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsR0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFHckYsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBR0QsbUNBQW1DO2dCQUNuQyxtREFBMkIsR0FBM0I7b0JBQUEsaUJBTUM7b0JBTEcsZUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7eUJBQ3BCLFNBQVMsQ0FBQzt3QkFDUCxLQUFJLENBQUMsZ0JBQWdCLEdBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO3dCQUN4RSxLQUFJLENBQUMsU0FBUyxHQUFDLEVBQUMsa0JBQWtCLEVBQUcsTUFBTSxHQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxHQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNsRyxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQXZCTDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNQLFFBQVEsRUFBRSxlQUFlO3dCQUN6QixXQUFXLEVBQUUsNkJBQTZCO3FCQUM3QyxDQUFDOztpQ0FBQTtnQkFzQkYsb0JBQUM7WUFBRCxDQXBCQSxBQW9CQyxJQUFBO1lBcEJELHlDQW9CQyxDQUFBIiwiZmlsZSI6Ikhlcm9Db21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9SeFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2hlcm9jb21wb25lbnQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9oZXJvY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSGVyb0NvbXBvbmVudCB7XHJcbiAgICAvL0JhY2tncm91bmQgaW1hZ2UgY2hhbmdlciB2YXJzXHJcbiAgICBiYWNrZ3JvdW5kcz1be1wiaW1nXCI6XCJpbWcvcGhvdG8tMTQ1MjQyMTgyMjI0OC1kNGMyYjQ3ZjBjODEuanBnXCJ9LHtcImltZ1wiOlwiaW1nL3Bob3RvLTE0NTQxNjYxNTUzMDItZWY0ODYzYzI3ZTcwLmpwZ1wifSx7XCJpbWdcIjpcImltZy9waG90by0xNDc1NTA2NjMxOTc5LTcyNDEyYzYwNmY0ZC5qcGdcIn1dO1xyXG4gICAgYWN0aXZlQmFja2dyb3VuZD0wO1xyXG4gICAgaGVyb1N0eWxlPXtcImJhY2tncm91bmQtaW1hZ2VcIiA6IFwidXJsKFwiK3RoaXMuYmFja2dyb3VuZHNbdGhpcy5hY3RpdmVCYWNrZ3JvdW5kXS5pbWcrXCIpXCIgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnJ1bkF3ZXNvbWVCYWNrZ3JvdW5kQ2hhbmdlcigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL1N3aXRjaGVzIGJhY2tncm91bmRzIGZvciB0aGUgaGVyb1xyXG4gICAgcnVuQXdlc29tZUJhY2tncm91bmRDaGFuZ2VyKCkge1xyXG4gICAgICAgIE9ic2VydmFibGUuaW50ZXJ2YWwoMTUwMClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUJhY2tncm91bmQ9KCsrdGhpcy5hY3RpdmVCYWNrZ3JvdW5kKSV0aGlzLmJhY2tncm91bmRzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb1N0eWxlPXtcImJhY2tncm91bmQtaW1hZ2VcIiA6IFwidXJsKFwiK3RoaXMuYmFja2dyb3VuZHNbdGhpcy5hY3RpdmVCYWNrZ3JvdW5kXS5pbWcrXCIpXCIgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
