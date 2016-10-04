import {Input, Output, Directive, ElementRef, Renderer, EventEmitter, OnInit} from 'angular2/core'

@Directive({
    selector: '[contenteditable]',
    host: {
        '(input)': 'update($event)'
    }
})
export class contenteditableDirective implements OnInit {
    //Found this snippet on the web at: http://www.stephanmiller.com/2016/09/creating-an-angular2-content-editable-directive/
    @Input() modelContent;
    @Output() modelContentChange: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef, private renderer: Renderer) { }

    update(event) {
        this.modelContentChange.emit(this.el.nativeElement.innerText);
    }

    ngOnInit() {
        this.el.nativeElement.innerText = this.modelContent;
    }
}