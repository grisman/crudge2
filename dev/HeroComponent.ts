import {Component} from "angular2/core";
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'herocomponent',
    templateUrl: 'partials/herocomponent.html'
})

export class HeroComponent {
    //Background image changer vars
    backgrounds=[{"img":"img/photo-1452421822248-d4c2b47f0c81.jpg"},{"img":"img/photo-1454166155302-ef4863c27e70.jpg"},{"img":"img/photo-1475506631979-72412c606f4d.jpg"}];
    activeBackground=0;
    heroStyle={"background-image" : "url("+this.backgrounds[this.activeBackground].img+")" };

    constructor() {
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

}