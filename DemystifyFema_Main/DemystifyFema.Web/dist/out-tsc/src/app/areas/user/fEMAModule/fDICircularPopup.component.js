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
var platform_browser_1 = require("@angular/platform-browser");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var pressNoteOfFEMASubModuleDetail_1 = require("../../../model/pressNoteOfFEMASubModuleDetail");
var pressNoteOfFEMASubModuleDetail_service_1 = require("../../../service/user/pressNoteOfFEMASubModuleDetail.service");
var fDICircular_1 = require("../../../model/fDICircular");
var fDIChapter_1 = require("../../../model/fDIChapter");
var fDICircularIndex_1 = require("../../../model/fDICircularIndex");
var fDICircularSubIndex_1 = require("../../../model/fDICircularSubIndex");
var fDICircularIndexAmendment_1 = require("../../../model/fDICircularIndexAmendment");
var fAQ_1 = require("../../../model/fAQ");
var fAQ_service_1 = require("../../../service/user/fAQ.service");
var rBIFAQOfFEMASubModuleDetail_service_1 = require("../../../service/user/rBIFAQOfFEMASubModuleDetail.service");
var fDICircularOfFEMASubModuleDetail_service_1 = require("../../../service/user/fDICircularOfFEMASubModuleDetail.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var FDICircularPopupUserComponent = /** @class */ (function () {
    function FDICircularPopupUserComponent(formBuilder, toastr, vcr, spinnerService, modalService, _pressNoteOfFEMASubModuleDetailService, _fDICircularOfFEMASubModuleDetailService, _fAQUserService, _rBIFAQOfFEMASubModuleDetailUserService, sanitizer) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.modalService = modalService;
        this._pressNoteOfFEMASubModuleDetailService = _pressNoteOfFEMASubModuleDetailService;
        this._fDICircularOfFEMASubModuleDetailService = _fDICircularOfFEMASubModuleDetailService;
        this._fAQUserService = _fAQUserService;
        this._rBIFAQOfFEMASubModuleDetailUserService = _rBIFAQOfFEMASubModuleDetailUserService;
        this.sanitizer = sanitizer;
        this.fDICircularRBIFAQs = [];
        this.fDICircularDIPPFAQs = [];
        this.fDICircularChapters = [];
        this.fDICircularIndexes = [];
        this.fDICircularSubIndexes = [];
        this.tempFDICircularIndexes = [];
        this.tempFDICircularSubIndexes = [];
        this.fDICircularIndexSubIndexAndAmendments = [];
        this.fDICircularIndexSubIndexContents = [];
        this.fDICircularIndexAmendmentContents = [];
        this.dIPPFAQ = [];
        this.gridviewIndexAmendmentTab = "gridview";
        this.isPreviousButton = false;
        this.isNextButton = false;
        this.nullValue = null;
        this.itemDetailFDICircularChapters = { index: -1 };
        this.indexFDICircularChapter = -1;
        this.itemDetailFDICircularIndexes = { index: -1 };
        this.indexFDICircularIndex = -1;
        this.fDICircularPDFServerPath = global_1.Global.FDICIRCULAR_PDF_FILEPATH;
        this.fAQPDFServerPath = global_1.Global.FAQ_PDF_FILEPATH;
        this.pressNotePDFServerPath = global_1.Global.PRESSNOTE_PDF_FILEPATH;
        this._global = new global_1.Global();
        this.moduleTab = "foreigndirectinvestmentpolicycirculars";
        this.pressNoteYears = [];
        this.pressNoteServerPath = global_1.Global.PRESSNOTE_PDF_FILEPATH;
        this.currentPage = 1;
        this.pageSize = global_1.Global.USER_PAGE_SIZE;
        this.sortingPressNoteField = "PressNoteDate";
        this.sortingPressNoteDirection = "D";
    }
    FDICircularPopupUserComponent.prototype.dialogInit = function (reference, options) {
        this.frmPressNote = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetFDICircularFEMASubModuleDetail();
    };
    FDICircularPopupUserComponent.prototype.OnModuleTabClick = function (moduleTab) {
        this.moduleTab = moduleTab;
        if (moduleTab == 'foreigndirectinvestmentpolicycirculars') {
            this.GetFDICircularFEMASubModuleDetail();
        }
        else if (moduleTab == 'pressnotes') {
            this.GetPressNoteYear();
        }
        else if (moduleTab == "dippfaq") {
            this.GetFAQ();
        }
    };
    FDICircularPopupUserComponent.prototype.GetFDICircularFEMASubModuleDetail = function () {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularRequest = new fDICircular_1.GetFDICircularRequest();
        this._fDICircularOfFEMASubModuleDetailService.getFDICircular(getFDICircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICirculars = data.Response;
                if (_this.fDICirculars.length > 0) {
                    _this.fDICirculars.sort(function (a, b) { return b.Year.localeCompare(a.Year); });
                    var fdiCircularId = _this.fDICirculars.sort()[0].FDICircularId;
                    _this.GetFDICircularIndexAmendment(fdiCircularId);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularPopupUserComponent.prototype.GetFDICircularIndexAmendment = function (fDICircularId) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularIndexAmendmentRequest = new fDICircularIndexAmendment_1.GetFDICircularIndexAmendmentRequest();
        getFDICircularIndexAmendmentRequest.FDICircularId = fDICircularId;
        this._fDICircularOfFEMASubModuleDetailService.getFDICircularIndexAmendment(getFDICircularIndexAmendmentRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.indexAmendments = data.Response;
                _this.fDICircularPDFName = _this.fDICirculars.filter(function (x) { return x.FDICircularId == fDICircularId; })[0].PDF;
                _this.GetFDICircularFAQ(fDICircularId);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularPopupUserComponent.prototype.GetFDICircularFAQ = function (fDICircularId) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularFAQRequest = new fAQ_1.GetFAQRequest();
        this._fDICircularOfFEMASubModuleDetailService.getFDICircularFAQ(getFDICircularFAQRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.fDICircularRBIFAQs = data.Response.filter(function (x) { return x.TopicName == "Foreign Investments in India"; });
            _this.fDICircularDIPPFAQs = data.Response.filter(function (x) { return x.TopicName == "DIPP Old FAQ" || x.TopicName == "DIPP New FAQ"; });
            _this.GetFDICircularChapter(fDICircularId);
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularPopupUserComponent.prototype.GetFDICircularChapter = function (fDICircularId) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularChapterRequest = new fDIChapter_1.GetFDIChapterRequest();
        getFDICircularChapterRequest.FDICircularId = fDICircularId;
        this._fDICircularOfFEMASubModuleDetailService.getFDICircularChapter(getFDICircularChapterRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.fDICircularChapters = data.Response;
            _this.GetFDICircularIndex(fDICircularId);
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularPopupUserComponent.prototype.GetFDICircularIndex = function (fDICircularId) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularIndexRequest = new fDICircularIndex_1.GetFDICircularIndexRequest();
        getFDICircularIndexRequest.FDICircularId = fDICircularId;
        this._fDICircularOfFEMASubModuleDetailService.getFDICircularIndex(getFDICircularIndexRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.tempFDICircularIndexes = [];
            var t_this = _this;
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (index) {
                    //let amendments = t_this.indexAmendments.filter(x => x.FDICircularIndexId == index.FDICircularIndexId && x.FDICircularSubIndexId == null).sort((a, b) => b.PressNoteDate.localeCompare(a.PressNoteDate));
                    var amendments = t_this.indexAmendments.filter(function (x) { return x.FDICircularIndexId == index.FDICircularIndexId && x.FDICircularSubIndexId == null; });
                    t_this.tempFDICircularIndexes.push({ FDICircularIndexId: index.FDICircularIndexId, IndexNo: index.IndexNo, IndexName: index.IndexName, IndexContent: index.IndexContent, FDIChapterId: index.FDIChapterId, IndexAmendments: amendments });
                });
                _this.GetFDICircularSubIndex(fDICircularId);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularPopupUserComponent.prototype.GetFDICircularSubIndex = function (fDICircularId) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularSubIndexRequest = new fDICircularSubIndex_1.GetFDICircularSubIndexRequest();
        getFDICircularSubIndexRequest.FDICircularId = fDICircularId;
        this._fDICircularOfFEMASubModuleDetailService.getFDICircularSubIndex(getFDICircularSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.tempFDICircularSubIndexes = [];
            var t_this = _this;
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (subIndex) {
                    //let amendments = t_this.indexAmendments.filter(x => x.FDICircularSubIndexId == subIndex.FDICircularSubIndexId).sort((a, b) => b.PressNoteDate.localeCompare(a.PressNoteDate));
                    var amendments = t_this.indexAmendments.filter(function (x) { return x.FDICircularSubIndexId == subIndex.FDICircularSubIndexId; });
                    t_this.tempFDICircularSubIndexes.push({ FDICircularIndexId: subIndex.FDICircularIndexId, FDICircularSubIndexId: subIndex.FDICircularSubIndexId, SubIndexNo: subIndex.SubIndexNo, SubIndexName: subIndex.SubIndexName, SubIndexContent: subIndex.SubIndexContent, SubIndexAmendments: amendments });
                });
                _this.GetFDICircularIndexSubIndexContent();
                _this.GetFDICircularIndexAmendmentContent();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularPopupUserComponent.prototype.GetFDICircularIndexSubIndexContent = function () {
        this.fDICircularIndexSubIndexContents = [];
        var t_this = this;
        var counter = 0;
        this.tempFDICircularIndexes.forEach(function (index) {
            counter++;
            t_this.fDICircularIndexSubIndexContents.push({ FDICircularIndexId: index.FDICircularIndexId, FDICircularSubIndexId: null, Content: index.IndexContent, IndexSubIndexCounter: counter });
            t_this.tempFDICircularSubIndexes.forEach(function (subIndex) {
                if (index.FDICircularIndexId == subIndex.FDICircularIndexId) {
                    counter++;
                    t_this.fDICircularIndexSubIndexContents.push({ FDICircularIndexId: index.FDICircularIndexId, FDICircularSubIndexId: subIndex.FDICircularSubIndexId, Content: subIndex.SubIndexContent, IndexSubIndexCounter: counter });
                }
            });
        });
    };
    FDICircularPopupUserComponent.prototype.GetFDICircularIndexAmendmentContent = function () {
        this.fDICircularIndexAmendmentContents = [];
        var t_this = this;
        var counter = 0;
        this.tempFDICircularIndexes.forEach(function (index) {
            t_this.indexAmendments.filter(function (x) { return x.FDICircularIndexId == index.FDICircularIndexId && x.FDICircularSubIndexId == null; }).forEach(function (item) {
                counter++;
                t_this.fDICircularIndexAmendmentContents.push({ FDICircularIndexId: item.FDICircularIndexId, FDICircularSubIndexId: item.FDICircularSubIndexId, FDICircularIndexAmendmentId: item.FDICircularIndexAmendmentId, Content: item.IndexAmendmentContent, IndexAmendmentCounter: counter });
            });
            t_this.tempFDICircularSubIndexes.forEach(function (subIndex) {
                if (index.FDICircularIndexId == subIndex.FDICircularIndexId) {
                    t_this.indexAmendments.filter(function (x) { return x.FDICircularIndexId == index.FDICircularIndexId && x.FDICircularSubIndexId == subIndex.FDICircularSubIndexId; }).forEach(function (item) {
                        counter++;
                        t_this.fDICircularIndexAmendmentContents.push({ FDICircularIndexId: item.FDICircularIndexId, FDICircularSubIndexId: item.FDICircularSubIndexId, FDICircularIndexAmendmentId: item.FDICircularIndexAmendmentId, Content: item.IndexAmendmentContent, IndexAmendmentCounter: counter });
                    });
                }
            });
        });
    };
    FDICircularPopupUserComponent.prototype.GetFAQ = function () {
        var _this = this;
        this.spinnerService.show();
        var getFAQRequest = new fAQ_1.GetFAQRequest();
        this._fAQUserService.getFAQ(getFAQRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.dIPPFAQ = data.Response.filter(function (x) { return x.CategoryName == "DIPP FAQs"; });
            if (_this.dIPPFAQ.length > 0)
                _this.OnChangeDIPPFAQ(_this.dIPPFAQ[0].FAQId);
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularPopupUserComponent.prototype.OnChangeDIPPFAQ = function (fAQId) {
        var dIPPFAQDetail = this.dIPPFAQ.filter(function (el) { return el.FAQId == fAQId; })[0];
        this.dIPPFAQPDFUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._global.getPDFPath(this.fAQPDFServerPath + dIPPFAQDetail.PDF));
        var interval = setInterval(function () {
            var minusHeight = (document.querySelector('body').clientWidth > 766) ? 170 : (document.querySelector('body').clientWidth > 480) ? 255 : 220;
            document.getElementById("iframe").style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
            clearInterval(interval);
        }, 100);
    };
    FDICircularPopupUserComponent.prototype.UpDownFDICircularChapterArrow = function (index) {
        this.itemDetailFDICircularIndexes.index = -1;
        if (index === this.itemDetailFDICircularChapters.index) {
            this.itemDetailFDICircularChapters.index = null;
        }
        else {
            this.itemDetailFDICircularChapters.index = index;
        }
    };
    FDICircularPopupUserComponent.prototype.UpDownFDICircularIndexArrow = function (index) {
        if (index === this.itemDetailFDICircularIndexes.index) {
            this.itemDetailFDICircularIndexes.index = null;
        }
        else {
            this.itemDetailFDICircularIndexes.index = index;
        }
    };
    FDICircularPopupUserComponent.prototype.ShowFDICircularIndex = function (index, fDICircularChapterId) {
        this.indexFDICircularChapter = -1;
        this.indexFDICircularIndex = -1;
        if (this.itemDetailFDICircularChapters.index !== index) {
            if (fDICircularChapterId) {
                this.indexFDICircularChapter = index;
                this.fDICircularIndexes = this.tempFDICircularIndexes.filter(function (x) { return x.FDIChapterId == fDICircularChapterId; });
                if (this.tempFDICircularIndexes.filter(function (x) { return x.FDIChapterId == fDICircularChapterId; }).length > 0)
                    this.UpDownFDICircularChapterArrow(index);
                else
                    this.itemDetailFDICircularChapters.index = null;
            }
        }
        else {
            this.UpDownFDICircularChapterArrow(index);
        }
    };
    FDICircularPopupUserComponent.prototype.ShowFDICircularSubIndex = function (index, indexId) {
        this.indexFDICircularIndex = -1;
        if (this.itemDetailFDICircularIndexes.index !== index) {
            if (indexId) {
                this.indexFDICircularIndex = index;
                this.fDICircularSubIndexes = this.tempFDICircularSubIndexes.filter(function (x) { return x.FDICircularIndexId == indexId; });
                if (this.tempFDICircularSubIndexes.filter(function (x) { return x.FDICircularIndexId == indexId; }).length > 0)
                    this.UpDownFDICircularIndexArrow(index);
                else
                    this.itemDetailFDICircularIndexes.index = null;
            }
        }
        else {
            this.UpDownFDICircularIndexArrow(index);
        }
    };
    FDICircularPopupUserComponent.prototype.ShowContent = function (indexId, subIndexId, indexAmendmentId, indexSubIndexAndIndexAmendmentPopup) {
        this.popupHeaderTitle = (indexAmendmentId && this.indexAmendments.filter(function (x) { return x.FDICircularIndexAmendmentId == indexAmendmentId; })[0].FDICircularIndexId && this.indexAmendments.filter(function (x) { return x.FDICircularIndexAmendmentId == indexAmendmentId; })[0].FDICircularSubIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE :
            (indexAmendmentId && this.indexAmendments.filter(function (x) { return x.FDICircularIndexAmendmentId == indexAmendmentId; })[0].FDICircularIndexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE :
                (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE :
                    (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
        this.indexAmendmentContent = "";
        if (this.moduleTab == "foreigndirectinvestmentpolicycirculars") {
            this.fDICircularIndexSubIndexPopup = indexSubIndexAndIndexAmendmentPopup;
            if (this.fDICircularIndexSubIndexPopup == "indexSubIndex") {
                this.indexSubIndexCounter = this.fDICircularIndexSubIndexContents.filter(function (x) { return x.FDICircularIndexId == indexId && x.FDICircularSubIndexId == subIndexId; })[0].IndexSubIndexCounter;
                this.indexAmendmentContent = this.fDICircularIndexSubIndexContents.filter(function (x) { return x.FDICircularIndexId == indexId && x.FDICircularSubIndexId == subIndexId; })[0].Content;
                this.isNextButton = (this.indexSubIndexCounter != this.fDICircularIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.indexSubIndexCounter != 1) ? true : false;
            }
            else {
                this.indexAmendmentCounter = this.fDICircularIndexAmendmentContents.filter(function (x) { return x.FDICircularIndexAmendmentId == indexAmendmentId; })[0].IndexAmendmentCounter;
                this.indexAmendmentContent = this.fDICircularIndexAmendmentContents.filter(function (x) { return x.FDICircularIndexAmendmentId == indexAmendmentId; })[0].Content;
                this.isNextButton = (this.indexAmendmentCounter != this.fDICircularIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.indexAmendmentCounter != 1) ? true : false;
            }
        }
    };
    FDICircularPopupUserComponent.prototype.PreviousContent = function () {
        var _this = this;
        this.indexAmendmentContent = "";
        if (this.moduleTab == "foreigndirectinvestmentpolicycirculars") {
            if (this.fDICircularIndexSubIndexPopup == "indexSubIndex") {
                this.indexSubIndexCounter--;
                var indexId = this.fDICircularIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].FDICircularIndexId;
                var subIndexId = this.fDICircularIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].FDICircularSubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
                this.indexAmendmentContent = this.fDICircularIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].Content;
                this.isNextButton = (this.indexSubIndexCounter != this.fDICircularIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.indexSubIndexCounter != 1) ? true : false;
                ;
            }
            else {
                this.indexAmendmentCounter--;
                var indexId = this.fDICircularIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].FDICircularIndexId;
                var subIndexId = this.fDICircularIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].FDICircularSubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE : '';
                this.indexAmendmentContent = this.fDICircularIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].Content;
                this.isNextButton = (this.indexAmendmentCounter != this.fDICircularIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.indexAmendmentCounter != 1) ? true : false;
            }
        }
    };
    FDICircularPopupUserComponent.prototype.NextContent = function () {
        var _this = this;
        this.indexAmendmentContent = "";
        if (this.moduleTab == "foreigndirectinvestmentpolicycirculars") {
            if (this.fDICircularIndexSubIndexPopup == "indexSubIndex") {
                this.indexSubIndexCounter++;
                var indexId = this.fDICircularIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].FDICircularIndexId;
                var subIndexId = this.fDICircularIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].FDICircularSubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
                this.indexAmendmentContent = this.fDICircularIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].Content;
                this.isNextButton = (this.indexSubIndexCounter != this.fDICircularIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.indexSubIndexCounter != 1) ? true : false;
            }
            else {
                this.indexAmendmentCounter++;
                var indexId = this.fDICircularIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].FDICircularIndexId;
                var subIndexId = this.fDICircularIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].FDICircularSubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE : '';
                this.indexAmendmentContent = this.fDICircularIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].Content;
                this.isNextButton = (this.indexAmendmentCounter != this.fDICircularIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.indexAmendmentCounter != 1) ? true : false;
            }
        }
    };
    FDICircularPopupUserComponent.prototype.OnFDICircularChange = function (fDICircularId) {
        this.indexFDICircularChapter = -1;
        this.indexFDICircularIndex = -1;
        this.itemDetailFDICircularChapters.index = this.indexFDICircularChapter;
        this.itemDetailFDICircularIndexes.index = this.indexFDICircularIndex;
        this.GetFDICircularIndexAmendment(fDICircularId);
    };
    FDICircularPopupUserComponent.prototype.GetPressNoteOfFEMASubModuleDetail = function (year, searchText, pageNumber) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteOfFEMASubModuleDetailRequest = new pressNoteOfFEMASubModuleDetail_1.GetPressNoteOfFEMASubModuleDetailRequest();
        getPressNoteOfFEMASubModuleDetailRequest.Year = year;
        getPressNoteOfFEMASubModuleDetailRequest.SearchText = searchText;
        getPressNoteOfFEMASubModuleDetailRequest.IsActive = null;
        getPressNoteOfFEMASubModuleDetailRequest.OrderBy = this.sortingPressNoteField;
        getPressNoteOfFEMASubModuleDetailRequest.OrderByDirection = this.sortingPressNoteDirection;
        getPressNoteOfFEMASubModuleDetailRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getPressNoteOfFEMASubModuleDetailRequest.PageSize = this.pageSize;
        this._pressNoteOfFEMASubModuleDetailService.getPressNoteOfFEMASubModuleDetail(getPressNoteOfFEMASubModuleDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.pressNoteYear = year;
                _this.pressNoteOfFEMASubModuleDetails = data.Response;
                _this.pageSize = getPressNoteOfFEMASubModuleDetailRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularPopupUserComponent.prototype.GetPressNoteYear = function () {
        var _this = this;
        this.spinnerService.show();
        this._pressNoteOfFEMASubModuleDetailService.getPressNoteYears()
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.pressNoteYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.pressNoteYears.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.pressNoteYears.push({ Value: item, Text: item });
                });
                _this.GetPressNoteOfFEMASubModuleDetail("", _this.searchText, _this.currentPage);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularPopupUserComponent.prototype.OnPressNoteYearChange = function (year) {
        this.currentPage = 1;
        this.pressNoteYear = year;
        this.GetPressNoteOfFEMASubModuleDetail(year, this.searchText, this.currentPage);
    };
    FDICircularPopupUserComponent.prototype.SearchPressNote = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetPressNoteOfFEMASubModuleDetail(this.pressNoteYear, this.searchText, this.currentPage);
    };
    FDICircularPopupUserComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetPressNoteOfFEMASubModuleDetail(this.pressNoteYear, this.searchText, pageNumber);
    };
    FDICircularPopupUserComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.GetPressNoteOfFEMASubModuleDetail(this.pressNoteYear, this.searchText, null);
    };
    FDICircularPopupUserComponent.prototype.OnPressNoteSort = function (fieldName) {
        this.sortingPressNoteDirection = (this.sortingPressNoteField == fieldName) ? (this.sortingPressNoteDirection == "A") ? "D" : "A" : "A";
        this.sortingPressNoteField = fieldName;
        this.GetPressNoteOfFEMASubModuleDetail(this.pressNoteYear, this.searchText, this.currentPage);
    };
    FDICircularPopupUserComponent.prototype.OnGridViewIndexAmendmentTabClick = function (gridviewIndexAmendmentTab) {
        this.gridviewIndexAmendmentTab = gridviewIndexAmendmentTab;
    };
    FDICircularPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fDICircularPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            ngx_modal_dialog_1.ModalDialogService,
            pressNoteOfFEMASubModuleDetail_service_1.PressNoteOfFEMASubModuleDetailUserService,
            fDICircularOfFEMASubModuleDetail_service_1.FDICircularOfFEMASubModuleDetailUserService,
            fAQ_service_1.FAQUserService,
            rBIFAQOfFEMASubModuleDetail_service_1.RBIFAQOfFEMASubModuleDetailUserService,
            platform_browser_1.DomSanitizer])
    ], FDICircularPopupUserComponent);
    return FDICircularPopupUserComponent;
}());
exports.FDICircularPopupUserComponent = FDICircularPopupUserComponent;
//# sourceMappingURL=fDICircularPopup.component.js.map