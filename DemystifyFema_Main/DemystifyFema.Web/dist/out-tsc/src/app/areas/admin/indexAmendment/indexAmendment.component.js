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
var indexAmendment_1 = require("../../../model/indexAmendment");
var notification_1 = require("../../../model/notification");
var femaIndex_1 = require("../../../model/femaIndex");
var femaSubIndex_1 = require("../../../model/femaSubIndex");
var regulation_1 = require("../../../model/regulation");
var indexAmendment_service_1 = require("../../../service/admin/indexAmendment.service");
var notification_service_1 = require("../../../service/admin/notification.service");
var femaIndex_service_1 = require("../../../service/admin/femaIndex.service");
var femaSubIndex_service_1 = require("../../../service/admin/femaSubIndex.service");
var regulation_service_1 = require("../../../service/admin/regulation.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var IndexAmendmentAdminComponent = /** @class */ (function () {
    function IndexAmendmentAdminComponent(formBuilder, toastr, activatedRoute, router, _indexAmendmentService, _notificationService, _femaIndexService, _femaSubIndexService, _regulationService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._indexAmendmentService = _indexAmendmentService;
        this._notificationService = _notificationService;
        this._femaIndexService = _femaIndexService;
        this._femaSubIndexService = _femaSubIndexService;
        this._regulationService = _regulationService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.notifications = [];
        this.femaIndexes = [];
        this.femaSubIndexes = [];
        this.notificationDropDownSettings = {};
        this.selectedNotifications = [];
        this.regulation = new regulation_1.Regulation();
        this.regulationId = 0;
        this.indexAmendmentId = 0;
        this.isSubmited = false;
    }
    IndexAmendmentAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var regulationId = _this._global.decryptValue(params['regulationId']);
            var indexAmendmentId = _this._global.decryptValue(params['indexAmendmentId']);
            _this.regulationId = parseInt(regulationId);
            if (regulationId) {
                _this.GetRegulation(_this.regulationId);
                if (indexAmendmentId) {
                    _this.addUpdateText = "Update";
                    _this.indexAmendmentId = parseInt(indexAmendmentId);
                    _this.EditIndexAmendment(parseInt(indexAmendmentId));
                }
                else {
                    _this.GetNotification(null);
                    _this.GetIndex(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/regulations'], {
                        queryParams: {
                            indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmIndexAmendment = this.formBuilder.group({
            IndexAmendmentId: [''],
            RegulationId: [this.regulationId],
            NotificationIds: ['', forms_1.Validators.required],
            IndexId: ['', forms_1.Validators.required],
            SubIndexId: [''],
            IndexAmendmentContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")])
        });
    };
    IndexAmendmentAdminComponent.prototype.CreateCKEditor = function (id, content, status) {
        return this.formBuilder.group({
            Id: id,
            Content: content,
            Status: status
        });
    };
    IndexAmendmentAdminComponent.prototype.AddCKEditor = function (id, content, status) {
        this.IndexAmendmentContent = this.frmIndexAmendment.get('IndexAmendmentContent');
        this.IndexAmendmentContent.push(this.CreateCKEditor(id, content, status));
    };
    IndexAmendmentAdminComponent.prototype.RemoveCKEditor = function (index) {
        this.IndexAmendmentContent.removeAt(index);
    };
    IndexAmendmentAdminComponent.prototype.GetRegulation = function (regulationId) {
        var _this = this;
        this.spinnerService.show();
        var getRegulationRequest = new regulation_1.GetRegulationRequest();
        getRegulationRequest.RegulationId = regulationId;
        getRegulationRequest.IsActive = null;
        this._regulationService.getRegulation(getRegulationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.regulation = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    IndexAmendmentAdminComponent.prototype.GetNotification = function (indexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getNotificationRequest = new notification_1.GetNotificationRequest();
        getNotificationRequest.RegulationId = this.regulationId;
        this._notificationService.getNotification(getNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.notifications = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.notifications.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.notifications.push({ Value: item.NotificationId, Text: item.NotificationNumber });
                });
                //this.frmIndexAmendment.get("NotificationId").setValue((indexAmendmentData != null) ? indexAmendmentData.NotificationId : "");
                //this.frmIndexAmendment.updateValueAndValidity();
                _this.notificationDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedNotifications_1 = [];
                if (indexAmendmentData != null) {
                    indexAmendmentData.NotificationIds.split(',').forEach(function (item) {
                        if (item)
                            selectedNotifications_1.push({ Value: parseInt(item), Text: _this.notifications.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedNotifications = selectedNotifications_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    IndexAmendmentAdminComponent.prototype.GetIndex = function (indexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getFemaIndexRequest = new femaIndex_1.GetFemaIndexRequest();
        getFemaIndexRequest.RegulationId = this.regulationId;
        this._femaIndexService.getFemaIndex(getFemaIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.femaIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.femaIndexes.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.femaIndexes.push({ Value: item.IndexId, Text: item.IndexNo + ' - ' + item.IndexName });
                });
                _this.frmIndexAmendment.get("IndexId").setValue((indexAmendmentData != null) ? indexAmendmentData.IndexId : "");
                _this.frmIndexAmendment.updateValueAndValidity();
                if (indexAmendmentData != null)
                    _this.GetSubIndex(indexAmendmentData.IndexId, indexAmendmentData);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    IndexAmendmentAdminComponent.prototype.OnIndexChange = function (indexId) {
        this.femaSubIndexes = [];
        if (indexId) {
            this.GetSubIndex(indexId, null);
        }
        else {
            this.frmIndexAmendment.get("IndexId").setValue('');
            this.frmIndexAmendment.updateValueAndValidity();
        }
    };
    IndexAmendmentAdminComponent.prototype.GetSubIndex = function (indexId, indexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getFemaSubIndexRequest = new femaSubIndex_1.GetFemaSubIndexRequest();
        getFemaSubIndexRequest.IndexId = indexId;
        this._femaSubIndexService.getFemaSubIndex(getFemaSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.femaSubIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.femaSubIndexes.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.femaSubIndexes.push({ Value: item.SubIndexId, Text: item.SubIndexNo + ' - ' + item.SubIndexName });
                });
                _this.frmIndexAmendment.get("SubIndexId").setValue((indexAmendmentData != null) ? (indexAmendmentData.SubIndexId) ? indexAmendmentData.SubIndexId : "" : "");
                _this.frmIndexAmendment.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    IndexAmendmentAdminComponent.prototype.EditIndexAmendment = function (indexAmendmentId) {
        var _this = this;
        this.spinnerService.show();
        var t_this = this;
        var getIndexAmendmentRequest = new indexAmendment_1.GetIndexAmendmentRequest();
        getIndexAmendmentRequest.IndexAmendmentId = indexAmendmentId;
        getIndexAmendmentRequest.RegulationId = this.regulationId;
        getIndexAmendmentRequest.IsActive = null;
        this._indexAmendmentService.getIndexAmendment(getIndexAmendmentRequest)
            .subscribe(function (data) {
            var getAmendmentContentRequest = new indexAmendment_1.GetAmendmentContentRequest();
            getAmendmentContentRequest.IndexAmendmentId = indexAmendmentId;
            getAmendmentContentRequest.AmendmentContentModuleId = global_1.Global.AMENDMENT_CONTENT_MODULE_FEMA_REGULATION;
            getAmendmentContentRequest.IsActive = null;
            t_this._indexAmendmentService.getAmendmentContent(getAmendmentContentRequest)
                .subscribe(function (content) {
                t_this.spinnerService.hide();
                t_this.GetNotification(data.Response[0]);
                t_this.GetIndex(data.Response[0]);
                t_this.frmIndexAmendment.setValue({
                    IndexAmendmentId: indexAmendmentId,
                    RegulationId: data.Response[0].RegulationId,
                    NotificationIds: [],
                    IndexId: data.Response[0].IndexId,
                    SubIndexId: data.Response[0].SubIndexId,
                    IndexAmendmentContent: (content.Response.length > 0) ? [{ Id: content.Response[0].AmendmentContentId, Content: content.Response[0].AmendmentContents, Status: "Update" }] : [{ Id: 0, Content: '', Status: "Add" }]
                });
                if (content.Response.length > 0)
                    content.Response.shift();
                content.Response.forEach(function (item) {
                    t_this.AddCKEditor(item.AmendmentContentId, item.AmendmentContents, "Update");
                });
                t_this.frmIndexAmendment.updateValueAndValidity();
            }, function (error) { return t_this.msg = error; });
        }, function (error) { return _this.msg = error; });
    };
    IndexAmendmentAdminComponent.prototype.SaveIndexAmendment = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.SubIndexId == 'null') {
            formData.value.SubIndexId = null;
        }
        if (formData.value.IndexAmendmentId) {
            this._indexAmendmentService.updateIndexAmendment(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/regulations'], {
                            queryParams: {
                                indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE, { enableHtml: true });
            });
        }
        else {
            this._indexAmendmentService.addIndexAmendment(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/regulations'], {
                            queryParams: {
                                indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    IndexAmendmentAdminComponent.prototype.OnSubmitIndexAmendment = function (formData) {
        this.isSubmited = true;
        if (this.frmIndexAmendment.valid) {
            formData.value.NotificationIds = this._global.convertArrayToCommaSeperatedString(formData.value.NotificationIds);
            this.SaveIndexAmendment(formData);
        }
    };
    IndexAmendmentAdminComponent.prototype.CancelIndexAmendment = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/regulations'], {
                queryParams: {
                    indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    IndexAmendmentAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './indexAmendment.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            indexAmendment_service_1.IndexAmendmentAdminService,
            notification_service_1.NotificationAdminService,
            femaIndex_service_1.FemaIndexAdminService,
            femaSubIndex_service_1.FemaSubIndexAdminService,
            regulation_service_1.RegulationAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], IndexAmendmentAdminComponent);
    return IndexAmendmentAdminComponent;
}());
exports.IndexAmendmentAdminComponent = IndexAmendmentAdminComponent;
//# sourceMappingURL=indexAmendment.component.js.map