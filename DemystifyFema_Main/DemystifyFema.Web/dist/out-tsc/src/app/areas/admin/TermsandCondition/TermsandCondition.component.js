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
var termsCondition_service_1 = require("../../../service/admin/termsCondition.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var termsCondition_1 = require("src/app/model/termsCondition");
var TermsConditionAdminComponent = /** @class */ (function () {
    function TermsConditionAdminComponent(formBuilder, toastr, activatedRoute, router, _termsConditionService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._termsConditionService = _termsConditionService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
    }
    TermsConditionAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var termConditionId = _this._global.decryptValue(params['id']);
            if (termConditionId == "0") {
                _this.frmTermsCondition = _this.formBuilder.group({
                    TermsConditionContent: _this.formBuilder.array([_this.CreateCKEditor(0, null, "Add")])
                });
            }
            else {
                _this.termConditionId = parseInt(termConditionId);
                _this.GetTermsCondition();
            }
        });
        //this.frmTermsCondition = this.formBuilder.group({
        //    TermsConditionContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")])
        //});
        //this.GetTermsCondition();
    };
    TermsConditionAdminComponent.prototype.CreateCKEditor = function (id, content, status) {
        return this.formBuilder.group({
            Id: id,
            Content: content,
            Status: "TermsCondition"
        });
    };
    TermsConditionAdminComponent.prototype.AddCKEditor = function (id, content, status) {
    };
    TermsConditionAdminComponent.prototype.RemoveCKEditor = function (index) {
        this.TermsConditionContent.removeAt(index);
    };
    TermsConditionAdminComponent.prototype.OnSubmitIndexAmendment = function (formData) {
        if (this.frmTermsCondition.valid) {
            var data = formData.value["TermsConditionContent"];
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                data[i]["Content"];
                var model = {
                    ID: data[i]["Id"],
                    TermsandCondition: data[i]["Content"]
                };
            }
            this.SaveTermsCondition(model);
        }
    };
    TermsConditionAdminComponent.prototype.SaveTermsCondition = function (model) {
        var _this = this;
        this._termsConditionService.addTermsCondition(model)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/TermsandCondition']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_TERMSCONDITION_TITLE, { closeButton: true });
                    });
                });
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_TERMSCONDITION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_TERMSCONDITION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    TermsConditionAdminComponent.prototype.GetTermsCondition = function () {
        var _this = this;
        var getTermConditionRequest = new termsCondition_1.GetTermsConditionRequest();
        getTermConditionRequest.ID = this.termConditionId;
        this._termsConditionService.getTermsCondition(getTermConditionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                if (data.Response.length > 0) {
                    _this.frmTermsCondition = _this.formBuilder.group({
                        TermsConditionContent: _this.formBuilder.array([_this.CreateCKEditor(0, data.Response[0].TermsandCondition, "Edit")])
                    });
                }
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_TERMSCONDITION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_TERMSCONDITION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    TermsConditionAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './TermsandCondition.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            termsCondition_service_1.TermsConditionAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], TermsConditionAdminComponent);
    return TermsConditionAdminComponent;
}());
exports.TermsConditionAdminComponent = TermsConditionAdminComponent;
//# sourceMappingURL=TermsandCondition.component.js.map