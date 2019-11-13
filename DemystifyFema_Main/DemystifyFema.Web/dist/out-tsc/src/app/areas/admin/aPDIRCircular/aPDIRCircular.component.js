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
var aPDIRCircular_1 = require("../../../model/aPDIRCircular");
var masterDirection_1 = require("../../../model/masterDirection");
var sector_1 = require("../../../model/sector");
var subSector_1 = require("../../../model/subSector");
var aPDIRCircular_service_1 = require("../../../service/admin/aPDIRCircular.service");
var masterDirection_service_1 = require("../../../service/admin/masterDirection.service");
var sector_service_1 = require("../../../service/admin/sector.service");
var subSector_service_1 = require("../../../service/admin/subSector.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var APDIRCircularAdminComponent = /** @class */ (function () {
    function APDIRCircularAdminComponent(formBuilder, toastr, activatedRoute, router, _aPDIRCircularService, _masterDirectionService, _sectorService, _subSectorService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._aPDIRCircularService = _aPDIRCircularService;
        this._masterDirectionService = _masterDirectionService;
        this._sectorService = _sectorService;
        this._subSectorService = _subSectorService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.aPDIRCircularId = 0;
        this.searchText = '';
        this.aPDIRCircularYears = [];
        this.masterDirections = [];
        this.pdfServerPath = global_1.Global.APDIRCIRCULAR_PDF_FILEPATH;
        this.sectors = [];
        this.subSectors = [];
        this.sectorDropDownSettings = {};
        this.subSectorDropDownSettings = {};
        this.selectedSectors = [];
        this.selectedSubSectors = [];
        this.selectedSubSectorIds = [];
        this.minDate = { year: 1970, month: 1, day: 1 };
        this.isSubmited = false;
    }
    APDIRCircularAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmAPDIRCircular = this.formBuilder.group({
            APDIRCircularId: [''],
            MasterDirectionId: [''],
            APDIRCircularNo: ['', forms_1.Validators.required],
            APDIRCircularName: ['', forms_1.Validators.required],
            APDIRCircularDate: ['', forms_1.Validators.required],
            APDIRCircularEffectiveDate: ['', forms_1.Validators.required],
            Year: ['', forms_1.Validators.required],
            APDIRCircularPDF: ['', forms_1.Validators.required],
            SectorIds: [''],
            SubSectorIds: ['']
        });
        this.activatedRoute.params.subscribe(function (params) {
            var aPDIRCircularId = _this._global.decryptValue(params['aPDIRCircularId']);
            if (aPDIRCircularId) {
                _this.addUpdateText = "Update";
                _this.aPDIRCircularId = parseInt(aPDIRCircularId);
                _this.EditAPDIRCircular(parseInt(aPDIRCircularId));
            }
            else {
                _this.GetMasterDirection(null);
                _this.GetAPDIRCircularYear(null);
                _this.GetSector(null);
                _this.addUpdateText = "Add";
            }
        });
    };
    APDIRCircularAdminComponent.prototype.GetSector = function (aPDIRCircularData) {
        var _this = this;
        this.spinnerService.show();
        var getSectorRequest = new sector_1.GetSectorRequest();
        this._sectorService.getSector(getSectorRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.sectors = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.sectors.push({ SectorId: item.SectorId, Name: item.Name, CreatedDate: null, IsActive: null, IsDeleted: null, ModifiedDate: null });
                });
                _this.sectorDropDownSettings = {
                    singleSelection: false,
                    idField: 'SectorId',
                    textField: 'Name',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedSectors_1 = [];
                if (aPDIRCircularData != null) {
                    if (aPDIRCircularData.SectorIds)
                        aPDIRCircularData.SectorIds.split(',').forEach(function (item) {
                            if (item)
                                selectedSectors_1.push({ SectorId: parseInt(item), Name: _this.sectors.filter(function (x) { return x.SectorId == item; })[0].Name });
                        });
                    _this.selectedSectors = selectedSectors_1;
                    _this.GetSubSector(aPDIRCircularData);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    APDIRCircularAdminComponent.prototype.OnSectorSelect = function (item) {
        this.GetSubSector(null);
    };
    APDIRCircularAdminComponent.prototype.OnSectorDeSelect = function (item) {
        this.GetSubSector(null);
    };
    APDIRCircularAdminComponent.prototype.GetSubSector = function (aPDIRCircularData) {
        var _this = this;
        var t_this = this;
        if (this.selectedSectors.length > 0) {
            this.spinnerService.show();
            var getSubSectorRequest = new subSector_1.GetSubSectorRequest();
            getSubSectorRequest.SectorId = Array.prototype.map.call(this.selectedSectors, function (item) { return item.SectorId; }).join(",");
            this._subSectorService.getSubSector(getSubSectorRequest)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                _this.subSectors = [];
                if (data.Status == global_1.Global.API_SUCCESS) {
                    data.Response.forEach(function (item) {
                        _this.subSectors.push({ SubSectorId: item.SubSectorId, Name: item.Name, SectorId: item.SectorId, CreatedDate: null, APDIRCircularId: null, APDIRCircularNo: null, NotificationId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, NotificationNo: null, PressNoteNo: null, Year: null, PressNoteId: null });
                    });
                    _this.subSectorDropDownSettings = {
                        singleSelection: false,
                        idField: 'SubSectorId',
                        textField: 'Name',
                        selectAllText: 'Select All',
                        unSelectAllText: 'UnSelect All',
                        enableCheckAll: false,
                        allowSearchFilter: true
                    };
                    var selectedSubSectors_1 = [];
                    if (aPDIRCircularData != null) {
                        if (aPDIRCircularData.SubSectorIds)
                            aPDIRCircularData.SubSectorIds.split(',').forEach(function (item) {
                                if (item)
                                    selectedSubSectors_1.push({ SubSectorId: parseInt(item), Name: _this.subSectors.filter(function (x) { return x.SubSectorId == item; })[0].Name, SectorId: _this.subSectors.filter(function (x) { return x.SubSectorId == item; })[0].SectorId });
                            });
                        _this.selectedSubSectors = selectedSubSectors_1;
                    }
                    else {
                        var props_1 = ['SubSectorId', 'Name'];
                        _this.selectedSubSectors = _this.selectedSubSectors.filter(function (o1) {
                            return t_this.subSectors.some(function (o2) {
                                return o1.SubSectorId === o2.SubSectorId;
                            });
                        }).map(function (o) {
                            return props_1.reduce(function (newo, name) {
                                newo[name] = o[name];
                                return newo;
                            }, {});
                        });
                    }
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
        else {
            this.subSectors = [];
            this.selectedSubSectors = [];
        }
    };
    APDIRCircularAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmAPDIRCircular.get('APDIRCircularPDF').setValue(this.files[0].name);
            this.frmAPDIRCircular.updateValueAndValidity();
        }
        else {
            this.frmAPDIRCircular.get('APDIRCircularPDF').setValue(null);
            this.frmAPDIRCircular.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
        }
    };
    APDIRCircularAdminComponent.prototype.GetMasterDirection = function (aPDIRCircularData) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionRequest = new masterDirection_1.GetMasterDirectionRequest();
        this._masterDirectionService.getMasterDirection(getMasterDirectionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirections = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirections.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.masterDirections.push({ Value: item.MasterDirectionId, Text: item.MasterDirectionName });
                });
                _this.frmAPDIRCircular.get("MasterDirectionId").setValue((aPDIRCircularData != null) ? (aPDIRCircularData.MasterDirectionId) ? aPDIRCircularData.MasterDirectionId : "" : "");
                _this.frmAPDIRCircular.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    APDIRCircularAdminComponent.prototype.GetAPDIRCircularYear = function (aPDIRCircularData) {
        var _this = this;
        this.spinnerService.show();
        this._aPDIRCircularService.getAPDIRCircularYears()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.aPDIRCircularYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.aPDIRCircularYears.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.aPDIRCircularYears.push({ Value: item.APDIRCircularYearId, Text: item.APDIRCircularYearName });
                });
                _this.frmAPDIRCircular.get("Year").setValue((aPDIRCircularData != null) ? aPDIRCircularData.Year : "");
                _this.frmAPDIRCircular.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    APDIRCircularAdminComponent.prototype.EditAPDIRCircular = function (aPDIRCircularId) {
        var _this = this;
        this.spinnerService.show();
        var getAPDIRCircularRequest = new aPDIRCircular_1.GetAPDIRCircularRequest();
        getAPDIRCircularRequest.APDIRCircularId = aPDIRCircularId;
        getAPDIRCircularRequest.PageNumber = 1;
        getAPDIRCircularRequest.PageSize = 10;
        getAPDIRCircularRequest.IsActive = null;
        this._aPDIRCircularService.getAPDIRCircular(getAPDIRCircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetAPDIRCircularYear(data.Response[0]);
            _this.GetMasterDirection(data.Response[0]);
            _this.GetSector(data.Response[0]);
            _this.aPDIRCircularPDFName = data.Response[0].APDIRCircularPDF;
            var aPDIRCircularDate = new Date(data.Response[0].APDIRCircularDate);
            var aPDIRCircularEffectiveDate = new Date(data.Response[0].APDIRCircularEffectiveDate);
            console.log(data.Response);
            _this.frmAPDIRCircular.setValue({
                APDIRCircularId: aPDIRCircularId,
                MasterDirectionId: data.Response[0].MasterDirectionId,
                APDIRCircularNo: data.Response[0].APDIRCircularNo,
                APDIRCircularName: data.Response[0].APDIRCircularName,
                APDIRCircularDate: { year: aPDIRCircularDate.getFullYear(), month: aPDIRCircularDate.getMonth() + 1, day: aPDIRCircularDate.getDate() },
                APDIRCircularEffectiveDate: { year: aPDIRCircularEffectiveDate.getFullYear(), month: aPDIRCircularEffectiveDate.getMonth() + 1, day: aPDIRCircularEffectiveDate.getDate() },
                Year: data.Response[0].Year,
                APDIRCircularPDF: data.Response[0].APDIRCircularPDF,
                SectorIds: [],
                SubSectorIds: []
            });
            _this.frmAPDIRCircular.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    APDIRCircularAdminComponent.prototype.SaveAPDIRCircular = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SectorIds = formData.value.SectorIds.map(function (x) { return x.SectorId; }).join(',');
        formData.value.SubSectorIds = formData.value.SubSectorIds.map(function (x) { return x.SubSectorId; }).join(',');
        if (formData.value.SectorIds == 'null')
            formData.value.SectorIds = null;
        if (formData.value.SubSectorIds == 'null')
            formData.value.SubSectorIds = null;
        formData.value.APDIRCircularDate = (formData.value.APDIRCircularDate != null) ? formData.value.APDIRCircularDate.year + "/" + formData.value.APDIRCircularDate.month + "/" + formData.value.APDIRCircularDate.day : null;
        formData.value.APDIRCircularEffectiveDate = (formData.value.APDIRCircularEffectiveDate != null) ? formData.value.APDIRCircularEffectiveDate.year + "/" + formData.value.APDIRCircularEffectiveDate.month + "/" + formData.value.APDIRCircularEffectiveDate.day : null;
        if (formData.value.APDIRCircularId) {
            this._aPDIRCircularService.updateAPDIRCircular(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/apdircirculars'], {
                            queryParams: {
                                indexAPDIRCircular1: params["indexAPDIRCircular1"], indexAPDIRCircular2: params["indexAPDIRCircular2"], sortingAPDIRCircularField: params["sortingAPDIRCircularField"], sortingAPDIRCircularDirection: params["sortingAPDIRCircularDirection"], sortingAPDIRCircularBeforeField: params["sortingAPDIRCircularBeforeField"], sortingAPDIRCircularBeforeDirection: params["sortingAPDIRCircularBeforeDirection"], sortingAPDIRCircularAfterField: params["sortingAPDIRCircularAfterField"], sortingAPDIRCircularAfterDirection: params["sortingAPDIRCircularAfterDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true });
            });
        }
        else {
            this._aPDIRCircularService.addAPDIRCircular(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/apdircirculars'], {
                            queryParams: {
                                indexAPDIRCircular1: params["indexAPDIRCircular1"], indexAPDIRCircular2: params["indexAPDIRCircular2"], sortingAPDIRCircularField: params["sortingAPDIRCircularField"], sortingAPDIRCircularDirection: params["sortingAPDIRCircularDirection"], sortingAPDIRCircularBeforeField: params["sortingAPDIRCircularBeforeField"], sortingAPDIRCircularBeforeDirection: params["sortingAPDIRCircularBeforeDirection"], sortingAPDIRCircularAfterField: params["sortingAPDIRCircularAfterField"], sortingAPDIRCircularAfterDirection: params["sortingAPDIRCircularAfterDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    APDIRCircularAdminComponent.prototype.OnSubmitAPDIRCircular = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmAPDIRCircular.valid) {
            this.spinnerService.show();
            // Check SubSector is selected for Sector with SubSector
            var selectedSectorIds = formData.value.SectorIds.map(function (x) { return x.SectorId; });
            var selectedSubSectorIds = formData.value.SubSectorIds.map(function (x) { return x.SubSectorId; });
            var errorMessage = '';
            var _loop_1 = function () {
                var selectedSectorId = (selectedSectorIds[selectedSectorIdItem]);
                // Get SubSectors of Sector
                var subSectorsOfSelectedSector = this_1.subSectors.filter(function (o1) {
                    return o1.SectorId == selectedSectorId;
                });
                if (subSectorsOfSelectedSector.length > 0) {
                    // Check SubSector is selected for selected Sector
                    var isSubSectorExist = false;
                    for (var subSectorOfSelectedSector in subSectorsOfSelectedSector) {
                        var subSectorIdOfSelectedSector = (subSectorsOfSelectedSector[subSectorOfSelectedSector].SubSectorId);
                        isSubSectorExist = selectedSubSectorIds.indexOf(subSectorIdOfSelectedSector) > -1 ? true : false;
                        if (isSubSectorExist)
                            break;
                    }
                    if (!isSubSectorExist) {
                        var sector = this_1.sectors.filter(function (o1) {
                            return o1.SectorId == selectedSectorId;
                        }).shift();
                        errorMessage += sector.Name + ', ';
                    }
                }
            };
            var this_1 = this;
            // Traverse all Sectors
            for (var selectedSectorIdItem in selectedSectorIds) {
                _loop_1();
            }
            if (errorMessage.length > 0) {
                errorMessage = "Please select SubSector of Sector(s) : " + errorMessage.substr(0, errorMessage.length - 2);
                this.toastr.error(errorMessage, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
                this.spinnerService.hide();
                return false;
            }
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._aPDIRCircularService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmAPDIRCircular.get('APDIRCircularPDF').setValue(response.Response);
                        _this.frmAPDIRCircular.updateValueAndValidity();
                        formData.value.APDIRCircularPDF = response.Response;
                        _this.files = null;
                        _this.SaveAPDIRCircular(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.APDIRCircularPDF) {
                    this.SaveAPDIRCircular(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    APDIRCircularAdminComponent.prototype.ClearAPDIRCircularDate = function () {
        this.frmAPDIRCircular.get("APDIRCircularDate").setValue("");
        this.frmAPDIRCircular.updateValueAndValidity();
    };
    APDIRCircularAdminComponent.prototype.ClearAPDIRCircularEffectiveDate = function () {
        this.frmAPDIRCircular.get("APDIRCircularEffectiveDate").setValue("");
        this.frmAPDIRCircular.updateValueAndValidity();
    };
    APDIRCircularAdminComponent.prototype.CancelAPDIRCircular = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/apdircirculars'], {
                queryParams: {
                    indexAPDIRCircular1: params["indexAPDIRCircular1"], indexAPDIRCircular2: params["indexAPDIRCircular2"], sortingAPDIRCircularField: params["sortingAPDIRCircularField"], sortingAPDIRCircularDirection: params["sortingAPDIRCircularDirection"], sortingAPDIRCircularBeforeField: params["sortingAPDIRCircularBeforeField"], sortingAPDIRCircularBeforeDirection: params["sortingAPDIRCircularBeforeDirection"], sortingAPDIRCircularAfterField: params["sortingAPDIRCircularAfterField"], sortingAPDIRCircularAfterDirection: params["sortingAPDIRCircularAfterDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    APDIRCircularAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './aPDIRCircular.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            aPDIRCircular_service_1.APDIRCircularAdminService,
            masterDirection_service_1.MasterDirectionAdminService,
            sector_service_1.SectorAdminService,
            subSector_service_1.SubSectorAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], APDIRCircularAdminComponent);
    return APDIRCircularAdminComponent;
}());
exports.APDIRCircularAdminComponent = APDIRCircularAdminComponent;
//# sourceMappingURL=aPDIRCircular.component.js.map