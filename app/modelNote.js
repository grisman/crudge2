System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ModelNote, private, number, string;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Haddock on 2016-10-04.
             */
            ModelNote = (function () {
                function ModelNote() {
                }
                return ModelNote;
            }());
            exports_1("ModelNote", ModelNote);
            private = _id;
            private = _title;
            private = _description;
            constructor();
            { }
            get;
            id();
            number;
            {
                return this._id;
            }
            set;
            id(value, number);
            {
                this._id = value;
            }
            get;
            title();
            string;
            {
                return this._title;
            }
            set;
            title(value, string);
            {
                this._title = value;
            }
            get;
            description();
            string;
            {
                return this._description;
            }
            set;
            description(value, string);
            {
                this._description = value;
            }
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVsTm90ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7bUJBSVEsT0FBTyxFQUFNLE1BQU0sRUFDSCxNQUFNOzs7O1lBTDlCOztlQUVHO1lBQ0g7Z0JBQUE7Z0JBQ0ksQ0FEb0IsQUFDbkI7Z0JBQUQsZ0JBQUM7WUFBRCxDQURKLEFBQ0ssSUFEbUI7WUFBeEIsaUNBQXdCLENBQUE7WUFDaEIsT0FBTyxHQUFDLEdBQUcsQ0FBUztZQUNwQixPQUFPLEdBQUMsTUFBTSxDQUFTO1lBQ3ZCLE9BQU8sR0FBQyxZQUFZLENBQVM7WUFFakMsV0FBVyxFQUFFLENBQUE7WUFBQyxDQUFDLENBQUEsQ0FBQztZQUVoQixHQUFHLENBQUE7WUFBQyxFQUFFLEVBQUUsQ0FBQTtZQUFFLE1BQU0sQ0FBQTtZQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDcEIsQ0FBQztZQUVELEdBQUcsQ0FBQTtZQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztZQUNyQixDQUFDO1lBRUQsR0FBRyxDQUFBO1lBQUMsS0FBSyxFQUFFLENBQUE7WUFBRSxNQUFNLENBQUE7WUFBQyxDQUFDO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QixDQUFDO1lBRUQsR0FBRyxDQUFBO1lBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUM7WUFFRCxHQUFHLENBQUE7WUFBQyxXQUFXLEVBQUUsQ0FBQTtZQUFFLE1BQU0sQ0FBQTtZQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzdCLENBQUM7WUFFRCxHQUFHLENBQUE7WUFBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDOUIsQ0FBQyIsImZpbGUiOiJtb2RlbE5vdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBIYWRkb2NrIG9uIDIwMTYtMTAtMDQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kZWxOb3RlIHtcclxuICAgIGxldCBwcml2YXRlIF9pZDogbnVtYmVyO1xyXG4gICAgbGV0IHByaXZhdGUgX3RpdGxlOiBzdHJpbmc7XHJcbiAgICBsZXQgcHJpdmF0ZSBfZGVzY3JpcHRpb246IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgZ2V0IGlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBpZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl90aXRsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGVzY3JpcHRpb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
