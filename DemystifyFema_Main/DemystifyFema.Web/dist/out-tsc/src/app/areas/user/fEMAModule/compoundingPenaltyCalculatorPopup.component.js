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
var commonField_1 = require("../../../model/commonField");
var calculatorSubTopic_1 = require("../../../model/calculatorSubTopic");
var penaltyDetail_1 = require("../../../model/penaltyDetail");
var penaltyDetail_service_1 = require("../../../service/user/penaltyDetail.service");
var commonField_service_1 = require("../../../service/common/commonField.service");
var calculatorSubTopic_service_1 = require("../../../service/user/calculatorSubTopic.service");
var CompoundingPenaltyCalculatorPopupUserComponent = /** @class */ (function () {
    function CompoundingPenaltyCalculatorPopupUserComponent(formBuilder, _spinnerService, _toastrService, _commonFieldService, _calculatorSubTopicService, _penaltyDetailService, sanitizer) {
        this.formBuilder = formBuilder;
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._commonFieldService = _commonFieldService;
        this._calculatorSubTopicService = _calculatorSubTopicService;
        this._penaltyDetailService = _penaltyDetailService;
        this.sanitizer = sanitizer;
        this.calculatorTopics = [];
        this.calculatorSubTopics = [];
        this.compundingPenaltyCalculator = [];
        this.Disclaimer = [];
        this.contraventionMinDate = { year: 1970, month: 1, day: 1 };
        this.reportingMinDate = { year: 1970, month: 1, day: 1 };
        this.isDisabledCompoundingPenaltyCalculator = false;
        this.isContraventionDateDatePicker = false;
        this.isReportingDateDatePicker = false;
        this.isSubmited = false;
        this.isContraventionAmountDisabled = false;
        this.isTotalAPR_AAC_FCGPRDisabled = false;
    }
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.GetCalculatorTopic();
        this.frmCompoundingPenaltyCalculator = this.formBuilder.group({
            CalculatorTopicId: ['', forms_1.Validators.required],
            CalculatorSubTopicId: ['', forms_1.Validators.required],
            ContraventionDate: ['', forms_1.Validators.required],
            ReportingDate: ['', forms_1.Validators.required],
            WhetherSameOffence: ['', forms_1.Validators.required],
            ContraventionAmount: [''],
            NoOfYear: [''],
            TotalAPR_AAC_FCGPR: [''],
            Years: ['']
        });
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.GetCalculatorTopic = function () {
        var _this = this;
        this._spinnerService.show();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_FEMA_MODULE;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            _this.calculatorTopics = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.calculatorTopics.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    item.FieldName = (item.FieldId == 15) ? "Others" : item.FieldName;
                    if (item.FieldId == 1 || item.FieldId == 2 || item.FieldId == 3 || item.FieldId == 5 || item.FieldId == 6 || item.FieldId == 7 || item.FieldId == 15)
                        _this.calculatorTopics.push({ Value: item.FieldId, Text: item.FieldName });
                });
                _this.frmCompoundingPenaltyCalculator.get("CalculatorTopicId").setValue("");
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_COMPOUNDING_PENALTY_CALCULATOR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_COMPOUNDING_PENALTY_CALCULATOR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.GetCalculatorSubTopic = function () {
        var _this = this;
        this._spinnerService.show();
        var getCalculatorSubTopicRequest = new calculatorSubTopic_1.GetCalculatorSubTopicRequest();
        getCalculatorSubTopicRequest.FEMAModuleId = parseInt(this.frmCompoundingPenaltyCalculator.value.CalculatorTopicId);
        this._calculatorSubTopicService.getCalculatorSubTopic(getCalculatorSubTopicRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            _this.calculatorSubTopics = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.tempCalculatorTopics = data.Response;
                _this.calculatorSubTopics.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.calculatorSubTopics.push({ Value: item.CalculatorSubTopicId, Text: item.CalculatorSubTopicName });
                });
                _this.frmCompoundingPenaltyCalculator.get("CalculatorSubTopicId").setValue("");
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_COMPOUNDING_PENALTY_CALCULATOR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_COMPOUNDING_PENALTY_CALCULATOR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.GetNewReportingMinimumDate = function (formData) {
        var currentReceiptDate = new Date(formData.ContraventionDate.year + '-' + formData.ContraventionDate.month + '-' + formData.ContraventionDate.day);
        var day = 60 * 60 * 24 * 1000;
        return new Date(currentReceiptDate.getTime() + day);
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.OnCalculatorTopicChange = function () {
        this.calculatorSubTopics = [];
        if (this.frmCompoundingPenaltyCalculator.value.CalculatorTopicId)
            this.GetCalculatorSubTopic();
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.OnCalculatorSubTopicChange = function () {
        var _this = this;
        this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").enable();
        this.frmCompoundingPenaltyCalculator.get("TotalAPR_AAC_FCGPR").enable();
        this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").setValue(0);
        this.frmCompoundingPenaltyCalculator.get("TotalAPR_AAC_FCGPR").setValue(0);
        this.frmCompoundingPenaltyCalculator.get("ContraventionDate").setValue(null);
        this.frmCompoundingPenaltyCalculator.get("ReportingDate").setValue(null);
        if (this.frmCompoundingPenaltyCalculator.value.CalculatorSubTopicId) {
            this.isContraventionAmountDisabled = !this.tempCalculatorTopics.filter(function (x) { return x.CalculatorSubTopicId == _this.frmCompoundingPenaltyCalculator.value.CalculatorSubTopicId; })[0].IsAmountOfContraventionNeeded;
            this.isTotalAPR_AAC_FCGPRDisabled = !this.tempCalculatorTopics.filter(function (x) { return x.CalculatorSubTopicId == _this.frmCompoundingPenaltyCalculator.value.CalculatorSubTopicId; })[0].IsTotalNoOfAPR_AAC_FCGPRNeeded;
            if (this.isContraventionAmountDisabled)
                this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").disable();
            if (this.isTotalAPR_AAC_FCGPRDisabled)
                this.frmCompoundingPenaltyCalculator.get("TotalAPR_AAC_FCGPR").disable();
            else {
                this.frmCompoundingPenaltyCalculator.get("ContraventionDate").setValue(this.contraventionMinDate);
                this.frmCompoundingPenaltyCalculator.get("ReportingDate").setValue(this.reportingMinDate);
                this.frmCompoundingPenaltyCalculator.updateValueAndValidity();
            }
        }
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.OnChangeContraventionDate = function () {
        this.frmCompoundingPenaltyCalculator.get("ReportingDate").setValue("");
        if (this.frmCompoundingPenaltyCalculator.value.ContraventionDate) {
            var newReportingMinimumDate = this.GetNewReportingMinimumDate(this.frmCompoundingPenaltyCalculator.value);
            this.reportingMinDate = { year: newReportingMinimumDate.getFullYear(), month: newReportingMinimumDate.getMonth() + 1, day: newReportingMinimumDate.getDate() };
        }
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.OnChangeAmount = function () {
        if (isNaN(Number(this.frmCompoundingPenaltyCalculator.value.ContraventionAmount)))
            this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").setValue(0);
        if (isNaN(Number(this.frmCompoundingPenaltyCalculator.value.TotalAPR_AAC_FCGPR)))
            this.frmCompoundingPenaltyCalculator.get("TotalAPR_AAC_FCGPR").setValue(0);
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.OnChangeReportingDate = function () {
        var contraventionDate = new Date(this.frmCompoundingPenaltyCalculator.value.ContraventionDate.year + '-' + this.frmCompoundingPenaltyCalculator.value.ContraventionDate.month + '-' + this.frmCompoundingPenaltyCalculator.value.ContraventionDate.day);
        var reportingDate = new Date(this.frmCompoundingPenaltyCalculator.value.ReportingDate.year + '-' + this.frmCompoundingPenaltyCalculator.value.ReportingDate.month + '-' + this.frmCompoundingPenaltyCalculator.value.ReportingDate.day);
        var differenceBetweenReceiptAndReportingDate = new Date(reportingDate - contraventionDate);
        var yearNo = differenceBetweenReceiptAndReportingDate.toISOString().slice(0, 4) - 1970;
        var monthNo = differenceBetweenReceiptAndReportingDate.getMonth();
        var dayNo = differenceBetweenReceiptAndReportingDate.getDate();
        var years = "";
        if (contraventionDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
            years = (yearNo == 0) ? '' : yearNo + ' year ';
            years += (yearNo > 0 && monthNo == 0) ? monthNo + ' month ' : (monthNo == 0) ? '' : monthNo + ' month ';
            years += (yearNo > 0 && monthNo == 0) ? dayNo + ' day ' : dayNo + ' day ';
        }
        else {
            years = (yearNo == 0 || (yearNo == 1 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1ST_YEAR :
                (yearNo == 1 || (yearNo == 2 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_2_YEARS :
                    (yearNo == 2 || (yearNo == 3 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_2_TO_3_YEARS :
                        (yearNo == 3 || (yearNo == 4 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_3_TO_4_YEARS :
                            (yearNo == 4 || (yearNo == 5 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_4_TO_5_YEARS :
                                (yearNo > 5 || (yearNo == 5 && (monthNo > 0 || dayNo > 0))) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_GRATER_THAN_5_YEARS : '';
        }
        this.frmCompoundingPenaltyCalculator.get("Years").setValue(years);
        this.frmCompoundingPenaltyCalculator.get("NoOfYear").setValue((yearNo + (monthNo / 12) + (dayNo / 365)).toFixed(2));
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.GetPenaltyDetail = function () {
        var _this = this;
        this._spinnerService.show();
        var getPenaltyDetailRequest = new penaltyDetail_1.GetPenaltyDetailRequest();
        getPenaltyDetailRequest.CalculatorID = global_1.Global.COMMON_FIELD_COMPOUNDING_PENALTY_CALCULATOR;
        getPenaltyDetailRequest.CalculatorSubTopicID = parseInt(this.frmCompoundingPenaltyCalculator.get("CalculatorSubTopicId").value);
        this._penaltyDetailService.getPenaltyDetail(getPenaltyDetailRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.penaltyDetails = data.Response;
                _this.compundingPenaltyCalculator = [];
                _this.Disclaimer = [];
                var tempPenaltyDetails = _this.penaltyDetails.filter(function (x) { return x.IsFixedPenalty == true; });
                var contraventionDate = new Date(_this.frmCompoundingPenaltyCalculator.value.ContraventionDate.year + '-' + _this.frmCompoundingPenaltyCalculator.value.ContraventionDate.month + '-' + _this.frmCompoundingPenaltyCalculator.value.ContraventionDate.day);
                var reportingDate = new Date(_this.frmCompoundingPenaltyCalculator.value.ReportingDate.year + '-' + _this.frmCompoundingPenaltyCalculator.value.ReportingDate.month + '-' + _this.frmCompoundingPenaltyCalculator.value.ReportingDate.day);
                var differenceBetweenReceiptAndReportingDate = new Date(reportingDate - contraventionDate);
                var yearNo = differenceBetweenReceiptAndReportingDate.toISOString().slice(0, 4) - 1970;
                var monthNo = differenceBetweenReceiptAndReportingDate.getMonth();
                var dayNo = differenceBetweenReceiptAndReportingDate.getDate();
                if (contraventionDate > global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE)
                    _this.compundingPenaltyCalculator.push({ PenaltyParticulars: "Fixed Penalty", Amount: tempPenaltyDetails[0].AmountAfter07November2017 });
                else
                    _this.compundingPenaltyCalculator.push({ PenaltyParticulars: "Fixed Penalty", Amount: tempPenaltyDetails[0].Amount });
                var range_1 = "";
                var amount = 0;
                var years_1 = (yearNo == 0 || (yearNo == 1 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1ST_YEAR :
                    (yearNo == 1 || (yearNo == 2 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_2_YEARS :
                        (yearNo == 2 || (yearNo == 3 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_2_TO_3_YEARS :
                            (yearNo == 3 || (yearNo == 4 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_3_TO_4_YEARS :
                                (yearNo == 4 || (yearNo == 5 && monthNo == 0 && dayNo == 0)) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_4_TO_5_YEARS :
                                    (yearNo > 5 || (yearNo == 5 && (monthNo > 0 || dayNo > 0))) ? global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_GRATER_THAN_5_YEARS : '';
                tempPenaltyDetails = _this.penaltyDetails;
                if (contraventionDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                    tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.IsFixedPenalty == false; });
                    if (_this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value <= 1000000)
                        range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_UPTO_10_LAKHS;
                    else if (_this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value > 1000000 && _this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value <= 4000000)
                        range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_40_LAKHS;
                    else if (_this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value > 4000000 && _this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value <= 10000000)
                        range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_40_TO_100_LAKHS;
                    else if (_this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value > 10000000 && _this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value <= 100000000)
                        range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_10_CRORE;
                    else if (_this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value > 100000000 && _this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value <= 1000000000)
                        range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_100_CRORE;
                    else if (_this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value > 1000000000)
                        range_1 = global_1.Global.FDI_PENALTY_CALCULATOR_RANGE_ABOVE_100_CRORE;
                    if (_this.isTotalAPR_AAC_FCGPRDisabled) {
                        if (_this.isTotalAPR_AAC_FCGPRDisabled && !_this.isContraventionAmountDisabled) {
                            tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.Range == range_1 || x.Range == years_1; });
                        }
                        if (tempPenaltyDetails.length > 0)
                            amount = tempPenaltyDetails[0].Amount * (tempPenaltyDetails[0].Range == years_1 ? _this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value : _this.frmCompoundingPenaltyCalculator.get("NoOfYear").value);
                    }
                    else {
                        if (tempPenaltyDetails.length > 0)
                            amount = tempPenaltyDetails[0].Amount * parseInt(_this.frmCompoundingPenaltyCalculator.get("TotalAPR_AAC_FCGPR").value);
                    }
                    _this.compundingPenaltyCalculator.push({ PenaltyParticulars: "Variable Amount", Amount: Math.round(amount) });
                }
                else {
                    if (contraventionDate <= global_1.Global.FDI_PENALTY_CALCULATOR_FIXED_DATE) {
                        years_1 = (yearNo == 0) ? '' : yearNo + ' year ';
                        years_1 += (yearNo > 0 && monthNo == 0) ? monthNo + ' month ' : (monthNo == 0) ? '' : monthNo + ' month ';
                        years_1 += (yearNo > 0 && monthNo == 0) ? dayNo + ' day ' : dayNo + ' day ';
                    }
                    if (_this.isTotalAPR_AAC_FCGPRDisabled) {
                        if (_this.isTotalAPR_AAC_FCGPRDisabled && !_this.isContraventionAmountDisabled) {
                            tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.IsFixedPenalty == false && x.RangeAfter07November2017 == years_1; });
                        }
                        if (tempPenaltyDetails.length > 0)
                            amount = tempPenaltyDetails[0].AmountAfter07November2017 * _this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").value;
                    }
                    else {
                        tempPenaltyDetails = tempPenaltyDetails.filter(function (x) { return x.IsFixedPenalty == false; });
                        if (tempPenaltyDetails.length > 0)
                            amount = tempPenaltyDetails[0].AmountAfter07November2017 * parseInt(_this.frmCompoundingPenaltyCalculator.get("TotalAPR_AAC_FCGPR").value);
                    }
                    _this.compundingPenaltyCalculator.push({ PenaltyParticulars: "Variable Amount", Amount: Math.round(amount) });
                }
                _this.compundingPenaltyCalculator.push({
                    PenaltyParticulars: "Penalty for Shares not allotted but refunded with / without approval",
                    Amount: Math.round(tempPenaltyDetails[0].ExtraPenaltyRange > 0 ? ((_this.compundingPenaltyCalculator[0].Amount + _this.compundingPenaltyCalculator[1].Amount) * ((tempPenaltyDetails[0].ExtraPenaltyRange - 1) * 100) / 100) : 0)
                });
                _this.compundingPenaltyCalculator.push({
                    PenaltyParticulars: "Additional Penalty (50% of Fixed + Variable + Other if compounded earlier)for the same offence",
                    Amount: Math.round((_this.frmCompoundingPenaltyCalculator.get("WhetherSameOffence").value == "true") ? ((parseFloat(_this.compundingPenaltyCalculator[0].Amount) + parseFloat(_this.compundingPenaltyCalculator[1].Amount) + parseFloat(_this.compundingPenaltyCalculator[2].Amount)) * 50) / 100 : 0)
                });
                _this.compundingPenaltyCalculator.push({
                    PenaltyParticulars: "TOTAL PENALTY",
                    Amount: Math.round(parseFloat(_this.compundingPenaltyCalculator[0].Amount) + parseFloat(_this.compundingPenaltyCalculator[1].Amount) + parseFloat(_this.compundingPenaltyCalculator[2].Amount) + parseFloat(_this.compundingPenaltyCalculator[3].Amount))
                });
                _this.Disclaimer.push({
                    PenaltyParticulars: "DISCLAIMER : The above calculator is only to enable the user to have a quick and easy access to approximation of compounding penalty calculation as per Compounding Matrix defined by Reserve Bank of India 'RBI' in accordance with Foreign Exchange Management Act 'FEMA' guidelines. All the users are also advised to ascertain the correct position/prevailing law under FEMA for the correct/exact compounding penalty calculation in all circumstances."
                });
                _this.frmCompoundingPenaltyCalculator.get("CalculatorTopicId").disable();
                _this.frmCompoundingPenaltyCalculator.get("CalculatorSubTopicId").disable();
                _this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").disable();
                _this.frmCompoundingPenaltyCalculator.get("TotalAPR_AAC_FCGPR").disable();
                _this.frmCompoundingPenaltyCalculator.get("WhetherSameOffence").disable();
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_COMPOUNDING_PENALTY_CALCULATOR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_COMPOUNDING_PENALTY_CALCULATOR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.OnSubmitCompoundingPenaltyCalculator = function (formData) {
        this.isSubmited = true;
        if (this.frmCompoundingPenaltyCalculator.valid) {
            this.isDisabledCompoundingPenaltyCalculator = true;
            if (!this.frmCompoundingPenaltyCalculator.value.ContraventionAmount)
                this.frmCompoundingPenaltyCalculator.value.ContraventionAmount = 0;
            if (!this.frmCompoundingPenaltyCalculator.value.TotalAPR_AAC_FCGPR)
                this.frmCompoundingPenaltyCalculator.value.TotalAPR_AAC_FCGPR = 0;
            this.GetPenaltyDetail();
        }
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.OnClickPrint = function () {
        var columns = ["Penalty Particulars", "Penalty Amount (in INR)"];
        var rows = [];
        this.compundingPenaltyCalculator.forEach(function (item) {
            rows.push([item.PenaltyParticulars, item.Amount]);
        });
        this.Disclaimer.forEach(function (item) {
            rows.push([item.PenaltyParticulars]);
        });
        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(12);
        doc.text(40, 50, 'Compounding Penalty');
        doc.autoTable(columns, rows, {
            createdCell: function (cell, data) {
                if (data.row.index == rows.length - 3) {
                    cell.styles.fontStyle = 'bold';
                }
            },
            margin: { top: 70 },
            styles: {
                overflow: 'linebreak'
            },
            columnStyles: {
                1: { columnWidth: 55 },
            },
            addPageContent: function (data) {
            }
        });
        doc.save('Compounding Penalty Calculator.pdf'); // Generated PDF
    };
    CompoundingPenaltyCalculatorPopupUserComponent.prototype.OnClickReset = function () {
        this.isDisabledCompoundingPenaltyCalculator = false;
        this.frmCompoundingPenaltyCalculator.reset();
        this.frmCompoundingPenaltyCalculator.get("CalculatorTopicId").setValue("");
        this.isContraventionAmountDisabled = false;
        this.isTotalAPR_AAC_FCGPRDisabled = false;
        this.frmCompoundingPenaltyCalculator.get("CalculatorTopicId").enable();
        this.frmCompoundingPenaltyCalculator.get("CalculatorSubTopicId").enable();
        this.frmCompoundingPenaltyCalculator.get("ContraventionAmount").enable();
        this.frmCompoundingPenaltyCalculator.get("TotalAPR_AAC_FCGPR").enable();
        this.frmCompoundingPenaltyCalculator.get("WhetherSameOffence").enable();
        this.calculatorSubTopics = [];
        this.isSubmited = false;
    };
    CompoundingPenaltyCalculatorPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './compoundingPenaltyCalculatorPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            commonField_service_1.CommonFieldService,
            calculatorSubTopic_service_1.CalculatorSubTopicUserService,
            penaltyDetail_service_1.PenaltyDetailUserService,
            platform_browser_1.DomSanitizer])
    ], CompoundingPenaltyCalculatorPopupUserComponent);
    return CompoundingPenaltyCalculatorPopupUserComponent;
}());
exports.CompoundingPenaltyCalculatorPopupUserComponent = CompoundingPenaltyCalculatorPopupUserComponent;
//# sourceMappingURL=compoundingPenaltyCalculatorPopup.component.js.map