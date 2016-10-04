System.register(['angular2/platform/browser', './appComponent', "angular2/http", "./transactionService"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, appComponent_1, http_1, transactionService_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (appComponent_1_1) {
                appComponent_1 = appComponent_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (transactionService_1_1) {
                transactionService_1 = transactionService_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(appComponent_1.AppComponent, [http_1.HTTP_BINDINGS, transactionService_1.TransactionService]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU1BLG1CQUFTLENBQUMsMkJBQVksRUFBRSxDQUFDLG9CQUFhLEVBQUUsdUNBQWtCLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImJvb3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHlwaW5ncy9icm93c2VyLmQudHNcIi8+XHJcbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcclxuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gJy4vYXBwQ29tcG9uZW50JztcclxuaW1wb3J0IHtIVFRQX0JJTkRJTkdTfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xyXG5pbXBvcnQge1RyYW5zYWN0aW9uU2VydmljZX0gZnJvbSBcIi4vdHJhbnNhY3Rpb25TZXJ2aWNlXCI7XHJcblxyXG5ib290c3RyYXAoQXBwQ29tcG9uZW50LCBbSFRUUF9CSU5ESU5HUywgVHJhbnNhY3Rpb25TZXJ2aWNlXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
