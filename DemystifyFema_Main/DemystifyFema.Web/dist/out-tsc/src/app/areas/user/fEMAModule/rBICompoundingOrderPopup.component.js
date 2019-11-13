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
var forms_1 = require("@angular/forms");
var rBICompoundingOrder_1 = require("../../../model/rBICompoundingOrder");
var rBICompoundingOrder_service_1 = require("../../../service/user/rBICompoundingOrder.service");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var RBICompoundingOrderPopupUserComponent = /** @class */ (function () {
    function RBICompoundingOrderPopupUserComponent(formBuilder, toastr, vcr, _rBICompoundingOrderService, spinnerService, modalService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.vcr = vcr;
        this._rBICompoundingOrderService = _rBICompoundingOrderService;
        this.spinnerService = spinnerService;
        this.modalService = modalService;
        this.currentPage = 1;
        this.pageSize = global_1.Global.USER_PAGE_SIZE;
        this.sortingRBICompoundingOrderField = "OrderDate";
        this.sortingRBICompoundingOrderDirection = "D";
        this.rBICompoundingOrderPDFServerPath = global_1.Global.RBI_COMPOUNDING_ORDER_PDF_FILEPATH;
    }
    RBICompoundingOrderPopupUserComponent.prototype.dialogInit = function (reference, options) {
        this.frmRBICompoundingOrder = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetRBICompoundingOrder();
    };
    RBICompoundingOrderPopupUserComponent.prototype.GetRBICompoundingOrder = function (searchText, pageNumber) {
        var _this = this;
        this.spinnerService.show();
        var getRBICompoundingOrderRequest = new rBICompoundingOrder_1.GetRBICompoundingOrderRequest();
        getRBICompoundingOrderRequest.SearchText = searchText;
        getRBICompoundingOrderRequest.IsActive = null;
        getRBICompoundingOrderRequest.OrderBy = this.sortingRBICompoundingOrderField;
        getRBICompoundingOrderRequest.OrderByDirection = this.sortingRBICompoundingOrderDirection;
        getRBICompoundingOrderRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getRBICompoundingOrderRequest.PageSize = this.pageSize;
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
    RBICompoundingOrderPopupUserComponent.prototype.SearchRBICompoundingOrder = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetRBICompoundingOrder(this.searchText, this.currentPage);
    };
    RBICompoundingOrderPopupUserComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetRBICompoundingOrder(this.searchText, pageNumber);
    };
    RBICompoundingOrderPopupUserComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.GetRBICompoundingOrder(this.searchText, null);
    };
    RBICompoundingOrderPopupUserComponent.prototype.OnRBICompoundingOrderSort = function (fieldName) {
        this.sortingRBICompoundingOrderDirection = (this.sortingRBICompoundingOrderField == fieldName) ? (this.sortingRBICompoundingOrderDirection == "A") ? "D" : "A" : "A";
        this.sortingRBICompoundingOrderField = fieldName;
        this.GetRBICompoundingOrder(this.searchText, this.currentPage);
    };
    RBICompoundingOrderPopupUserComponent.prototype.ShowContent = function (content) {
        this.content = content;
    };
    RBICompoundingOrderPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rBICompoundingOrderPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, rBICompoundingOrder_service_1.RBICompoundingOrderUserService, spinner_service_1.SpinnerService, ngx_modal_dialog_1.ModalDialogService])
    ], RBICompoundingOrderPopupUserComponent);
    return RBICompoundingOrderPopupUserComponent;
}());
exports.RBICompoundingOrderPopupUserComponent = RBICompoundingOrderPopupUserComponent;
//# sourceMappingURL=rBICompoundingOrderPopup.component.js.map