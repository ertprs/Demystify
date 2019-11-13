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
var fDICircularIndexAmendment_1 = require("../../../model/fDICircularIndexAmendment");
var pressNote_1 = require("../../../model/pressNote");
var fDICircularIndex_1 = require("../../../model/fDICircularIndex");
var fDICircularSubIndex_1 = require("../../../model/fDICircularSubIndex");
var fDICircular_1 = require("../../../model/fDICircular");
var fDIChapter_1 = require("../../../model/fDIChapter");
var fDICircularIndexAmendment_service_1 = require("../../../service/admin/fDICircularIndexAmendment.service");
var pressNote_service_1 = require("../../../service/admin/pressNote.service");
var fDICircularIndex_service_1 = require("../../../service/admin/fDICircularIndex.service");
var fDICircularSubIndex_service_1 = require("../../../service/admin/fDICircularSubIndex.service");
var fDICircular_service_1 = require("../../../service/admin/fDICircular.service");
var fDIChapter_service_1 = require("../../../service/admin/fDIChapter.service");
var indexAmendment_1 = require("../../../model/indexAmendment");
var indexAmendment_service_1 = require("../../../service/admin/indexAmendment.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FDICircularIndexAmendmentAdminComponent = /** @class */ (function () {
    function FDICircularIndexAmendmentAdminComponent(formBuilder, toastr, activatedRoute, router, _fDICircularIndexAmendmentService, _pressNoteService, _fDICircularIndexService, _fDICircularSubIndexService, _fDICircularService, _fDIChapterService, _indexAmendmentService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fDICircularIndexAmendmentService = _fDICircularIndexAmendmentService;
        this._pressNoteService = _pressNoteService;
        this._fDICircularIndexService = _fDICircularIndexService;
        this._fDICircularSubIndexService = _fDICircularSubIndexService;
        this._fDICircularService = _fDICircularService;
        this._fDIChapterService = _fDIChapterService;
        this._indexAmendmentService = _indexAmendmentService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.pressNotes = [];
        this.fDIChapters = [];
        this.fDICircularIndexes = [];
        this.fDICircularSubIndexes = [];
        this.pressNoteDropDownSettings = {};
        this.selectedPressNotes = [];
        this.fDICircular = new fDICircular_1.FDICircular();
        this.fDICircularId = 0;
        this.fDICircularIndexAmendmentId = 0;
        this.isSubmited = false;
        this.pdfServerPath = global_1.Global.FDICIRCULAR_PDF_FILEPATH;
    }
    FDICircularIndexAmendmentAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var fDICircularId = _this._global.decryptValue(params['fDICircularId']);
            var fDICircularIndexAmendmentId = _this._global.decryptValue(params['fDICircularIndexAmendmentId']);
            _this.fDICircularId = parseInt(fDICircularId);
            if (fDICircularId) {
                _this.GetFDICircular(_this.fDICircularId);
                if (fDICircularIndexAmendmentId) {
                    _this.addUpdateText = "Update";
                    _this.fDICircularIndexAmendmentId = parseInt(fDICircularIndexAmendmentId);
                    _this.EditFDICircularIndexAmendment(parseInt(fDICircularIndexAmendmentId));
                }
                else {
                    _this.GetFDICircularYear(null);
                    _this.GetPressNote(null);
                    _this.GetFDIChapter(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/fdicirculars'], {
                        queryParams: {
                            indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmFDICircularIndexAmendment = this.formBuilder.group({
            FDICircularIndexAmendmentId: [''],
            FDICircularId: [this.fDICircularId],
            PressNoteIds: ['', forms_1.Validators.required],
            FDIChapterId: ['', forms_1.Validators.required],
            FDICircularIndexId: ['', forms_1.Validators.required],
            FDICircularSubIndexId: [''],
            Year: ['', forms_1.Validators.required],
            IndexAmendmentContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")])
        });
    };
    FDICircularIndexAmendmentAdminComponent.prototype.CreateCKEditor = function (id, content, status) {
        return this.formBuilder.group({
            Id: id,
            Content: content,
            Status: status
        });
    };
    FDICircularIndexAmendmentAdminComponent.prototype.AddCKEditor = function (id, content, status) {
        this.IndexAmendmentContent = this.frmFDICircularIndexAmendment.get('IndexAmendmentContent');
        this.IndexAmendmentContent.push(this.CreateCKEditor(id, content, status));
    };
    FDICircularIndexAmendmentAdminComponent.prototype.RemoveCKEditor = function (index) {
        this.IndexAmendmentContent.removeAt(index);
    };
    FDICircularIndexAmendmentAdminComponent.prototype.GetFDICircularYear = function (fDICircularIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        this._fDICircularIndexAmendmentService.getFDICircularYear()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDICircularYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICircularYears.push({ YearId: null, YearName: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.fDICircularYears.push({ YearId: item, YearName: item });
                });
                _this.frmFDICircularIndexAmendment.get("Year").setValue((fDICircularIndexAmendmentData != null) ? fDICircularIndexAmendmentData.Year : fDICircularIndexAmendmentData);
                _this.frmFDICircularIndexAmendment.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularIndexAmendmentAdminComponent.prototype.GetFDICircular = function (fDICircularId) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularRequest = new fDICircular_1.GetFDICircularRequest();
        getFDICircularRequest.FDICircularId = fDICircularId;
        getFDICircularRequest.IsActive = null;
        this._fDICircularService.getFDICircular(getFDICircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDICircular = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    FDICircularIndexAmendmentAdminComponent.prototype.GetPressNote = function (fDICircularIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteRequest = new pressNote_1.GetPressNoteRequest();
        this._pressNoteService.getPressNote(getPressNoteRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.pressNotes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.pressNotes.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.pressNotes.push({ Value: item.PressNoteId, Text: item.PressNoteNo });
                });
                //this.frmFDICircularIndexAmendment.get("PressNoteId").setValue((fDICircularIndexAmendmentData != null) ? fDICircularIndexAmendmentData.PressNoteId : "");
                //this.frmFDICircularIndexAmendment.updateValueAndValidity();
                _this.pressNoteDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedPressNotes_1 = [];
                if (fDICircularIndexAmendmentData != null) {
                    fDICircularIndexAmendmentData.PressNoteIds.split(',').forEach(function (item) {
                        if (item)
                            selectedPressNotes_1.push({ Value: parseInt(item), Text: _this.pressNotes.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedPressNotes = selectedPressNotes_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularIndexAmendmentAdminComponent.prototype.GetFDIChapter = function (fDICircularIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getFDIChapterRequest = new fDIChapter_1.GetFDIChapterRequest();
        getFDIChapterRequest.FDICircularId = this.fDICircularId;
        this._fDIChapterService.getFDIChapter(getFDIChapterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDIChapters = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDIChapters.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.fDIChapters.push({ Value: item.FDIChapterId, Text: item.Chapter });
                });
                _this.frmFDICircularIndexAmendment.get("FDIChapterId").setValue((fDICircularIndexAmendmentData != null) ? fDICircularIndexAmendmentData.FDIChapterId : "");
                _this.frmFDICircularIndexAmendment.updateValueAndValidity();
                if (fDICircularIndexAmendmentData != null)
                    _this.GetFDICircularIndex(fDICircularIndexAmendmentData.FDIChapterId, fDICircularIndexAmendmentData);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularIndexAmendmentAdminComponent.prototype.OnChapterChange = function (fDIChapterId) {
        this.fDICircularIndexes = [];
        if (fDIChapterId) {
            this.GetFDICircularIndex(fDIChapterId, null);
        }
        else {
            this.frmFDICircularIndexAmendment.get("FDIChapterId").setValue('');
            this.frmFDICircularIndexAmendment.updateValueAndValidity();
        }
    };
    FDICircularIndexAmendmentAdminComponent.prototype.GetFDICircularIndex = function (fDIChapterId, fDICircularIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularIndexRequest = new fDICircularIndex_1.GetFDICircularIndexRequest();
        getFDICircularIndexRequest.FDIChapterId = fDIChapterId;
        this._fDICircularIndexService.getFDICircularIndex(getFDICircularIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDICircularIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICircularIndexes.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.fDICircularIndexes.push({ Value: item.FDICircularIndexId, Text: item.IndexNo + ' - ' + item.IndexName });
                });
                _this.frmFDICircularIndexAmendment.get("FDICircularIndexId").setValue((fDICircularIndexAmendmentData != null) ? fDICircularIndexAmendmentData.FDICircularIndexId : "");
                _this.frmFDICircularIndexAmendment.updateValueAndValidity();
                if (fDICircularIndexAmendmentData != null)
                    _this.GetFDICircularSubIndex(fDICircularIndexAmendmentData.FDICircularIndexId, fDICircularIndexAmendmentData);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularIndexAmendmentAdminComponent.prototype.OnIndexChange = function (fDICircularIndexId) {
        this.fDICircularSubIndexes = [];
        if (fDICircularIndexId) {
            this.GetFDICircularSubIndex(fDICircularIndexId, null);
        }
        else {
            this.frmFDICircularIndexAmendment.get("FDICircularIndexId").setValue('');
            this.frmFDICircularIndexAmendment.updateValueAndValidity();
        }
    };
    FDICircularIndexAmendmentAdminComponent.prototype.GetFDICircularSubIndex = function (fDICircularIndexId, fDICircularIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularSubIndexRequest = new fDICircularSubIndex_1.GetFDICircularSubIndexRequest();
        getFDICircularSubIndexRequest.FDICircularIndexId = fDICircularIndexId;
        this._fDICircularSubIndexService.getFDICircularSubIndex(getFDICircularSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDICircularSubIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICircularSubIndexes.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.fDICircularSubIndexes.push({ Value: item.FDICircularSubIndexId, Text: item.SubIndexNo + ' - ' + item.SubIndexName });
                });
                _this.frmFDICircularIndexAmendment.get("FDICircularSubIndexId").setValue((fDICircularIndexAmendmentData != null) ? (fDICircularIndexAmendmentData.FDICircularSubIndexId) ? fDICircularIndexAmendmentData.FDICircularSubIndexId : "" : "");
                _this.frmFDICircularIndexAmendment.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularIndexAmendmentAdminComponent.prototype.EditFDICircularIndexAmendment = function (fDICircularIndexAmendmentId) {
        var _this = this;
        this.spinnerService.show();
        var t_this = this;
        var getFDICircularIndexAmendmentRequest = new fDICircularIndexAmendment_1.GetFDICircularIndexAmendmentRequest();
        getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId = fDICircularIndexAmendmentId;
        getFDICircularIndexAmendmentRequest.FDICircularId = this.fDICircularId;
        getFDICircularIndexAmendmentRequest.IsActive = null;
        this._fDICircularIndexAmendmentService.getFDICircularIndexAmendment(getFDICircularIndexAmendmentRequest)
            .subscribe(function (data) {
            var getAmendmentContentRequest = new indexAmendment_1.GetAmendmentContentRequest();
            getAmendmentContentRequest.IndexAmendmentId = fDICircularIndexAmendmentId;
            getAmendmentContentRequest.AmendmentContentModuleId = global_1.Global.AMENDMENT_CONTENT_MODULE_FDI_CIRCULAR;
            getAmendmentContentRequest.IsActive = null;
            t_this._indexAmendmentService.getAmendmentContent(getAmendmentContentRequest)
                .subscribe(function (content) {
                _this.spinnerService.hide();
                _this.GetFDICircularYear(data.Response[0]);
                _this.GetPressNote(data.Response[0]);
                _this.GetFDIChapter(data.Response[0]);
                _this.frmFDICircularIndexAmendment.setValue({
                    FDICircularIndexAmendmentId: fDICircularIndexAmendmentId,
                    FDICircularId: data.Response[0].FDICircularId,
                    PressNoteIds: [],
                    FDIChapterId: data.Response[0].FDIChapterId,
                    FDICircularIndexId: data.Response[0].FDICircularIndexId,
                    FDICircularSubIndexId: data.Response[0].FDICircularSubIndexId,
                    Year: data.Response[0].Year,
                    IndexAmendmentContent: (content.Response.length > 0) ? [{ Id: content.Response[0].AmendmentContentId, Content: content.Response[0].AmendmentContents, Status: "Update" }] : [{ Id: 0, Content: '', Status: "Add" }]
                });
                if (content.Response.length > 0)
                    content.Response.shift();
                content.Response.forEach(function (item) {
                    t_this.AddCKEditor(item.AmendmentContentId, item.AmendmentContents, "Update");
                });
                _this.frmFDICircularIndexAmendment.updateValueAndValidity();
            }, function (error) { return t_this.msg = error; });
        }, function (error) { return _this.msg = error; });
    };
    FDICircularIndexAmendmentAdminComponent.prototype.SaveFDICircularIndexAmendment = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FDICircularSubIndexId == 'null') {
            formData.value.FDICircularSubIndexId = null;
        }
        if (formData.value.FDICircularIndexAmendmentId) {
            this._fDICircularIndexAmendmentService.updateFDICircularIndexAmendment(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/fdicirculars'], {
                            queryParams: {
                                indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fDICircularIndexAmendmentService.addFDICircularIndexAmendment(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/fdicirculars'], {
                            queryParams: {
                                indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FDICircularIndexAmendmentAdminComponent.prototype.OnSubmitFDICircularIndexAmendment = function (formData) {
        this.isSubmited = true;
        //console.log(this.frmFDICircularIndexAmendment);
        formData.value.PressNoteIds = this._global.convertArrayToCommaSeperatedString(formData.value.PressNoteIds);
        console.log(formData.value.PressNoteIds);
        this.SaveFDICircularIndexAmendment(formData);
        //if (this.frmFDICircularIndexAmendment.valid) {
        //    formData.value.PressNoteIds = this._global.convertArrayToCommaSeperatedString(formData.value.PressNoteIds);
        //    this.SaveFDICircularIndexAmendment(formData);
        //}
    };
    FDICircularIndexAmendmentAdminComponent.prototype.CancelFDICircularIndexAmendment = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/fdicirculars'], {
                queryParams: {
                    indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    FDICircularIndexAmendmentAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fDICircularIndexAmendment.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            fDICircularIndexAmendment_service_1.FDICircularIndexAmendmentAdminService,
            pressNote_service_1.PressNoteAdminService,
            fDICircularIndex_service_1.FDICircularIndexAdminService,
            fDICircularSubIndex_service_1.FDICircularSubIndexAdminService,
            fDICircular_service_1.FDICircularAdminService,
            fDIChapter_service_1.FDIChapterAdminService,
            indexAmendment_service_1.IndexAmendmentAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], FDICircularIndexAmendmentAdminComponent);
    return FDICircularIndexAmendmentAdminComponent;
}());
exports.FDICircularIndexAmendmentAdminComponent = FDICircularIndexAmendmentAdminComponent;
//# sourceMappingURL=fDICircularIndexAmendment.component.js.map