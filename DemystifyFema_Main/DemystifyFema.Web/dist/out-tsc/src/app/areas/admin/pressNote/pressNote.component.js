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
var pressNote_1 = require("../../../model/pressNote");
var sector_1 = require("../../../model/sector");
var subSector_1 = require("../../../model/subSector");
var pressNote_service_1 = require("../../../service/admin/pressNote.service");
var sector_service_1 = require("../../../service/admin/sector.service");
var subSector_service_1 = require("../../../service/admin/subSector.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var PressNoteAdminComponent = /** @class */ (function () {
    function PressNoteAdminComponent(formBuilder, toastr, activatedRoute, router, _pressNoteService, _sectorService, _subSectorService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._pressNoteService = _pressNoteService;
        this._sectorService = _sectorService;
        this._subSectorService = _subSectorService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.pressNoteId = 0;
        this.searchText = '';
        this.sectors = [];
        this.subSectors = [];
        this.sectorDropDownSettings = {};
        this.subSectorDropDownSettings = {};
        this.selectedSectors = [];
        this.selectedSubSectors = [];
        this.selectedSubSectorIds = [];
        this.pdfServerPath = global_1.Global.PRESSNOTE_PDF_FILEPATH;
        this.minDate = { year: 1970, month: 1, day: 1 };
        this.isSubmited = false;
    }
    PressNoteAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmPressNote = this.formBuilder.group({
            PressNoteId: [''],
            PressNoteNo: ['', forms_1.Validators.required],
            PressNoteName: ['', forms_1.Validators.required],
            PressNoteDate: ['', forms_1.Validators.required],
            PressNoteEffectiveDate: ['', forms_1.Validators.required],
            Year: ['', forms_1.Validators.required],
            PressNotePDF: ['', forms_1.Validators.required],
            SectorIds: [''],
            SubSectorIds: ['']
        });
        this.activatedRoute.params.subscribe(function (params) {
            var pressNoteId = _this._global.decryptValue(params['pressNoteId']);
            if (pressNoteId) {
                _this.addUpdateText = "Update";
                _this.pressNoteId = parseInt(pressNoteId);
                _this.EditPressNote(parseInt(pressNoteId));
            }
            else {
                _this.GetPressNoteYear(null);
                _this.GetSector(null);
                _this.addUpdateText = "Add";
            }
        });
    };
    PressNoteAdminComponent.prototype.GetSector = function (pressNoteData) {
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
                if (pressNoteData != null) {
                    if (pressNoteData.SectorIds)
                        pressNoteData.SectorIds.split(',').forEach(function (item) {
                            if (item)
                                selectedSectors_1.push({ SectorId: parseInt(item), Name: _this.sectors.filter(function (x) { return x.SectorId == item; })[0].Name });
                        });
                    _this.selectedSectors = selectedSectors_1;
                    _this.GetSubSector(pressNoteData);
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
    PressNoteAdminComponent.prototype.OnSectorSelect = function (item) {
        this.GetSubSector(null);
    };
    PressNoteAdminComponent.prototype.OnSectorDeSelect = function (item) {
        this.GetSubSector(null);
    };
    PressNoteAdminComponent.prototype.GetSubSector = function (pressNoteData) {
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
                    if (pressNoteData != null) {
                        if (pressNoteData.SubSectorIds)
                            pressNoteData.SubSectorIds.split(',').forEach(function (item) {
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
    PressNoteAdminComponent.prototype.GetPressNoteYear = function (pressNoteData) {
        var _this = this;
        this.spinnerService.show();
        this._pressNoteService.getPressNoteYear()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.pressNoteYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.pressNoteYears.push({ YearId: null, YearName: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.pressNoteYears.push({ YearId: item, YearName: item });
                });
                _this.frmPressNote.get("Year").setValue((pressNoteData != null) ? pressNoteData.Year : pressNoteData);
                _this.frmPressNote.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    PressNoteAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmPressNote.get('PressNotePDF').setValue(this.files[0].name);
            this.frmPressNote.updateValueAndValidity();
        }
        else {
            this.frmPressNote.get('PressNotePDF').setValue(null);
            this.frmPressNote.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
        }
    };
    PressNoteAdminComponent.prototype.EditPressNote = function (pressNoteId) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteRequest = new pressNote_1.GetPressNoteRequest();
        getPressNoteRequest.PressNoteId = pressNoteId;
        getPressNoteRequest.IsActive = null;
        this._pressNoteService.getPressNote(getPressNoteRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetPressNoteYear(data.Response[0]);
            _this.GetSector(data.Response[0]);
            _this.pressNotePDFName = data.Response[0].PressNotePDF;
            var pressNoteDate = new Date(data.Response[0].PressNoteDate);
            var pressNoteEffectiveDate = new Date(data.Response[0].PressNoteEffectiveDate);
            _this.frmPressNote.setValue({
                PressNoteId: pressNoteId,
                PressNoteNo: data.Response[0].PressNoteNo,
                PressNoteName: data.Response[0].PressNoteName,
                PressNoteDate: { year: pressNoteDate.getFullYear(), month: pressNoteDate.getMonth() + 1, day: pressNoteDate.getDate() },
                PressNoteEffectiveDate: { year: pressNoteEffectiveDate.getFullYear(), month: pressNoteEffectiveDate.getMonth() + 1, day: pressNoteEffectiveDate.getDate() },
                Year: data.Response[0].Year,
                PressNotePDF: data.Response[0].PressNotePDF,
                SectorIds: [],
                SubSectorIds: []
            });
            _this.frmPressNote.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    PressNoteAdminComponent.prototype.SavePressNote = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SectorIds = formData.value.SectorIds.map(function (x) { return x.SectorId; }).join(',');
        formData.value.SubSectorIds = formData.value.SubSectorIds.map(function (x) { return x.SubSectorId; }).join(',');
        if (formData.value.SectorIds == 'null')
            formData.value.SectorIds = null;
        if (formData.value.SubSectorIds == 'null')
            formData.value.SubSectorIds = null;
        formData.value.PressNoteDate = (formData.value.PressNoteDate != null) ? formData.value.PressNoteDate.year + "/" + formData.value.PressNoteDate.month + "/" + formData.value.PressNoteDate.day : null;
        formData.value.PressNoteEffectiveDate = (formData.value.PressNoteEffectiveDate != null) ? formData.value.PressNoteEffectiveDate.year + "/" + formData.value.PressNoteEffectiveDate.month + "/" + formData.value.PressNoteEffectiveDate.day : null;
        if (formData.value.PressNoteId) {
            this._pressNoteService.updatePressNote(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/pressnotes'], {
                            queryParams: {
                                indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true });
            });
        }
        else {
            this._pressNoteService.addPressNote(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/pressnotes'], {
                            queryParams: {
                                indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    PressNoteAdminComponent.prototype.OnSubmitPressNote = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmPressNote.valid) {
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
                this._pressNoteService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmPressNote.get('PressNotePDF').setValue(response.Response);
                        _this.frmPressNote.updateValueAndValidity();
                        formData.value.PressNotePDF = response.Response;
                        _this.files = null;
                        _this.SavePressNote(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PressNotePDF) {
                    this.SavePressNote(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    PressNoteAdminComponent.prototype.ClearPressNoteDate = function () {
        this.frmPressNote.get("PressNoteDate").setValue("");
        this.frmPressNote.updateValueAndValidity();
    };
    PressNoteAdminComponent.prototype.ClearPressNoteEffectiveDate = function () {
        this.frmPressNote.get("PressNoteEffectiveDate").setValue("");
        this.frmPressNote.updateValueAndValidity();
    };
    PressNoteAdminComponent.prototype.CancelPressNote = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/pressnotes'], {
                queryParams: {
                    indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    PressNoteAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './pressNote.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            pressNote_service_1.PressNoteAdminService,
            sector_service_1.SectorAdminService,
            subSector_service_1.SubSectorAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], PressNoteAdminComponent);
    return PressNoteAdminComponent;
}());
exports.PressNoteAdminComponent = PressNoteAdminComponent;
//# sourceMappingURL=pressNote.component.js.map