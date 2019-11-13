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
var keyDefinitionEvent_1 = require("../../../model/keyDefinitionEvent");
var keyDefinitionEvent_service_1 = require("../../../service/user/keyDefinitionEvent.service");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var KeyEventPopupUserComponent = /** @class */ (function () {
    function KeyEventPopupUserComponent(formBuilder, toastr, vcr, _keyDefinitionEventService, spinnerService, modalService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.vcr = vcr;
        this._keyDefinitionEventService = _keyDefinitionEventService;
        this.spinnerService = spinnerService;
        this.modalService = modalService;
        this.currentPage = 1;
        this.pageSize = global_1.Global.USER_PAGE_SIZE;
        this.notificationPDFServerPath = global_1.Global.NOTIFICATION_PDF_FILEPATH;
        this.gSRNotificationPDFServerPath = global_1.Global.GSR_NOTIFICATION_PDF_FILEPATH;
        this.fDICircularPDFServerPath = global_1.Global.FDICIRCULAR_PDF_FILEPATH;
        this.pressNotePDFServerPath = global_1.Global.PRESSNOTE_PDF_FILEPATH;
        this.actPDFServerPath = global_1.Global.ACT_PDF_FILEPATH;
        this.masterDirectionPDFServerPath = global_1.Global.MASTERDIRECTION_PDF_FILEPATH;
        this.aPDIRCircularPDFServerPath = global_1.Global.APDIRCIRCULAR_PDF_FILEPATH;
    }
    KeyEventPopupUserComponent.prototype.dialogInit = function (reference, options) {
        this.frmKeyDefinitionEvent = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetKeyDefinitionEvent();
    };
    KeyEventPopupUserComponent.prototype.GetKeyDefinitionEvent = function (searchText, pageNumber) {
        var _this = this;
        this.spinnerService.show();
        var getKeyDefinitionEventRequest = new keyDefinitionEvent_1.GetKeyDefinitionEventRequest();
        getKeyDefinitionEventRequest.DefinitionEventName = global_1.Global.KEY_EVENT_FIELDNAME;
        getKeyDefinitionEventRequest.SearchText = searchText;
        getKeyDefinitionEventRequest.IsActive = null;
        getKeyDefinitionEventRequest.OrderBy = this.sortingKeyDefinitionEventField;
        getKeyDefinitionEventRequest.OrderByDirection = this.sortingKeyDefinitionEventDirection;
        getKeyDefinitionEventRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getKeyDefinitionEventRequest.PageSize = this.pageSize;
        this._keyDefinitionEventService.getKeyDefinitionEvent(getKeyDefinitionEventRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.keyDefinitionEvents = data.Response;
                _this.pageSize = getKeyDefinitionEventRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    KeyEventPopupUserComponent.prototype.SearchKeyDefinitionEvent = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetKeyDefinitionEvent(this.searchText, this.currentPage);
    };
    KeyEventPopupUserComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetKeyDefinitionEvent(this.searchText, pageNumber);
    };
    KeyEventPopupUserComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.GetKeyDefinitionEvent(this.searchText, null);
    };
    KeyEventPopupUserComponent.prototype.OnKeyDefinitionEventSort = function (fieldName) {
        this.sortingKeyDefinitionEventDirection = (this.sortingKeyDefinitionEventField == fieldName) ? (this.sortingKeyDefinitionEventDirection == "A") ? "D" : "A" : "A";
        this.sortingKeyDefinitionEventField = fieldName;
        this.GetKeyDefinitionEvent(this.searchText, this.currentPage);
    };
    KeyEventPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './keyEventPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            keyDefinitionEvent_service_1.KeyDefinitionEventUserService,
            spinner_service_1.SpinnerService,
            ngx_modal_dialog_1.ModalDialogService])
    ], KeyEventPopupUserComponent);
    return KeyEventPopupUserComponent;
}());
exports.KeyEventPopupUserComponent = KeyEventPopupUserComponent;
//# sourceMappingURL=keyEventPopup.component.js.map