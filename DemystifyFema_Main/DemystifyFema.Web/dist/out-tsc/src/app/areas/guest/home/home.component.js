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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var search_1 = require("../../../model/search");
var search_service_1 = require("../../../service/common/search.service");
var subscription_1 = require("../../../model/subscription");
var subscription_service_1 = require("../../../service/user/subscription.service");
var commonField_service_1 = require("../../../service/common/commonField.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var loginRegisterPopup_component_1 = require("../layout/loginRegisterPopup.component");
var subscriptionPopup_component_1 = require("../../../areas/user/subscription/subscriptionPopup.component");
var searchedPDFPopup_component_1 = require("./searchedPDFPopup.component");
var HomeGuestComponent = /** @class */ (function () {
    function HomeGuestComponent(formBuilder, activatedRoute, toastr, vcr, spinnerService, router, _searchService, _subscriptionService, _commonFieldService, modalDialogService) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._searchService = _searchService;
        this._subscriptionService = _subscriptionService;
        this._commonFieldService = _commonFieldService;
        this.modalDialogService = modalDialogService;
        this.searchData = [];
        this.searchAutoCompleteData = [];
        this._global = new global_1.Global();
        this.config = {};
        this.pageSize = global_1.Global.USER_PAGE_SIZE;
        this.arrowkeyLocation = 0;
        this.isBreakSearchText = false;
        this.paytm = {
            "MID": "VIAZTz50949725542761",
            "WEBSITE": 'WEBSTAGING',
            "INDUSTRY_TYPE_ID": "Retail",
            "CHANNEL_ID": "WEB",
            "ORDER_ID": 'test_order-id3',
            "CUST_ID": "24",
            "MOBILE_NO": "7777777777",
            "EMAIL": "angular1583@gmail.com",
            "TXN_AMOUNT": "5000",
            "CALLBACK_URL": "http://localhost:4200/home",
        };
    }
    ;
    HomeGuestComponent.prototype.ngOnInit = function () {
        this.frmSearch = this.formBuilder.group({
            CategoryId: [''],
            SearchText: ['']
        });
    };
    //GetCategory() {
    //    this.spinnerService.show();
    //    let getCommonFieldRequest = new GetCommonFieldRequest();
    //    getCommonFieldRequest.FieldTypeName = Global.COMMON_FIELD_SEARCH_CATEGORY;
    //    this._commonFieldService.getCommonField(getCommonFieldRequest)
    //        .subscribe(data => {
    //            this.spinnerService.hide();
    //            this.categories = [];
    //            if (data.Status == Global.API_SUCCESS) {
    //                this.categories.push({ Value: "", Text: "All" });
    //                data.Response.forEach(item => {
    //                    this.categories.push({ Value: item.FieldId, Text: item.FieldName });
    //                });
    //            }
    //            else {
    //                this.toastr.error(data.Description, Global.TOASTR_SEARCH_TITLE, { closeButton: true });
    //            }
    //        },
    //            error => {
    //                this.spinnerService.hide();
    //                this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_SEARCH_TITLE, { enableHtml: true, closeButton: true });
    //            });
    //}
    HomeGuestComponent.prototype.FilterSearchText = function (searchText) {
        return searchText.trim().replace(/  +/g, ' ').replace(/<b>/g, "").replace(/<\/b>/g, "");
    };
    HomeGuestComponent.prototype.OnSearchAutoCompleteKeyUp = function (formData, event) {
        var t_this = this;
        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(function () {
            if (formData.value.SearchText.trim()) {
                if (event.keyCode <= 90 && event.keyCode >= 46 || event.keyCode >= 96 && event.keyCode <= 111 || event.keyCode >= 186 || event.keyCode == 8 || event.keyCode == 32 || event.type == "click") {
                    var searchText = t_this.FilterSearchText(formData.value.SearchText.trim());
                    var getSearchRequest = new search_1.GetSearchRequest();
                    getSearchRequest.SearchText = searchText;
                    t_this.searchAutoCompleteData = [];
                    t_this._searchService.getSearchAutoCompleteData(getSearchRequest)
                        .subscribe(function (data) {
                        t_this.searchAutoCompleteData = [];
                        t_this.arrowkeyLocation = -1;
                        t_this.previousSearchText = formData.value.SearchText.trim();
                        if (data.Status == global_1.Global.API_SUCCESS) {
                            var items_1 = [];
                            data.Response.forEach(function (item) {
                                items_1.push(item.SearchContent.split(' ').length > 1);
                                //let numDiffChar = 0;
                                //let index = 0;
                                //while (index < t_this.FilterSearchText(formData.value.SearchText).length) {
                                //    if (item.SearchContent.charAt(index).toLowerCase() !== t_this.FilterSearchText(formData.value.SearchText).charAt(index).toLowerCase())
                                //        break;
                                //    index++;
                                //    numDiffChar = index;
                                //}
                                //let matched = item.SearchContent.substr(0, numDiffChar);
                                //let unMatched = item.SearchContent.substr(numDiffChar);
                                //t_this.searchAutoCompleteData.push(matched + "<b>" + unMatched + "</b>");
                                var searchTexts = t_this.FilterSearchText(formData.value.SearchText.trim()).split(' ');
                                var searchResults = item.SearchContent.split(' ');
                                var text = '';
                                for (var i = 0; i < searchResults.length; i++) {
                                    var numDiffChar = 0;
                                    var index = 0;
                                    if ((i + 1) <= searchTexts.length) {
                                        while (index < searchResults[i].length) {
                                            if (searchResults[i].charAt(index).toLowerCase() !== searchTexts[(searchResults.length == 1) ? (searchTexts.length - 1) : i].charAt(index).toLowerCase())
                                                break;
                                            index++;
                                            numDiffChar = index;
                                        }
                                        var matched = searchResults[i].substr(0, numDiffChar);
                                        var unMatched = searchResults[i].substr(numDiffChar);
                                        text += matched + "<b>" + unMatched + "</b> ";
                                    }
                                    else {
                                        text += "<b>" + searchResults[i] + "</b> ";
                                    }
                                }
                                t_this.searchAutoCompleteData.push(text);
                            });
                            var interval_1 = setInterval(function () {
                                var filterSelect = document.getElementById('filterSelect');
                                if (filterSelect && (items_1.indexOf(true) <= -1)) {
                                    filterSelect.classList.add("width-auto");
                                    var searchText_1 = document.getElementById("searchText");
                                    searchText_1.innerHTML = "<span>" + formData.value.SearchText.trim().substring(0, formData.value.SearchText.trim().lastIndexOf(" ")) + "</span>";
                                    filterSelect.style.left = (searchText_1.clientWidth + 20) + "px";
                                    t_this.isBreakSearchText = true;
                                }
                                else if (filterSelect) {
                                    filterSelect.classList.remove("width-auto");
                                    t_this.isBreakSearchText = false;
                                }
                                clearInterval(interval_1);
                            }, 100);
                        }
                        else {
                            t_this.toastr.error(data.Description, global_1.Global.TOASTR_SEARCH_TITLE, { closeButton: true });
                        }
                    }, function (error) {
                        t_this.spinnerService.hide();
                        t_this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_SEARCH_TITLE, { enableHtml: true, closeButton: true });
                    });
                }
                else {
                    if (event.keyCode == 38) {
                        var txtSearch = document.getElementById("txtSearch");
                        txtSearch.setSelectionRange(txtSearch.value.length, txtSearch.value.length);
                    }
                }
            }
            else {
                t_this.searchAutoCompleteData = [];
            }
        }, 500);
    };
    HomeGuestComponent.prototype.OnSearchAutoCompleteClick = function (formData, event) {
        if (formData.value.SearchText.trim() && this.searchData.length > 0) {
            this.arrowkeyLocation = 0;
            this.OnSearchAutoCompleteKeyUp(formData, event);
        }
    };
    HomeGuestComponent.prototype.OnSearchAutoCompleteKeyDown = function (event) {
        var searchText = this.frmSearch.get("SearchText").value.trim();
        switch (event.keyCode) {
            case 38: // this is the ascii of arrow up
                if (this.arrowkeyLocation > 0)
                    this.arrowkeyLocation--;
                else
                    this.arrowkeyLocation = (this.arrowkeyLocation == -1) ? this.searchAutoCompleteData.length - 1 : -1;
                if (this.searchAutoCompleteData.length > 0)
                    this.frmSearch.get("SearchText").setValue((this.arrowkeyLocation == -1) ? this.previousSearchText : ((this.isBreakSearchText == true ? searchText.substring(0, searchText.lastIndexOf(" ")).trim() + " " : "") + this.searchAutoCompleteData[this.arrowkeyLocation].replace(/<b>/g, "").replace(/<\/b>/g, "")));
                break;
            case 40: // this is the ascii of arrow down
                if (this.searchAutoCompleteData.length - 1 > this.arrowkeyLocation)
                    this.arrowkeyLocation++;
                else
                    this.arrowkeyLocation = -1;
                if (this.searchAutoCompleteData.length > 0)
                    this.frmSearch.get("SearchText").setValue((this.arrowkeyLocation == -1) ? this.previousSearchText : ((this.isBreakSearchText == true ? searchText.substring(0, searchText.lastIndexOf(" ")).trim() + " " : "") + this.searchAutoCompleteData[this.arrowkeyLocation].replace(/<b>/g, "").replace(/<\/b>/g, "")));
                break;
            case 27:
                this.searchAutoCompleteData = [];
        }
        this.frmSearch.updateValueAndValidity();
    };
    HomeGuestComponent.prototype.ShowPDFPopup = function () {
        this.modalDialogService.openDialog(this.vcr, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor close-button"
                }],
            childComponent: searchedPDFPopup_component_1.SearchedPDFPopupUserComponent,
            data: this.searchData[this.selectedIndex]
        });
    };
    HomeGuestComponent.prototype.OnSearchClick = function (searchText) {
        this.currentPage = 1;
        this.searchText = (this.isBreakSearchText == true ? this.frmSearch.get("SearchText").value.substring(0, this.frmSearch.get("SearchText").value.lastIndexOf(" ")) + " " : "") + searchText.replace(/<b>/g, "").replace(/<\/b>/g, "");
        this.frmSearch.get("SearchText").setValue(this.searchText);
        this.frmSearch.updateValueAndValidity();
        this.GetSearchData();
    };
    HomeGuestComponent.prototype.OnSearchAutoCompleteFocusOut = function () {
        this.searchAutoCompleteData = [];
    };
    HomeGuestComponent.prototype.GetSearchData = function () {
        var _this = this;
        this.spinnerService.show();
        var getSearchRequest = new search_1.GetSearchRequest();
        //getSearchRequest.CategoryId = this.categoryId;
        getSearchRequest.SearchText = this.searchText;
        getSearchRequest.OrderBy = null;
        getSearchRequest.OrderByDirection = null;
        getSearchRequest.PageNumber = this.currentPage;
        getSearchRequest.PageSize = this.pageSize;
        this._searchService.getSearchData(getSearchRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.searchData = [];
            _this.searchAutoCompleteData = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                if (data.Response.length <= 0)
                    _this.searchData.push({ CategoryId: 0, Title: null, Number: null, Name: "No data found.", PDF: null });
                data.Response.forEach(function (item) {
                    var title = (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_NOTIFICATION) ? global_1.Global.SEARCH_CATEGORY_NAME_NOTIFICATION :
                        (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_AP_DIR_CIRCULAR) ? global_1.Global.SEARCH_CATEGORY_NAME_AP_DIR_CIRCULAR :
                            (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_MASTER_DIRECTION) ? global_1.Global.SEARCH_CATEGORY_NAME_MASTER_DIRECTION :
                                (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_FDI_CIRCULAR) ? global_1.Global.SEARCH_CATEGORY_NAME_FDI_CIRCULAR :
                                    (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_COMPOUNDING_ORDER) ? global_1.Global.SEARCH_CATEGORY_NAME_COMPOUNDING_ORDER :
                                        (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_PRESS_NOTE) ? global_1.Global.SEARCH_CATEGORY_NAME_PRESS_NOTE :
                                            (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_ACT) ? global_1.Global.SEARCH_CATEGORY_NAME_ACT :
                                                (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_FORM) ? global_1.Global.SEARCH_CATEGORY_NAME_FORM :
                                                    (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_SUMMARY) ? global_1.Global.SEARCH_CATEGORY_NAME_SUMMARY :
                                                        (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_DOCUMENTATION) ? global_1.Global.SEARCH_CATEGORY_NAME_DOCUMENTATION :
                                                            (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_MASTER_CIRCULAR) ? global_1.Global.SEARCH_CATEGORY_NAME_MASTER_CIRCULAR :
                                                                (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_RULES_GSR) ? global_1.Global.SEARCH_CATEGORY_NAME_RULES_GSR :
                                                                    (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_FIPB_REVIEW) ? global_1.Global.SEARCH_CATEGORY_NAME_FIPB_REVIEW :
                                                                        (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_DIPP_CLARIFICATION) ? global_1.Global.SEARCH_CATEGORY_NAME_DIPP_CLARIFICATION :
                                                                            (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_FIPB_PRESS_RELEASE_CASE) ? global_1.Global.SEARCH_CATEGORY_NAME_FIPB_PRESS_RELEASE_CASE :
                                                                                (item.CategoryId == global_1.Global.SEARCH_CATEGORY_ID_REGULATION_INDEX) ? global_1.Global.SEARCH_CATEGORY_NAME_REGULATION_INDEX : '';
                    _this.searchData.push({ CategoryId: item.CategoryId, Title: title, Number: item.Number, Name: item.Name, PDF: item.PDF, Excel: item.Excel, Word: item.Word, Content: item.Content });
                });
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_SEARCH_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_SEARCH_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    HomeGuestComponent.prototype.SearchData = function (formData) {
        //let searchText = formData.value.SearchText.replace("<b>", "").replace("</b>", "");
        var searchText = this.FilterSearchText(formData.value.SearchText);
        if (searchText) {
            this.currentPage = 1;
            this.searchText = searchText;
            this.GetSearchData();
        }
    };
    HomeGuestComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetSearchData();
    };
    HomeGuestComponent.prototype.IsLoggedIn = function () {
        if (this._global.getUserToken() && Number(this._global.getRoleId()) == global_1.Global.USER_ROLEID)
            return true;
        return false;
    };
    HomeGuestComponent.prototype.GoFEMAModule = function () {
        if (this.IsLoggedIn()) {
            this.CheckIsSubscribed();
        }
        else {
            this.ShowLoginPopup();
        }
    };
    HomeGuestComponent.prototype.ShowLoginPopup = function () {
        this.modalDialogService.openDialog(this.vcr, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                bodyClass: "no-pad",
                contentClass: "login-modal-content modal-content"
            },
            childComponent: loginRegisterPopup_component_1.LoginRegisterPopupGuestComponent,
            data: 'login'
        });
    };
    HomeGuestComponent.prototype.ShowSubscribePopup = function () {
        var t_this = this;
        this.modalDialogService.openDialog(this.vcr, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                contentClass: "subscribe-modal-content modal-content"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor close-button"
                }],
            childComponent: subscriptionPopup_component_1.SubscriptionPopupUserComponent
        });
    };
    HomeGuestComponent.prototype.CheckIsSubscribed = function () {
        var _this = this;
        this.spinnerService.show();
        var getSubscriptionRequest = new subscription_1.GetSubscriptionRequest();
        getSubscriptionRequest.UserId = parseInt(this._global.getCookie(global_1.Global.USER_ID));
        this._subscriptionService.getSubscription(getSubscriptionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Response.length > 0 && data.Response[0].IsExpired == false && data.Response[0].IsActive == true) {
                if (data.Response[0].StartDate)
                    _this._global.setCookie(global_1.Global.IS_SUBSCRIBED, true, 365);
                else
                    _this._global.deleteCookie(global_1.Global.IS_SUBSCRIBED);
            }
            else {
                _this._global.deleteCookie(global_1.Global.IS_SUBSCRIBED);
            }
            if (_this._global.getCookie(global_1.Global.IS_SUBSCRIBED)) {
                _this.ShowPDFPopup();
            }
            else {
                _this.ShowSubscribePopup();
            }
        }, function (error) { return _this.msg = error; });
    };
    HomeGuestComponent.prototype.ReadMore = function (index) {
        this.selectedIndex = index;
        if (this.searchData[this.selectedIndex] && this.searchData[this.selectedIndex].CategoryId != 0) {
            this.GoFEMAModule();
        }
    };
    HomeGuestComponent.prototype.gotopaytm = function () {
        var _this = this;
        this._searchService.gotopaytm(this.paytm).subscribe(function (data) {
            debugger;
            if (data) {
                data = JSON.parse(data);
                _this.createPaytmForm(data.param);
            }
        });
    };
    HomeGuestComponent.prototype.createPaytmForm = function (params) {
        debugger;
        var my_form = document.createElement('form');
        my_form.name = 'paytm_form';
        my_form.method = 'post';
        my_form.action = 'https://securegw-stage.paytm.in/theia/processTransaction';
        var myParams = Object.keys(params);
        for (var i = 0; i < myParams.length; i++) {
            var key = myParams[i];
            var my_tb = document.createElement('input');
            my_tb.type = 'hidden';
            my_tb.name = key;
            var val = this.paytm[key];
            my_tb.value = val;
            my_form.appendChild(my_tb);
        }
        ;
        document.body.appendChild(my_form);
        my_form.submit();
    };
    HomeGuestComponent = __decorate([
        core_1.Component({
            selector: 'app-public',
            templateUrl: './home.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            router_1.Router,
            search_service_1.SearchService,
            subscription_service_1.SubscriptionUserService,
            commonField_service_1.CommonFieldService,
            ngx_modal_dialog_1.ModalDialogService])
    ], HomeGuestComponent);
    return HomeGuestComponent;
}());
exports.HomeGuestComponent = HomeGuestComponent;
//# sourceMappingURL=home.component.js.map