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
var rBICompoundingOrder_1 = require("../../../model/rBICompoundingOrder");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var rBICompoundingOrder_service_1 = require("../../../service/admin/rBICompoundingOrder.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var contentPopUp_component_1 = require("../../../areas/admin/contentPopUp/contentPopUp.component");
var RBICompoundingOrdersAdminComponent = /** @class */ (function () {
    function RBICompoundingOrdersAdminComponent(formBuilder, activatedRoute, _rBICompoundingOrderService, toastr, vcr, spinnerService, router, modalService) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._rBICompoundingOrderService = _rBICompoundingOrderService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.RBI_COMPOUNDING_ORDER_PDF_FILEPATH;
        this.sortingRBICompoundingOrderField = "OrderDate";
        this.sortingRBICompoundingOrderDirection = "D";
    }
    RBICompoundingOrdersAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmRBICompoundingOrder = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetRBICompoundingOrder(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    RBICompoundingOrdersAdminComponent.prototype.GetRBICompoundingOrder = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getRBICompoundingOrderRequest = new rBICompoundingOrder_1.GetRBICompoundingOrderRequest();
        getRBICompoundingOrderRequest.SearchText = searchText;
        getRBICompoundingOrderRequest.IsActive = null;
        getRBICompoundingOrderRequest.OrderBy = this.sortingRBICompoundingOrderField;
        getRBICompoundingOrderRequest.OrderByDirection = this.sortingRBICompoundingOrderDirection;
        getRBICompoundingOrderRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getRBICompoundingOrderRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._rBICompoundingOrderService.getRBICompoundingOrder(getRBICompoundingOrderRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rBICompoundingOrders = data.Response;
                _this.pageSize = getRBICompoundingOrderRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RBICompoundingOrdersAdminComponent.prototype.SearchRBICompoundingOrder = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetRBICompoundingOrder(this.searchText, this.currentPage, this.pageSize);
    };
    RBICompoundingOrdersAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetRBICompoundingOrder(this.searchText, pageNumber, this.pageSize);
    };
    RBICompoundingOrdersAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetRBICompoundingOrder(this.searchText, null, this.pageSize);
    };
    RBICompoundingOrdersAdminComponent.prototype.EditRBICompoundingOrder = function (rBICompoundingOrderId) {
        this.router.navigate(['/admin/secure/rbicompoundingorder/' + this._global.encryptValue(rBICompoundingOrderId)]);
    };
    RBICompoundingOrdersAdminComponent.prototype.DeleteRBICompoundingOrder = function (rBICompoundingOrderId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteRBICompoundingOrder = {
                "RBICompoundingOrderId": rBICompoundingOrderId
            };
            this._rBICompoundingOrderService.deleteRBICompoundingOrder(deleteRBICompoundingOrder)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { closeButton: true });
                    _this.GetRBICompoundingOrder();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RBICompoundingOrdersAdminComponent.prototype.OnRBICompoundingOrderSort = function (fieldName) {
        this.sortingRBICompoundingOrderDirection = (this.sortingRBICompoundingOrderField == fieldName) ? (this.sortingRBICompoundingOrderDirection == "A") ? "D" : "A" : "A";
        this.sortingRBICompoundingOrderField = fieldName;
        this.GetRBICompoundingOrder(this.searchText, this.currentPage, this.pageSize);
    };
    RBICompoundingOrdersAdminComponent.prototype.ShowContent = function (title, content) {
        this.modalService.openDialog(this.vcr, {
            title: title,
            childComponent: contentPopUp_component_1.ContentPopUpAdminComponent,
            data: content
        });
    };
    RBICompoundingOrdersAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rBICompoundingOrders.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, rBICompoundingOrder_service_1.RBICompoundingOrderAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router, ngx_modal_dialog_1.ModalDialogService])
    ], RBICompoundingOrdersAdminComponent);
    return RBICompoundingOrdersAdminComponent;
}());
exports.RBICompoundingOrdersAdminComponent = RBICompoundingOrdersAdminComponent;
//# sourceMappingURL=rBICompoundingOrders.component.js.map