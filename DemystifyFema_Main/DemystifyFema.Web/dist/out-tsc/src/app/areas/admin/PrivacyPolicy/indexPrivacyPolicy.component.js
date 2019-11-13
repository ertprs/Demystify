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
var privacyPolicy_service_1 = require("../../../service/admin/privacyPolicy.service");
var privacyPolicy_1 = require("src/app/model/privacyPolicy");
var IndexPrivacyPolicyAdminComponent = /** @class */ (function () {
    function IndexPrivacyPolicyAdminComponent(formBuilder, activatedRoute, _privacyPolicyService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._privacyPolicyService = _privacyPolicyService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
    }
    IndexPrivacyPolicyAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.id = (params["id"]) ? params["id"] : null;
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
            _this.sortingPrivacyPolicyField = params["sortingPrivacyPolicyField"];
            _this.sortingPrivacyPolicyDirection = params["sortingPrivacyPolicyDirection"];
        });
        this.frmIndexPrivacyPolicy = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetPrivacyPolicy(this.id, this.searchText, this.currentPage, this.pageSizes[0]);
    };
    IndexPrivacyPolicyAdminComponent.prototype.htmlToPlaintext = function (text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
    IndexPrivacyPolicyAdminComponent.prototype.GetPrivacyPolicy = function (id, searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getPrivacyPolicyRequest = new privacyPolicy_1.GetPrivacyPolicyRequest();
        getPrivacyPolicyRequest.ID = id;
        getPrivacyPolicyRequest.SearchText = searchText;
        getPrivacyPolicyRequest.IsActive = null;
        getPrivacyPolicyRequest.OrderBy = this.sortingPrivacyPolicyField;
        getPrivacyPolicyRequest.OrderByDirection = this.sortingPrivacyPolicyDirection;
        getPrivacyPolicyRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getPrivacyPolicyRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._privacyPolicyService.getPrivacyPolicy(getPrivacyPolicyRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.privacyPolicy = data.Response;
                if (data.Response.length > 0) {
                    _this.filterTEXT = _this.htmlToPlaintext(data.Response[0].PrivacyPolicy);
                }
                _this.pageSize = getPrivacyPolicyRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    IndexPrivacyPolicyAdminComponent.prototype.SearchPrivacyPolicy = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetPrivacyPolicy(this.id, this.searchText, this.currentPage, this.pageSize);
    };
    IndexPrivacyPolicyAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetPrivacyPolicy(this.id, this.searchText, pageNumber, this.pageSize);
    };
    IndexPrivacyPolicyAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetPrivacyPolicy(this.id, this.searchText, null, this.pageSize);
    };
    IndexPrivacyPolicyAdminComponent.prototype.EditPrivacyPolicy = function (id) {
        this.router.navigate(['/admin/secure/privacyPolicyAdd/' + this._global.encryptValue(id)], {
            queryParams: {
                sortingPrivacyPolicyField: this.sortingPrivacyPolicyField, sortingPrivacyPolicyDirection: this.sortingPrivacyPolicyDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    IndexPrivacyPolicyAdminComponent.prototype.OnPrivacyPolicySort = function (fieldName) {
        this.sortingPrivacyPolicyDirection = (this.sortingPrivacyPolicyField == fieldName) ? (this.sortingPrivacyPolicyDirection == "A") ? "D" : "A" : "A";
        this.sortingPrivacyPolicyField = fieldName;
        this.GetPrivacyPolicy(this.id, this.searchText, this.currentPage, this.pageSize);
    };
    IndexPrivacyPolicyAdminComponent.prototype.AddPrivacyPolicy = function () {
        this.router.navigate(['/admin/secure/privacyPolicyAdd/' + this._global.encryptValue(0)], {
            queryParams: {
                sortingPrivacyPolicyField: this.sortingPrivacyPolicyField, sortingPrivacyPolicyDirection: this.sortingPrivacyPolicyDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    IndexPrivacyPolicyAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './indexPrivacyPolicy.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            privacyPolicy_service_1.PrivacyPolicyAdminService,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            router_1.Router])
    ], IndexPrivacyPolicyAdminComponent);
    return IndexPrivacyPolicyAdminComponent;
}());
exports.IndexPrivacyPolicyAdminComponent = IndexPrivacyPolicyAdminComponent;
//# sourceMappingURL=indexPrivacyPolicy.component.js.map