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
var keyDefinitionEvent_1 = require("../../../model/keyDefinitionEvent");
var keyDefinitionEvent_service_1 = require("../../../service/admin/keyDefinitionEvent.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var contentPopUp_component_1 = require("../../../areas/admin/contentPopUp/contentPopUp.component");
var KeyDefinitionsAdminComponent = /** @class */ (function () {
    function KeyDefinitionsAdminComponent(formBuilder, toastr, activatedRoute, router, _keyDefinitionEventService, vcr, spinnerService, modalService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._keyDefinitionEventService = _keyDefinitionEventService;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.modalService = modalService;
        this._global = new global_1.Global();
    }
    KeyDefinitionsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmKeyDefinitionEvent = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetKeyDefinitionEvent(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    KeyDefinitionsAdminComponent.prototype.SearchKeyDefinitionEvent = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetKeyDefinitionEvent(this.searchText, this.currentPage, this.pageSize);
    };
    KeyDefinitionsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetKeyDefinitionEvent(this.searchText, pageNumber, this.pageSize);
    };
    KeyDefinitionsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetKeyDefinitionEvent(this.searchText, null, this.pageSize);
    };
    KeyDefinitionsAdminComponent.prototype.EditKeyDefinitionEvent = function (keyDefinitionEventId) {
        this.router.navigate(['/admin/secure/keydefinition/' + this._global.encryptValue(keyDefinitionEventId)]);
    };
    KeyDefinitionsAdminComponent.prototype.DeleteKeyDefinitionEvent = function (keyDefinitionEventId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteKeyDefinitionEvent = {
                "KeyDefinitionEventId": keyDefinitionEventId
            };
            this._keyDefinitionEventService.deleteKeyDefinitionEvent(deleteKeyDefinitionEvent)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { closeButton: true });
                    _this.GetKeyDefinitionEvent();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    KeyDefinitionsAdminComponent.prototype.GetKeyDefinitionEvent = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getKeyDefinitionEventRequest = new keyDefinitionEvent_1.GetKeyDefinitionEventRequest();
        getKeyDefinitionEventRequest.DefinitionEventName = global_1.Global.KEY_DEFINITION_FIELDNAME;
        getKeyDefinitionEventRequest.SearchText = searchText;
        getKeyDefinitionEventRequest.IsActive = null;
        getKeyDefinitionEventRequest.OrderBy = this.sortingField;
        getKeyDefinitionEventRequest.OrderByDirection = this.sortingDirection;
        getKeyDefinitionEventRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getKeyDefinitionEventRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
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
    KeyDefinitionsAdminComponent.prototype.ShowContent = function (title, content) {
        this.modalService.openDialog(this.vcr, {
            title: title,
            childComponent: contentPopUp_component_1.ContentPopUpAdminComponent,
            data: content
        });
    };
    KeyDefinitionsAdminComponent.prototype.OnSort = function (fieldName) {
        this.sortingDirection = (this.sortingField == fieldName) ? (this.sortingDirection == "A") ? "D" : "A" : "A";
        this.sortingField = fieldName;
        this.GetKeyDefinitionEvent(this.searchText, this.currentPage, this.pageSize);
    };
    KeyDefinitionsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './keyDefinitions.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, keyDefinitionEvent_service_1.KeyDefinitionEventAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, ngx_modal_dialog_1.ModalDialogService])
    ], KeyDefinitionsAdminComponent);
    return KeyDefinitionsAdminComponent;
}());
exports.KeyDefinitionsAdminComponent = KeyDefinitionsAdminComponent;
//# sourceMappingURL=keyDefinitions.component.js.map