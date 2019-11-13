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
var endUserLicenseAggrement_service_1 = require("../../../service/admin/endUserLicenseAggrement.service");
var endUserLicenseAggrement_1 = require("src/app/model/endUserLicenseAggrement");
var IndexEndUserLicenseAggrementAdminComponent = /** @class */ (function () {
    function IndexEndUserLicenseAggrementAdminComponent(formBuilder, activatedRoute, _EULAService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._EULAService = _EULAService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
    }
    IndexEndUserLicenseAggrementAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.id = (params["id"]) ? params["id"] : null;
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
            _this.sortingEULAField = params["sortingEULAField"];
            _this.sortingEULADirection = params["sortingEULADirection"];
        });
        this.frmIndexEULA = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetEULA(this.id, this.searchText, this.currentPage, this.pageSizes[0]);
    };
    IndexEndUserLicenseAggrementAdminComponent.prototype.GetEULA = function (id, searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getEULARequest = new endUserLicenseAggrement_1.GetEULARequest();
        getEULARequest.ID = id;
        getEULARequest.SearchText = searchText;
        getEULARequest.OrderBy = this.sortingEULAField;
        getEULARequest.OrderByDirection = this.sortingEULADirection;
        getEULARequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getEULARequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._EULAService.getEULA(getEULARequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.endUserLicenseAggrement = data.Response;
                if (data.Response.length > 0) {
                    _this.filterTEXT = _this.htmlToPlaintext(data.Response[0].EULA);
                }
                _this.pageSize = getEULARequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_END_USER_LICENSE_AGGREMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_END_USER_LICENSE_AGGREMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    IndexEndUserLicenseAggrementAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetEULA(this.id, this.searchText, pageNumber, this.pageSize);
    };
    IndexEndUserLicenseAggrementAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetEULA(this.id, this.searchText, null, this.pageSize);
    };
    IndexEndUserLicenseAggrementAdminComponent.prototype.EditEULA = function (id) {
        this.router.navigate(['/admin/secure/EULAggrementAdd/' + this._global.encryptValue(id)], {
            queryParams: {
                sortingEULAField: this.sortingEULAField, sortingPrivacyPolicyDirection: this.sortingEULADirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    IndexEndUserLicenseAggrementAdminComponent.prototype.AddEULA = function () {
        this.router.navigate(['/admin/secure/EULAggrementAdd/' + this._global.encryptValue(0)], {
            queryParams: {
                sortingEULAField: this.sortingEULAField, sortingPrivacyPolicyDirection: this.sortingEULADirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    IndexEndUserLicenseAggrementAdminComponent.prototype.htmlToPlaintext = function (text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
    IndexEndUserLicenseAggrementAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './indexEULAggrement.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            endUserLicenseAggrement_service_1.EndUserLicenseAggrementAdminService,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            router_1.Router])
    ], IndexEndUserLicenseAggrementAdminComponent);
    return IndexEndUserLicenseAggrementAdminComponent;
}());
exports.IndexEndUserLicenseAggrementAdminComponent = IndexEndUserLicenseAggrementAdminComponent;
//# sourceMappingURL=indexEULAggrement.component.js.map