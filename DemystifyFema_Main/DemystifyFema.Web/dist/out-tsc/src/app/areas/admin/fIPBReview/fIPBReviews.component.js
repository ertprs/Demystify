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
var fIPBReview_1 = require("../../../model/fIPBReview");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var fIPBReview_service_1 = require("../../../service/admin/fIPBReview.service");
var FIPBReviewsAdminComponent = /** @class */ (function () {
    function FIPBReviewsAdminComponent(formBuilder, activatedRoute, _fIPBReviewService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._fIPBReviewService = _fIPBReviewService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.FIPBREVIEW_PDF_FILEPATH;
    }
    FIPBReviewsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmFIPBReview = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetFIPBReview(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    FIPBReviewsAdminComponent.prototype.GetFIPBReview = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getFIPBReviewRequest = new fIPBReview_1.GetFIPBReviewRequest();
        getFIPBReviewRequest.SearchText = searchText;
        getFIPBReviewRequest.IsActive = null;
        getFIPBReviewRequest.OrderBy = this.sortingFIPBReviewField;
        getFIPBReviewRequest.OrderByDirection = this.sortingFIPBReviewDirection;
        getFIPBReviewRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getFIPBReviewRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._fIPBReviewService.getFIPBReview(getFIPBReviewRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fIPBReviews = data.Response;
                _this.pageSize = getFIPBReviewRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FIPBReviewsAdminComponent.prototype.SearchFIPBReview = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetFIPBReview(this.searchText, this.currentPage, this.pageSize);
    };
    FIPBReviewsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetFIPBReview(this.searchText, pageNumber, this.pageSize);
    };
    FIPBReviewsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetFIPBReview(this.searchText, null, this.pageSize);
    };
    FIPBReviewsAdminComponent.prototype.EditFIPBReview = function (fIPBReviewId) {
        this.router.navigate(['/admin/secure/fipbreview/' + this._global.encryptValue(fIPBReviewId)]);
    };
    FIPBReviewsAdminComponent.prototype.DeleteFIPBReview = function (fIPBReviewId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFIPBReview = {
                "FIPBReviewId": fIPBReviewId
            };
            this._fIPBReviewService.deleteFIPBReview(deleteFIPBReview)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { closeButton: true });
                    _this.GetFIPBReview();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FIPBReviewsAdminComponent.prototype.OnFIPBReviewSort = function (fieldName) {
        this.sortingFIPBReviewDirection = (this.sortingFIPBReviewField == fieldName) ? (this.sortingFIPBReviewDirection == "A") ? "D" : "A" : "A";
        this.sortingFIPBReviewField = fieldName;
        this.GetFIPBReview(this.searchText, this.currentPage, this.pageSize);
    };
    FIPBReviewsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fIPBReviews.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, fIPBReview_service_1.FIPBReviewAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], FIPBReviewsAdminComponent);
    return FIPBReviewsAdminComponent;
}());
exports.FIPBReviewsAdminComponent = FIPBReviewsAdminComponent;
//# sourceMappingURL=fIPBReviews.component.js.map