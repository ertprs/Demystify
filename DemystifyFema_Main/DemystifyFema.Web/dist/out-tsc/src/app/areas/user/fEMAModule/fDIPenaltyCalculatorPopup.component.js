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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var calculatorSubTopic_1 = require("../../../model/calculatorSubTopic");
var penaltyDetail_1 = require("../../../model/penaltyDetail");
var penaltyDetail_service_1 = require("../../../service/user/penaltyDetail.service");
var calculatorSubTopic_service_1 = require("../../../service/user/calculatorSubTopic.service");
var FDIPenaltyCalculatorPopupUserComponent = /** @class */ (function () {
    function FDIPenaltyCalculatorPopupUserComponent(formBuilder, _spinnerService, _toastrService, _penaltyDetailService, _calculatorSubTopicService, sanitizer) {
        this.formBuilder = formBuilder;
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._penaltyDetailService = _penaltyDetailService;
        this._calculatorSubTopicService = _calculatorSubTopicService;
        this.sanitizer = sanitizer;
        this.moduleTab = "illustration1";
        this.illustration1Data = [];
        this.illustration1FieldArray = [];
        this.illustration1NewAttribute = { ReceiptMinDate: { year: 1970, month: 1, day: 1 }, ReportingMinDate: { year: 1970, month: 1, day: 1 } };
        this.illustration1FixedAmount = 0;
        this.isDisabledIllustration1 = false;
        this.illustration2Data = [];
        this.illustration2FieldArray = [];
        this.illustration2NewAttribute = { ReceiptMinDate: { year: 1970, month: 1, day: 1 }, ReportingMinDate: { year: 1970, month: 1, day: 1 } };
        this.illustration2FixedAmount = 0;
        this.isDisabledIllustration2 = false;
        this.illustration3Data = [];
        this.illustration3FieldArray = [];
        this.illustration3NewAttribute = { ReceiptMinDate: { year: 1970, month: 1, day: 1 }, ReportingMinDate: { year: 1970, month: 1, day: 1 } };
        this.illustration3FixedAmount = 0;
        this.isDisabledIllustration3 = false;
        this.calculatorSubTopics = [];
        this.calculatorSubTopicId = "";
    }
    FDIPenaltyCalculatorPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.OnClickModuleTab('illustration1');
        this.GetPenaltyDetail();
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.GetPenaltyDetail = function () {
        var _this = this;
        this._spinnerService.show();
        var getPenaltyDetailRequest = new penaltyDetail_1.GetPenaltyDetailRequest();
        getPenaltyDetailRequest.CalculatorID = global_1.Global.COMMON_FIELD_FDI_PENALTY_CALCULATOR;
        this._penaltyDetailService.getPenaltyDetail(getPenaltyDetailRequest)
            .subscribe(function (data) {
            //this._spinnerService.hide();
            _this.GetCalculatorSubTopic();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.penaltyDetails = data.Response;
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_PENALTY_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PENALTY_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.RemoveIllustration1Details = function (index) {
        var rowIndexToRemove = index + 1;
        if (rowIndexToRemove < this.illustration1FieldArray.length) {
            this.illustration1FieldArray.splice(rowIndexToRemove, this.illustration1FieldArray.length - rowIndexToRemove);
        }
        if (this.illustration1FieldArray.length > 0) {
            var newReceiptMinimumDate = this.GetNewReportingMinimumDate(this.illustration1FieldArray[index]);
            this.illustration1NewAttribute = { ReceiptMinDate: { year: newReceiptMinimumDate.getFullYear(), month: newReceiptMinimumDate.getMonth() + 1, day: newReceiptMinimumDate.getDate() } };
        }
        else {
            this.illustration1NewAttribute = { ReceiptMinDate: { year: 1970, month: 1, day: 1 } };
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.addIllustration1FieldValue = function () {
        if (!this.isDisabledIllustration1) {
            if (this.illustration1NewAttribute.ReceiptDate != undefined) {
                this.illustration1FieldArray.push(this.illustration1NewAttribute);
                var newReceiptMinimumDate = this.GetNewReportingMinimumDate(this.illustration1NewAttribute);
                this.illustration1NewAttribute = { ReceiptMinDate: { year: newReceiptMinimumDate.getFullYear(), month: newReceiptMinimumDate.getMonth() + 1, day: newReceiptMinimumDate.getDate() } };
            }
            else {
                this._toastrService.error("Receipt date is required", global_1.Global.TOASTR_FDI_PENALTY_CALCULATOR_TITLE);
            }
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.deleteIllustration1FieldValue = function (index) {
        if (!this.isDisabledIllustration1) {
            this.illustration1FieldArray.splice(index, 1);
            this.RemoveIllustration1Details(index - 1);
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration1ReceiptDateResetNewData = function () {
        if (this.illustration1NewAttribute.ReportingDate) {
            delete this.illustration1NewAttribute.ReportingDate;
            delete this.illustration1NewAttribute.Delay;
            delete this.illustration1NewAttribute.ContraventionPeriod;
            delete this.illustration1NewAttribute.VariableAmount;
            delete this.illustration1NewAttribute.AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration1ReceiptDateResetArrayData = function (index) {
        if (this.illustration1FieldArray[index].ReportingDate) {
            delete this.illustration1FieldArray[index].ReportingDate;
            delete this.illustration1FieldArray[index].Delay;
            delete this.illustration1FieldArray[index].ContraventionPeriod;
            delete this.illustration1FieldArray[index].VariableAmount;
            delete this.illustration1FieldArray[index].AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.GetNewReportingMinimumDate = function (illustration1Detail) {
        var currentReceiptDate = new Date(illustration1Detail.ReceiptDate.year + '-' + illustration1Detail.ReceiptDate.month + '-' + illustration1Detail.ReceiptDate.day);
        var day = 60 * 60 * 24 * 1000;
        return new Date(currentReceiptDate.getTime() + day);
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration1NewFieldValue = function () {
        var _this = this;
        if (this.illustration1NewAttribute.ReceiptDate) {
            var newReportingMinimumDate = this.GetNewReportingMinimumDate(this.illustration1NewAttribute);
            this.illustration1NewAttribute.ReportingMinDate = { year: newReportingMinimumDate.getFullYear(), month: newReportingMinimumDate.getMonth() + 1, day: newReportingMinimumDate.getDate() };
        }
        if (!isNaN(Number(this.illustration1NewAttribute.Amount))) {
            delete this.illustration1NewAttribute.VariableAmount;
            if (this.illustration1NewAttribute.ReceiptDate && this.illustration1NewAttribute.ReportingDate) {
                var receiptDate = new Date(this.illustration1NewAttribute.ReceiptDate.year + '-' + this.illustration1NewAttribute.ReceiptDate.month + '-' + this.illustration1NewAttribute.ReceiptDate.day);
                var reportingDate = new Date(this.illustration1NewAttribute.ReportingDate.year + '-' + this.illustration1NewAttribute.ReportingDate.month + '-' + this.illustration1NewAttribute.ReportingDate.day);
                var differenceBetweenReceiptAndReportingDate = new Date(reportingDate - receiptDate);
                var yearNo = differenceBetweenReceiptAndReportingDate.toISOString().slice(0, 4) - 1970;
                var monthNo = differenceBetweenReceiptAndReportingDate.getMonth();
                var dayNo = differenceBetweenReceiptAndReportingDate.getDate();
                if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                    this.illustration1NewAttribute.Delay = (yearNo == 0) ? '' : yearNo + ' year ';
                    this.illustration1NewAttribute.Delay += (yearNo > 0 && monthNo == 0) ? monthNo + ' month ' : (monthNo == 0) ? '' : monthNo + ' month ';
                    this.illustration1NewAttribute.Delay += (yearNo > 0 && monthNo == 0) ? dayNo + ' day ' : dayNo + ' day ';
                }
                else {
                    this.illustration1NewAttribute.Delay = (yearNo == 0 || (yearNo == 1 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1ST_YEAR :
                        (yearNo == 1 || (yearNo == 2 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_2_YEARS :
                            (yearNo == 2 || (yearNo == 3 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_2_TO_3_YEARS :
                                (yearNo == 3 || (yearNo == 4 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_3_TO_4_YEARS :
                                    (yearNo == 4 || (yearNo == 5 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_4_TO_5_YEARS :
                                        (yearNo > 5 || (yearNo == 5 && (monthNo > 0 || dayNo > 0))) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_GRATER_THAN_5_YEARS : '';
                }
                this.illustration1NewAttribute.ContraventionPeriod = (yearNo + (monthNo / 12) + (dayNo / 365)).toFixed(2);
                if (this.illustration1NewAttribute.Amount) {
                    var range_1 = "";
                    var tempPenaltyDetails = this.penaltyDetails;
                    if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                        if (this.illustration1NewAttribute.Amount <= 1000000)
                            range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_UPTO_10_LAKHS;
                        else if (this.illustration1NewAttribute.Amount > 1000000 && this.illustration1NewAttribute.Amount <= 4000000)
                            range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_40_LAKHS;
                        else if (this.illustration1NewAttribute.Amount > 4000000 && this.illustration1NewAttribute.Amount <= 10000000)
                            range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_40_TO_100_LAKHS;
                        else if (this.illustration1NewAttribute.Amount > 10000000 && this.illustration1NewAttribute.Amount <= 100000000)
                            range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_10_CRORE;
                        else if (this.illustration1NewAttribute.Amount > 100000000 && this.illustration1NewAttribute.Amount <= 1000000000)
                            range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_100_CRORE;
                        else if (this.illustration1NewAttribute.Amount > 1000000000)
                            range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_ABOVE_100_CRORE;
                        tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.IsFixedPenalty == false && x.CalculatorSubTopicID == null && x.Range == range_1; });
                        if (tempPenaltyDetails.length > 0) {
                            this.illustration1NewAttribute.VariableAmount = tempPenaltyDetails[0].Amount;
                            this.illustration1NewAttribute.AmountImposed = this.illustration1NewAttribute.ContraventionPeriod * this.illustration1NewAttribute.VariableAmount;
                            this.illustration1NewAttribute.AmountImposed = Math.round(this.illustration1NewAttribute.AmountImposed);
                        }
                    }
                    else {
                        tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.IsFixedPenalty == false && x.CalculatorSubTopicID == null && x.RangeAfter07November2017 == _this.illustration1NewAttribute.Delay; });
                        if (tempPenaltyDetails.length > 0) {
                            this.illustration1NewAttribute.VariableAmount = tempPenaltyDetails[0].AmountAfter07November2017;
                            this.illustration1NewAttribute.AmountImposed = this.illustration1NewAttribute.Amount * this.illustration1NewAttribute.VariableAmount;
                            this.illustration1NewAttribute.AmountImposed = Math.round(this.illustration1NewAttribute.AmountImposed);
                        }
                    }
                }
            }
        }
        else {
            delete this.illustration1NewAttribute.Amount;
            delete this.illustration1NewAttribute.ContraventionPeriod;
            delete this.illustration1NewAttribute.VariableAmount;
            delete this.illustration1NewAttribute.AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration1ArrayFieldValue = function (index) {
        var _this = this;
        if (this.illustration1FieldArray[index].ReceiptDate) {
            var newReportingMinimumDate = this.GetNewReportingMinimumDate(this.illustration1FieldArray[index]);
            this.illustration1FieldArray[index].ReportingMinDate = { year: newReportingMinimumDate.getFullYear(), month: newReportingMinimumDate.getMonth() + 1, day: newReportingMinimumDate.getDate() };
        }
        if (!isNaN(Number(this.illustration1FieldArray[index].Amount))) {
            delete this.illustration1FieldArray[index].VariableAmount;
            if (this.illustration1FieldArray[index].ReceiptDate && this.illustration1FieldArray[index].ReportingDate) {
                var receiptDate = new Date(this.illustration1FieldArray[index].ReceiptDate.year + '-' + this.illustration1FieldArray[index].ReceiptDate.month + '-' + this.illustration1FieldArray[index].ReceiptDate.day);
                var reportingDate = new Date(this.illustration1FieldArray[index].ReportingDate.year + '-' + this.illustration1FieldArray[index].ReportingDate.month + '-' + this.illustration1FieldArray[index].ReportingDate.day);
                var differenceBetweenReceiptAndReportingDate = new Date(reportingDate - receiptDate);
                var yearNo = differenceBetweenReceiptAndReportingDate.toISOString().slice(0, 4) - 1970;
                var monthNo = differenceBetweenReceiptAndReportingDate.getMonth();
                var dayNo = differenceBetweenReceiptAndReportingDate.getDate();
                if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                    this.illustration1FieldArray[index].Delay = (yearNo == 0) ? '' : yearNo + ' year ';
                    this.illustration1FieldArray[index].Delay += (yearNo > 0 && monthNo == 0) ? monthNo + ' month ' : (monthNo == 0) ? '' : monthNo + ' month ';
                    this.illustration1FieldArray[index].Delay += (yearNo > 0 && monthNo == 0) ? dayNo + ' day ' : dayNo + ' day ';
                }
                else {
                    this.illustration1FieldArray[index].Delay = (yearNo == 0 || (yearNo == 1 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1ST_YEAR :
                        (yearNo == 1 || (yearNo == 2 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_2_YEARS :
                            (yearNo == 2 || (yearNo == 3 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_2_TO_3_YEARS :
                                (yearNo == 3 || (yearNo == 4 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_3_TO_4_YEARS :
                                    (yearNo == 4 || (yearNo == 5 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_4_TO_5_YEARS :
                                        (yearNo > 5 || (yearNo == 5 && (monthNo > 0 || dayNo > 0))) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_GRATER_THAN_5_YEARS : '';
                }
                this.illustration1FieldArray[index].ContraventionPeriod = (yearNo + (monthNo / 12) + (dayNo / 365)).toFixed(2);
                if (this.illustration1FieldArray[index].Amount) {
                    var range_2 = "";
                    var tempPenaltyDetails = this.penaltyDetails;
                    if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                        if (this.illustration1FieldArray[index].Amount <= 1000000)
                            range_2 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_UPTO_10_LAKHS;
                        else if (this.illustration1FieldArray[index].Amount > 1000000 && this.illustration1FieldArray[index].Amount <= 4000000)
                            range_2 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_40_LAKHS;
                        else if (this.illustration1FieldArray[index].Amount > 4000000 && this.illustration1FieldArray[index].Amount <= 10000000)
                            range_2 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_40_TO_100_LAKHS;
                        else if (this.illustration1FieldArray[index].Amount > 10000000 && this.illustration1FieldArray[index].Amount <= 100000000)
                            range_2 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_10_CRORE;
                        else if (this.illustration1FieldArray[index].Amount > 100000000 && this.illustration1FieldArray[index].Amount <= 1000000000)
                            range_2 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_100_CRORE;
                        else if (this.illustration1FieldArray[index].Amount > 1000000000)
                            range_2 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_ABOVE_100_CRORE;
                        tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.IsFixedPenalty == false && x.CalculatorSubTopicID == null && x.Range == range_2; });
                        if (tempPenaltyDetails.length > 0) {
                            this.illustration1FieldArray[index].VariableAmount = tempPenaltyDetails[0].Amount;
                            this.illustration1FieldArray[index].AmountImposed = this.illustration1FieldArray[index].ContraventionPeriod * this.illustration1FieldArray[index].VariableAmount;
                            this.illustration1FieldArray[index].AmountImposed = Math.round(this.illustration1FieldArray[index].AmountImposed);
                        }
                    }
                    else {
                        tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.IsFixedPenalty == false && x.CalculatorSubTopicID == null && x.RangeAfter07November2017 == _this.illustration1FieldArray[index].Delay; });
                        if (tempPenaltyDetails.length > 0) {
                            this.illustration1FieldArray[index].VariableAmount = tempPenaltyDetails[0].AmountAfter07November2017;
                            this.illustration1FieldArray[index].AmountImposed = this.illustration1FieldArray[index].Amount * this.illustration1FieldArray[index].VariableAmount;
                            this.illustration1FieldArray[index].AmountImposed = Math.round(this.illustration1FieldArray[index].AmountImposed);
                        }
                    }
                }
            }
        }
        else {
            delete this.illustration1FieldArray[index].Amount;
            delete this.illustration1FieldArray[index].ContraventionPeriod;
            delete this.illustration1FieldArray[index].VariableAmount;
            delete this.illustration1FieldArray[index].AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnClickIllustration1Save = function () {
        var _this = this;
        if (this.illustration1FieldArray.length > 0 || (this.illustration1NewAttribute.ReceiptDate && this.illustration1NewAttribute.Amount && this.illustration1NewAttribute.ReportingDate)) {
            this.isDisabledIllustration1 = true;
            this.illustration1Data = [];
            this.illustration1FieldArray.forEach(function (item) {
                if (item.ReceiptDate && item.ReportingDate && item.Amount) {
                    item.Amount = Math.round(item.Amount);
                    item.AmountImposed = Math.round(item.AmountImposed);
                    _this.illustration1Data.push(item);
                }
            });
            if (this.illustration1NewAttribute.ReceiptDate && this.illustration1NewAttribute.ReportingDate && this.illustration1NewAttribute.Amount) {
                this.illustration1NewAttribute.Amount = Math.round(this.illustration1NewAttribute.Amount);
                this.illustration1NewAttribute.AmountImposed = Math.round(this.illustration1NewAttribute.AmountImposed);
                this.illustration1Data.push(this.illustration1NewAttribute);
            }
            this.sumOfIllustration1Amount = Math.round(this.illustration1Data.reduce(function (a, b) { return parseFloat(a) + parseFloat(b.Amount); }, 0)).toString();
            this.sumOfIllustration1AmountImposed = Math.round(this.illustration1Data.reduce(function (a, b) { return parseFloat(a) + parseFloat(b.AmountImposed); }, 0)).toString();
            this.illustration1Data.forEach(function (item) {
                var tempPenaltyDetails = _this.penaltyDetails.filter(function (x) { return x.IsFixedPenalty == true && x.CalculatorSubTopicID == null; });
                var receiptDate = new Date(item.ReceiptDate.year + '-' + item.ReceiptDate.month + '-' + item.ReceiptDate.day);
                if (receiptDate > global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                    _this.illustration1FixedAmount = tempPenaltyDetails[0].AmountAfter07November2017;
                    return;
                }
                else {
                    _this.illustration1FixedAmount = tempPenaltyDetails[0].Amount;
                }
            });
            this.totalOfIllustration1AmountImposed = Math.round(this.illustration1FixedAmount + parseFloat(this.sumOfIllustration1AmountImposed)).toString();
        }
        else {
            this._toastrService.error("Must be required filled one row.", global_1.Global.TOASTR_ADMIN_PENALTY_DETAIL_TITLE);
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnClickIllustration1Cancel = function () {
        this.isDisabledIllustration1 = false;
        this.illustration1Data = [];
        this.illustration1FieldArray = [];
        this.illustration1NewAttribute = { ReceiptMinDate: { year: 1970, month: 1, day: 1 }, ReportingMinDate: { year: 1970, month: 1, day: 1 } };
        this.sumOfIllustration1Amount = "";
        this.sumOfIllustration1AmountImposed = "";
        this.illustration1FixedAmount = 0;
        this.totalOfIllustration1AmountImposed = "";
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnClickIllustration1Print = function () {
        var columns = ["Date of \nreceipt", "Amount \n(Rs.)", "Date of \nReporting \nto RBI", "Delay", "Period of \ncontravention \n(years)", "Variable Amount \napplicable as per \npara I.1 of \nGuidance Note", "Amount \nimposed \n(Rs.)"];
        var rows = [];
        this.illustration1Data.forEach(function (item) {
            rows.push([item.ReceiptDate.day + '-' + item.ReceiptDate.month + '-' + item.ReceiptDate.year, item.Amount, item.ReportingDate.day + '-' + item.ReportingDate.month + '-' + item.ReportingDate.year, item.Delay, item.ContraventionPeriod, item.VariableAmount, item.AmountImposed]);
        });
        rows.push(["", this.sumOfIllustration1Amount, "", "", "", "Variable Amount", this.sumOfIllustration1AmountImposed]);
        rows.push(["", "", "", "", "", "Fixed Amount", this.illustration1FixedAmount]);
        rows.push(["", "", "", "", "", "Total Imposed", this.totalOfIllustration1AmountImposed]);
        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(12);
        doc.text(40, 50, 'Illustration I - Contravention of Para 9(1)(A) of Schedule 1 to Notification No.FEMA20/2000-RB');
        doc.autoTable(columns, rows, {
            createdCell: function (cell, data) {
                if (data.row.index >= rows.length - 3) {
                    cell.styles.fontStyle = 'bold';
                }
            },
            margin: { top: 70 },
            styles: {},
            addPageContent: function (data) {
            }
        });
        doc.save('FDI Penalty Calculator.pdf'); // Generated PDF
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.RemoveIllustration2Details = function (index) {
        var rowIndexToRemove = index + 1;
        if (rowIndexToRemove < this.illustration2FieldArray.length) {
            this.illustration2FieldArray.splice(rowIndexToRemove, this.illustration2FieldArray.length - rowIndexToRemove);
        }
        if (this.illustration2FieldArray.length > 0) {
            var newReceiptMinimumDate = this.GetNewReportingMinimumDate(this.illustration2FieldArray[index]);
            this.illustration2NewAttribute = { ReceiptMinDate: { year: newReceiptMinimumDate.getFullYear(), month: newReceiptMinimumDate.getMonth() + 1, day: newReceiptMinimumDate.getDate() } };
        }
        else {
            this.illustration2NewAttribute = { ReceiptMinDate: { year: 1970, month: 1, day: 1 } };
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.addIllustration2FieldValue = function () {
        if (!this.isDisabledIllustration2) {
            if (this.illustration2NewAttribute.ReceiptDate != undefined) {
                this.illustration2FieldArray.push(this.illustration2NewAttribute);
                var newReceiptMinimumDate = this.GetNewReportingMinimumDate(this.illustration2NewAttribute);
                this.illustration2NewAttribute = { ReceiptMinDate: { year: newReceiptMinimumDate.getFullYear(), month: newReceiptMinimumDate.getMonth() + 1, day: newReceiptMinimumDate.getDate() } };
            }
            else {
                this._toastrService.error("Receipt date is required", global_1.Global.TOASTR_FDI_PENALTY_CALCULATOR_TITLE);
            }
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.deleteIllustration2FieldValue = function (index) {
        if (!this.isDisabledIllustration2) {
            this.illustration2FieldArray.splice(index, 1);
            this.RemoveIllustration2Details(index - 1);
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration2ReceiptDateResetNewData = function () {
        if (this.illustration2NewAttribute.ReportingDate) {
            delete this.illustration2NewAttribute.ReportingDate;
            delete this.illustration2NewAttribute.Delay;
            delete this.illustration2NewAttribute.ContraventionPeriod;
            delete this.illustration2NewAttribute.VariableAmount;
            delete this.illustration2NewAttribute.AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration2ReceiptDateResetArrayData = function (index) {
        if (this.illustration2FieldArray[index].ReportingDate) {
            delete this.illustration2FieldArray[index].ReportingDate;
            delete this.illustration2FieldArray[index].Delay;
            delete this.illustration2FieldArray[index].ContraventionPeriod;
            delete this.illustration2FieldArray[index].VariableAmount;
            delete this.illustration2FieldArray[index].AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration2NewFieldValue = function () {
        var _this = this;
        if (this.illustration2NewAttribute.ReceiptDate) {
            var newReportingMinimumDate = this.GetNewReportingMinimumDate(this.illustration2NewAttribute);
            this.illustration2NewAttribute.ReportingMinDate = { year: newReportingMinimumDate.getFullYear(), month: newReportingMinimumDate.getMonth() + 1, day: newReportingMinimumDate.getDate() };
        }
        if (!isNaN(Number(this.illustration2NewAttribute.Amount))) {
            delete this.illustration2NewAttribute.VariableAmount;
            if (this.illustration2NewAttribute.ReceiptDate && this.illustration2NewAttribute.ReportingDate) {
                var receiptDate = new Date(this.illustration2NewAttribute.ReceiptDate.year + '-' + this.illustration2NewAttribute.ReceiptDate.month + '-' + this.illustration2NewAttribute.ReceiptDate.day);
                var reportingDate = new Date(this.illustration2NewAttribute.ReportingDate.year + '-' + this.illustration2NewAttribute.ReportingDate.month + '-' + this.illustration2NewAttribute.ReportingDate.day);
                var differenceBetweenReceiptAndReportingDate = new Date(reportingDate - receiptDate);
                var yearNo = differenceBetweenReceiptAndReportingDate.toISOString().slice(0, 4) - 1970;
                var monthNo = differenceBetweenReceiptAndReportingDate.getMonth();
                var dayNo = differenceBetweenReceiptAndReportingDate.getDate();
                if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                    this.illustration2NewAttribute.Delay = (yearNo == 0) ? '' : yearNo + ' year ';
                    this.illustration2NewAttribute.Delay += (yearNo > 0 && monthNo == 0) ? monthNo + ' month ' : (monthNo == 0) ? '' : monthNo + ' month ';
                    this.illustration2NewAttribute.Delay += (yearNo > 0 && monthNo == 0) ? dayNo + ' day ' : dayNo + ' day ';
                }
                else {
                    this.illustration2NewAttribute.Delay = (yearNo == 0 || (yearNo == 1 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1ST_YEAR :
                        (yearNo == 1 || (yearNo == 2 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_2_YEARS :
                            (yearNo == 2 || (yearNo == 3 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_2_TO_3_YEARS :
                                (yearNo == 3 || (yearNo == 4 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_3_TO_4_YEARS :
                                    (yearNo == 4 || (yearNo == 5 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_4_TO_5_YEARS :
                                        (yearNo > 5 || (yearNo == 5 && (monthNo > 0 || dayNo > 0))) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_GRATER_THAN_5_YEARS : '';
                }
                this.illustration2NewAttribute.ContraventionPeriod = (yearNo + (monthNo / 12) + (dayNo / 365)).toFixed(2);
                if (this.illustration2NewAttribute.Amount) {
                    var range_3 = "";
                    var tempPenaltyDetails = this.penaltyDetails;
                    if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                        if (this.illustration2NewAttribute.Amount <= 1000000)
                            range_3 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_UPTO_10_LAKHS;
                        else if (this.illustration2NewAttribute.Amount > 1000000 && this.illustration2NewAttribute.Amount <= 4000000)
                            range_3 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_40_LAKHS;
                        else if (this.illustration2NewAttribute.Amount > 4000000 && this.illustration2NewAttribute.Amount <= 10000000)
                            range_3 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_40_TO_100_LAKHS;
                        else if (this.illustration2NewAttribute.Amount > 10000000 && this.illustration2NewAttribute.Amount <= 100000000)
                            range_3 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_10_CRORE;
                        else if (this.illustration2NewAttribute.Amount > 100000000 && this.illustration2NewAttribute.Amount <= 1000000000)
                            range_3 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_100_CRORE;
                        else if (this.illustration2NewAttribute.Amount > 1000000000)
                            range_3 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_ABOVE_100_CRORE;
                        tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.IsFixedPenalty == false && x.CalculatorSubTopicID == null && x.Range == range_3; });
                        if (tempPenaltyDetails.length > 0) {
                            this.illustration2NewAttribute.VariableAmount = tempPenaltyDetails[0].Amount;
                            this.illustration2NewAttribute.AmountImposed = this.illustration2NewAttribute.ContraventionPeriod * this.illustration2NewAttribute.VariableAmount;
                            this.illustration2NewAttribute.AmountImposed = Math.round(this.illustration2NewAttribute.AmountImposed);
                        }
                    }
                    else {
                        tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.IsFixedPenalty == false && x.CalculatorSubTopicID == null && x.RangeAfter07November2017 == _this.illustration2NewAttribute.Delay; });
                        if (tempPenaltyDetails.length > 0) {
                            this.illustration2NewAttribute.VariableAmount = tempPenaltyDetails[0].AmountAfter07November2017;
                            this.illustration2NewAttribute.AmountImposed = this.illustration2NewAttribute.Amount * this.illustration2NewAttribute.VariableAmount;
                            this.illustration2NewAttribute.AmountImposed = Math.round(this.illustration2NewAttribute.AmountImposed);
                        }
                    }
                }
            }
        }
        else {
            delete this.illustration2NewAttribute.Amount;
            delete this.illustration2NewAttribute.ContraventionPeriod;
            delete this.illustration2NewAttribute.VariableAmount;
            delete this.illustration2NewAttribute.AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration2ArrayFieldValue = function (index) {
        var _this = this;
        if (this.illustration2FieldArray[index].ReceiptDate) {
            var newReportingMinimumDate = this.GetNewReportingMinimumDate(this.illustration2FieldArray[index]);
            this.illustration2FieldArray[index].ReportingMinDate = { year: newReportingMinimumDate.getFullYear(), month: newReportingMinimumDate.getMonth() + 1, day: newReportingMinimumDate.getDate() };
        }
        if (!isNaN(Number(this.illustration2FieldArray[index].Amount))) {
            delete this.illustration2FieldArray[index].VariableAmount;
            if (this.illustration2FieldArray[index].ReceiptDate && this.illustration2FieldArray[index].ReportingDate) {
                var receiptDate = new Date(this.illustration2FieldArray[index].ReceiptDate.year + '-' + this.illustration2FieldArray[index].ReceiptDate.month + '-' + this.illustration2FieldArray[index].ReceiptDate.day);
                var reportingDate = new Date(this.illustration2FieldArray[index].ReportingDate.year + '-' + this.illustration2FieldArray[index].ReportingDate.month + '-' + this.illustration2FieldArray[index].ReportingDate.day);
                var differenceBetweenReceiptAndReportingDate = new Date(reportingDate - receiptDate);
                var yearNo = differenceBetweenReceiptAndReportingDate.toISOString().slice(0, 4) - 1970;
                var monthNo = differenceBetweenReceiptAndReportingDate.getMonth();
                var dayNo = differenceBetweenReceiptAndReportingDate.getDate();
                if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                    this.illustration2FieldArray[index].Delay = (yearNo == 0) ? '' : yearNo + ' year ';
                    this.illustration2FieldArray[index].Delay += (yearNo > 0 && monthNo == 0) ? monthNo + ' month ' : (monthNo == 0) ? '' : monthNo + ' month ';
                    this.illustration2FieldArray[index].Delay += (yearNo > 0 && monthNo == 0) ? dayNo + ' day ' : dayNo + ' day ';
                }
                else {
                    this.illustration2FieldArray[index].Delay = (yearNo == 0 || (yearNo == 1 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1ST_YEAR :
                        (yearNo == 1 || (yearNo == 2 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_2_YEARS :
                            (yearNo == 2 || (yearNo == 3 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_2_TO_3_YEARS :
                                (yearNo == 3 || (yearNo == 4 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_3_TO_4_YEARS :
                                    (yearNo == 4 || (yearNo == 5 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_4_TO_5_YEARS :
                                        (yearNo > 5 || (yearNo == 5 && (monthNo > 0 || dayNo > 0))) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_GRATER_THAN_5_YEARS : '';
                }
                this.illustration2FieldArray[index].ContraventionPeriod = (yearNo + (monthNo / 12) + (dayNo / 365)).toFixed(2);
                if (this.illustration2FieldArray[index].Amount) {
                    var range_4 = "";
                    var tempPenaltyDetails = this.penaltyDetails;
                    if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                        if (this.illustration2FieldArray[index].Amount <= 1000000)
                            range_4 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_UPTO_10_LAKHS;
                        else if (this.illustration2FieldArray[index].Amount > 1000000 && this.illustration2FieldArray[index].Amount <= 4000000)
                            range_4 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_40_LAKHS;
                        else if (this.illustration2FieldArray[index].Amount > 4000000 && this.illustration2FieldArray[index].Amount <= 10000000)
                            range_4 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_40_TO_100_LAKHS;
                        else if (this.illustration2FieldArray[index].Amount > 10000000 && this.illustration2FieldArray[index].Amount <= 100000000)
                            range_4 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_10_CRORE;
                        else if (this.illustration2FieldArray[index].Amount > 100000000 && this.illustration2FieldArray[index].Amount <= 1000000000)
                            range_4 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_100_CRORE;
                        else if (this.illustration2FieldArray[index].Amount > 1000000000)
                            range_4 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_ABOVE_100_CRORE;
                        tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.IsFixedPenalty == false && x.CalculatorSubTopicID == null && x.Range == range_4; });
                        if (tempPenaltyDetails.length > 0) {
                            this.illustration2FieldArray[index].VariableAmount = tempPenaltyDetails[0].Amount;
                            this.illustration2FieldArray[index].AmountImposed = this.illustration2FieldArray[index].ContraventionPeriod * this.illustration2FieldArray[index].VariableAmount;
                            this.illustration2FieldArray[index].AmountImposed = Math.round(this.illustration2FieldArray[index].AmountImposed);
                        }
                    }
                    else {
                        tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.IsFixedPenalty == false && x.CalculatorSubTopicID == null && x.RangeAfter07November2017 == _this.illustration2FieldArray[index].Delay; });
                        if (tempPenaltyDetails.length > 0) {
                            this.illustration2FieldArray[index].VariableAmount = tempPenaltyDetails[0].AmountAfter07November2017;
                            this.illustration2FieldArray[index].AmountImposed = this.illustration2FieldArray[index].Amount * this.illustration2FieldArray[index].VariableAmount;
                            this.illustration2FieldArray[index].AmountImposed = Math.round(this.illustration2FieldArray[index].AmountImposed);
                        }
                    }
                }
            }
        }
        else {
            delete this.illustration2FieldArray[index].Amount;
            delete this.illustration2FieldArray[index].ContraventionPeriod;
            delete this.illustration2FieldArray[index].VariableAmount;
            delete this.illustration2FieldArray[index].AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnClickIllustration2Save = function () {
        var _this = this;
        if (this.illustration2FieldArray.length > 0 || (this.illustration2NewAttribute.ReceiptDate && this.illustration2NewAttribute.Amount && this.illustration2NewAttribute.ReportingDate)) {
            this.isDisabledIllustration2 = true;
            this.illustration2Data = [];
            this.illustration2FieldArray.forEach(function (item) {
                if (item.ReceiptDate && item.ReportingDate && item.Amount) {
                    item.Amount = Math.round(item.Amount);
                    item.AmountImposed = Math.round(item.AmountImposed);
                    _this.illustration2Data.push(item);
                }
            });
            if (this.illustration2NewAttribute.ReceiptDate && this.illustration2NewAttribute.ReportingDate && this.illustration2NewAttribute.Amount) {
                this.illustration2NewAttribute.Amount = Math.round(this.illustration2NewAttribute.Amount);
                this.illustration2NewAttribute.AmountImposed = Math.round(this.illustration2NewAttribute.AmountImposed);
                this.illustration2Data.push(this.illustration2NewAttribute);
            }
            this.sumOfIllustration2Amount = Math.round(this.illustration2Data.reduce(function (a, b) { return parseFloat(a) + parseFloat(b.Amount); }, 0)).toString();
            this.sumOfIllustration2AmountImposed = Math.round(this.illustration2Data.reduce(function (a, b) { return parseFloat(a) + parseFloat(b.AmountImposed); }, 0)).toString();
            this.illustration2Data.forEach(function (item) {
                var tempPenaltyDetails = _this.penaltyDetails.filter(function (x) { return x.IsFixedPenalty == true && x.CalculatorSubTopicID == null; });
                var receiptDate = new Date(item.ReceiptDate.year + '-' + item.ReceiptDate.month + '-' + item.ReceiptDate.day);
                if (receiptDate > global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                    _this.illustration2FixedAmount = tempPenaltyDetails[0].AmountAfter07November2017;
                    return;
                }
                else {
                    _this.illustration2FixedAmount = tempPenaltyDetails[0].Amount;
                }
            });
            this.totalOfIllustration2AmountImposed = Math.round(this.illustration2FixedAmount + parseFloat(this.sumOfIllustration2AmountImposed)).toString();
        }
        else {
            this._toastrService.error("Must be required filled one row.", global_1.Global.TOASTR_ADMIN_PENALTY_DETAIL_TITLE);
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnClickIllustration2Cancel = function () {
        this.isDisabledIllustration2 = false;
        this.illustration2Data = [];
        this.illustration2FieldArray = [];
        this.illustration2NewAttribute = { ReceiptMinDate: { year: 1970, month: 1, day: 1 }, ReportingMinDate: { year: 1970, month: 1, day: 1 } };
        this.sumOfIllustration2Amount = "";
        this.sumOfIllustration2AmountImposed = "";
        this.illustration2FixedAmount = 0;
        this.totalOfIllustration2AmountImposed = "";
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnClickIllustration2Print = function () {
        var columns = ["Date of \nAllotment", "Amount \n(Rs.)", "Date of \nReporting \nto RBI", "Delay \nNumber \nof \ndays", "Period of \ncontravention \n(years)", "Variable Amount \napplicable as per \npara I.1 of \nGuidance Note", "Amount \nimposed \n(Rs.)"];
        var rows = [];
        this.illustration2Data.forEach(function (item) {
            rows.push([item.ReceiptDate.day + '-' + item.ReceiptDate.month + '-' + item.ReceiptDate.year, item.Amount, item.ReportingDate.day + '-' + item.ReportingDate.month + '-' + item.ReportingDate.year, item.Delay, item.ContraventionPeriod, item.VariableAmount, item.AmountImposed]);
        });
        rows.push(["", this.sumOfIllustration2Amount, "", "", "", "Variable Amount", this.sumOfIllustration2AmountImposed]);
        rows.push(["", "", "", "", "", "Fixed Amount", this.illustration2FixedAmount]);
        rows.push(["", "", "", "", "", "Total Imposed", this.totalOfIllustration2AmountImposed]);
        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(12);
        doc.text(40, 50, 'Illustration II - Contravention of Para 9(1)(B) of Schedule 1 to Notification No.FEMA20/2000-RB');
        doc.autoTable(columns, rows, {
            createdCell: function (cell, data) {
                if (data.row.index >= rows.length - 3) {
                    cell.styles.fontStyle = 'bold';
                }
            },
            margin: { top: 70 },
            styles: {},
            addPageContent: function (data) {
            }
        });
        doc.save('FDI Penalty Calculator.pdf'); // Generated PDF
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.GetCalculatorSubTopic = function () {
        var _this = this;
        this._spinnerService.show();
        var getCalculatorSubTopicRequest = new calculatorSubTopic_1.GetCalculatorSubTopicRequest();
        this._calculatorSubTopicService.getCalculatorSubTopic(getCalculatorSubTopicRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            _this.calculatorSubTopics = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.calculatorSubTopics.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    if (item.CalculatorSubTopicId == 5 || item.CalculatorSubTopicId == 6 || item.CalculatorSubTopicId == 7)
                        _this.calculatorSubTopics.push({ Value: item.CalculatorSubTopicId, Text: item.CalculatorSubTopicName });
                });
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_PENALTY_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PENALTY_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeCalculatorSubTopic = function (calculatorSubTopicId) {
        this.calculatorSubTopicId = calculatorSubTopicId;
        this.OnClickIllustration3Cancel();
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.RemoveIllustration3Details = function (index) {
        var rowIndexToRemove = index + 1;
        if (rowIndexToRemove < this.illustration3FieldArray.length) {
            this.illustration3FieldArray.splice(rowIndexToRemove, this.illustration3FieldArray.length - rowIndexToRemove);
        }
        if (this.illustration3FieldArray.length > 0) {
            var newReceiptMinimumDate = this.GetNewReportingMinimumDate(this.illustration3FieldArray[index]);
            this.illustration3NewAttribute = { ReceiptMinDate: { year: newReceiptMinimumDate.getFullYear(), month: newReceiptMinimumDate.getMonth() + 1, day: newReceiptMinimumDate.getDate() } };
        }
        else {
            this.illustration3NewAttribute = { ReceiptMinDate: { year: 1970, month: 1, day: 1 } };
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.addIllustration3FieldValue = function () {
        if (!this.isDisabledIllustration3) {
            if (this.illustration3NewAttribute.ReceiptDate != undefined) {
                this.illustration3FieldArray.push(this.illustration3NewAttribute);
                var newReceiptMinimumDate = this.GetNewReportingMinimumDate(this.illustration3NewAttribute);
                this.illustration3NewAttribute = { ReceiptMinDate: { year: newReceiptMinimumDate.getFullYear(), month: newReceiptMinimumDate.getMonth() + 1, day: newReceiptMinimumDate.getDate() } };
            }
            else {
                this._toastrService.error("Receipt date is required", global_1.Global.TOASTR_FDI_PENALTY_CALCULATOR_TITLE);
            }
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.deleteIllustration3FieldValue = function (index) {
        if (!this.isDisabledIllustration3) {
            this.illustration3FieldArray.splice(index, 1);
            this.RemoveIllustration3Details(index - 1);
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration3ReceiptDateResetNewData = function () {
        if (this.illustration3NewAttribute.ReportingDate) {
            delete this.illustration3NewAttribute.ReportingDate;
            delete this.illustration3NewAttribute.Delay;
            delete this.illustration3NewAttribute.ContraventionPeriod;
            delete this.illustration3NewAttribute.VariableAmount;
            delete this.illustration3NewAttribute.AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration3ReceiptDateResetArrayData = function (index) {
        if (this.illustration3FieldArray[index].ReportingDate) {
            delete this.illustration3FieldArray[index].ReportingDate;
            delete this.illustration3FieldArray[index].Delay;
            delete this.illustration3FieldArray[index].ContraventionPeriod;
            delete this.illustration3FieldArray[index].VariableAmount;
            delete this.illustration3FieldArray[index].AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration3NewFieldValue = function () {
        var _this = this;
        if (this.illustration3NewAttribute.ReceiptDate) {
            var newReportingMinimumDate = this.GetNewReportingMinimumDate(this.illustration3NewAttribute);
            this.illustration3NewAttribute.ReportingMinDate = { year: newReportingMinimumDate.getFullYear(), month: newReportingMinimumDate.getMonth() + 1, day: newReportingMinimumDate.getDate() };
        }
        if (!isNaN(Number(this.illustration3NewAttribute.Amount))) {
            delete this.illustration3NewAttribute.VariableAmount;
            if (this.illustration3NewAttribute.ReceiptDate && this.illustration3NewAttribute.ReportingDate) {
                var receiptDate = new Date(this.illustration3NewAttribute.ReceiptDate.year + '-' + this.illustration3NewAttribute.ReceiptDate.month + '-' + this.illustration3NewAttribute.ReceiptDate.day);
                var reportingDate = new Date(this.illustration3NewAttribute.ReportingDate.year + '-' + this.illustration3NewAttribute.ReportingDate.month + '-' + this.illustration3NewAttribute.ReportingDate.day);
                var differenceBetweenReceiptAndReportingDate = new Date(reportingDate - receiptDate);
                var yearNo = differenceBetweenReceiptAndReportingDate.toISOString().slice(0, 4) - 1970;
                var monthNo = differenceBetweenReceiptAndReportingDate.getMonth();
                var dayNo = differenceBetweenReceiptAndReportingDate.getDate();
                var delay_1 = (yearNo == 0 || (yearNo == 1 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1ST_YEAR :
                    (yearNo == 1 || (yearNo == 2 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_2_YEARS :
                        (yearNo == 2 || (yearNo == 3 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_2_TO_3_YEARS :
                            (yearNo == 3 || (yearNo == 4 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_3_TO_4_YEARS :
                                (yearNo == 4 || (yearNo == 5 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_4_TO_5_YEARS :
                                    (yearNo > 5 || (yearNo == 5 && (monthNo > 0 || dayNo > 0))) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_GRATER_THAN_5_YEARS : '';
                if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                    this.illustration3NewAttribute.Delay = (yearNo == 0) ? '' : yearNo + ' year ';
                    this.illustration3NewAttribute.Delay += (yearNo > 0 && monthNo == 0) ? monthNo + ' month ' : (monthNo == 0) ? '' : monthNo + ' month ';
                    this.illustration3NewAttribute.Delay += (yearNo > 0 && monthNo == 0) ? dayNo + ' day ' : dayNo + ' day ';
                }
                else {
                    this.illustration3NewAttribute.Delay = delay_1;
                }
                this.illustration3NewAttribute.ContraventionPeriod = (yearNo + (monthNo / 12) + (dayNo / 365)).toFixed(2);
                if (this.illustration3NewAttribute.Amount) {
                    var tempPenaltyDetails = this.penaltyDetails.filter(function (x) { return x.IsFixedPenalty == false && x.CalculatorSubTopicID == parseInt(_this.calculatorSubTopicId) && x.Range == delay_1; });
                    if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                        if (tempPenaltyDetails.length > 0)
                            this.illustration3NewAttribute.VariableAmount = tempPenaltyDetails[0].Amount;
                    }
                    else {
                        if (tempPenaltyDetails.length > 0)
                            this.illustration3NewAttribute.VariableAmount = tempPenaltyDetails[0].AmountAfter07November2017;
                    }
                    this.illustration3NewAttribute.AmountImposed = this.illustration3NewAttribute.Amount * this.illustration3NewAttribute.VariableAmount;
                    this.illustration3NewAttribute.AmountImposed = Math.round(this.illustration3NewAttribute.AmountImposed);
                }
            }
        }
        else {
            delete this.illustration3NewAttribute.Amount;
            delete this.illustration3NewAttribute.ContraventionPeriod;
            delete this.illustration3NewAttribute.VariableAmount;
            delete this.illustration3NewAttribute.AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnChangeIllustration3ArrayFieldValue = function (index) {
        var _this = this;
        if (this.illustration3FieldArray[index].ReceiptDate) {
            var newReportingMinimumDate = this.GetNewReportingMinimumDate(this.illustration3FieldArray[index]);
            this.illustration3FieldArray[index].ReportingMinDate = { year: newReportingMinimumDate.getFullYear(), month: newReportingMinimumDate.getMonth() + 1, day: newReportingMinimumDate.getDate() };
        }
        if (!isNaN(Number(this.illustration3FieldArray[index].Amount))) {
            delete this.illustration3FieldArray[index].VariableAmount;
            if (this.illustration3FieldArray[index].ReceiptDate && this.illustration3FieldArray[index].ReportingDate) {
                var receiptDate = new Date(this.illustration3FieldArray[index].ReceiptDate.year + '-' + this.illustration3FieldArray[index].ReceiptDate.month + '-' + this.illustration3FieldArray[index].ReceiptDate.day);
                var reportingDate = new Date(this.illustration3FieldArray[index].ReportingDate.year + '-' + this.illustration3FieldArray[index].ReportingDate.month + '-' + this.illustration3FieldArray[index].ReportingDate.day);
                var differenceBetweenReceiptAndReportingDate = new Date(reportingDate - receiptDate);
                var yearNo = differenceBetweenReceiptAndReportingDate.toISOString().slice(0, 4) - 1970;
                var monthNo = differenceBetweenReceiptAndReportingDate.getMonth();
                var dayNo = differenceBetweenReceiptAndReportingDate.getDate();
                var delay_2 = (yearNo == 0 || (yearNo == 1 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1ST_YEAR :
                    (yearNo == 1 || (yearNo == 2 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_2_YEARS :
                        (yearNo == 2 || (yearNo == 3 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_2_TO_3_YEARS :
                            (yearNo == 3 || (yearNo == 4 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_3_TO_4_YEARS :
                                (yearNo == 4 || (yearNo == 5 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_4_TO_5_YEARS :
                                    (yearNo > 5 || (yearNo == 5 && (monthNo > 0 || dayNo > 0))) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_GRATER_THAN_5_YEARS : '';
                if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                    this.illustration3FieldArray[index].Delay = (yearNo == 0) ? '' : yearNo + ' year ';
                    this.illustration3FieldArray[index].Delay += (yearNo > 0 && monthNo == 0) ? monthNo + ' month ' : (monthNo == 0) ? '' : monthNo + ' month ';
                    this.illustration3FieldArray[index].Delay += (yearNo > 0 && monthNo == 0) ? dayNo + ' day ' : dayNo + ' day ';
                }
                else {
                    this.illustration3FieldArray[index].Delay = delay_2;
                }
                this.illustration3FieldArray[index].ContraventionPeriod = (yearNo + (monthNo / 12) + (dayNo / 365)).toFixed(2);
                if (this.illustration3FieldArray[index].Amount) {
                    var tempPenaltyDetails = this.penaltyDetails.filter(function (x) { return x.IsFixedPenalty == false && x.CalculatorSubTopicID == parseInt(_this.calculatorSubTopicId) && x.Range == delay_2; });
                    if (receiptDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                        if (tempPenaltyDetails.length > 0)
                            this.illustration3FieldArray[index].VariableAmount = tempPenaltyDetails[0].Amount;
                    }
                    else {
                        if (tempPenaltyDetails.length > 0)
                            this.illustration3FieldArray[index].VariableAmount = tempPenaltyDetails[0].AmountAfter07November2017;
                    }
                    this.illustration3FieldArray[index].AmountImposed = this.illustration3FieldArray[index].Amount * this.illustration3FieldArray[index].VariableAmount;
                    this.illustration3FieldArray[index].AmountImposed = Math.round(this.illustration3FieldArray[index].AmountImposed);
                }
            }
        }
        else {
            delete this.illustration3FieldArray[index].Amount;
            delete this.illustration3FieldArray[index].ContraventionPeriod;
            delete this.illustration3FieldArray[index].VariableAmount;
            delete this.illustration3FieldArray[index].AmountImposed;
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnClickIllustration3Save = function () {
        var _this = this;
        if (this.illustration3FieldArray.length > 0 || (this.illustration3NewAttribute.ReceiptDate && this.illustration3NewAttribute.Amount && this.illustration3NewAttribute.ReportingDate)) {
            this.isDisabledIllustration3 = true;
            this.illustration3Data = [];
            this.illustration3FieldArray.forEach(function (item) {
                if (item.ReceiptDate && item.ReportingDate && item.Amount) {
                    item.Amount = Math.round(item.Amount);
                    item.AmountImposed = Math.round(item.AmountImposed);
                    _this.illustration3Data.push(item);
                }
            });
            if (this.illustration3NewAttribute.ReceiptDate && this.illustration3NewAttribute.ReportingDate && this.illustration3NewAttribute.Amount) {
                this.illustration3NewAttribute.Amount = Math.round(this.illustration3NewAttribute.Amount);
                this.illustration3NewAttribute.AmountImposed = Math.round(this.illustration3NewAttribute.AmountImposed);
                this.illustration3Data.push(this.illustration3NewAttribute);
            }
            this.sumOfIllustration3Amount = Math.round(this.illustration3Data.reduce(function (a, b) { return parseFloat(a) + parseFloat(b.Amount); }, 0)).toString();
            this.sumOfIllustration3AmountImposed = Math.round(this.illustration3Data.reduce(function (a, b) { return parseFloat(a) + parseFloat(b.AmountImposed); }, 0)).toString();
            var tempPenaltyDetails_1 = this.penaltyDetails.filter(function (x) { return x.IsFixedPenalty == true && x.CalculatorSubTopicID == parseInt(_this.calculatorSubTopicId); });
            this.illustration3Data.forEach(function (item) {
                var receiptDate = new Date(item.ReceiptDate.year + '-' + item.ReceiptDate.month + '-' + item.ReceiptDate.day);
                if (receiptDate > global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                    _this.illustration3FixedAmount = tempPenaltyDetails_1[0].AmountAfter07November2017;
                    return;
                }
                else {
                    _this.illustration3FixedAmount = tempPenaltyDetails_1[0].Amount;
                }
            });
            this.totalOfIllustration3AmountImposed = Math.round((this.illustration3FixedAmount + parseFloat(this.sumOfIllustration3AmountImposed)) * tempPenaltyDetails_1[0].ExtraPenaltyRange).toString();
        }
        else {
            this._toastrService.error("Must be required filled one row.", global_1.Global.TOASTR_ADMIN_PENALTY_DETAIL_TITLE);
        }
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnClickIllustration3Cancel = function () {
        this.isDisabledIllustration3 = false;
        this.illustration3Data = [];
        this.illustration3FieldArray = [];
        this.illustration3NewAttribute = { ReceiptMinDate: { year: 1970, month: 1, day: 1 }, ReportingMinDate: { year: 1970, month: 1, day: 1 } };
        this.sumOfIllustration3Amount = "";
        this.sumOfIllustration3AmountImposed = "";
        this.illustration3FixedAmount = 0;
        this.totalOfIllustration3AmountImposed = "";
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnClickIllustration3Print = function () {
        var _this = this;
        var columns = ["Date of \nreceipt", "Amount \n(Rs.)", "Date of \nReporting \nto RBI", "Delay", "Period of \ncontravention \n(years)", "Variable Amount \napplicable as per \npara I.1 of \nGuidance Note", "Amount \nimposed \n(Rs.)"];
        var rows = [];
        this.illustration3Data.forEach(function (item) {
            rows.push([item.ReceiptDate.day + '-' + item.ReceiptDate.month + '-' + item.ReceiptDate.year, item.Amount, item.ReportingDate.day + '-' + item.ReportingDate.month + '-' + item.ReportingDate.year, item.Delay, item.ContraventionPeriod, item.VariableAmount, item.AmountImposed]);
        });
        rows.push(["", this.sumOfIllustration3Amount, "", "", "", "Variable Amount", this.sumOfIllustration3AmountImposed]);
        rows.push(["", "", "", "", "", "Fixed Amount", this.illustration3FixedAmount]);
        rows.push(["", "", "", "", "", "Total Imposed", this.totalOfIllustration3AmountImposed]);
        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(12);
        doc.text(40, 50, 'Illustration III - Contravention of Para 8 of Schedule 1 to Notification No.FEMA20/2000-RB');
        doc.setFontSize(11);
        doc.text(40, 80, 'Calculator Topic : ' + this.calculatorSubTopics.filter(function (x) { return x.Value == _this.calculatorSubTopicId; })[0].Text);
        doc.autoTable(columns, rows, {
            createdCell: function (cell, data) {
                if (data.row.index >= rows.length - 3) {
                    cell.styles.fontStyle = 'bold';
                }
            },
            margin: { top: 90 },
            styles: {},
            addPageContent: function (data) {
            }
        });
        doc.save('FDI Penalty Calculator.pdf'); // Generated PDF
    };
    FDIPenaltyCalculatorPopupUserComponent.prototype.OnClickModuleTab = function (moduleTab) {
        this.moduleTab = moduleTab;
    };
    FDIPenaltyCalculatorPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fDIPenaltyCalculatorPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            penaltyDetail_service_1.PenaltyDetailUserService,
            calculatorSubTopic_service_1.CalculatorSubTopicUserService,
            platform_browser_1.DomSanitizer])
    ], FDIPenaltyCalculatorPopupUserComponent);
    return FDIPenaltyCalculatorPopupUserComponent;
}());
exports.FDIPenaltyCalculatorPopupUserComponent = FDIPenaltyCalculatorPopupUserComponent;
//# sourceMappingURL=fDIPenaltyCalculatorPopup.component.js.map