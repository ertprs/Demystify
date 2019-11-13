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
var ngx_toastr_1 = require("ngx-toastr");
var userProfile_1 = require("../../../model/userProfile");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var userProfile_service_1 = require("../../../service/admin/userProfile.service");
var subscription_service_1 = require("../../../service/admin/subscription.service");
var UserProfilesAdminComponent = /** @class */ (function () {
    function UserProfilesAdminComponent(formBuilder, activatedRoute, _userProfileService, _subscriptionService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._userProfileService = _userProfileService;
        this._subscriptionService = _subscriptionService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.colourCode = { "Active": "#32CD32", "Expired": "#FF0000", "No Subscription": "#666600", "Pending": "#0000FF" };
    }
    UserProfilesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
            _this.sortingUserProfileField = params["sortingUserProfileField"];
            _this.sortingUserProfileDirection = params["sortingUserProfileDirection"];
        });
        this.frmUserProfile = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetUserProfile(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    UserProfilesAdminComponent.prototype.GetUserProfile = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getUserProfileRequest = new userProfile_1.GetUserProfileRequest();
        getUserProfileRequest.SearchText = searchText;
        getUserProfileRequest.IsActive = null;
        getUserProfileRequest.OrderBy = this.sortingUserProfileField;
        getUserProfileRequest.OrderByDirection = this.sortingUserProfileDirection;
        getUserProfileRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getUserProfileRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._userProfileService.getUserProfile(getUserProfileRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.userProfiles = data.Response;
                _this.pageSize = getUserProfileRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    UserProfilesAdminComponent.prototype.SearchUserProfile = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetUserProfile(this.searchText, this.currentPage, this.pageSize);
    };
    UserProfilesAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetUserProfile(this.searchText, pageNumber, this.pageSize);
    };
    UserProfilesAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetUserProfile(this.searchText, null, this.pageSize);
    };
    UserProfilesAdminComponent.prototype.ViewUserProfile = function (userId) {
        this.router.navigate(['/admin/secure/userprofile/' + this._global.encryptValue(userId)], {
            queryParams: {
                sortingUserProfileField: this.sortingUserProfileField, sortingUserProfileDirection: this.sortingUserProfileDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    UserProfilesAdminComponent.prototype.OnUserProfileSort = function (fieldName) {
        this.sortingUserProfileDirection = (this.sortingUserProfileField == fieldName) ? (this.sortingUserProfileDirection == "A") ? "D" : "A" : "A";
        this.sortingUserProfileField = fieldName;
        this.GetUserProfile(this.searchText, this.currentPage, this.pageSize);
    };
    UserProfilesAdminComponent.prototype.UnsubscribeUser = function (data) {
        var _this = this;
        var confirmBox = confirm("Are you sure you want to unsubscribe user? \n\nAfter unsubscribed user cannot access feature of website which needs subscription.");
        if (confirmBox) {
            this.spinnerService.show();
            var updateSubscription = {
                UserId: data.UserId,
                SubscriptionId: data.SubscriptionId,
                IsExpired: true,
                IsActive: false
            };
            this._subscriptionService.updateSubscription(updateSubscription)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
                    _this.GetUserProfile(_this.searchText, _this.currentPage, _this.pageSize);
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    UserProfilesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './userProfiles.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            userProfile_service_1.UserProfileAdminService,
            subscription_service_1.SubscriptionAdminService,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            router_1.Router])
    ], UserProfilesAdminComponent);
    return UserProfilesAdminComponent;
}());
exports.UserProfilesAdminComponent = UserProfilesAdminComponent;
//# sourceMappingURL=userProfiles.component.js.map