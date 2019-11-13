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
var actName_1 = require("../../../model/actName");
var allDefinition_1 = require("../../../model/allDefinition");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var actName_service_1 = require("../../../service/admin/actName.service");
var allDefinition_service_1 = require("../../../service/admin/allDefinition.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var contentPopUp_component_1 = require("../../../areas/admin/contentPopUp/contentPopUp.component");
var ActNamesAdminComponent = /** @class */ (function () {
    function ActNamesAdminComponent(formBuilder, activatedRoute, _actNameService, _allDefinitionService, toastr, vcr, spinnerService, router, modalService) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._actNameService = _actNameService;
        this._allDefinitionService = _allDefinitionService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.ACT_PDF_FILEPATH;
        this.itemDetailActs = { index: -1 };
        this.indexAct = -1;
    }
    ActNamesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexAct = (params["indexAct"]) ? parseInt(params["indexAct"]) : -1;
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
            _this.sortingActNameField = params["sortingActNameField"];
            _this.sortingActNameDirection = params["sortingActNameDirection"];
            _this.sortingDefinitionField = params["sortingDefinitionField"];
            _this.sortingDefinitionDirection = params["sortingDefinitionDirection"];
        });
        this.frmActName = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetActName(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    ActNamesAdminComponent.prototype.GetActName = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getActNameRequest = new actName_1.GetActNameRequest();
        getActNameRequest.SearchText = searchText;
        getActNameRequest.IsActive = null;
        getActNameRequest.OrderBy = this.sortingActNameField;
        getActNameRequest.OrderByDirection = this.sortingActNameDirection;
        getActNameRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getActNameRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._actNameService.getActName(getActNameRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.actNames = data.Response;
                if (_this.indexAct != -1) {
                    _this.itemDetailActs.index = _this.indexAct;
                    _this.GetAllDefinitions(_this.itemDetailActs.index, _this.actNames[_this.itemDetailActs.index].ActId, true);
                }
                _this.pageSize = getActNameRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { enableHtml: true, closeButton: true });
            /*
                Notes : toastr

                Error : ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
                        When opening a toast inside an angular lifecycle wrap it in setTimeout

                Resolution : setTimeout(() => this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_ACTNAME_TITLE, { enableHtml: true, closeButton: true }));
            */
        });
    };
    ActNamesAdminComponent.prototype.SearchAct = function (formData) {
        this.indexAct = -1;
        this.itemDetailActs.index = this.indexAct;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetActName(this.searchText, this.currentPage, this.pageSize);
    };
    ActNamesAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetActName(this.searchText, pageNumber, this.pageSize);
    };
    ActNamesAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetActName(this.searchText, null, this.pageSize);
    };
    ActNamesAdminComponent.prototype.EditActName = function (actId) {
        this.router.navigate(['/admin/secure/actname/' + this._global.encryptValue(actId)], {
            queryParams: {
                indexAct: this.indexAct, sortingActNameField: this.sortingActNameField, sortingActNameDirection: this.sortingActNameDirection, sortingDefinitionField: this.sortingDefinitionField, sortingDefinitionDirection: this.sortingDefinitionDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    ActNamesAdminComponent.prototype.AddDefinition = function (actId, index) {
        this.router.navigate(['/admin/secure/alldefinition/' + this._global.encryptValue(actId)], {
            queryParams: {
                indexAct: this.indexAct, sortingActNameField: this.sortingActNameField, sortingActNameDirection: this.sortingActNameDirection, sortingDefinitionField: this.sortingDefinitionField, sortingDefinitionDirection: this.sortingDefinitionDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    ActNamesAdminComponent.prototype.EditDefinition = function (actId, id) {
        this.router.navigate(['/admin/secure/alldefinition/' + this._global.encryptValue(actId) + '/' + this._global.encryptValue(id)], {
            queryParams: {
                indexAct: this.indexAct, sortingActNameField: this.sortingActNameField, sortingActNameDirection: this.sortingActNameDirection, sortingDefinitionField: this.sortingDefinitionField, sortingDefinitionDirection: this.sortingDefinitionDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    ActNamesAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexAct = -1;
            this.itemDetailActs.index = this.indexAct;
        }
        this.router.navigate(['/admin/secure/actnames'], {
            queryParams: {
                indexAct: this.indexAct, sortingActNameField: this.sortingActNameField, sortingActNameDirection: this.sortingActNameDirection, sortingDefinitionField: this.sortingDefinitionField, sortingDefinitionDirection: this.sortingDefinitionDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    ActNamesAdminComponent.prototype.DeleteActName = function (actId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteActName = {
                "ActId": actId
            };
            this._actNameService.deleteActName(deleteActName)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { closeButton: true });
                    _this.GetActName();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    ActNamesAdminComponent.prototype.DeleteDefinition = function (actId, id) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteDefinition = {
                "Id": id
            };
            this._allDefinitionService.deleteAllDefinition(deleteDefinition)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { closeButton: true });
                    _this.GetAllDefinitions(_this.itemDetailActs.index, actId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    ActNamesAdminComponent.prototype.UpDownActArrow = function (index) {
        if (index === this.itemDetailActs.index) {
            this.itemDetailActs.index = null;
        }
        else {
            this.itemDetailActs.index = index;
        }
    };
    ActNamesAdminComponent.prototype.GetAllDefinitions = function (index, actId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getAllDefinitionRequest = new allDefinition_1.GetAllDefinitionRequest();
        getAllDefinitionRequest.ActId = actId;
        getAllDefinitionRequest.IsActive = null;
        getAllDefinitionRequest.OrderBy = this.sortingDefinitionField;
        getAllDefinitionRequest.OrderByDirection = this.sortingDefinitionDirection;
        getAllDefinitionRequest.PageNumber = 1;
        getAllDefinitionRequest.PageSize = 100000;
        this._allDefinitionService.getAllDefinition(getAllDefinitionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.allDefinitions = data.Response;
                if (isDeleted != true) {
                    _this.UpDownActArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    ActNamesAdminComponent.prototype.ShowAllDefinition = function (index, actId) {
        this.indexAct = -1;
        this.actId = null;
        if (this.itemDetailActs.index !== index) {
            if (actId) {
                this.actId = actId;
                this.indexAct = index;
                this.GetAllDefinitions(index, actId, false);
            }
        }
        else {
            this.UpDownActArrow(index);
        }
        this.ReloadPage(false);
    };
    ActNamesAdminComponent.prototype.ShowContent = function (title, content) {
        this.modalService.openDialog(this.vcr, {
            title: title,
            childComponent: contentPopUp_component_1.ContentPopUpAdminComponent,
            data: content
        });
    };
    ActNamesAdminComponent.prototype.OnActNameSort = function (fieldName) {
        this.sortingActNameDirection = (this.sortingActNameField == fieldName) ? (this.sortingActNameDirection == "A") ? "D" : "A" : "A";
        this.sortingActNameField = fieldName;
        this.ReloadPage(true);
        this.GetActName(this.searchText, this.currentPage, this.pageSize);
    };
    ActNamesAdminComponent.prototype.OnDefinitionSort = function (actId, fieldName) {
        this.sortingDefinitionDirection = (this.sortingDefinitionField == fieldName) ? (this.sortingDefinitionDirection == "A") ? "D" : "A" : "A";
        this.sortingDefinitionField = fieldName;
        this.ReloadPage(false);
        this.GetAllDefinitions(this.itemDetailActs.index, actId, true);
    };
    ActNamesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './actNames.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, actName_service_1.ActNameAdminService, allDefinition_service_1.AllDefinitionAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router, ngx_modal_dialog_1.ModalDialogService])
    ], ActNamesAdminComponent);
    return ActNamesAdminComponent;
}());
exports.ActNamesAdminComponent = ActNamesAdminComponent;
//# sourceMappingURL=actNames.component.js.map