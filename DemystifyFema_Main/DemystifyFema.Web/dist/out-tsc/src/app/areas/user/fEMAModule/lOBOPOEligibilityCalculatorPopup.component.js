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
var calculatorAnswer_1 = require("../../../model/calculatorAnswer");
var calculatorAnswer_service_1 = require("../../../service/user/calculatorAnswer.service");
var commonField_service_1 = require("../../../service/common/commonField.service");
var LOBOPOEligibilityCalculatorPopupUserComponent = /** @class */ (function () {
    function LOBOPOEligibilityCalculatorPopupUserComponent(formBuilder, _spinnerService, _toastrService, _calculatorAnswerService, _commonFieldService, sanitizer) {
        this.formBuilder = formBuilder;
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._calculatorAnswerService = _calculatorAnswerService;
        this._commonFieldService = _commonFieldService;
        this.sanitizer = sanitizer;
        this.natureOfOffices = [];
        this.applicantEntities = [];
        this.sectoralCaps = [];
        this.sectors = [];
        this.applicantCountries = [];
        this.statesOfIndia = [];
        this.profitMakings1stYear = [];
        this.profitMakings2ndYear = [];
        this.profitMakings3rdYear = [];
        this.profitMakings4thYear = [];
        this.profitMakings5thYear = [];
        this.netWorths1stYear = [];
        this.netWorths2ndYear = [];
        this.netWorths3rdYear = [];
        this.netWorths4thYear = [];
        this.netWorths5thYear = [];
        this.whetherSubsidiaryOfAnotherCompany = [];
        this.subSidiaryCompanyProfitMakings1stYear = [];
        this.subSidiaryCompanyProfitMakings2ndYear = [];
        this.subSidiaryCompanyProfitMakings3rdYear = [];
        this.subSidiaryCompanyProfitMakings4thYear = [];
        this.subSidiaryCompanyProfitMakings5thYear = [];
        this.subSidiaryCompanyNetWorths1stYear = [];
        this.subSidiaryCompanyNetWorths2ndYear = [];
        this.subSidiaryCompanyNetWorths3rdYear = [];
        this.subSidiaryCompanyNetWorths4thYear = [];
        this.subSidiaryCompanyNetWorths5thYear = [];
        this.whetherLetterOfComfortAvailable = [];
        this.whetherBOsComplyWithChapterXXIIOfCompaniesAct2013 = [];
        this.whetherBOFuntionOnStandAloneBasis = [];
        this.placeOfEstablishmentOfBO = [];
        this.whetherYouHaveSecuredContractFromAnIndianCompanyForExecutingTheContract = [];
        this.fundedDirectlyByInwardRemittanceFromAbroad = [];
        this.fundedByBilateralOrMultilateralInternationalFinancingAgency = [];
        this.clearedByAnAppropriateAuthority = [];
        this.publicFinancialInstitution = [];
        this.lOBOPOEligibilities = [];
        this.isDisabledLOBOPOEligibility = false;
        this.isSubmited = false;
        this.isLO = false;
        this.isBO = false;
        this.isPO = false;
        this.isSubsidiaryCompanyLO = false;
        this.isSubsidiaryCompanyBO = false;
    }
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.GetNatureOfOffice();
        this.frmLOEligibilityCalculator = this.formBuilder.group({
            NatureOfOfficeId: ['', forms_1.Validators.required],
            ApplicantEntityId: ['', forms_1.Validators.required],
            SectoralCapId: ['', forms_1.Validators.required],
            SectorId: ['', forms_1.Validators.required],
            ApplicantCountryId: ['', forms_1.Validators.required],
            StateOfIndiaId: ['', forms_1.Validators.required],
            ProfitMaking1stYear: ['', forms_1.Validators.required],
            ProfitMaking2ndYear: ['', forms_1.Validators.required],
            ProfitMaking3rdYear: ['', forms_1.Validators.required],
            NetWorth1stYear: ['', forms_1.Validators.required],
            NetWorth2ndYear: ['', forms_1.Validators.required],
            NetWorth3rdYear: ['', forms_1.Validators.required],
            WhetherSubsidiaryOfAnotherCompany: [''],
            SubSidiaryCompanyProfitMaking1stYear: [''],
            SubSidiaryCompanyProfitMaking2ndYear: [''],
            SubSidiaryCompanyProfitMaking3rdYear: [''],
            SubSidiaryCompanyNetWorth1stYear: [''],
            SubSidiaryCompanyNetWorth2ndYear: [''],
            SubSidiaryCompanyNetWorth3rdYear: [''],
            WhetherLetterOfComfortAvailable: ['']
        });
        this.frmBOEligibilityCalculator = this.formBuilder.group({
            NatureOfOfficeId: ['', forms_1.Validators.required],
            PlaceOfEstablishmentId: ['', forms_1.Validators.required],
            ApplicantEntityId: ['', forms_1.Validators.required],
            SectoralCapId: ['', forms_1.Validators.required],
            SectorId: ['', forms_1.Validators.required],
            ApplicantCountryId: ['', forms_1.Validators.required],
            StateOfIndiaId: ['', forms_1.Validators.required],
            ProfitMaking1stYear: ['', forms_1.Validators.required],
            ProfitMaking2ndYear: ['', forms_1.Validators.required],
            ProfitMaking3rdYear: ['', forms_1.Validators.required],
            ProfitMaking4thYear: ['', forms_1.Validators.required],
            ProfitMaking5thYear: ['', forms_1.Validators.required],
            NetWorth1stYear: ['', forms_1.Validators.required],
            NetWorth2ndYear: ['', forms_1.Validators.required],
            NetWorth3rdYear: ['', forms_1.Validators.required],
            NetWorth4thYear: ['', forms_1.Validators.required],
            NetWorth5thYear: ['', forms_1.Validators.required],
            WhetherSubsidiaryOfAnotherCompany: [''],
            SubSidiaryCompanyProfitMaking1stYear: [''],
            SubSidiaryCompanyProfitMaking2ndYear: [''],
            SubSidiaryCompanyProfitMaking3rdYear: [''],
            SubSidiaryCompanyProfitMaking4thYear: [''],
            SubSidiaryCompanyProfitMaking5thYear: [''],
            SubSidiaryCompanyNetWorth1stYear: [''],
            SubSidiaryCompanyNetWorth2ndYear: [''],
            SubSidiaryCompanyNetWorth3rdYear: [''],
            SubSidiaryCompanyNetWorth4thYear: [''],
            SubSidiaryCompanyNetWorth5thYear: [''],
            WhetherLetterOfComfortAvailable: [''],
            WhetherBOsComplyWithChapterXXIIOfCompaniesAct2013: [''],
            WhetherBOFuntionOnStandAloneBasis: ['']
        });
        this.frmPOEligibilityCalculator = this.formBuilder.group({
            NatureOfOfficeId: ['', forms_1.Validators.required],
            ApplicantEntityId: ['', forms_1.Validators.required],
            SectoralCapId: ['', forms_1.Validators.required],
            SectorId: ['', forms_1.Validators.required],
            ApplicantCountryId: ['', forms_1.Validators.required],
            StateOfIndiaId: ['', forms_1.Validators.required],
            WhetherYouHaveSecuredContractFromAnIndianCompanyForExecutingTheContract: ['', forms_1.Validators.required],
            FundedDirectlyByInwardRemittanceFromAbroad: [''],
            FundedByBilateralOrMultilateralInternationalFinancingAgency: [''],
            ClearedByAnAppropriateAuthority: [''],
            PublicFinancialInstitution: ['']
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetNatureOfOffice = function () {
        var _this = this;
        this._spinnerService.show();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_FEMA_MODULE;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            _this.natureOfOffices = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.natureOfOffices.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    if (item.FieldId == 5 || item.FieldId == 6 || item.FieldId == 7)
                        _this.natureOfOffices.push({ Value: item.FieldId, Text: item.FieldName });
                });
                _this.natureOfOfficeId = "";
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetCalculatorAnswer = function () {
        var _this = this;
        this._spinnerService.show();
        var getCalculatorAnswerRequest = new calculatorAnswer_1.GetCalculatorAnswerRequest();
        getCalculatorAnswerRequest.FEMAModuleId = parseInt(this.natureOfOfficeId);
        this._calculatorAnswerService.getCalculatorAnswer(getCalculatorAnswerRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.calculatorAnswers = data.Response;
                if (_this.isBO)
                    _this.GetPlaceOfEstablishmentOfBO();
                _this.GetNetWorth();
                _this.GetApplicantEntity();
                _this.GetSectoralCap();
                _this.GetSector();
                _this.GetApplicantCountry();
                _this.GetStateOfIndia();
                _this.GetProfitMakingYear();
                _this.GetNetWorth();
                _this.GetWhetherSubsidiaryOrLetter();
                _this.GetWhetherBOComplyWithChapterOrFunctionOnStandAlone();
                _this.GetAdditionalCriteriaOfPO();
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.OnChangeNatureOfOffice = function () {
        var _this = this;
        this.isLO = false;
        this.isBO = false;
        this.isPO = false;
        this.isSubmited = false;
        if (this.natureOfOfficeId) {
            if (this.natureOfOfficeId == "5") {
                this.isLO = true;
            }
            else if (this.natureOfOfficeId == "6") {
                this.isBO = true;
            }
            else if (this.natureOfOfficeId == "7") {
                this.isPO = true;
            }
            this.natureOfOfficeName = this.natureOfOffices.filter(function (x) { return x.Value == _this.natureOfOfficeId; })[0].Text;
            this.GetCalculatorAnswer();
        }
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetPlaceOfEstablishmentOfBO = function () {
        var _this = this;
        this._spinnerService.show();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_PLACE_OF_ESTABLISHMENT_OF_BO;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            _this.placeOfEstablishmentOfBO = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.placeOfEstablishmentOfBO.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.placeOfEstablishmentOfBO.push({ Value: item.FieldId, Text: item.FieldName });
                });
                _this.frmBOEligibilityCalculator.get("PlaceOfEstablishmentId").setValue("");
                _this.frmBOEligibilityCalculator.updateValueAndValidity();
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetApplicantEntity = function () {
        var _this = this;
        this.applicantEntities = [];
        this.applicantEntities.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_APPLICANT_ENTITY_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_APPLICANT_ENTITY_BO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_APPLICANT_ENTITY_PO)
                _this.applicantEntities.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetSectoralCap = function () {
        var _this = this;
        this.sectoralCaps = [];
        this.sectoralCaps.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_SECTORAL_CAP_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_SECTORAL_CAP_BO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_SECTORAL_CAP_PO)
                _this.sectoralCaps.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetSector = function () {
        var _this = this;
        this.sectors = [];
        this.sectors.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_SECTOR_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_SECTOR_BO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_SECTOR_PO)
                _this.sectors.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetApplicantCountry = function () {
        var _this = this;
        this.applicantCountries = [];
        this.applicantCountries.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_APPLICANT_COUNTRY_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_APPLICANT_COUNTRY_BO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_APPLICANT_COUNTRY_PO)
                _this.applicantCountries.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetStateOfIndia = function () {
        var _this = this;
        this.statesOfIndia = [];
        this.statesOfIndia.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_STATE_OF_INDIA_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_STATE_OF_INDIA_BO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_STATE_OF_INDIA_PO)
                _this.statesOfIndia.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.OnChangeApplicantCountry = function () {
        if (this.frmLOEligibilityCalculator.get("ApplicantCountryId").value == 18) {
            this.GetStateOfIndia();
            this.frmLOEligibilityCalculator.get("StateOfIndiaId").setValue(27);
            this.frmLOEligibilityCalculator.get("StateOfIndiaId").disable();
            this.frmLOEligibilityCalculator.updateValueAndValidity();
        }
        else {
            this.frmLOEligibilityCalculator.get("StateOfIndiaId").enable();
            this.statesOfIndia = this.statesOfIndia.filter(function (x) { return x.Value != "27"; });
        }
        if (this.frmBOEligibilityCalculator.get("ApplicantCountryId").value == 61) {
            this.GetStateOfIndia();
            this.frmBOEligibilityCalculator.get("StateOfIndiaId").setValue(70);
            this.frmBOEligibilityCalculator.get("StateOfIndiaId").disable();
            this.frmBOEligibilityCalculator.updateValueAndValidity();
        }
        else {
            this.frmBOEligibilityCalculator.get("StateOfIndiaId").enable();
            this.statesOfIndia = this.statesOfIndia.filter(function (x) { return x.Value != "70"; });
        }
        if (this.frmPOEligibilityCalculator.get("ApplicantCountryId").value == 108) {
            this.GetStateOfIndia();
            this.frmPOEligibilityCalculator.get("StateOfIndiaId").setValue(117);
            this.frmPOEligibilityCalculator.get("StateOfIndiaId").disable();
            this.frmPOEligibilityCalculator.updateValueAndValidity();
        }
        else {
            this.frmPOEligibilityCalculator.get("StateOfIndiaId").enable();
            this.statesOfIndia = this.statesOfIndia.filter(function (x) { return x.Value != "117"; });
        }
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetProfitMakingYear = function () {
        var _this = this;
        this.profitMakings1stYear = [];
        this.subSidiaryCompanyProfitMakings1stYear = [];
        this.profitMakings1stYear.push({ Value: "", Text: "--Select--" });
        this.subSidiaryCompanyProfitMakings1stYear.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_BO) {
                _this.profitMakings1stYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
                _this.subSidiaryCompanyProfitMakings1stYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            }
        });
        this.profitMakings2ndYear = [];
        this.subSidiaryCompanyProfitMakings2ndYear = [];
        this.profitMakings2ndYear.push({ Value: "", Text: "--Select--" });
        this.subSidiaryCompanyProfitMakings2ndYear.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_BO) {
                _this.profitMakings2ndYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
                _this.subSidiaryCompanyProfitMakings2ndYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            }
        });
        this.profitMakings3rdYear = [];
        this.subSidiaryCompanyProfitMakings3rdYear = [];
        this.profitMakings3rdYear.push({ Value: "", Text: "--Select--" });
        this.subSidiaryCompanyProfitMakings3rdYear.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_BO) {
                _this.profitMakings3rdYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
                _this.subSidiaryCompanyProfitMakings3rdYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            }
        });
        this.profitMakings4thYear = [];
        this.subSidiaryCompanyProfitMakings4thYear = [];
        this.profitMakings4thYear.push({ Value: "", Text: "--Select--" });
        this.subSidiaryCompanyProfitMakings4thYear.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_BO) {
                _this.profitMakings4thYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
                _this.subSidiaryCompanyProfitMakings4thYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            }
        });
        this.profitMakings5thYear = [];
        this.subSidiaryCompanyProfitMakings5thYear = [];
        this.profitMakings5thYear.push({ Value: "", Text: "--Select--" });
        this.subSidiaryCompanyProfitMakings5thYear.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_BO) {
                _this.profitMakings5thYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
                _this.subSidiaryCompanyProfitMakings5thYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            }
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetNetWorth = function () {
        var _this = this;
        this.netWorths1stYear = [];
        this.subSidiaryCompanyNetWorths1stYear = [];
        this.netWorths1stYear.push({ Value: "", Text: "--Select--" });
        this.subSidiaryCompanyNetWorths1stYear.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_NET_WORTH_YEAR_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_NET_WORTH_YEAR_BO) {
                _this.netWorths1stYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
                _this.subSidiaryCompanyNetWorths1stYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            }
        });
        this.netWorths2ndYear = [];
        this.subSidiaryCompanyNetWorths2ndYear = [];
        this.netWorths2ndYear.push({ Value: "", Text: "--Select--" });
        this.subSidiaryCompanyNetWorths2ndYear.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_NET_WORTH_YEAR_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_NET_WORTH_YEAR_BO) {
                _this.netWorths2ndYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
                _this.subSidiaryCompanyNetWorths2ndYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            }
        });
        this.netWorths3rdYear = [];
        this.subSidiaryCompanyNetWorths3rdYear = [];
        this.netWorths3rdYear.push({ Value: "", Text: "--Select--" });
        this.subSidiaryCompanyNetWorths3rdYear.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_NET_WORTH_YEAR_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_NET_WORTH_YEAR_BO) {
                _this.netWorths3rdYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
                _this.subSidiaryCompanyNetWorths3rdYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            }
        });
        this.netWorths4thYear = [];
        this.subSidiaryCompanyNetWorths4thYear = [];
        this.netWorths4thYear.push({ Value: "", Text: "--Select--" });
        this.subSidiaryCompanyNetWorths4thYear.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_NET_WORTH_YEAR_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_NET_WORTH_YEAR_BO) {
                _this.netWorths4thYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
                _this.subSidiaryCompanyNetWorths4thYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            }
        });
        this.netWorths5thYear = [];
        this.subSidiaryCompanyNetWorths5thYear = [];
        this.netWorths5thYear.push({ Value: "", Text: "--Select--" });
        this.subSidiaryCompanyNetWorths5thYear.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_NET_WORTH_YEAR_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_NET_WORTH_YEAR_BO) {
                _this.netWorths5thYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
                _this.subSidiaryCompanyNetWorths5thYear.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            }
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetWhetherSubsidiaryOrLetter = function () {
        var _this = this;
        this.whetherSubsidiaryOfAnotherCompany = [];
        this.whetherLetterOfComfortAvailable = [];
        this.whetherSubsidiaryOfAnotherCompany.push({ Value: "", Text: "--Select--" });
        this.whetherLetterOfComfortAvailable.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_WHETHER_SUBSIDIARY_OF_ANOTHER_COMPANY_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_WHETHER_SUBSIDIARY_OF_ANOTHER_COMPANY_BO)
                _this.whetherSubsidiaryOfAnotherCompany.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_WHETHER_LETTER_OF_COMFORT_AVAILABLE_LO || item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_WHETHER_LETTER_OF_COMFORT_AVAILABLE_BO)
                _this.whetherLetterOfComfortAvailable.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetWhetherBOComplyWithChapterOrFunctionOnStandAlone = function () {
        var _this = this;
        this.whetherBOsComplyWithChapterXXIIOfCompaniesAct2013 = [];
        this.whetherBOFuntionOnStandAloneBasis = [];
        this.whetherBOsComplyWithChapterXXIIOfCompaniesAct2013.push({ Value: "", Text: "--Select--" });
        this.whetherBOFuntionOnStandAloneBasis.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_WHETHER_BOS_COMPLY_WITH_CHAPTER_XXII_OF_COMPANIES_ACT_2013_BO)
                _this.whetherBOsComplyWithChapterXXIIOfCompaniesAct2013.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_WHETHER_BO_FUNTION_ON_STANDALONE_BASIS_BO)
                _this.whetherBOFuntionOnStandAloneBasis.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.GetAdditionalCriteriaOfPO = function () {
        var _this = this;
        this.whetherYouHaveSecuredContractFromAnIndianCompanyForExecutingTheContract = [];
        this.fundedDirectlyByInwardRemittanceFromAbroad = [];
        this.fundedByBilateralOrMultilateralInternationalFinancingAgency = [];
        this.clearedByAnAppropriateAuthority = [];
        this.publicFinancialInstitution = [];
        this.whetherYouHaveSecuredContractFromAnIndianCompanyForExecutingTheContract.push({ Value: "", Text: "--Select--" });
        this.fundedDirectlyByInwardRemittanceFromAbroad.push({ Value: "", Text: "--Select--" });
        this.fundedByBilateralOrMultilateralInternationalFinancingAgency.push({ Value: "", Text: "--Select--" });
        this.clearedByAnAppropriateAuthority.push({ Value: "", Text: "--Select--" });
        this.publicFinancialInstitution.push({ Value: "", Text: "--Select--" });
        this.calculatorAnswers.forEach(function (item) {
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_WHETHER_YOU_HAVE_SECURED_CONTRACT_FROM_AN_INDIAN_COMPANY_FOR_EXECUTING_THECONTRACT_PO)
                _this.whetherYouHaveSecuredContractFromAnIndianCompanyForExecutingTheContract.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_FUNDED_DIRECTLY_BY_INWARD_REMITTANCE_FROM_ABROAD_PO)
                _this.fundedDirectlyByInwardRemittanceFromAbroad.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_FUNDED_BY_BILATERAL_OR_MULTILATERAL_INTERNATIONAL_FINANCING_AGENCY_PO)
                _this.fundedByBilateralOrMultilateralInternationalFinancingAgency.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_CLEARED_BY_AN_APPROPRIATE_AUTHORITY_PO)
                _this.clearedByAnAppropriateAuthority.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
            if (item.CalculatorQuestionId == global_1.Global.QUESTION_TEXT_PUBLIC_FINANCIAL_INSTITUTION_PO)
                _this.publicFinancialInstitution.push({ Value: item.CalculatorAnswerId, Text: item.Answer });
        });
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.OnChangeProfitMakingAndNetWorth = function () {
        this.isSubsidiaryCompanyLO = false;
        this.isSubsidiaryCompanyBO = false;
        if (this.isLO) {
            if (this.frmLOEligibilityCalculator.get("ProfitMaking1stYear").value && this.frmLOEligibilityCalculator.get("ProfitMaking2ndYear").value && this.frmLOEligibilityCalculator.get("ProfitMaking3rdYear").value && this.frmLOEligibilityCalculator.get("NetWorth1stYear").value && this.frmLOEligibilityCalculator.get("NetWorth2ndYear").value && this.frmLOEligibilityCalculator.get("NetWorth3rdYear").value) {
                var outComeProfitMaking = (this.frmLOEligibilityCalculator.get("ProfitMaking1stYear").value == 33 || this.frmLOEligibilityCalculator.get("ProfitMaking2ndYear").value == 33 || this.frmLOEligibilityCalculator.get("ProfitMaking3rdYear").value == 33) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
                var outComeNetWorth = ((this.frmLOEligibilityCalculator.get("NetWorth1stYear").value == 34 && this.frmLOEligibilityCalculator.get("NetWorth2ndYear").value == 34 && this.frmLOEligibilityCalculator.get("NetWorth3rdYear").value == 34) || (this.frmLOEligibilityCalculator.get("NetWorth1stYear").value == 36 && this.frmLOEligibilityCalculator.get("NetWorth2ndYear").value == 36 && this.frmLOEligibilityCalculator.get("NetWorth3rdYear").value == 36)) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE;
                this.isSubsidiaryCompanyLO = (outComeProfitMaking == global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE && outComeNetWorth == global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE) ? false : true;
            }
        }
        else if (this.isBO) {
            if (this.frmBOEligibilityCalculator.get("ProfitMaking1stYear").value && this.frmBOEligibilityCalculator.get("ProfitMaking2ndYear").value && this.frmBOEligibilityCalculator.get("ProfitMaking3rdYear").value && this.frmBOEligibilityCalculator.get("ProfitMaking4thYear").value && this.frmBOEligibilityCalculator.get("ProfitMaking5thYear").value && this.frmBOEligibilityCalculator.get("NetWorth1stYear").value && this.frmBOEligibilityCalculator.get("NetWorth2ndYear").value && this.frmBOEligibilityCalculator.get("NetWorth3rdYear").value && this.frmBOEligibilityCalculator.get("NetWorth4thYear").value && this.frmBOEligibilityCalculator.get("NetWorth5thYear").value) {
                var outComeProfitMaking = (this.frmBOEligibilityCalculator.get("ProfitMaking1stYear").value == 76 || this.frmBOEligibilityCalculator.get("ProfitMaking2ndYear").value == 76 || this.frmBOEligibilityCalculator.get("ProfitMaking3rdYear").value == 76 || this.frmBOEligibilityCalculator.get("ProfitMaking4thYear").value == 76 || this.frmBOEligibilityCalculator.get("ProfitMaking5thYear").value == 76) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
                var outComeNetWorth = ((this.frmBOEligibilityCalculator.get("NetWorth1stYear").value == 77 && this.frmBOEligibilityCalculator.get("NetWorth2ndYear").value == 77 && this.frmBOEligibilityCalculator.get("NetWorth3rdYear").value == 77 && this.frmBOEligibilityCalculator.get("NetWorth4thYear").value == 77 && this.frmBOEligibilityCalculator.get("NetWorth5thYear").value == 77) || (this.frmBOEligibilityCalculator.get("NetWorth1stYear").value == 132 && this.frmBOEligibilityCalculator.get("NetWorth2ndYear").value == 132 && this.frmBOEligibilityCalculator.get("NetWorth3rdYear").value == 132 && this.frmBOEligibilityCalculator.get("NetWorth4thYear").value == 132 && this.frmBOEligibilityCalculator.get("NetWorth5thYear").value == 132)) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE;
                this.isSubsidiaryCompanyBO = (outComeProfitMaking == global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE && outComeNetWorth == global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE) ? false : true;
            }
        }
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.OnSubmitLOEligibilityCalculator = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.isSubsidiaryCompanyLO &&
            (!this.frmLOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").value ||
                !this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").value ||
                !this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").value ||
                !this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").value ||
                !this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value ||
                !this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value ||
                !this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value ||
                !this.frmLOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").value)) {
            this._toastrService.error("Please select all proper details", global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { closeButton: true });
            return;
        }
        if (this.frmLOEligibilityCalculator.valid) {
            this.isDisabledLOBOPOEligibility = true;
            this.frmLOEligibilityCalculator.get("NatureOfOfficeId").disable();
            this.frmLOEligibilityCalculator.get("ApplicantEntityId").disable();
            this.frmLOEligibilityCalculator.get("SectoralCapId").disable();
            this.frmLOEligibilityCalculator.get("SectorId").disable();
            this.frmLOEligibilityCalculator.get("ApplicantCountryId").disable();
            this.frmLOEligibilityCalculator.get("StateOfIndiaId").disable();
            this.frmLOEligibilityCalculator.get("ProfitMaking1stYear").disable();
            this.frmLOEligibilityCalculator.get("ProfitMaking2ndYear").disable();
            this.frmLOEligibilityCalculator.get("ProfitMaking3rdYear").disable();
            this.frmLOEligibilityCalculator.get("NetWorth1stYear").disable();
            this.frmLOEligibilityCalculator.get("NetWorth2ndYear").disable();
            this.frmLOEligibilityCalculator.get("NetWorth3rdYear").disable();
            this.frmLOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").disable();
            this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").disable();
            this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").disable();
            this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").disable();
            this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").disable();
            this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").disable();
            this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").disable();
            this.frmLOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").disable();
            this.lOBOPOEligibilities = [];
            this.lOBOPOEligibilities.push({
                SrNo: "B",
                Question: "Applicant Entity",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("ApplicantEntityId").value; })[0].Answer,
                //SingleOutcome: "",
                OverallOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("ApplicantEntityId").value; })[0].OutcomeName
            });
            this.lOBOPOEligibilities.push({
                SrNo: "C",
                Question: "Business of Applicant Company",
                UserSelection: "",
                //SingleOutcome: "",
                OverallOutcome: ""
            });
            var overAllOutCome = (this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("SectoralCapId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE || this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("SectorId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "1",
                Question: "Sectoral Cap",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("SectoralCapId").value; })[0].Answer,
                //SingleOutcome: this.calculatorAnswers.filter(x => x.CalculatorAnswerId == this.frmLOEligibilityCalculator.get("SectoralCapId").value)[0].OutcomeName,
                OverallOutcome: overAllOutCome
            });
            this.lOBOPOEligibilities.push({
                SrNo: "2",
                Question: "Sector",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("SectorId").value; })[0].Answer,
                //SingleOutcome: this.calculatorAnswers.filter(x => x.CalculatorAnswerId == this.frmLOEligibilityCalculator.get("SectorId").value)[0].OutcomeName,
                OverallOutcome: ""
            });
            overAllOutCome = (this.frmLOEligibilityCalculator.get("StateOfIndiaId").value == 28) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : (this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("ApplicantCountryId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE || this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("StateOfIndiaId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "D",
                Question: "Applicant's Country of registeration / citizenship",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("ApplicantCountryId").value; })[0].Answer,
                //SingleOutcome: this.calculatorAnswers.filter(x => x.CalculatorAnswerId == this.frmLOEligibilityCalculator.get("ApplicantCountryId").value)[0].OutcomeName,
                OverallOutcome: overAllOutCome
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "State / Region in India in which office shall be established",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("StateOfIndiaId").value; })[0].Answer,
                //SingleOutcome: this.calculatorAnswers.filter(x => x.CalculatorAnswerId == this.frmLOEligibilityCalculator.get("StateOfIndiaId").value)[0].OutcomeName,
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "E",
                Question: "Profit Making Criteria & Net Worth Criteria",
                UserSelection: "",
                //SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "1",
                Question: "Profit Making Track Record",
                UserSelection: "",
                //SingleOutcome: "",
                OverallOutcome: ""
            });
            overAllOutCome = (this.frmLOEligibilityCalculator.get("ProfitMaking1stYear").value == 33 || this.frmLOEligibilityCalculator.get("ProfitMaking2ndYear").value == 33 || this.frmLOEligibilityCalculator.get("ProfitMaking3rdYear").value == 33) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "1st Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("ProfitMaking1stYear").value; })[0].Answer,
                //SingleOutcome: (this.isSubsidiaryCompanyLO) ? overAllOutCome : "",
                OverallOutcome: (!this.isSubsidiaryCompanyLO) ? overAllOutCome : ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "2nd Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("ProfitMaking2ndYear").value; })[0].Answer,
                //SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "3rd Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("ProfitMaking3rdYear").value; })[0].Answer,
                //SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "2",
                Question: "Net Worth",
                UserSelection: "",
                //SingleOutcome: "",
                OverallOutcome: ""
            });
            overAllOutCome = ((this.frmLOEligibilityCalculator.get("NetWorth1stYear").value == 34 && this.frmLOEligibilityCalculator.get("NetWorth2ndYear").value == 34 && this.frmLOEligibilityCalculator.get("NetWorth3rdYear").value == 34) || (this.frmLOEligibilityCalculator.get("NetWorth1stYear").value == 36 && this.frmLOEligibilityCalculator.get("NetWorth2ndYear").value == 36 && this.frmLOEligibilityCalculator.get("NetWorth3rdYear").value == 36)) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "1st Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("NetWorth1stYear").value; })[0].Answer,
                //SingleOutcome: (this.isSubsidiaryCompanyLO) ? overAllOutCome : "",
                OverallOutcome: (!this.isSubsidiaryCompanyLO) ? overAllOutCome : ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "2nd Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("NetWorth2ndYear").value; })[0].Answer,
                //SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "3rd Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("NetWorth3rdYear").value; })[0].Answer,
                //SingleOutcome: "",
                OverallOutcome: ""
            });
            if (this.isSubsidiaryCompanyLO) {
                overAllOutCome = (this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ||
                    ((this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").value == 33 || this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").value == 33 || this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").value == 33)) ||
                    !(((this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value == 34 && this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value == 34 && this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value == 34) || (this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value == 36 && this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value == 36 && this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value == 36))) ||
                    (this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
                this.lOBOPOEligibilities.push({
                    SrNo: "3",
                    Question: "Whether Subsidiary of Another Company (If loss / Networth less than USD 50000)",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").value; })[0].Answer,
                    //SingleOutcome: this.calculatorAnswers.filter(x => x.CalculatorAnswerId == this.frmLOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").value)[0].OutcomeName,
                    OverallOutcome: overAllOutCome
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "4",
                    Question: "Whether Parent satisfies the Track Record and Net Worth Criteria",
                    UserSelection: "",
                    //SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "4a",
                    Question: "Profit Making Track Record",
                    UserSelection: "",
                    //SingleOutcome: "",
                    OverallOutcome: ""
                });
                overAllOutCome = (this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").value == 33 || this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").value == 33 || this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").value == 33) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "1st Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").value; })[0].Answer,
                    //SingleOutcome: overAllOutCome,
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "2nd Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").value; })[0].Answer,
                    //SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "3rd Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").value; })[0].Answer,
                    //SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "4b",
                    Question: "Net Worth",
                    UserSelection: "",
                    //SingleOutcome: "",
                    OverallOutcome: ""
                });
                overAllOutCome = ((this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value == 34 && this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value == 34 && this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value == 34) || (this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value == 36 && this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value == 36 && this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value == 36)) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE;
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "1st Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value; })[0].Answer,
                    //SingleOutcome: overAllOutCome,
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "2nd Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value; })[0].Answer,
                    //SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "3rd Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value; })[0].Answer,
                    //SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "5",
                    Question: "Whether Letter of Comfort available",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmLOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").value; })[0].Answer,
                    //SingleOutcome: this.calculatorAnswers.filter(x => x.CalculatorAnswerId == this.frmLOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").value)[0].OutcomeName,
                    OverallOutcome: ""
                });
            }
            overAllOutCome = (this.lOBOPOEligibilities[0].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                this.lOBOPOEligibilities[2].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                this.lOBOPOEligibilities[4].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                (this.isSubsidiaryCompanyLO ? false : this.lOBOPOEligibilities[8].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ||
                (this.isSubsidiaryCompanyLO ? false : this.lOBOPOEligibilities[12].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ||
                ((this.lOBOPOEligibilities.length >= 16) ? this.lOBOPOEligibilities[15].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : false)) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "Application for " + this.natureOfOfficeName + " can be made under",
                UserSelection: "",
                SingleOutcome: "",
                OverallOutcome: overAllOutCome
            });
        }
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.OnSubmitBOEligibilityCalculator = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmBOEligibilityCalculator.valid) {
            if (this.isSubsidiaryCompanyBO &&
                (!this.frmBOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").value ||
                    !this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").value ||
                    !this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").value ||
                    !this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").value ||
                    !this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking4thYear").value ||
                    !this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking5thYear").value ||
                    !this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value ||
                    !this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value ||
                    !this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value ||
                    !this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth4thYear").value ||
                    !this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth5thYear").value ||
                    !this.frmBOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").value) ||
                (this.frmBOEligibilityCalculator.get("PlaceOfEstablishmentId").value == 2 &&
                    (!this.frmBOEligibilityCalculator.get("WhetherBOsComplyWithChapterXXIIOfCompaniesAct2013").value ||
                        !this.frmBOEligibilityCalculator.get("WhetherBOFuntionOnStandAloneBasis").value))) {
                this._toastrService.error("Please select all proper details", global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { closeButton: true });
                return;
            }
            this.isDisabledLOBOPOEligibility = true;
            this.frmBOEligibilityCalculator.get("NatureOfOfficeId").disable();
            this.frmBOEligibilityCalculator.get("ApplicantEntityId").disable();
            this.frmBOEligibilityCalculator.get("PlaceOfEstablishmentId").disable();
            this.frmBOEligibilityCalculator.get("SectoralCapId").disable();
            this.frmBOEligibilityCalculator.get("SectorId").disable();
            this.frmBOEligibilityCalculator.get("ApplicantCountryId").disable();
            this.frmBOEligibilityCalculator.get("StateOfIndiaId").disable();
            this.frmBOEligibilityCalculator.get("ProfitMaking1stYear").disable();
            this.frmBOEligibilityCalculator.get("ProfitMaking2ndYear").disable();
            this.frmBOEligibilityCalculator.get("ProfitMaking3rdYear").disable();
            this.frmBOEligibilityCalculator.get("ProfitMaking4thYear").disable();
            this.frmBOEligibilityCalculator.get("ProfitMaking5thYear").disable();
            this.frmBOEligibilityCalculator.get("NetWorth1stYear").disable();
            this.frmBOEligibilityCalculator.get("NetWorth2ndYear").disable();
            this.frmBOEligibilityCalculator.get("NetWorth3rdYear").disable();
            this.frmBOEligibilityCalculator.get("NetWorth4thYear").disable();
            this.frmBOEligibilityCalculator.get("NetWorth5thYear").disable();
            this.frmBOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").disable();
            this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").disable();
            this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").disable();
            this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").disable();
            this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking4thYear").disable();
            this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking5thYear").disable();
            this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").disable();
            this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").disable();
            this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").disable();
            this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth4thYear").disable();
            this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth5thYear").disable();
            this.frmBOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").disable();
            this.frmBOEligibilityCalculator.get("WhetherBOsComplyWithChapterXXIIOfCompaniesAct2013").disable();
            this.frmBOEligibilityCalculator.get("WhetherBOFuntionOnStandAloneBasis").disable();
            this.lOBOPOEligibilities = [];
            this.lOBOPOEligibilities.push({
                SrNo: "B",
                Question: "Place of Establishment of Branch Office",
                UserSelection: this.placeOfEstablishmentOfBO.filter(function (x) { return x.Value == _this.frmBOEligibilityCalculator.get("PlaceOfEstablishmentId").value; })[0].Text,
                SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "C",
                Question: "Applicant Entity",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("ApplicantEntityId").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("ApplicantEntityId").value; })[0].OutcomeName
            });
            this.lOBOPOEligibilities.push({
                SrNo: "D",
                Question: "Business of Applicant Company",
                UserSelection: "",
                SingleOutcome: "",
                OverallOutcome: ""
            });
            var overAllOutCome = (this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SectoralCapId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE || this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SectorId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "1",
                Question: "Sectoral Cap",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SectoralCapId").value; })[0].Answer,
                SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SectoralCapId").value; })[0].OutcomeName,
                OverallOutcome: overAllOutCome
            });
            this.lOBOPOEligibilities.push({
                SrNo: "2",
                Question: "Sector",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SectorId").value; })[0].Answer,
                SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SectorId").value; })[0].OutcomeName,
                OverallOutcome: ""
            });
            overAllOutCome = (this.frmBOEligibilityCalculator.get("StateOfIndiaId").value == 28) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : (this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("ApplicantCountryId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE || this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("StateOfIndiaId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "E",
                Question: "Applicant's Country of registeration / citizenship",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("ApplicantCountryId").value; })[0].Answer,
                SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("ApplicantCountryId").value; })[0].OutcomeName,
                OverallOutcome: overAllOutCome
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "State / Region in India in which office shall be established",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("StateOfIndiaId").value; })[0].Answer,
                SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("StateOfIndiaId").value; })[0].OutcomeName,
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "F",
                Question: "Profit Making Criteria & Net Worth Criteria",
                UserSelection: "",
                SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "1",
                Question: "Profit Making Track Record",
                UserSelection: "",
                SingleOutcome: "",
                OverallOutcome: ""
            });
            overAllOutCome = (this.frmBOEligibilityCalculator.get("ProfitMaking1stYear").value == 76 || this.frmBOEligibilityCalculator.get("ProfitMaking2ndYear").value == 76 || this.frmBOEligibilityCalculator.get("ProfitMaking3rdYear").value == 76 || this.frmBOEligibilityCalculator.get("ProfitMaking4thYear").value == 76 || this.frmBOEligibilityCalculator.get("ProfitMaking5thYear").value == 76) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "1st Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("ProfitMaking1stYear").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: overAllOutCome
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "2nd Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("ProfitMaking2ndYear").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "3rd Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("ProfitMaking3rdYear").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "4th Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("ProfitMaking4thYear").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "5th Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("ProfitMaking5thYear").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "2",
                Question: "Net Worth",
                UserSelection: "",
                SingleOutcome: "",
                OverallOutcome: ""
            });
            overAllOutCome = ((this.frmBOEligibilityCalculator.get("NetWorth1stYear").value == 77 && this.frmBOEligibilityCalculator.get("NetWorth2ndYear").value == 77 && this.frmBOEligibilityCalculator.get("NetWorth3rdYear").value == 77 && this.frmBOEligibilityCalculator.get("NetWorth4thYear").value == 77 && this.frmBOEligibilityCalculator.get("NetWorth5thYear").value == 77) || (this.frmBOEligibilityCalculator.get("NetWorth1stYear").value == 132 && this.frmBOEligibilityCalculator.get("NetWorth2ndYear").value == 132 && this.frmBOEligibilityCalculator.get("NetWorth3rdYear").value == 132 && this.frmBOEligibilityCalculator.get("NetWorth4thYear").value == 132 && this.frmBOEligibilityCalculator.get("NetWorth5thYear").value == 132)) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "1st Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("NetWorth1stYear").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: overAllOutCome
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "2nd Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("NetWorth2ndYear").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "3rd Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("NetWorth3rdYear").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "4th Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("NetWorth4thYear").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "5th Year",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("NetWorth5thYear").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: ""
            });
            if (this.isSubsidiaryCompanyBO) {
                overAllOutCome = ((this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ||
                    ((this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").value == 76 || this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").value == 76 || this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").value == 76 || this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking4thYear").value == 76 || this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking5thYear").value == 76) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE) == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                    (((this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value == 77 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value == 77 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value == 77 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth4thYear").value == 77 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth5thYear").value == 77) || (this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value == 132 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value == 132 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value == 132 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth4thYear").value == 132 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth5thYear").value == 132)) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                    (this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE)) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
                this.lOBOPOEligibilities.push({
                    SrNo: "3",
                    Question: "Whether Subsidiary of Another Company (If loss / Networth less than USD 50000)",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").value; })[0].Answer,
                    SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").value; })[0].OutcomeName,
                    OverallOutcome: overAllOutCome
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "4",
                    Question: "Whether Parent satisfies the Track Record and Net Worth Criteria",
                    UserSelection: "",
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "4a",
                    Question: "Profit Making Track Record",
                    UserSelection: "",
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                overAllOutCome = (this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").value == 76 || this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").value == 76 || this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").value == 76 || this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking4thYear").value == 76 || this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking5thYear").value == 76) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "1st Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").value; })[0].Answer,
                    SingleOutcome: overAllOutCome,
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "2nd Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").value; })[0].Answer,
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "3rd Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").value; })[0].Answer,
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "4th Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking4thYear").value; })[0].Answer,
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "5th Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking5thYear").value; })[0].Answer,
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "4b",
                    Question: "Net Worth",
                    UserSelection: "",
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                overAllOutCome = ((this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value == 77 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value == 77 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value == 77 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth4thYear").value == 77 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth5thYear").value == 77) || (this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value == 132 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value == 132 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value == 132 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth4thYear").value == 132 && this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth5thYear").value == 132)) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE;
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "1st Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").value; })[0].Answer,
                    SingleOutcome: overAllOutCome,
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "2nd Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").value; })[0].Answer,
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "3rd Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").value; })[0].Answer,
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "4th Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth4thYear").value; })[0].Answer,
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "",
                    Question: "5th Year",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth5thYear").value; })[0].Answer,
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "5",
                    Question: "Whether Letter of Comfort available",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").value; })[0].Answer,
                    SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").value; })[0].OutcomeName,
                    OverallOutcome: ""
                });
            }
            overAllOutCome = (this.lOBOPOEligibilities[1].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                this.lOBOPOEligibilities[3].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                this.lOBOPOEligibilities[5].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                this.lOBOPOEligibilities[9].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                this.lOBOPOEligibilities[15].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                ((this.lOBOPOEligibilities.length >= 21) ? this.lOBOPOEligibilities[20].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : false)) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
            if (this.frmBOEligibilityCalculator.get("PlaceOfEstablishmentId").value == 2) {
                this.lOBOPOEligibilities.push({
                    SrNo: "G",
                    Question: "Additional Criteria",
                    UserSelection: "",
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                var whetherOutcome = (this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherBOsComplyWithChapterXXIIOfCompaniesAct2013").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE && this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherBOFuntionOnStandAloneBasis").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE;
                this.lOBOPOEligibilities.push({
                    SrNo: "1",
                    Question: "Whether BO's comply with Chapter XXII of Companies Act 2013",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherBOsComplyWithChapterXXIIOfCompaniesAct2013").value; })[0].Answer,
                    SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherBOsComplyWithChapterXXIIOfCompaniesAct2013").value; })[0].OutcomeName,
                    OverallOutcome: whetherOutcome
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "2",
                    Question: "Whether BO funtion on Stand-alone basis",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherBOFuntionOnStandAloneBasis").value; })[0].Answer,
                    SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmBOEligibilityCalculator.get("WhetherBOFuntionOnStandAloneBasis").value; })[0].OutcomeName,
                    OverallOutcome: ""
                });
                overAllOutCome = (overAllOutCome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : whetherOutcome;
            }
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "Application for " + this.natureOfOfficeName + " can be made under",
                UserSelection: "",
                SingleOutcome: "",
                OverallOutcome: overAllOutCome
            });
        }
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.OnSubmitPOEligibilityCalculator = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmPOEligibilityCalculator.valid) {
            if (this.frmPOEligibilityCalculator.get("WhetherYouHaveSecuredContractFromAnIndianCompanyForExecutingTheContract").value == 122) {
                if (!this.frmPOEligibilityCalculator.get("FundedDirectlyByInwardRemittanceFromAbroad").value) {
                    this._toastrService.error("Please select all proper details", global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { closeButton: true });
                    return;
                }
                else {
                    if (this.frmPOEligibilityCalculator.get("FundedDirectlyByInwardRemittanceFromAbroad").value == 124) {
                        if (!this.frmPOEligibilityCalculator.get("FundedByBilateralOrMultilateralInternationalFinancingAgency").value) {
                            this._toastrService.error("Please select all proper details", global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { closeButton: true });
                            return;
                        }
                        else {
                            if (this.frmPOEligibilityCalculator.get("FundedByBilateralOrMultilateralInternationalFinancingAgency").value == 126) {
                                if (!this.frmPOEligibilityCalculator.get("ClearedByAnAppropriateAuthority").value) {
                                    this._toastrService.error("Please select all proper details", global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { closeButton: true });
                                    return;
                                }
                                else {
                                    if (this.frmPOEligibilityCalculator.get("ClearedByAnAppropriateAuthority").value == 128) {
                                        if (!this.frmPOEligibilityCalculator.get("PublicFinancialInstitution").value) {
                                            this._toastrService.error("Please select all proper details", global_1.Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE, { closeButton: true });
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.isDisabledLOBOPOEligibility = true;
            this.frmPOEligibilityCalculator.get("NatureOfOfficeId").disable();
            this.frmPOEligibilityCalculator.get("ApplicantEntityId").disable();
            this.frmPOEligibilityCalculator.get("SectoralCapId").disable();
            this.frmPOEligibilityCalculator.get("SectorId").disable();
            this.frmPOEligibilityCalculator.get("ApplicantCountryId").disable();
            this.frmPOEligibilityCalculator.get("StateOfIndiaId").disable();
            this.frmPOEligibilityCalculator.get("WhetherYouHaveSecuredContractFromAnIndianCompanyForExecutingTheContract").disable();
            this.frmPOEligibilityCalculator.get("FundedDirectlyByInwardRemittanceFromAbroad").disable();
            this.frmPOEligibilityCalculator.get("FundedByBilateralOrMultilateralInternationalFinancingAgency").disable();
            this.frmPOEligibilityCalculator.get("ClearedByAnAppropriateAuthority").disable();
            this.frmPOEligibilityCalculator.get("PublicFinancialInstitution").disable();
            this.lOBOPOEligibilities = [];
            this.lOBOPOEligibilities.push({
                SrNo: "B",
                Question: "Applicant Entity",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("ApplicantEntityId").value; })[0].Answer,
                SingleOutcome: "",
                OverallOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("ApplicantEntityId").value; })[0].OutcomeName
            });
            this.lOBOPOEligibilities.push({
                SrNo: "C",
                Question: "Business of Applicant Company",
                UserSelection: "",
                SingleOutcome: "",
                OverallOutcome: ""
            });
            var overAllOutCome = (this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("SectoralCapId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE || this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("SectorId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "1",
                Question: "Sectoral Cap",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("SectoralCapId").value; })[0].Answer,
                SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("SectoralCapId").value; })[0].OutcomeName,
                OverallOutcome: overAllOutCome
            });
            this.lOBOPOEligibilities.push({
                SrNo: "2",
                Question: "Sector",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("SectorId").value; })[0].Answer,
                SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("SectorId").value; })[0].OutcomeName,
                OverallOutcome: ""
            });
            overAllOutCome = (this.frmPOEligibilityCalculator.get("StateOfIndiaId").value == 28) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : (this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("ApplicantCountryId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE || this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("StateOfIndiaId").value; })[0].OutcomeName == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "D",
                Question: "Applicant's Country of registeration / citizenship",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("ApplicantCountryId").value; })[0].Answer,
                SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("ApplicantCountryId").value; })[0].OutcomeName,
                OverallOutcome: overAllOutCome
            });
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "State / Region in India in which office shall be established",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("StateOfIndiaId").value; })[0].Answer,
                SingleOutcome: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("StateOfIndiaId").value; })[0].OutcomeName,
                OverallOutcome: ""
            });
            this.lOBOPOEligibilities.push({
                SrNo: "E",
                Question: "Additional Criteria",
                UserSelection: "",
                SingleOutcome: "",
                OverallOutcome: ""
            });
            var whether1Outcome = "", fund1Outcome = "", fund2Outcome = "", clearOutcome = "", publicOutcome = "";
            whether1Outcome = this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("WhetherYouHaveSecuredContractFromAnIndianCompanyForExecutingTheContract").value; })[0].OutcomeName;
            if (whether1Outcome == global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE) {
                fund1Outcome = this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("FundedDirectlyByInwardRemittanceFromAbroad").value; })[0].OutcomeName;
                if (fund1Outcome == global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE) {
                    fund2Outcome = this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("FundedByBilateralOrMultilateralInternationalFinancingAgency").value; })[0].OutcomeName;
                    if (fund2Outcome == global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE) {
                        clearOutcome = this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("ClearedByAnAppropriateAuthority").value; })[0].OutcomeName;
                        if (clearOutcome == global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE) {
                            publicOutcome = this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("PublicFinancialInstitution").value; })[0].OutcomeName;
                        }
                    }
                }
            }
            var whetherOutcome = (publicOutcome == global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE) ? global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE : global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "1",
                Question: "Whether you have secured a contract from an Indian Company for executing the Contract",
                UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("WhetherYouHaveSecuredContractFromAnIndianCompanyForExecutingTheContract").value; })[0].Answer,
                SingleOutcome: whether1Outcome,
                OverallOutcome: whetherOutcome
            });
            if (fund1Outcome) {
                this.lOBOPOEligibilities.push({
                    SrNo: "2",
                    Question: "Funding Questions",
                    UserSelection: "",
                    SingleOutcome: "",
                    OverallOutcome: ""
                });
                this.lOBOPOEligibilities.push({
                    SrNo: "a",
                    Question: "The project is funded directly by inward remittance from abroad",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("FundedDirectlyByInwardRemittanceFromAbroad").value; })[0].Answer,
                    SingleOutcome: fund1Outcome,
                    OverallOutcome: ""
                });
            }
            if (fund2Outcome) {
                this.lOBOPOEligibilities.push({
                    SrNo: "b",
                    Question: "The project is funded by a bilateral or multilateral International Financing Agency",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("FundedByBilateralOrMultilateralInternationalFinancingAgency").value; })[0].Answer,
                    SingleOutcome: fund2Outcome,
                    OverallOutcome: ""
                });
            }
            if (clearOutcome) {
                this.lOBOPOEligibilities.push({
                    SrNo: "c",
                    Question: "The project has been cleared by an appropriate authority",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("ClearedByAnAppropriateAuthority").value; })[0].Answer,
                    SingleOutcome: clearOutcome,
                    OverallOutcome: ""
                });
            }
            if (publicOutcome) {
                this.lOBOPOEligibilities.push({
                    SrNo: "d",
                    Question: "A company or entity in India awarding the contract has been granted Term Loan by a Public Financial Institution or a bank in India for the project",
                    UserSelection: this.calculatorAnswers.filter(function (x) { return x.CalculatorAnswerId == _this.frmPOEligibilityCalculator.get("PublicFinancialInstitution").value; })[0].Answer,
                    SingleOutcome: publicOutcome,
                    OverallOutcome: ""
                });
            }
            overAllOutCome = (this.lOBOPOEligibilities[0].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                this.lOBOPOEligibilities[2].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                this.lOBOPOEligibilities[4].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE ||
                this.lOBOPOEligibilities[7].OverallOutcome == global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE) ? global_1.Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE : global_1.Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE;
            this.lOBOPOEligibilities.push({
                SrNo: "",
                Question: "Application for " + this.natureOfOfficeName + " can be made under",
                UserSelection: "",
                SingleOutcome: "",
                OverallOutcome: overAllOutCome
            });
        }
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.OnClickPrint = function () {
        var columns = ["A", this.natureOfOfficeName, "User Selection", "Outcome"];
        var rows = [];
        var t_this = this;
        this.lOBOPOEligibilities.forEach(function (item) {
            rows.push([item.SrNo, item.Question, item.UserSelection, item.OverallOutcome]);
        });
        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(12);
        //doc.text(40, 50, 'Compounding Penalty');
        doc.autoTable(columns, rows, {
            createdCell: function (cell, data) {
                if (t_this.isLO) {
                    if (data.row.index == 1 || data.row.index == 6 || data.row.index == 7 || data.row.index == 11 || data.row.index == 16 || data.row.index == 17 || data.row.index == 21 || (t_this.isSubsidiaryCompanyLO == true ? data.row.index == 26 : data.row.index == 15)) {
                        cell.styles.fontStyle = 'bold';
                    }
                }
                else if (t_this.isBO) {
                    if (data.row.index == 2 || data.row.index == 7 || data.row.index == 8 || data.row.index == 14 || (t_this.frmBOEligibilityCalculator.value.PlaceOfEstablishmentId == 2 && t_this.isSubsidiaryCompanyBO != true ? data.row.index == 23 : data.row.index == 22) || data.row.index == 28 || data.row.index == 35 || data.row.index == 38 || (t_this.isSubsidiaryCompanyBO == true ? data.row.index == 21 : data.row.index == 20)) {
                        cell.styles.fontStyle = 'bold';
                    }
                }
                else if (t_this.isPO) {
                    if (data.row.index == 1 || data.row.index == 6 || data.row.index == 8 || data.row.index == t_this.lOBOPOEligibilities.length - 1) {
                        cell.styles.fontStyle = 'bold';
                    }
                }
            },
            columnStyles: {
                0: { columnWidth: 22 }
            },
            margin: { top: 30 },
            styles: {
                overflow: 'linebreak'
            },
            addPageContent: function (data) {
            }
        });
        doc.save(this.natureOfOfficeName + '.pdf'); // Generated PDF
    };
    LOBOPOEligibilityCalculatorPopupUserComponent.prototype.OnClickReset = function () {
        this.isDisabledLOBOPOEligibility = false;
        this.isLO = false;
        this.isBO = false;
        this.isPO = false;
        this.isSubsidiaryCompanyLO = false;
        this.isSubsidiaryCompanyBO = false;
        this.isSubmited = false;
        this.frmLOEligibilityCalculator.reset();
        this.frmBOEligibilityCalculator.reset();
        this.frmPOEligibilityCalculator.reset();
        this.frmLOEligibilityCalculator.get("NatureOfOfficeId").enable();
        this.frmLOEligibilityCalculator.get("ApplicantEntityId").enable();
        this.frmLOEligibilityCalculator.get("SectoralCapId").enable();
        this.frmLOEligibilityCalculator.get("SectorId").enable();
        this.frmLOEligibilityCalculator.get("ApplicantCountryId").enable();
        this.frmLOEligibilityCalculator.get("StateOfIndiaId").enable();
        this.frmLOEligibilityCalculator.get("ProfitMaking1stYear").enable();
        this.frmLOEligibilityCalculator.get("ProfitMaking2ndYear").enable();
        this.frmLOEligibilityCalculator.get("ProfitMaking3rdYear").enable();
        this.frmLOEligibilityCalculator.get("NetWorth1stYear").enable();
        this.frmLOEligibilityCalculator.get("NetWorth2ndYear").enable();
        this.frmLOEligibilityCalculator.get("NetWorth3rdYear").enable();
        this.frmLOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").enable();
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").enable();
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").enable();
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").enable();
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").enable();
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").enable();
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").enable();
        this.frmLOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").enable();
        this.frmBOEligibilityCalculator.get("NatureOfOfficeId").enable();
        this.frmBOEligibilityCalculator.get("PlaceOfEstablishmentId").enable();
        this.frmBOEligibilityCalculator.get("ApplicantEntityId").enable();
        this.frmBOEligibilityCalculator.get("SectoralCapId").enable();
        this.frmBOEligibilityCalculator.get("SectorId").enable();
        this.frmBOEligibilityCalculator.get("ApplicantCountryId").enable();
        this.frmBOEligibilityCalculator.get("StateOfIndiaId").enable();
        this.frmBOEligibilityCalculator.get("ProfitMaking1stYear").enable();
        this.frmBOEligibilityCalculator.get("ProfitMaking2ndYear").enable();
        this.frmBOEligibilityCalculator.get("ProfitMaking3rdYear").enable();
        this.frmBOEligibilityCalculator.get("ProfitMaking4thYear").enable();
        this.frmBOEligibilityCalculator.get("ProfitMaking5thYear").enable();
        this.frmBOEligibilityCalculator.get("NetWorth1stYear").enable();
        this.frmBOEligibilityCalculator.get("NetWorth2ndYear").enable();
        this.frmBOEligibilityCalculator.get("NetWorth3rdYear").enable();
        this.frmBOEligibilityCalculator.get("NetWorth4thYear").enable();
        this.frmBOEligibilityCalculator.get("NetWorth5thYear").enable();
        this.frmBOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").enable();
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").enable();
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").enable();
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").enable();
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking4thYear").enable();
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking5thYear").enable();
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").enable();
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").enable();
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").enable();
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth4thYear").enable();
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth5thYear").enable();
        this.frmBOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").enable();
        this.frmBOEligibilityCalculator.get("WhetherBOsComplyWithChapterXXIIOfCompaniesAct2013").enable();
        this.frmBOEligibilityCalculator.get("WhetherBOFuntionOnStandAloneBasis").enable();
        this.frmPOEligibilityCalculator.get("NatureOfOfficeId").enable();
        this.frmPOEligibilityCalculator.get("ApplicantEntityId").enable();
        this.frmPOEligibilityCalculator.get("SectoralCapId").enable();
        this.frmPOEligibilityCalculator.get("SectorId").enable();
        this.frmPOEligibilityCalculator.get("ApplicantCountryId").enable();
        this.frmPOEligibilityCalculator.get("StateOfIndiaId").enable();
        this.frmPOEligibilityCalculator.get("WhetherYouHaveSecuredContractFromAnIndianCompanyForExecutingTheContract").enable();
        this.frmPOEligibilityCalculator.get("FundedDirectlyByInwardRemittanceFromAbroad").enable();
        this.frmPOEligibilityCalculator.get("FundedByBilateralOrMultilateralInternationalFinancingAgency").enable();
        this.frmPOEligibilityCalculator.get("ClearedByAnAppropriateAuthority").enable();
        this.frmPOEligibilityCalculator.get("PublicFinancialInstitution").enable();
        this.natureOfOfficeId = "";
        this.frmLOEligibilityCalculator.get("ApplicantEntityId").setValue("");
        this.frmLOEligibilityCalculator.get("SectoralCapId").setValue("");
        this.frmLOEligibilityCalculator.get("SectorId").setValue("");
        this.frmLOEligibilityCalculator.get("ApplicantCountryId").setValue("");
        this.frmLOEligibilityCalculator.get("StateOfIndiaId").setValue("");
        this.frmLOEligibilityCalculator.get("ProfitMaking1stYear").setValue("");
        this.frmLOEligibilityCalculator.get("ProfitMaking2ndYear").setValue("");
        this.frmLOEligibilityCalculator.get("ProfitMaking3rdYear").setValue("");
        this.frmLOEligibilityCalculator.get("NetWorth1stYear").setValue("");
        this.frmLOEligibilityCalculator.get("NetWorth2ndYear").setValue("");
        this.frmLOEligibilityCalculator.get("NetWorth3rdYear").setValue("");
        this.frmLOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").setValue("");
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").setValue("");
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").setValue("");
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").setValue("");
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").setValue("");
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").setValue("");
        this.frmLOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").setValue("");
        this.frmLOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").setValue("");
        this.frmBOEligibilityCalculator.get("ApplicantEntityId").setValue("");
        this.frmBOEligibilityCalculator.get("PlaceOfEstablishmentId").setValue("");
        this.frmBOEligibilityCalculator.get("SectoralCapId").setValue("");
        this.frmBOEligibilityCalculator.get("SectorId").setValue("");
        this.frmBOEligibilityCalculator.get("ApplicantCountryId").setValue("");
        this.frmBOEligibilityCalculator.get("StateOfIndiaId").setValue("");
        this.frmBOEligibilityCalculator.get("ProfitMaking1stYear").setValue("");
        this.frmBOEligibilityCalculator.get("ProfitMaking2ndYear").setValue("");
        this.frmBOEligibilityCalculator.get("ProfitMaking3rdYear").setValue("");
        this.frmBOEligibilityCalculator.get("ProfitMaking4thYear").setValue("");
        this.frmBOEligibilityCalculator.get("ProfitMaking5thYear").setValue("");
        this.frmBOEligibilityCalculator.get("NetWorth1stYear").setValue("");
        this.frmBOEligibilityCalculator.get("NetWorth2ndYear").setValue("");
        this.frmBOEligibilityCalculator.get("NetWorth3rdYear").setValue("");
        this.frmBOEligibilityCalculator.get("NetWorth4thYear").setValue("");
        this.frmBOEligibilityCalculator.get("NetWorth5thYear").setValue("");
        this.frmBOEligibilityCalculator.get("WhetherSubsidiaryOfAnotherCompany").setValue("");
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking1stYear").setValue("");
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking2ndYear").setValue("");
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking3rdYear").setValue("");
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking4thYear").setValue("");
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyProfitMaking5thYear").setValue("");
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth1stYear").setValue("");
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth2ndYear").setValue("");
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth3rdYear").setValue("");
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth4thYear").setValue("");
        this.frmBOEligibilityCalculator.get("SubSidiaryCompanyNetWorth5thYear").setValue("");
        this.frmBOEligibilityCalculator.get("WhetherLetterOfComfortAvailable").setValue("");
        this.frmBOEligibilityCalculator.get("WhetherBOsComplyWithChapterXXIIOfCompaniesAct2013").setValue("");
        this.frmBOEligibilityCalculator.get("WhetherBOFuntionOnStandAloneBasis").setValue("");
        this.frmPOEligibilityCalculator.get("NatureOfOfficeId").setValue("");
        this.frmPOEligibilityCalculator.get("ApplicantEntityId").setValue("");
        this.frmPOEligibilityCalculator.get("SectoralCapId").setValue("");
        this.frmPOEligibilityCalculator.get("SectorId").setValue("");
        this.frmPOEligibilityCalculator.get("ApplicantCountryId").setValue("");
        this.frmPOEligibilityCalculator.get("StateOfIndiaId").setValue("");
        this.frmPOEligibilityCalculator.get("WhetherYouHaveSecuredContractFromAnIndianCompanyForExecutingTheContract").setValue("");
        this.frmPOEligibilityCalculator.get("FundedDirectlyByInwardRemittanceFromAbroad").setValue("");
        this.frmPOEligibilityCalculator.get("FundedByBilateralOrMultilateralInternationalFinancingAgency").setValue("");
        this.frmPOEligibilityCalculator.get("ClearedByAnAppropriateAuthority").setValue("");
        this.frmPOEligibilityCalculator.get("PublicFinancialInstitution").setValue("");
    };
    LOBOPOEligibilityCalculatorPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './lOBOPOEligibilityCalculatorPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            calculatorAnswer_service_1.CalculatorAnswerUserService,
            commonField_service_1.CommonFieldService,
            platform_browser_1.DomSanitizer])
    ], LOBOPOEligibilityCalculatorPopupUserComponent);
    return LOBOPOEligibilityCalculatorPopupUserComponent;
}());
exports.LOBOPOEligibilityCalculatorPopupUserComponent = LOBOPOEligibilityCalculatorPopupUserComponent;
//# sourceMappingURL=lOBOPOEligibilityCalculatorPopup.component.js.map