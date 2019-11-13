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
var sector_1 = require("../../../model/sector");
var sector_service_1 = require("../../../service/admin/sector.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var SectorAdminComponent = /** @class */ (function () {
    function SectorAdminComponent(formBuilder, toastr, activatedRoute, router, _sectorService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._sectorService = _sectorService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.sectorId = 0;
        this.searchText = '';
        this.isSubmited = false;
    }
    SectorAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmSector = this.formBuilder.group({
            SectorId: [''],
            Name: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var sectorId = _this._global.decryptValue(params['sectorId']);
            if (sectorId) {
                _this.addUpdateText = "Update";
                _this.sectorId = parseInt(sectorId);
                _this.EditSector(parseInt(sectorId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    SectorAdminComponent.prototype.EditSector = function (sectorId) {
        var _this = this;
        this.spinnerService.show();
        var getSectorRequest = new sector_1.GetSectorRequest();
        getSectorRequest.SectorId = sectorId;
        getSectorRequest.IsActive = null;
        this._sectorService.getSector(getSectorRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.frmSector.setValue({
                SectorId: sectorId,
                Name: data.Response[0].Name
            });
            _this.frmSector.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    SectorAdminComponent.prototype.SaveSector = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.NotificationId == 'null')
            formData.value.NotificationId = null;
        if (formData.value.APDIRCircularId == 'null')
            formData.value.APDIRCircularId = null;
        if (formData.value.SectorId) {
            this._sectorService.updateSector(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/sectors'], {
                            queryParams: {
                                indexSector1: params["indexSector1"], indexSector2: params["indexSector2"], sortingSectorField: params["sortingSectorField"], sortingSectorDirection: params["sortingSectorDirection"], sortingSectorDetailField: params["sortingSectorDetailField"], sortingSectorDetailDirection: params["sortingSectorDetailDirection"], sortingSubSectorField: params["sortingSubSectorField"], sortingSubSectorDirection: params["sortingSubSectorDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true });
            });
        }
        else {
            this._sectorService.addSector(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/sectors'], {
                            queryParams: {
                                indexSector1: params["indexSector1"], indexSector2: params["indexSector2"], sortingSectorField: params["sortingSectorField"], sortingSectorDirection: params["sortingSectorDirection"], sortingSectorDetailField: params["sortingSectorDetailField"], sortingSectorDetailDirection: params["sortingSectorDetailDirection"], sortingSubSectorField: params["sortingSubSectorField"], sortingSubSectorDirection: params["sortingSubSectorDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    SectorAdminComponent.prototype.OnSubmitSector = function (formData) {
        this.isSubmited = true;
        if (this.frmSector.valid) {
            this.SaveSector(formData);
        }
    };
    SectorAdminComponent.prototype.CancelSector = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/sectors'], {
                queryParams: {
                    indexSector1: params["indexSector1"], indexSector2: params["indexSector2"], sortingSectorField: params["sortingSectorField"], sortingSectorDirection: params["sortingSectorDirection"], sortingSectorDetailField: params["sortingSectorDetailField"], sortingSectorDetailDirection: params["sortingSectorDetailDirection"], sortingSubSectorField: params["sortingSubSectorField"], sortingSubSectorDirection: params["sortingSubSectorDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    SectorAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './sector.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, sector_service_1.SectorAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], SectorAdminComponent);
    return SectorAdminComponent;
}());
exports.SectorAdminComponent = SectorAdminComponent;
//# sourceMappingURL=sector.component.js.map