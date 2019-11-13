"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var global_1 = require("../../../common/global");
var SearchedPDFPopupUserComponent = /** @class */ (function () {
    function SearchedPDFPopupUserComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this._global = new global_1.Global();
    }
    SearchedPDFPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        var t_this = this;
        var pdfPath = (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_NOTIFICATION) ? global_1.Global.NOTIFICATION_PDF_FILEPATH :
            (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_AP_DIR_CIRCULAR) ? global_1.Global.APDIRCIRCULAR_PDF_FILEPATH :
                (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_MASTER_DIRECTION) ? global_1.Global.MASTERDIRECTION_PDF_FILEPATH :
                    (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_FDI_CIRCULAR) ? global_1.Global.FDICIRCULAR_PDF_FILEPATH :
                        (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_COMPOUNDING_ORDER) ? global_1.Global.RBI_COMPOUNDING_ORDER_PDF_FILEPATH :
                            (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_PRESS_NOTE) ? global_1.Global.PRESSNOTE_PDF_FILEPATH :
                                (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_ACT) ? global_1.Global.ACT_PDF_FILEPATH :
                                    (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_FORM) ? global_1.Global.FORM_SUMMARY_DOCUMENTATION_PDF_FILEPATH :
                                        (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_SUMMARY) ? global_1.Global.FORM_SUMMARY_DOCUMENTATION_PDF_FILEPATH :
                                            (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_DOCUMENTATION) ? global_1.Global.FORM_SUMMARY_DOCUMENTATION_PDF_FILEPATH :
                                                (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_MASTER_CIRCULAR) ? global_1.Global.MASTERCIRCULAR_PDF_FILEPATH :
                                                    (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_RULES_GSR) ? global_1.Global.GSR_NOTIFICATION_PDF_FILEPATH :
                                                        (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_FIPB_REVIEW) ? global_1.Global.FIPBREVIEW_PDF_FILEPATH :
                                                            (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_DIPP_CLARIFICATION) ? global_1.Global.DIPPCLARIFICATION_PDF_FILEPATH :
                                                                (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_FIPB_PRESS_RELEASE_CASE) ? global_1.Global.FIPB_PRESS_RELEASE_CASE_PDF_FILEPATH : '';
        this.searchedPDFUrl = (options.data.PDF) ? this.sanitizer.bypassSecurityTrustResourceUrl(this._global.getPDFPath(pdfPath + options.data.PDF)) : null;
        this.searchedExcelUrl = (options.data.Excel) ? global_1.Global.FORM_SUMMARY_DOCUMENTATION_EXCEL_FILEPATH + options.data.Excel : null;
        this.searchedWordUrl = (options.data.Word) ? global_1.Global.FORM_SUMMARY_DOCUMENTATION_WORD_FILEPATH + options.data.Word : null;
        this.searchedContentTitle = (options.data.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_REGULATION_INDEX) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
        this.searchedContent = options.data.Content;
        var interval = setInterval(function () {
            var minusHeight = ((t_this.searchedExcelUrl || t_this.searchedWordUrl) ? (document.querySelector('body').clientWidth > 480) ? 105 : 70 : (document.querySelector('body').clientWidth > 480) ? 60 : 30);
            if (t_this.searchedPDFUrl)
                document.getElementById("iframe").style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
            clearInterval(interval);
        }, 100);
    };
    SearchedPDFPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './searchedPDFPopup.component.html'
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], SearchedPDFPopupUserComponent);
    return SearchedPDFPopupUserComponent;
}());
exports.SearchedPDFPopupUserComponent = SearchedPDFPopupUserComponent;
//# sourceMappingURL=searchedPDFPopup.component.js.map