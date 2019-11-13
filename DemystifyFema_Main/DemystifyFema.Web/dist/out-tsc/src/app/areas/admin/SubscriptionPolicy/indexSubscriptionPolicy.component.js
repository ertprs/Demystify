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
var subscriptionPolicy_service_1 = require("../../../service/admin/subscriptionPolicy.service");
var subscriptionPolicy_1 = require("src/app/model/subscriptionPolicy");
var IndexSubscriptionPolicyAdminComponent = /** @class */ (function () {
    function IndexSubscriptionPolicyAdminComponent(formBuilder, activatedRoute, _subPolicyService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._subPolicyService = _subPolicyService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
    }
    IndexSubscriptionPolicyAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.id = (params["id"]) ? params["id"] : null;
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
            _this.sortingSubPolicyField = params["sortingSubPolicyField"];
            _this.sortingSubPolicyDirection = params["sortingSubPolicyDirection"];
        });
        this.frmIndexSubPolicy = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetSubscriptionPolicy(this.id, this.searchText, this.currentPage, this.pageSizes[0]);
    };
    IndexSubscriptionPolicyAdminComponent.prototype.htmlToPlaintext = function (text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
    IndexSubscriptionPolicyAdminComponent.prototype.GetSubscriptionPolicy = function (id, searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getSubPolicyRequest = new subscriptionPolicy_1.GetSubscriptionPolicyRequest();
        getSubPolicyRequest.ID = id;
        getSubPolicyRequest.SearchText = searchText;
        getSubPolicyRequest.OrderBy = this.sortingSubPolicyField;
        getSubPolicyRequest.OrderByDirection = this.sortingSubPolicyDirection;
        getSubPolicyRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getSubPolicyRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._subPolicyService.getSubscriptionPolicy(getSubPolicyRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.subscriptionPolicy = data.Response;
                if (data.Response.length > 0) {
                    _this.filterTEXT = _this.htmlToPlaintext(data.Response[0].SubPolicy);
                }
                _this.pageSize = getSubPolicyRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBSCRIPTION_POLICY_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBSCRIPTION_POLICY_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    IndexSubscriptionPolicyAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetSubscriptionPolicy(this.id, this.searchText, pageNumber, this.pageSize);
    };
    IndexSubscriptionPolicyAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetSubscriptionPolicy(this.id, this.searchText, null, this.pageSize);
    };
    IndexSubscriptionPolicyAdminComponent.prototype.EditSubscriptionPolicy = function (id) {
        this.router.navigate(['/admin/secure/SubscriptionPolicyAdd/' + this._global.encryptValue(id)], {
            queryParams: {
                sortingEULAField: this.sortingSubPolicyField, sortingPrivacyPolicyDirection: this.sortingSubPolicyDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    IndexSubscriptionPolicyAdminComponent.prototype.AddSubscriptionPolicy = function () {
        this.router.navigate(['/admin/secure/SubscriptionPolicyAdd/' + this._global.encryptValue(0)], {
            queryParams: {
                sortingEULAField: this.sortingSubPolicyField, sortingPrivacyPolicyDirection: this.sortingSubPolicyDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    IndexSubscriptionPolicyAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './indexSubscriptionPolicy.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            subscriptionPolicy_service_1.SubscriptionPolicyAdminService,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            router_1.Router])
    ], IndexSubscriptionPolicyAdminComponent);
    return IndexSubscriptionPolicyAdminComponent;
}());
exports.IndexSubscriptionPolicyAdminComponent = IndexSubscriptionPolicyAdminComponent;
//# sourceMappingURL=indexSubscriptionPolicy.component.js.map