export class Note {
    id: number;
    title: string='';
    description: string='';

    constructor(values?: any) {
        if (typeof values=='undefined') {
            this.id=0 ;
            this.title= '';
            this.description= '';

        } else {
            this.id=values.id;
            this.title='';
            this.description='';
        }
    }

}