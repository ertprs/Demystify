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
var ECBAverageMaturityCalculatorPopupUserComponent = /** @class */ (function () {
    function ECBAverageMaturityCalculatorPopupUserComponent(formBuilder, _spinnerService, _toastrService, sanitizer) {
        this.formBuilder = formBuilder;
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this.sanitizer = sanitizer;
        this.minDate = { year: 1970, month: 1, day: 1 };
        this.averageMaturityDetailsData = [];
        this.averageMaturityDetails = [];
        this.averageMaturityDetailRecent = { DrawalMinimumDate: { year: 1970, month: 1, day: 1 } };
        this.isDisabledAverageMaturityDetails = false;
        this.totalAverageMaturity = 0;
    }
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.dialogInit = function (refernce, options) {
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.addAverageMaturityDetail = function () {
        if (!this.isDisabledAverageMaturityDetails) {
            if (this.averageMaturityDetailRecent.DrawalDate != undefined) {
                this.averageMaturityDetails.push(this.averageMaturityDetailRecent);
                var newDrawalMinimumDate = this.GetNewDrawalMinimumDate(this.averageMaturityDetailRecent);
                this.averageMaturityDetailRecent = { DrawalMinimumDate: { year: newDrawalMinimumDate.getFullYear(), month: newDrawalMinimumDate.getMonth() + 1, day: newDrawalMinimumDate.getDate() } };
            }
            else {
                this._toastrService.error("Drawal date is required", global_1.Global.TOASTR_AVERAGE_MATURITY_CALCULATOR_TITLE);
            }
        }
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.GetNewDrawalMinimumDate = function (averageMaturityDetail) {
        var currentDrawalDate = new Date(averageMaturityDetail.DrawalDate.year + '-' + averageMaturityDetail.DrawalDate.month + '-' + averageMaturityDetail.DrawalDate.day);
        var day = 60 * 60 * 24 * 1000;
        return new Date(currentDrawalDate.getTime() + day);
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.deleteAverageMaturityDetail = function (index) {
        if (!this.isDisabledAverageMaturityDetails) {
            this.averageMaturityDetails.splice(index, 1);
            this.RemoveFutureAverageMaturityDetails(index - 1);
        }
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.OnChangeAverageMaturityDetail = function () {
        var balanceAmount = this.GetBalanceAmount();
        if (balanceAmount > this.loanAmount) {
            this.averageMaturityDetailRecent.DrawalAmount = 0;
            this.averageMaturityDetailRecent.RepaymentAmount = 0;
            this.averageMaturityDetailRecent.BalanceAmount = 0;
            this._toastrService.error("Invalid Drawal Amount", global_1.Global.TOASTR_AVERAGE_MATURITY_CALCULATOR_TITLE);
        }
        else if (balanceAmount < 0) {
            this.averageMaturityDetailRecent.RepaymentAmount = 0;
            this.averageMaturityDetailRecent.BalanceAmount = this.GetBalanceAmount();
            this._toastrService.error("Invalid Repayment Amount", global_1.Global.TOASTR_AVERAGE_MATURITY_CALCULATOR_TITLE);
        }
        else {
            this.averageMaturityDetailRecent.BalanceAmount = balanceAmount;
        }
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.GetBalanceAmount = function () {
        var previousBalance = this.averageMaturityDetails.length > 0 ? this.averageMaturityDetails[this.averageMaturityDetails.length - 1].BalanceAmount : 0;
        var drawalAmount = (!isNaN(this.averageMaturityDetailRecent.DrawalAmount)) ? Number(this.averageMaturityDetailRecent.DrawalAmount) : 0;
        var repaymentAmount = (!isNaN(this.averageMaturityDetailRecent.RepaymentAmount)) ? Number(this.averageMaturityDetailRecent.RepaymentAmount) : 0;
        return (previousBalance + drawalAmount) - repaymentAmount;
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.OnChangeAverageMaturityDetails = function (index) {
        var balanceAmount = this.GetBalanceAmountAverageMaturityDetails(index);
        if (balanceAmount > this.loanAmount) {
            this.averageMaturityDetails[index].DrawalAmount = 0;
            this.averageMaturityDetails[index].RepaymentAmount = 0;
            this.averageMaturityDetails[index].BalanceAmount = 0;
            this._toastrService.error("Invalid Drawal Amount", global_1.Global.TOASTR_AVERAGE_MATURITY_CALCULATOR_TITLE);
        }
        else if (balanceAmount < 0) {
            this.averageMaturityDetails[index].RepaymentAmount = 0;
            this.averageMaturityDetails[index].BalanceAmount = this.GetBalanceAmountAverageMaturityDetails(index);
            this._toastrService.error("Invalid Repayment Amount", global_1.Global.TOASTR_AVERAGE_MATURITY_CALCULATOR_TITLE);
        }
        this.RemoveFutureAverageMaturityDetails(index);
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.GetBalanceAmountAverageMaturityDetails = function (index) {
        var previousBalance = (index > 0) ? this.averageMaturityDetails[index - 1].BalanceAmount : 0;
        var drawalAmount = (!isNaN(this.averageMaturityDetails[index].DrawalAmount)) ? Number(this.averageMaturityDetails[index].DrawalAmount) : 0;
        var repaymentAmount = (!isNaN(this.averageMaturityDetails[index].RepaymentAmount)) ? Number(this.averageMaturityDetails[index].RepaymentAmount) : 0;
        return (previousBalance + drawalAmount) - repaymentAmount;
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.RemoveFutureAverageMaturityDetails = function (index) {
        var rowIndexToRemove = index + 1;
        if (rowIndexToRemove < this.averageMaturityDetails.length) {
            this.averageMaturityDetails.splice(rowIndexToRemove, this.averageMaturityDetails.length - rowIndexToRemove);
        }
        if (this.averageMaturityDetails.length > 0) {
            var newDrawalMinimumDate = this.GetNewDrawalMinimumDate(this.averageMaturityDetails[index]);
            this.averageMaturityDetailRecent = { DrawalMinimumDate: { year: newDrawalMinimumDate.getFullYear(), month: newDrawalMinimumDate.getMonth() + 1, day: newDrawalMinimumDate.getDate() } };
        }
        else {
            this.averageMaturityDetailRecent = { DrawalMinimumDate: { year: 1970, month: 1, day: 1 } };
        }
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.AverageMaturityDetailsSubmit = function () {
        var _this = this;
        if (this.averageMaturityDetailRecent.DrawalDate == undefined) {
            this._toastrService.error("Drawal date is required", global_1.Global.TOASTR_AVERAGE_MATURITY_CALCULATOR_TITLE);
            return;
        }
        if (this.averageMaturityDetailRecent.BalanceAmount == "0") {
            this.isDisabledAverageMaturityDetails = true;
            this.averageMaturityDetailsData = [];
            this.averageMaturityDetails.forEach(function (item) {
                _this.averageMaturityDetailsData.push(item);
            });
            this.averageMaturityDetailsData.push(this.averageMaturityDetailRecent);
            for (var index = 0; index < this.averageMaturityDetailsData.length - 1; index++) {
                var currentDrawalDate = new Date(this.averageMaturityDetailsData[index].DrawalDate.year + '-' + this.averageMaturityDetailsData[index].DrawalDate.month + '-' + this.averageMaturityDetailsData[index].DrawalDate.day);
                var nextDrawalDate = new Date(this.averageMaturityDetailsData[index + 1].DrawalDate.year + '-' + this.averageMaturityDetailsData[index + 1].DrawalDate.month + '-' + this.averageMaturityDetailsData[index + 1].DrawalDate.day);
                this.averageMaturityDetailsData[index].NoofDaysBalance = Math.round((nextDrawalDate - currentDrawalDate) / (1000 * 60 * 60 * 24));
                this.averageMaturityDetailsData[index].Product = ((this.averageMaturityDetailsData[index].BalanceAmount * this.averageMaturityDetailsData[index].NoofDaysBalance) / (this.loanAmount * 360)).toFixed(4);
            }
            this.totalAverageMaturity = this.averageMaturityDetailsData.reduce(function (a, b) {
                var sumTillCurrentRow = (!isNaN(b.Product)) ? parseFloat(a) + parseFloat(b.Product) : parseFloat(a);
                return sumTillCurrentRow.toFixed(4);
            }, 0);
        }
        else {
            this._toastrService.error("Please provide all details until Balance becomes 0", global_1.Global.TOASTR_AVERAGE_MATURITY_CALCULATOR_TITLE);
        }
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.AverageMaturityDetailsReset = function () {
        this.loanAmount = "";
        this.averageMaturityDetails = [];
        this.averageMaturityDetailRecent = {};
        this.isDisabledAverageMaturityDetails = false;
        this.averageMaturityDetailsData = [];
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.AverageMaturityDetailsDownloadPDF = function () {
        var columns = ["Date of Drawal \n (DD/MM/YYYY)", "Drawal", "Repayment", "Balance", "No. of Days \n balance with \n the borrower", "Product \n = (Col.4 * Col. 5) \n /(Loan amount * 360)"];
        var rows = [];
        this.averageMaturityDetailsData.forEach(function (item) {
            rows.push([item.DrawalDate.day + '-' + item.DrawalDate.month + '-' + item.DrawalDate.year, item.DrawalAmount, item.RepaymentAmount, item.BalanceAmount, item.NoofDaysBalance, item.Product]);
        });
        rows.push(["", "", "", "", "Average Maturity", this.totalAverageMaturity]);
        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(12);
        doc.text(40, 50, 'Calculation of Average Maturity - An Illustration');
        doc.setFontSize(11);
        doc.text(40, 80, 'Loan Amount : ' + this.loanAmount);
        doc.autoTable(columns, rows, {
            margin: { top: 90 },
            styles: {},
            addPageContent: function (data) {
            }
        });
        doc.save('Average Maturity Calculation.pdf'); // Generated PDF
    };
    ECBAverageMaturityCalculatorPopupUserComponent.prototype.LoanAmountChange = function () {
        this.averageMaturityDetails = [];
        this.averageMaturityDetailRecent = {};
        this.isDisabledAverageMaturityDetails = false;
        this.averageMaturityDetailsData = [];
    };
    ECBAverageMaturityCalculatorPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './eCBAverageMaturityCalculatorPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            platform_browser_1.DomSanitizer])
    ], ECBAverageMaturityCalculatorPopupUserComponent);
    return ECBAverageMaturityCalculatorPopupUserComponent;
}());
exports.ECBAverageMaturityCalculatorPopupUserComponent = ECBAverageMaturityCalculatorPopupUserComponent;
//# sourceMappingURL=eCBAverageMaturityCalculatorPopup.component.js.map