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
var allDefinition_1 = require("../../../model/allDefinition");
var actName_1 = require("../../../model/actName");
var allDefinition_service_1 = require("../../../service/admin/allDefinition.service");
var actName_service_1 = require("../../../service/admin/actName.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var AllDefinitionAdminComponent = /** @class */ (function () {
    function AllDefinitionAdminComponent(formBuilder, toastr, activatedRoute, router, _allDefinitionService, _actNameService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._allDefinitionService = _allDefinitionService;
        this._actNameService = _actNameService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.actName = new actName_1.ActName();
        this.id = 0;
        this.isSubmited = false;
        this.pdfServerPath = global_1.Global.ACT_PDF_FILEPATH;
    }
    AllDefinitionAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var actId = _this._global.decryptValue(params['actId']);
            var id = _this._global.decryptValue(params['id']);
            _this.actId = parseInt(actId);
            if (actId) {
                _this.GetActName(_this.actId);
                if (id) {
                    _this.addUpdateText = "Update";
                    _this.id = parseInt(id);
                    _this.EditAllDefinition(parseInt(id));
                }
                else {
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/actnames'], {
                        queryParams: {
                            indexAct: params["indexAct"], sortingActNameField: params["sortingActNameField"], sortingActNameDirection: params["sortingActNameDirection"], sortingDefinitionField: params["sortingDefinitionField"], sortingDefinitionDirection: params["sortingDefinitionDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmAllDefinition = this.formBuilder.group({
            Id: [''],
            ActId: [this.actId],
            DefinitionName: ['', forms_1.Validators.required],
            FullDInsertion: ['', forms_1.Validators.required],
            AuthorNote: ['']
        });
    };
    AllDefinitionAdminComponent.prototype.GetActName = function (actId) {
        var _this = this;
        this.spinnerService.show();
        var getActNameRequest = new actName_1.GetActNameRequest();
        getActNameRequest.ActId = actId;
        getActNameRequest.IsActive = null;
        this._actNameService.getActName(getActNameRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.actName = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    AllDefinitionAdminComponent.prototype.EditAllDefinition = function (id) {
        var _this = this;
        this.spinnerService.show();
        var getAllDefinitionRequest = new allDefinition_1.GetAllDefinitionRequest();
        getAllDefinitionRequest.Id = id;
        getAllDefinitionRequest.IsActive = null;
        this._allDefinitionService.getAllDefinition(getAllDefinitionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.frmAllDefinition.setValue({
                Id: id,
                ActId: data.Response[0].ActId,
                DefinitionName: data.Response[0].DefinitionName,
                FullDInsertion: data.Response[0].FullDInsertion,
                AuthorNote: data.Response[0].AuthorNote
            });
            _this.frmAllDefinition.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    AllDefinitionAdminComponent.prototype.SaveAllDefinition = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.Id) {
            this._allDefinitionService.updateAllDefinition(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/actnames'], {
                            queryParams: {
                                indexAct: params["indexAct"], sortingActNameField: params["sortingActNameField"], sortingActNameDirection: params["sortingActNameDirection"], sortingDefinitionField: params["sortingDefinitionField"], sortingDefinitionDirection: params["sortingDefinitionDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_ALLDEFINITION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_ALLDEFINITION_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ALLDEFINITION_TITLE, { enableHtml: true });
            });
        }
        else {
            this._allDefinitionService.addAllDefinition(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/actnames'], {
                            queryParams: {
                                indexAct: params["indexAct"], sortingActNameField: params["sortingActNameField"], sortingActNameDirection: params["sortingActNameDirection"], sortingDefinitionField: params["sortingDefinitionField"], sortingDefinitionDirection: params["sortingDefinitionDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_ALLDEFINITION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_ALLDEFINITION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ALLDEFINITION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    AllDefinitionAdminComponent.prototype.OnSubmitAllDefinition = function (formData) {
        this.isSubmited = true;
        if (this.frmAllDefinition.valid) {
            this.SaveAllDefinition(formData);
        }
    };
    AllDefinitionAdminComponent.prototype.CancelAllDefinition = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/actnames'], {
                queryParams: {
                    indexAct: params["indexAct"], sortingActNameField: params["sortingActNameField"], sortingActNameDirection: params["sortingActNameDirection"], sortingDefinitionField: params["sortingDefinitionField"], sortingDefinitionDirection: params["sortingDefinitionDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    AllDefinitionAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './allDefinition.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, allDefinition_service_1.AllDefinitionAdminService, actName_service_1.ActNameAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], AllDefinitionAdminComponent);
    return AllDefinitionAdminComponent;
}());
exports.AllDefinitionAdminComponent = AllDefinitionAdminComponent;
//# sourceMappingURL=allDefinition.component.js.map