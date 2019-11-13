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
var masterCircularOfFEMASubModuleDetail_1 = require("../../../model/masterCircularOfFEMASubModuleDetail");
var masterCircularDetail_1 = require("../../../model/masterCircularDetail");
var aPDIRCircularOfFEMASubModuleDetail_1 = require("../../../model/aPDIRCircularOfFEMASubModuleDetail");
var masterCircularOfFEMASubModuleDetail_service_1 = require("../../../service/user/masterCircularOfFEMASubModuleDetail.service");
var aPDIRCircularOfFEMASubModuleDetail_service_1 = require("../../../service/user/aPDIRCircularOfFEMASubModuleDetail.service");
var masterDirectionOfFEMASubModuleDetail_1 = require("../../../model/masterDirectionOfFEMASubModuleDetail");
var masterDirectionFAQ_1 = require("../../../model/masterDirectionFAQ");
var masterDirectionChapter_1 = require("../../../model/masterDirectionChapter");
var masterDirectionIndex_1 = require("../../../model/masterDirectionIndex");
var masterDirectionSubIndex_1 = require("../../../model/masterDirectionSubIndex");
var masterDirectionIndexAmendment_1 = require("../../../model/masterDirectionIndexAmendment");
var masterDirectionOfFEMASubModuleDetail_service_1 = require("../../../service/user/masterDirectionOfFEMASubModuleDetail.service");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var rBIFAQOfFEMASubModuleDetail_1 = require("../../../model/rBIFAQOfFEMASubModuleDetail");
var fAQ_service_1 = require("../../../service/user/fAQ.service");
var rBIFAQOfFEMASubModuleDetail_service_1 = require("../../../service/user/rBIFAQOfFEMASubModuleDetail.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var MasterDirectionPopupUserComponent = /** @class */ (function () {
    function MasterDirectionPopupUserComponent(formBuilder, toastr, vcr, spinnerService, modalService, _masterCircularOfFEMASubModuleDetailUserService, _aPDIRCircularOfFEMASubModuleDetailService, _masterDirectionOfFEMASubModuleDetailService, _fAQUserService, _rBIFAQOfFEMASubModuleDetailUserService, sanitizer) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.modalService = modalService;
        this._masterCircularOfFEMASubModuleDetailUserService = _masterCircularOfFEMASubModuleDetailUserService;
        this._aPDIRCircularOfFEMASubModuleDetailService = _aPDIRCircularOfFEMASubModuleDetailService;
        this._masterDirectionOfFEMASubModuleDetailService = _masterDirectionOfFEMASubModuleDetailService;
        this._fAQUserService = _fAQUserService;
        this._rBIFAQOfFEMASubModuleDetailUserService = _rBIFAQOfFEMASubModuleDetailUserService;
        this.sanitizer = sanitizer;
        this.masterCircularDetailYears = [];
        this.masterCircularDetails = [];
        this.aPDIRCircularYears = [];
        this.rBIFAQ = [];
        this.currentPage = 1;
        this.pageSize = global_1.Global.USER_PAGE_SIZE;
        this.sortingAPDIRCircularField = "APDIRCircularDate";
        this.sortingAPDIRCircularDirection = "D";
        this.masterCircularDetailPDFServerPath = global_1.Global.MASTERCIRCULAR_PDF_FILEPATH;
        this.aPDIRCircularServerPath = global_1.Global.APDIRCIRCULAR_PDF_FILEPATH;
        this.notificationServerPath = global_1.Global.NOTIFICATION_PDF_FILEPATH;
        this.masterDirectionFAQs = [];
        this.masterDirectionChapters = [];
        this.masterDirectionIndexes = [];
        this.masterDirectionSubIndexes = [];
        this.tempMasterDirectionIndexes = [];
        this.tempMasterDirectionSubIndexes = [];
        this.masterDirectionIndexSubIndexAndAmendments = [];
        this.masterDirectionIndexSubIndexContents = [];
        this.masterDirectionIndexAmendmentContents = [];
        this.isPreviousButton = false;
        this.isNextButton = false;
        this.nullValue = null;
        this.itemDetailMasterDirectionChapters = { index: -1 };
        this.indexMasterDirectionChapter = -1;
        this.itemDetailMasterDirectionIndexes = { index: -1 };
        this.indexMasterDirectionIndex = -1;
        this.masterDirectionPDFServerPath = global_1.Global.MASTERDIRECTION_PDF_FILEPATH;
        this.fAQPDFServerPath = global_1.Global.FAQ_PDF_FILEPATH;
        this._global = new global_1.Global();
        this.moduleTab = "masterdirection";
    }
    MasterDirectionPopupUserComponent.prototype.dialogInit = function (reference, options) {
        this.fEMASubModuleOfModuleId = options.data;
        this.frmAPDIRCircular = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetMasterDirectionFEMASubModuleDetail();
    };
    MasterDirectionPopupUserComponent.prototype.OnModuleTabClick = function (moduleTab) {
        this.moduleTab = moduleTab;
        if (moduleTab == 'masterdirection') {
            this.GetMasterDirectionFEMASubModuleDetail();
        }
        else if (moduleTab == 'mastercircular') {
            this.GetMasterCircularOfFEMASubModuleDetail();
        }
        else if (moduleTab == 'apdircircular') {
            this.GetAPDIRCircularYear();
        }
        else if (moduleTab == "rbifaq") {
            this.GetRBIFAQ(this.fEMASubModuleOfModuleId);
        }
    };
    MasterDirectionPopupUserComponent.prototype.GetMasterDirectionFEMASubModuleDetail = function () {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionOfFEMASubModuleDetailRequest = new masterDirectionOfFEMASubModuleDetail_1.GetMasterDirectionOfFEMASubModuleDetailRequest();
        getMasterDirectionOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId = this.fEMASubModuleOfModuleId;
        this._masterDirectionOfFEMASubModuleDetailService.getMasterDirectionOfFEMASubModuleDetail(getMasterDirectionOfFEMASubModuleDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionOfFEMASubModuleDetails = data.Response;
                if (_this.masterDirectionOfFEMASubModuleDetails.length > 0) {
                    _this.GetMasterDirectionIndexAmendment(data.Response[0].MasterDirectionId);
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
    MasterDirectionPopupUserComponent.prototype.GetMasterDirectionIndexAmendment = function (masterDirectionId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionIndexAmendmentRequest = new masterDirectionIndexAmendment_1.GetMasterDirectionIndexAmendmentRequest();
        getMasterDirectionIndexAmendmentRequest.MasterDirectionId = masterDirectionId;
        this._masterDirectionOfFEMASubModuleDetailService.getMasterDirectionIndexAmendment(getMasterDirectionIndexAmendmentRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.indexAmendments = data.Response;
                _this.masterDirectionPDFName = _this.masterDirectionOfFEMASubModuleDetails.filter(function (x) { return x.MasterDirectionId == masterDirectionId; })[0].PDF;
                _this.GetMasterDirectionFAQ(masterDirectionId);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionPopupUserComponent.prototype.GetMasterDirectionFAQ = function (masterDirectionId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionFAQRequest = new masterDirectionFAQ_1.GetMasterDirectionFAQRequest();
        getMasterDirectionFAQRequest.MasterDirectionId = masterDirectionId;
        this._masterDirectionOfFEMASubModuleDetailService.getMasterDirectionFAQ(getMasterDirectionFAQRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.masterDirectionFAQs = data.Response;
            _this.GetMasterDirectionChapter(masterDirectionId);
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionPopupUserComponent.prototype.GetMasterDirectionChapter = function (masterDirectionId) {
        var _this = this;
        this.isAllChapter = false;
        this.spinnerService.show();
        var getMasterDirectionChapterRequest = new masterDirectionChapter_1.GetMasterDirectionChapterRequest();
        getMasterDirectionChapterRequest.MasterDirectionId = masterDirectionId;
        this._masterDirectionOfFEMASubModuleDetailService.getMasterDirectionChapter(getMasterDirectionChapterRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.masterDirectionChapters = data.Response;
            if (_this.masterDirectionChapters[0].Chapter.toLowerCase() == global_1.Global.MASTER_DIRECTION_ALL_CHAPTER)
                _this.isAllChapter = true;
            _this.GetMasterDirectionIndex(masterDirectionId);
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionPopupUserComponent.prototype.GetMasterDirectionIndex = function (masterDirectionId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionIndexRequest = new masterDirectionIndex_1.GetMasterDirectionIndexRequest();
        getMasterDirectionIndexRequest.MasterDirectionId = masterDirectionId;
        this._masterDirectionOfFEMASubModuleDetailService.getMasterDirectionIndex(getMasterDirectionIndexRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.tempMasterDirectionIndexes = [];
            var t_this = _this;
            if (data.Status == global_1.Global.API_SUCCESS) {
                var allChapter = t_this.masterDirectionChapters.filter(function (x) { return x.Chapter.toLowerCase() == global_1.Global.MASTER_DIRECTION_ALL_CHAPTER; })[0];
                data.Response.forEach(function (index) {
                    //let amendments = t_this.indexAmendments.filter(x => x.MasterDirectionIndexId == index.MasterDirectionIndexId && x.MasterDirectionSubIndexId == null).sort((a, b) => (b.APDIRCircularDate) ? b.APDIRCircularDate.localeCompare(a.APDIRCircularDate) : null).sort((a, b) => (b.NotificationDate) ? b.NotificationDate.localeCompare(a.NotificationDate) : null);
                    var amendments = t_this.indexAmendments.filter(function (x) { return x.MasterDirectionIndexId == index.MasterDirectionIndexId && x.MasterDirectionSubIndexId == null; });
                    t_this.tempMasterDirectionIndexes.push({ MasterDirectionIndexId: index.MasterDirectionIndexId, IndexNo: index.IndexNo, IndexName: index.IndexName, IndexContent: index.IndexContent, MasterDirectionChapterId: index.MasterDirectionChapterId, APDIRCircularNo: index.APDIRCircularNo, APDIRCircularDate: index.APDIRCircularDate, APDIRCircularPDF: index.APDIRCircularPDF, NotificationNumber: index.NotificationNumber, NotificationDate: index.NotificationDate, NotificationPDF: index.NotificationPDF, IndexAmendments: amendments });
                });
                if (allChapter) {
                    t_this.ShowMasterDirectionIndex(0, allChapter.MasterDirectionChapterId);
                }
                _this.GetMasterDirectionSubIndex(masterDirectionId);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionPopupUserComponent.prototype.GetMasterDirectionSubIndex = function (masterDirectionId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionSubIndexRequest = new masterDirectionSubIndex_1.GetMasterDirectionSubIndexRequest();
        getMasterDirectionSubIndexRequest.MasterDirectionId = masterDirectionId;
        this._masterDirectionOfFEMASubModuleDetailService.getMasterDirectionSubIndex(getMasterDirectionSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.tempMasterDirectionSubIndexes = [];
            var t_this = _this;
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (subIndex) {
                    //let amendments = t_this.indexAmendments.filter(x => x.MasterDirectionSubIndexId == subIndex.MasterDirectionSubIndexId).sort((a, b) => (b.APDIRCircularDate) ? b.APDIRCircularDate.localeCompare(a.APDIRCircularDate) : null).sort((a, b) => (b.NotificationDate) ? b.NotificationDate.localeCompare(a.NotificationDate) : null);
                    var amendments = t_this.indexAmendments.filter(function (x) { return x.MasterDirectionSubIndexId == subIndex.MasterDirectionSubIndexId; });
                    t_this.tempMasterDirectionSubIndexes.push({ MasterDirectionIndexId: subIndex.MasterDirectionIndexId, MasterDirectionSubIndexId: subIndex.MasterDirectionSubIndexId, SubIndexNo: subIndex.SubIndexNo, SubIndexName: subIndex.SubIndexName, APDIRCircularNo: subIndex.APDIRCircularNo, APDIRCircularDate: subIndex.APDIRCircularDate, APDIRCircularPDF: subIndex.APDIRCircularPDF, NotificationNumber: subIndex.NotificationNumber, NotificationDate: subIndex.NotificationDate, NotificationPDF: subIndex.NotificationPDF, SubIndexContent: subIndex.SubIndexContent, SubIndexAmendments: amendments });
                });
                _this.GetMasterDirectionIndexSubIndexContent();
                _this.GetMasterDirectionIndexAmendmentContent();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionPopupUserComponent.prototype.GetMasterDirectionIndexSubIndexContent = function () {
        this.masterDirectionIndexSubIndexContents = [];
        var t_this = this;
        var counter = 0;
        this.tempMasterDirectionIndexes.forEach(function (index) {
            counter++;
            t_this.masterDirectionIndexSubIndexContents.push({ MasterDirectionIndexId: index.MasterDirectionIndexId, MasterDirectionSubIndexId: null, Content: index.IndexContent, IndexSubIndexCounter: counter });
            t_this.tempMasterDirectionSubIndexes.forEach(function (subIndex) {
                if (index.MasterDirectionIndexId == subIndex.MasterDirectionIndexId) {
                    counter++;
                    t_this.masterDirectionIndexSubIndexContents.push({ MasterDirectionIndexId: index.MasterDirectionIndexId, MasterDirectionSubIndexId: subIndex.MasterDirectionSubIndexId, Content: subIndex.SubIndexContent, IndexSubIndexCounter: counter });
                }
            });
        });
    };
    MasterDirectionPopupUserComponent.prototype.GetMasterDirectionIndexAmendmentContent = function () {
        this.masterDirectionIndexAmendmentContents = [];
        var t_this = this;
        var counter = 0;
        this.tempMasterDirectionIndexes.forEach(function (index) {
            t_this.indexAmendments.filter(function (x) { return x.MasterDirectionIndexId == index.MasterDirectionIndexId && x.MasterDirectionSubIndexId == null; }).forEach(function (item) {
                counter++;
                t_this.masterDirectionIndexAmendmentContents.push({ MasterDirectionIndexId: item.MasterDirectionIndexId, MasterDirectionSubIndexId: item.MasterDirectionSubIndexId, MasterDirectionIndexAmendmentId: item.MasterDirectionIndexAmendmentId, Content: item.IndexAmendmentContent, IndexAmendmentCounter: counter });
            });
            t_this.tempMasterDirectionSubIndexes.forEach(function (subIndex) {
                if (index.MasterDirectionIndexId == subIndex.MasterDirectionIndexId) {
                    t_this.indexAmendments.filter(function (x) { return x.MasterDirectionIndexId == index.MasterDirectionIndexId && x.MasterDirectionSubIndexId == subIndex.MasterDirectionSubIndexId; }).forEach(function (item) {
                        counter++;
                        t_this.masterDirectionIndexAmendmentContents.push({ MasterDirectionIndexId: item.MasterDirectionIndexId, MasterDirectionSubIndexId: item.MasterDirectionSubIndexId, MasterDirectionIndexAmendmentId: item.MasterDirectionIndexAmendmentId, Content: item.IndexAmendmentContent, IndexAmendmentCounter: counter });
                    });
                }
            });
        });
    };
    MasterDirectionPopupUserComponent.prototype.GetRBIFAQ = function (fEMAModuleId) {
        var _this = this;
        this.spinnerService.show();
        var getRBIFAQOfFEMASubModuleDetailRequest = new rBIFAQOfFEMASubModuleDetail_1.GetRBIFAQOfFEMASubModuleDetailRequest();
        getRBIFAQOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId = fEMAModuleId;
        this._rBIFAQOfFEMASubModuleDetailUserService.getRBIFAQOfFEMASubModuleDetail(getRBIFAQOfFEMASubModuleDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rBIFAQ = data.Response;
                if (_this.rBIFAQ.length > 0)
                    _this.OnChangeRBIFAQ(_this.rBIFAQ[0].FAQId);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionPopupUserComponent.prototype.OnChangeRBIFAQ = function (fAQId) {
        var rBIFAQDetail = this.rBIFAQ.filter(function (el) { return el.FAQId == fAQId; })[0];
        this.rBIFAQPDFUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._global.getPDFPath(this.fAQPDFServerPath + rBIFAQDetail.PDF));
        var interval = setInterval(function () {
            var minusHeight = (document.querySelector('body').clientWidth > 766) ? 170 : (document.querySelector('body').clientWidth > 480) ? 295 : 260;
            document.getElementById("iframe2").style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
            clearInterval(interval);
        }, 100);
    };
    MasterDirectionPopupUserComponent.prototype.UpDownMasterDirectionChapterArrow = function (index) {
        this.itemDetailMasterDirectionIndexes.index = -1;
        if (index === this.itemDetailMasterDirectionChapters.index) {
            this.itemDetailMasterDirectionChapters.index = null;
        }
        else {
            this.itemDetailMasterDirectionChapters.index = index;
        }
    };
    MasterDirectionPopupUserComponent.prototype.UpDownMasterDirectionIndexArrow = function (index) {
        if (index === this.itemDetailMasterDirectionIndexes.index) {
            this.itemDetailMasterDirectionIndexes.index = null;
        }
        else {
            this.itemDetailMasterDirectionIndexes.index = index;
        }
    };
    MasterDirectionPopupUserComponent.prototype.ShowMasterDirectionIndex = function (index, masterDirectionChapterId) {
        this.indexMasterDirectionChapter = -1;
        this.indexMasterDirectionIndex = -1;
        if (this.itemDetailMasterDirectionChapters.index !== index) {
            if (masterDirectionChapterId) {
                this.indexMasterDirectionChapter = index;
                this.masterDirectionIndexes = this.tempMasterDirectionIndexes.filter(function (x) { return x.MasterDirectionChapterId == masterDirectionChapterId; });
                if (this.tempMasterDirectionIndexes.filter(function (x) { return x.MasterDirectionChapterId == masterDirectionChapterId; }).length > 0)
                    this.UpDownMasterDirectionChapterArrow(index);
                else
                    this.itemDetailMasterDirectionChapters.index = null;
            }
        }
        else {
            this.UpDownMasterDirectionChapterArrow(index);
        }
    };
    MasterDirectionPopupUserComponent.prototype.ShowMasterDirectionSubIndex = function (index, indexId) {
        this.indexMasterDirectionIndex = -1;
        if (this.itemDetailMasterDirectionIndexes.index !== index) {
            if (indexId) {
                this.indexMasterDirectionIndex = index;
                this.masterDirectionSubIndexes = this.tempMasterDirectionSubIndexes.filter(function (x) { return x.MasterDirectionIndexId == indexId; });
                if (this.tempMasterDirectionSubIndexes.filter(function (x) { return x.MasterDirectionIndexId == indexId; }).length > 0)
                    this.UpDownMasterDirectionIndexArrow(index);
                else
                    this.itemDetailMasterDirectionIndexes.index = null;
            }
        }
        else {
            this.UpDownMasterDirectionIndexArrow(index);
        }
    };
    MasterDirectionPopupUserComponent.prototype.ShowContent = function (indexId, subIndexId, indexAmendmentId, indexSubIndexAndIndexAmendmentPopup) {
        this.popupHeaderTitle = (indexAmendmentId && this.indexAmendments.filter(function (x) { return x.MasterDirectionIndexAmendmentId == indexAmendmentId; })[0].MasterDirectionIndexId && this.indexAmendments.filter(function (x) { return x.MasterDirectionIndexAmendmentId == indexAmendmentId; })[0].MasterDirectionSubIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE :
            (indexAmendmentId && this.indexAmendments.filter(function (x) { return x.MasterDirectionIndexAmendmentId == indexAmendmentId; })[0].MasterDirectionIndexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE :
                (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE :
                    (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
        this.indexAmendmentContent = "";
        if (this.moduleTab == "masterdirection") {
            this.masterDirectionIndexSubIndexPopup = indexSubIndexAndIndexAmendmentPopup;
            if (this.masterDirectionIndexSubIndexPopup == "indexSubIndex") {
                this.indexSubIndexCounter = this.masterDirectionIndexSubIndexContents.filter(function (x) { return x.MasterDirectionIndexId == indexId && x.MasterDirectionSubIndexId == subIndexId; })[0].IndexSubIndexCounter;
                this.indexAmendmentContent = this.masterDirectionIndexSubIndexContents.filter(function (x) { return x.MasterDirectionIndexId == indexId && x.MasterDirectionSubIndexId == subIndexId; })[0].Content;
                this.isNextButton = (this.indexSubIndexCounter != this.masterDirectionIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.indexSubIndexCounter != 1) ? true : false;
            }
            else {
                this.indexAmendmentCounter = this.masterDirectionIndexAmendmentContents.filter(function (x) { return x.MasterDirectionIndexAmendmentId == indexAmendmentId; })[0].IndexAmendmentCounter;
                this.indexAmendmentContent = this.masterDirectionIndexAmendmentContents.filter(function (x) { return x.MasterDirectionIndexAmendmentId == indexAmendmentId; })[0].Content;
                this.isNextButton = (this.indexAmendmentCounter != this.masterDirectionIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.indexAmendmentCounter != 1) ? true : false;
            }
        }
    };
    MasterDirectionPopupUserComponent.prototype.PreviousContent = function () {
        var _this = this;
        this.indexAmendmentContent = "";
        if (this.moduleTab == "masterdirection") {
            if (this.masterDirectionIndexSubIndexPopup == "indexSubIndex") {
                this.indexSubIndexCounter--;
                var indexId = this.masterDirectionIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].MasterDirectionIndexId;
                var subIndexId = this.masterDirectionIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].MasterDirectionSubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
                this.indexAmendmentContent = this.masterDirectionIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].Content;
                this.isNextButton = (this.indexSubIndexCounter != this.masterDirectionIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.indexSubIndexCounter != 1) ? true : false;
                ;
            }
            else {
                this.indexAmendmentCounter--;
                var indexId = this.masterDirectionIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].MasterDirectionIndexId;
                var subIndexId = this.masterDirectionIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].MasterDirectionSubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE : '';
                this.indexAmendmentContent = this.masterDirectionIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].Content;
                this.isNextButton = (this.indexAmendmentCounter != this.masterDirectionIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.indexAmendmentCounter != 1) ? true : false;
            }
        }
    };
    MasterDirectionPopupUserComponent.prototype.NextContent = function () {
        var _this = this;
        this.indexAmendmentContent = "";
        if (this.moduleTab == "masterdirection") {
            if (this.masterDirectionIndexSubIndexPopup == "indexSubIndex") {
                this.indexSubIndexCounter++;
                var indexId = this.masterDirectionIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].MasterDirectionIndexId;
                var subIndexId = this.masterDirectionIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].MasterDirectionSubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
                this.indexAmendmentContent = this.masterDirectionIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].Content;
                this.isNextButton = (this.indexSubIndexCounter != this.masterDirectionIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.indexSubIndexCounter != 1) ? true : false;
            }
            else {
                this.indexAmendmentCounter++;
                var indexId = this.masterDirectionIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].MasterDirectionIndexId;
                var subIndexId = this.masterDirectionIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].MasterDirectionSubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE : '';
                this.indexAmendmentContent = this.masterDirectionIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].Content;
                this.isNextButton = (this.indexAmendmentCounter != this.masterDirectionIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.indexAmendmentCounter != 1) ? true : false;
            }
        }
    };
    MasterDirectionPopupUserComponent.prototype.GetMasterCircularOfFEMASubModuleDetail = function () {
        var _this = this;
        this.spinnerService.show();
        var getMasterCircularOfFEMASubModuleDetailRequest = new masterCircularOfFEMASubModuleDetail_1.GetMasterCircularOfFEMASubModuleDetailRequest();
        getMasterCircularOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId = this.fEMASubModuleOfModuleId;
        this._masterCircularOfFEMASubModuleDetailUserService.getMasterCircularOfFEMASubModuleDetail(getMasterCircularOfFEMASubModuleDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterCircularOfFEMASubModuleDetail = data.Response;
                if (_this.masterCircularOfFEMASubModuleDetail.length > 0) {
                    _this.masterCircularId = _this.masterCircularOfFEMASubModuleDetail[0].MasterCircularId;
                    _this.GetMasterCircularDetailYear();
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionPopupUserComponent.prototype.GetMasterCircularDetailYear = function () {
        var _this = this;
        this.spinnerService.show();
        this._masterCircularOfFEMASubModuleDetailUserService.getMasterCircularDetailYear()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterCircularDetailYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.masterCircularDetailYears.push({ Value: item, Text: item });
                });
                if (_this.masterCircularDetailYears.length > 0) {
                    _this.masterCircularYear = "2015";
                    _this.GetMasterCircularDetail(_this.masterCircularId, _this.masterCircularYear);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionPopupUserComponent.prototype.GetMasterCircularDetail = function (masterCircularId, year) {
        var _this = this;
        this.spinnerService.show();
        var getMasterCircularDetailRequest = new masterCircularDetail_1.GetMasterCircularDetailRequest();
        getMasterCircularDetailRequest.MasterCircularId = masterCircularId;
        getMasterCircularDetailRequest.Year = year;
        this._masterCircularOfFEMASubModuleDetailUserService.getMasterCircularDetail(getMasterCircularDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterCircularDetails = data.Response;
                if (_this.masterCircularDetails.length > 0) {
                    _this.masterCircularDetailPDFUrl = _this.sanitizer.bypassSecurityTrustResourceUrl(_this._global.getPDFPath(_this.masterCircularDetailPDFServerPath + _this.masterCircularDetails[0].PDF));
                    var interval_1 = setInterval(function () {
                        var minusHeight = (document.querySelector('body').clientWidth > 766) ? 170 : (document.querySelector('body').clientWidth > 480) ? 325 : 293;
                        document.getElementById("iframe1").style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
                        clearInterval(interval_1);
                    }, 100);
                }
                else {
                    _this.masterCircularDetailPDFUrl = '';
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionPopupUserComponent.prototype.GetAPDIRCircularCircularOfFEMASubModuleDetail = function (year, searchText, pageNumber) {
        var _this = this;
        this.spinnerService.show();
        var getAPDIRCircularOfFEMASubModuleDetailRequest = new aPDIRCircularOfFEMASubModuleDetail_1.GetAPDIRCircularOfFEMASubModuleDetailRequest();
        getAPDIRCircularOfFEMASubModuleDetailRequest.Year = year;
        getAPDIRCircularOfFEMASubModuleDetailRequest.SearchText = searchText;
        getAPDIRCircularOfFEMASubModuleDetailRequest.IsActive = null;
        getAPDIRCircularOfFEMASubModuleDetailRequest.OrderBy = this.sortingAPDIRCircularField;
        getAPDIRCircularOfFEMASubModuleDetailRequest.OrderByDirection = this.sortingAPDIRCircularDirection;
        getAPDIRCircularOfFEMASubModuleDetailRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getAPDIRCircularOfFEMASubModuleDetailRequest.PageSize = this.pageSize;
        this._aPDIRCircularOfFEMASubModuleDetailService.getAPDIRCircularOfFEMASubModuleDetail(getAPDIRCircularOfFEMASubModuleDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.aPDIRCircularYear = year;
                _this.aPDIRCircularOfFEMASubModuleDetails = data.Response;
                _this.pageSize = getAPDIRCircularOfFEMASubModuleDetailRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionPopupUserComponent.prototype.GetAPDIRCircularYear = function () {
        var _this = this;
        this.spinnerService.show();
        this._aPDIRCircularOfFEMASubModuleDetailService.getAPDIRCircularYears()
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.aPDIRCircularYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.aPDIRCircularYears.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.aPDIRCircularYears.push({ Value: item.APDIRCircularYearId, Text: item.APDIRCircularYearName });
                });
                _this.GetAPDIRCircularCircularOfFEMASubModuleDetail("", _this.searchText, _this.currentPage);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionPopupUserComponent.prototype.OnAPDIRCircularYearChange = function (year) {
        this.currentPage = 1;
        this.aPDIRCircularYear = year;
        this.GetAPDIRCircularCircularOfFEMASubModuleDetail(year, this.searchText, this.currentPage);
    };
    MasterDirectionPopupUserComponent.prototype.SearchAPDIRCircular = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetAPDIRCircularCircularOfFEMASubModuleDetail(this.aPDIRCircularYear, this.searchText, this.currentPage);
    };
    MasterDirectionPopupUserComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetAPDIRCircularCircularOfFEMASubModuleDetail(this.aPDIRCircularYear, this.searchText, pageNumber);
    };
    MasterDirectionPopupUserComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.GetAPDIRCircularCircularOfFEMASubModuleDetail(this.aPDIRCircularYear, this.searchText, null);
    };
    MasterDirectionPopupUserComponent.prototype.OnMasterDirectionChange = function (masterDirectionId) {
        this.indexMasterDirectionChapter = -1;
        this.indexMasterDirectionIndex = -1;
        this.itemDetailMasterDirectionChapters.index = this.indexMasterDirectionChapter;
        this.itemDetailMasterDirectionIndexes.index = this.indexMasterDirectionIndex;
        this.GetMasterDirectionIndexAmendment(masterDirectionId);
    };
    MasterDirectionPopupUserComponent.prototype.OnAPDIRCircularSort = function (fieldName) {
        this.sortingAPDIRCircularDirection = (this.sortingAPDIRCircularField == fieldName) ? (this.sortingAPDIRCircularDirection == "A") ? "D" : "A" : "A";
        this.sortingAPDIRCircularField = fieldName;
        this.GetAPDIRCircularCircularOfFEMASubModuleDetail(this.aPDIRCircularYear, this.searchText, this.currentPage);
    };
    MasterDirectionPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './masterDirectionPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            ngx_modal_dialog_1.ModalDialogService,
            masterCircularOfFEMASubModuleDetail_service_1.MasterCircularOfFEMASubModuleDetailUserService,
            aPDIRCircularOfFEMASubModuleDetail_service_1.APDIRCircularOfFEMASubModuleDetailUserService,
            masterDirectionOfFEMASubModuleDetail_service_1.MasterDirectionOfFEMASubModuleDetailUserService,
            fAQ_service_1.FAQUserService,
            rBIFAQOfFEMASubModuleDetail_service_1.RBIFAQOfFEMASubModuleDetailUserService,
            platform_browser_1.DomSanitizer])
    ], MasterDirectionPopupUserComponent);
    return MasterDirectionPopupUserComponent;
}());
exports.MasterDirectionPopupUserComponent = MasterDirectionPopupUserComponent;
//# sourceMappingURL=masterDirectionPopup.component.js.map