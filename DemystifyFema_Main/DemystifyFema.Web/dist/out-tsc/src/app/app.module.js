"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var ngx_toastr_1 = require("ngx-toastr");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var http_2 = require("@angular/common/http");
var token_interceptor_1 = require("./auth/token.interceptor");
var auth_guard_1 = require("./common/auth.guard");
var ng2_ckeditor_1 = require("ng2-ckeditor");
var guest_component_1 = require("./areas/guest/layout/guest.component");
var loginRegisterPopup_component_1 = require("./areas/guest/layout/loginRegisterPopup.component");
var home_component_1 = require("./areas/guest/home/home.component");
var aboutus_component_1 = require("./areas/guest/aboutus/aboutus.component");
var contactus_component_1 = require("./areas/guest/contactus/contactus.component");
var searchedPDFPopup_component_1 = require("./areas/guest/home/searchedPDFPopup.component");
var idlePopup_component_1 = require("./common/idlePopup/idlePopup.component");
var user_component_1 = require("./areas/user/layout/user.component");
var dashboard_component_1 = require("./areas/user/dashboard/dashboard.component");
var fEMAModules_component_1 = require("./areas/user/fEMAModule/fEMAModules.component");
var supportTicket_component_1 = require("./areas/user/supportTicket/supportTicket.component");
var supportTicketReply_component_1 = require("./areas/user/supportTicketReply/supportTicketReply.component");
var regulationPopup_component_1 = require("./areas/user/fEMAModule/regulationPopup.component");
var authorsWriteupPopup_component_1 = require("./areas/user/fEMAModule/authorsWriteupPopup.component");
var actPopup_component_1 = require("./areas/user/fEMAModule/actPopup.component");
var masterDirectionPopup_component_1 = require("./areas/user/fEMAModule/masterDirectionPopup.component");
var fDICircularPopup_component_1 = require("./areas/user/fEMAModule/fDICircularPopup.component");
var nICCodePopup_component_1 = require("./areas/user/fEMAModule/nICCodePopup.component");
var fetersCodePopup_component_1 = require("./areas/user/fEMAModule/fetersCodePopup.component");
var formSummaryDocumentationPopup_component_1 = require("./areas/user/fEMAModule/formSummaryDocumentationPopup.component");
var fIPBReviewPopup_component_1 = require("./areas/user/fEMAModule/fIPBReviewPopup.component");
var manualPopup_component_1 = require("./areas/user/fEMAModule/manualPopup.component");
var rBIDIPPFAQPopup_component_1 = require("./areas/user/fEMAModule/rBIDIPPFAQPopup.component");
var rBIECBPopup_component_1 = require("./areas/user/fEMAModule/rBIECBPopup.component");
var rBIODIPopup_component_1 = require("./areas/user/fEMAModule/rBIODIPopup.component");
var rBICompoundingOrderPopup_component_1 = require("./areas/user/fEMAModule/rBICompoundingOrderPopup.component");
var keyDefinitionPopup_component_1 = require("./areas/user/fEMAModule/keyDefinitionPopup.component");
var keyEventPopup_component_1 = require("./areas/user/fEMAModule/keyEventPopup.component");
var sectorSnapshotPopup_component_1 = require("./areas/user/fEMAModule/sectorSnapshotPopup.component");
var fDIPenaltyCalculatorPopup_component_1 = require("./areas/user/fEMAModule/fDIPenaltyCalculatorPopup.component");
var eCBAverageMaturityCalculatorPopup_component_1 = require("./areas/user/fEMAModule/eCBAverageMaturityCalculatorPopup.component");
var compoundingPenaltyCalculatorPopup_component_1 = require("./areas/user/fEMAModule/compoundingPenaltyCalculatorPopup.component");
var lOBOPOEligibilityCalculatorPopup_component_1 = require("./areas/user/fEMAModule/lOBOPOEligibilityCalculatorPopup.component");
var subscription_component_1 = require("./areas/user/subscription/subscription.component");
var subscriptionPopup_component_1 = require("./areas/user/subscription/subscriptionPopup.component");
var policyPopup_component_1 = require("./areas/user/policy/policyPopup.component");
var termsConditionPopup_component_1 = require("./areas/user/TermsandCondition/termsConditionPopup.component");
var EULAPopup_component_1 = require("./areas/user/EULA/EULAPopup.component");
var subscriptionPolicyPopup_component_1 = require("./areas/user/subscriptionPolicy/subscriptionPolicyPopup.component");
var legalAggrement_component_1 = require("./areas/user/legalAggrement/legalAggrement.component");
var userPayment_component_1 = require("./areas/user/userPayment/userPayment.component");
var userProfile_component_1 = require("./areas/user/userProfile/userProfile.component");
var otpConfirmationForProfile_component_1 = require("./areas/user/userProfile/otpConfirmationForProfile.component");
var admin_component_1 = require("./areas/admin/layout/admin.component");
var public_admin_component_1 = require("./areas/admin/layout/public_admin.component");
var login_component_1 = require("./areas/admin/login/login.component");
var dashboard_component_2 = require("./areas/admin/dashboard/dashboard.component");
var actNames_component_1 = require("./areas/admin/actName/actNames.component");
var actName_component_1 = require("./areas/admin/actName/actName.component");
var allDefinition_component_1 = require("./areas/admin/allDefinition/allDefinition.component");
var regulations_component_1 = require("./areas/admin/regulation/regulations.component");
var regulation_component_1 = require("./areas/admin/regulation/regulation.component");
var femaIndex_component_1 = require("./areas/admin/femaIndex/femaIndex.component");
var indexAmendment_component_1 = require("./areas/admin/indexAmendment/indexAmendment.component");
var femaSubIndex_component_1 = require("./areas/admin/femaSubIndex/femaSubIndex.component");
var notification_component_1 = require("./areas/admin/notification/notification.component");
var notifications_component_1 = require("./areas/admin/notification/notifications.component");
var aPDIRCircular_component_1 = require("./areas/admin/aPDIRCircular/aPDIRCircular.component");
var aPDIRCirculars_component_1 = require("./areas/admin/aPDIRCircular/aPDIRCirculars.component");
var aPDIRCircularBefore_component_1 = require("./areas/admin/aPDIRCircularBefore/aPDIRCircularBefore.component");
var aPDIRCircularAfter_component_1 = require("./areas/admin/aPDIRCircularAfter/aPDIRCircularAfter.component");
var pressNote_component_1 = require("./areas/admin/pressNote/pressNote.component");
var pressNotes_component_1 = require("./areas/admin/pressNote/pressNotes.component");
var pressNoteNotification_component_1 = require("./areas/admin/pressNoteNotification/pressNoteNotification.component");
var pressNoteAPDIRCircular_component_1 = require("./areas/admin/pressNoteAPDIRCircular/pressNoteAPDIRCircular.component");
var fDICircular_component_1 = require("./areas/admin/fDICircular/fDICircular.component");
var fDICirculars_component_1 = require("./areas/admin/fDICircular/fDICirculars.component");
var fDIChapter_component_1 = require("./areas/admin/fDIChapter/fDIChapter.component");
var fDICircularIndex_component_1 = require("./areas/admin/fDICircularIndex/fDICircularIndex.component");
var fDICircularIndexAmendment_component_1 = require("./areas/admin/fDICircularIndexAmendment/fDICircularIndexAmendment.component");
var fDICircularSubIndex_component_1 = require("./areas/admin/fDICircularSubIndex/fDICircularSubIndex.component");
var sector_component_1 = require("./areas/admin/sector/sector.component");
var sectors_component_1 = require("./areas/admin/sector/sectors.component");
var sectorDetail_component_1 = require("./areas/admin/sectorDetail/sectorDetail.component");
var subSector_component_1 = require("./areas/admin/subSector/subSector.component");
var masterCircular_component_1 = require("./areas/admin/masterCircular/masterCircular.component");
var masterCircularDetail_component_1 = require("./areas/admin/masterCircularDetail/masterCircularDetail.component");
var masterCirculars_component_1 = require("./areas/admin/masterCircular/masterCirculars.component");
var fAQ_component_1 = require("./areas/admin/fAQ/fAQ.component");
var fAQs_component_1 = require("./areas/admin/fAQ/fAQs.component");
var fAQCategory_component_1 = require("./areas/admin/fAQCategory/fAQCategory.component");
var fAQCategories_component_1 = require("./areas/admin/fAQCategory/fAQCategories.component");
var masterDirection_component_1 = require("./areas/admin/masterDirection/masterDirection.component");
var masterDirections_component_1 = require("./areas/admin/masterDirection/masterDirections.component");
var masterDirectionFAQ_component_1 = require("./areas/admin/masterDirectionFAQ/masterDirectionFAQ.component");
var masterDirectionChapter_component_1 = require("./areas/admin/masterDirectionChapter/masterDirectionChapter.component");
var masterDirectionIndex_component_1 = require("./areas/admin/masterDirectionIndex/masterDirectionIndex.component");
var masterDirectionSubIndex_component_1 = require("./areas/admin/masterDirectionSubIndex/masterDirectionSubIndex.component");
var masterDirectionIndexAmendment_component_1 = require("./areas/admin/masterDirectionIndexAmendment/masterDirectionIndexAmendment.component");
var nICCodes_component_1 = require("./areas/admin/nICCode/nICCodes.component");
var nICCode_component_1 = require("./areas/admin/nICCode/nICCode.component");
var manuals_component_1 = require("./areas/admin/manual/manuals.component");
var manual_component_1 = require("./areas/admin/manual/manual.component");
var fetersCodes_component_1 = require("./areas/admin/fetersCode/fetersCodes.component");
var fetersCode_component_1 = require("./areas/admin/fetersCode/fetersCode.component");
var fetersCodeDetail_component_1 = require("./areas/admin/fetersCodeDetail/fetersCodeDetail.component");
var fetersCodeGroupDetail_component_1 = require("./areas/admin/fetersCodeGroupDetail/fetersCodeGroupDetail.component");
var fIPBReview_component_1 = require("./areas/admin/fIPBReview/fIPBReview.component");
var fIPBReviews_component_1 = require("./areas/admin/fIPBReview/fIPBReviews.component");
var dIPPClarification_component_1 = require("./areas/admin/dIPPClarification/dIPPClarification.component");
var dIPPClarifications_component_1 = require("./areas/admin/dIPPClarification/dIPPClarifications.component");
var fIPBPressReleaseCase_component_1 = require("./areas/admin/fIPBPressReleaseCase/fIPBPressReleaseCase.component");
var fIPBPressReleaseCases_component_1 = require("./areas/admin/fIPBPressReleaseCase/fIPBPressReleaseCases.component");
var form_component_1 = require("./areas/admin/form/form.component");
var forms_component_1 = require("./areas/admin/form/forms.component");
var formDetail_component_1 = require("./areas/admin/formDetail/formDetail.component");
var summaries_component_1 = require("./areas/admin/summary/summaries.component");
var summary_component_1 = require("./areas/admin/summary/summary.component");
var summaryDetail_component_1 = require("./areas/admin/summaryDetail/summaryDetail.component");
var documentation_component_1 = require("./areas/admin/documentation/documentation.component");
var documentations_component_1 = require("./areas/admin/documentation/documentations.component");
var documentationDetail_component_1 = require("./areas/admin/documentationDetail/documentationDetail.component");
var rBILiaisonOffice_component_1 = require("./areas/admin/rBILiaisonOffice/rBILiaisonOffice.component");
var rBILiaisonOffices_component_1 = require("./areas/admin/rBILiaisonOffice/rBILiaisonOffices.component");
var rBICompoundingOrder_component_1 = require("./areas/admin/rBICompoundingOrder/rBICompoundingOrder.component");
var rBICompoundingOrders_component_1 = require("./areas/admin/rBICompoundingOrder/rBICompoundingOrders.component");
var rBIData_component_1 = require("./areas/admin/rBIData/rBIData.component");
var rBIDatas_component_1 = require("./areas/admin/rBIData/rBIDatas.component");
var rBIDataDetail_component_1 = require("./areas/admin/rBIDataDetail/rBIDataDetail.component");
var rules_component_1 = require("./areas/admin/rules/rules.component");
var ruless_component_1 = require("./areas/admin/rules/ruless.component");
var rulesIndex_component_1 = require("./areas/admin/rulesIndex/rulesIndex.component");
var rulesSubIndex_component_1 = require("./areas/admin/rulesSubIndex/rulesSubIndex.component");
var gSRNotification_component_1 = require("./areas/admin/gSRNotification/gSRNotification.component");
var gSRNotifications_component_1 = require("./areas/admin/gSRNotification/gSRNotifications.component");
var rulesIndexAmendment_component_1 = require("./areas/admin/rulesIndexAmendment/rulesIndexAmendment.component");
var authorWriteUp_component_1 = require("./areas/admin/authorWriteUp/authorWriteUp.component");
var authorWriteUps_component_1 = require("./areas/admin/authorWriteUp/authorWriteUps.component");
var authorWriteUpDetail_component_1 = require("./areas/admin/authorWriteUpDetail/authorWriteUpDetail.component");
var authorFAQ_component_1 = require("./areas/admin/authorFAQ/authorFAQ.component");
var authorFAQs_component_1 = require("./areas/admin/authorFAQ/authorFAQs.component");
var authorFAQDetail_component_1 = require("./areas/admin/authorFAQDetail/authorFAQDetail.component");
var authorFAQQuestionReply_component_1 = require("./areas/admin/authorFAQQuestionReply/authorFAQQuestionReply.component");
var keyDefinition_component_1 = require("./areas/admin/keyDefinition/keyDefinition.component");
var keyDefinitions_component_1 = require("./areas/admin/keyDefinition/keyDefinitions.component");
var keyEvent_component_1 = require("./areas/admin/keyEvent/keyEvent.component");
var keyEvents_component_1 = require("./areas/admin/keyEvent/keyEvents.component");
var fEMAModule_component_1 = require("./areas/admin/fEMAModule/fEMAModule.component");
var fEMAModules_component_2 = require("./areas/admin/fEMAModule/fEMAModules.component");
var supportTicket_component_2 = require("./areas/admin/supportTicket/supportTicket.component");
var supportTicketReply_component_2 = require("./areas/admin/supportTicketReply/supportTicketReply.component");
var postQuery_component_1 = require("./areas/admin/postQuery/postQuery.component");
var indexPrivacyPolicy_component_1 = require("./areas/admin/PrivacyPolicy/indexPrivacyPolicy.component");
var indexTermsandCondition_component_1 = require("./areas/admin/TermsandCondition/indexTermsandCondition.component");
var indexEULAggrement_component_1 = require("./areas/admin/EULAggrement/indexEULAggrement.component");
var indexSubscriptionPolicy_component_1 = require("./areas/admin/SubscriptionPolicy/indexSubscriptionPolicy.component");
var postQueryReply_component_1 = require("./areas/admin/postQueryReply/postQueryReply.component");
var userProfiles_component_1 = require("./areas/admin/userProfile/userProfiles.component");
var userProfile_component_2 = require("./areas/admin/userProfile/userProfile.component");
var otpConfirmationForProfile_component_2 = require("./areas/admin/userProfile/otpConfirmationForProfile.component");
var subscriptionPackages_component_1 = require("./areas/admin/subscriptionPackage/subscriptionPackages.component");
var subscriptionPackage_component_1 = require("./areas/admin/subscriptionPackage/subscriptionPackage.component");
var PrivacyPolicy_component_1 = require("./areas/admin/privacyPolicyAdd/PrivacyPolicy.component");
var TermsandCondition_component_1 = require("./areas/admin/termsandConditionAdd/TermsandCondition.component");
var EULAggrement_component_1 = require("./areas/admin/EULAggrementAdd/EULAggrement.component");
var SubscriptionPolicy_component_1 = require("./areas/admin/SubscriptionPolicyAdd/SubscriptionPolicy.component");
/****************** Paytm Callback  **********************/
var PaytmCallback_component_1 = require("./areas/user/PaytmCallback/PaytmCallback.component");
var spinner_component_1 = require("./common/spinner.component");
var spinner_service_1 = require("./service/common/spinner.service");
var sidebarPanel_component_1 = require("./common/sidebarPanel.component");
var commonField_service_1 = require("./service/common/commonField.service");
var latesNews_service_1 = require("./service/common/latesNews.service");
var search_service_1 = require("./service/common/search.service");
var fEMASubModuleOfModule_service_1 = require("./service/user/fEMASubModuleOfModule.service");
var userProfile_service_1 = require("./service/user/userProfile.service");
var regulationOfFEMASubModuleDetail_service_1 = require("./service/user/regulationOfFEMASubModuleDetail.service");
var authorWriteUp_service_1 = require("./service/user/authorWriteUp.service");
var authorWriteUpDetail_service_1 = require("./service/user/authorWriteUpDetail.service");
var actName_service_1 = require("./service/user/actName.service");
var notification_service_1 = require("./service/user/notification.service");
var rulesOfFEMASubModuleDetail_service_1 = require("./service/user/rulesOfFEMASubModuleDetail.service");
var gSRNotification_service_1 = require("./service/user/gSRNotification.service");
var masterCircularOfFEMASubModuleDetail_service_1 = require("./service/user/masterCircularOfFEMASubModuleDetail.service");
var aPDIRCircularOfFEMASubModuleDetail_service_1 = require("./service/user/aPDIRCircularOfFEMASubModuleDetail.service");
var pressNoteOfFEMASubModuleDetail_service_1 = require("./service/user/pressNoteOfFEMASubModuleDetail.service");
var masterDirectionOfFEMASubModuleDetail_service_1 = require("./service/user/masterDirectionOfFEMASubModuleDetail.service");
var fDICircularOfFEMASubModuleDetail_service_1 = require("./service/user/fDICircularOfFEMASubModuleDetail.service");
var nICCode_service_1 = require("./service/user/nICCode.service");
var fetersCode_service_1 = require("./service/user/fetersCode.service");
var formSummaryDocumentation_service_1 = require("./service/user/formSummaryDocumentation.service");
var fIPBReview_service_1 = require("./service/user/fIPBReview.service");
var manual_service_1 = require("./service/user/manual.service");
var dIPPClarification_service_1 = require("./service/user/dIPPClarification.service");
var fIPBPressReleaseCase_service_1 = require("./service/user/fIPBPressReleaseCase.service");
var rBIData_service_1 = require("./service/user/rBIData.service");
var fAQ_service_1 = require("./service/user/fAQ.service");
var rBIFAQOfFEMASubModuleDetail_service_1 = require("./service/user/rBIFAQOfFEMASubModuleDetail.service");
var rBICompoundingOrder_service_1 = require("./service/user/rBICompoundingOrder.service");
var keyDefinitionEvent_service_1 = require("./service/user/keyDefinitionEvent.service");
var sector_service_1 = require("./service/user/sector.service");
var supportTicket_service_1 = require("./service/user/supportTicket.service");
var supportTicketReply_service_1 = require("./service/user/supportTicketReply.service");
var penaltyDetail_service_1 = require("./service/user/penaltyDetail.service");
var calculatorSubTopic_service_1 = require("./service/user/calculatorSubTopic.service");
var calculatorAnswer_service_1 = require("./service/user/calculatorAnswer.service");
var supportTicketSubTopic_service_1 = require("./service/user/supportTicketSubTopic.service");
var package_service_1 = require("./service/user/package.service");
var subscription_service_1 = require("./service/user/subscription.service");
var account_service_1 = require("./service/common/account.service");
var contactUs_service_1 = require("./service/common/contactUs.service");
var actName_service_2 = require("./service/admin/actName.service");
var allDefinition_service_1 = require("./service/admin/allDefinition.service");
var regulation_service_1 = require("./service/admin/regulation.service");
var femaIndex_service_1 = require("./service/admin/femaIndex.service");
var indexAmendment_service_1 = require("./service/admin/indexAmendment.service");
var femaSubIndex_service_1 = require("./service/admin/femaSubIndex.service");
var notification_service_2 = require("./service/admin/notification.service");
var aPDIRCircular_service_1 = require("./service/admin/aPDIRCircular.service");
var aPDIRCircularBefore_service_1 = require("./service/admin/aPDIRCircularBefore.service");
var aPDIRCircularAfter_service_1 = require("./service/admin/aPDIRCircularAfter.service");
var pressNote_service_1 = require("./service/admin/pressNote.service");
var pressNoteNotification_service_1 = require("./service/admin/pressNoteNotification.service");
var pressNoteAPDIRCircular_service_1 = require("./service/admin/pressNoteAPDIRCircular.service");
var fDICircular_service_1 = require("./service/admin/fDICircular.service");
var fDICircularIndex_service_1 = require("./service/admin/fDICircularIndex.service");
var fDIChapter_service_1 = require("./service/admin/fDIChapter.service");
var fDICircularSubIndex_service_1 = require("./service/admin/fDICircularSubIndex.service");
var fDICircularIndexAmendment_service_1 = require("./service/admin/fDICircularIndexAmendment.service");
var sector_service_2 = require("./service/admin/sector.service");
var sectorDetail_service_1 = require("./service/admin/sectorDetail.service");
var subSector_service_1 = require("./service/admin/subSector.service");
var masterCircular_service_1 = require("./service/admin/masterCircular.service");
var masterCircularDetail_service_1 = require("./service/admin/masterCircularDetail.service");
var fAQ_service_2 = require("./service/admin/fAQ.service");
var fAQCategory_service_1 = require("./service/admin/fAQCategory.service");
var masterDirection_service_1 = require("./service/admin/masterDirection.service");
var masterDirectionFAQ_service_1 = require("./service/admin/masterDirectionFAQ.service");
var masterDirectionChapter_service_1 = require("./service/admin/masterDirectionChapter.service");
var masterDirectionIndex_service_1 = require("./service/admin/masterDirectionIndex.service");
var masterDirectionSubIndex_service_1 = require("./service/admin/masterDirectionSubIndex.service");
var masterDirectionIndexAmendment_service_1 = require("./service/admin/masterDirectionIndexAmendment.service");
var nICCode_service_2 = require("./service/admin/nICCode.service");
var manual_service_2 = require("./service/admin/manual.service");
var fetersCode_service_2 = require("./service/admin/fetersCode.service");
var fetersCodeDetail_service_1 = require("./service/admin/fetersCodeDetail.service");
var fetersCodeGroupDetail_service_1 = require("./service/admin/fetersCodeGroupDetail.service");
var fIPBReview_service_2 = require("./service/admin/fIPBReview.service");
var dIPPClarification_service_2 = require("./service/admin/dIPPClarification.service");
var fIPBPressReleaseCase_service_2 = require("./service/admin/fIPBPressReleaseCase.service");
var formSummaryDocumentation_service_2 = require("./service/admin/formSummaryDocumentation.service");
var formSummaryDocumentationDetail_service_1 = require("./service/admin/formSummaryDocumentationDetail.service");
var rBILiaisonOffice_service_1 = require("./service/admin/rBILiaisonOffice.service");
var rBICompoundingOrder_service_2 = require("./service/admin/rBICompoundingOrder.service");
var rBIData_service_2 = require("./service/admin/rBIData.service");
var rBIDataDetail_service_1 = require("./service/admin/rBIDataDetail.service");
var rules_service_1 = require("./service/admin/rules.service");
var rulesIndex_service_1 = require("./service/admin/rulesIndex.service");
var rulesSubIndex_service_1 = require("./service/admin/rulesSubIndex.service");
var gSRNotification_service_2 = require("./service/admin/gSRNotification.service");
var rulesIndexAmendment_service_1 = require("./service/admin/rulesIndexAmendment.service");
var authorWriteUp_service_2 = require("./service/admin/authorWriteUp.service");
var authorWriteUpDetail_service_2 = require("./service/admin/authorWriteUpDetail.service");
var authorFAQ_service_1 = require("./service/admin/authorFAQ.service");
var authorFAQDetail_service_1 = require("./service/admin/authorFAQDetail.service");
var authorFAQQuestionReply_service_1 = require("./service/admin/authorFAQQuestionReply.service");
var keyDefinitionEvent_service_2 = require("./service/admin/keyDefinitionEvent.service");
var fEMASubModuleOfModule_service_2 = require("./service/admin/fEMASubModuleOfModule.service");
var supportTicket_service_2 = require("./service/admin/supportTicket.service");
var supportTicketReply_service_2 = require("./service/admin/supportTicketReply.service");
var userProfile_service_2 = require("./service/admin/userProfile.service");
var subscription_service_2 = require("./service/admin/subscription.service");
var subscriptionPackage_service_1 = require("./service/admin/subscriptionPackage.service");
var privacyPolicy_service_1 = require("./service/admin/privacyPolicy.service");
var termsCondition_service_1 = require("./service/admin/termsCondition.service");
var endUserLicenseAggrement_service_1 = require("./service/admin/endUserLicenseAggrement.service");
var subscriptionPolicy_service_1 = require("./service/admin/subscriptionPolicy.service");
var contentPopUp_component_1 = require("./areas/admin/contentPopUp/contentPopUp.component");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var app_component_1 = require("./app.component");
var app_routes_1 = require("./app.routes");
var safeHtmlPipe_1 = require("./common/safeHtmlPipe");
var keepalive_1 = require("@ng-idle/keepalive");
var angular2_moment_1 = require("angular2-moment");
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                app_routes_1.AppRoutes,
                http_1.HttpModule,
                http_2.HttpClientModule,
                ng2_ckeditor_1.CKEditorModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                ngx_modal_dialog_1.ModalDialogModule.forRoot(),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ngx_toastr_1.ToastrModule.forRoot(),
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot(),
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                angular2_moment_1.MomentModule,
                keepalive_1.NgIdleKeepaliveModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent,
                guest_component_1.GuestComponent,
                loginRegisterPopup_component_1.LoginRegisterPopupGuestComponent,
                home_component_1.HomeGuestComponent,
                aboutus_component_1.AboutUsGuestComponent,
                contactus_component_1.ContactUsGuestComponent,
                searchedPDFPopup_component_1.SearchedPDFPopupUserComponent,
                idlePopup_component_1.IdlePopupComponent,
                user_component_1.UserComponent,
                dashboard_component_1.DashboardUserComponent,
                fEMAModules_component_1.FEMAModulesUserComponent,
                supportTicket_component_1.SupportTicketUserComponent,
                supportTicketReply_component_1.SupportTicketReplyUserComponent,
                regulationPopup_component_1.RegulationPopupUserComponent,
                authorsWriteupPopup_component_1.AuthorsWriteupPopupUserComponent,
                actPopup_component_1.ActPopupUserComponent,
                masterDirectionPopup_component_1.MasterDirectionPopupUserComponent,
                fDICircularPopup_component_1.FDICircularPopupUserComponent,
                nICCodePopup_component_1.NICCodePopupUserComponent,
                fetersCodePopup_component_1.FetersCodePopupUserComponent,
                formSummaryDocumentationPopup_component_1.FormSummaryDocumentationPopupUserComponent,
                fIPBReviewPopup_component_1.FIPBReviewPopupUserComponent,
                manualPopup_component_1.ManualPopupUserComponent,
                rBIDIPPFAQPopup_component_1.RBIDIPPFAQPopupUserComponent,
                rBIECBPopup_component_1.RBIECBPopupUserComponent,
                rBIODIPopup_component_1.RBIODIPopupUserComponent,
                rBICompoundingOrderPopup_component_1.RBICompoundingOrderPopupUserComponent,
                keyDefinitionPopup_component_1.KeyDefinitionPopupUserComponent,
                keyEventPopup_component_1.KeyEventPopupUserComponent,
                sectorSnapshotPopup_component_1.SectorSnapshotPopupUserComponent,
                fDIPenaltyCalculatorPopup_component_1.FDIPenaltyCalculatorPopupUserComponent,
                eCBAverageMaturityCalculatorPopup_component_1.ECBAverageMaturityCalculatorPopupUserComponent,
                compoundingPenaltyCalculatorPopup_component_1.CompoundingPenaltyCalculatorPopupUserComponent,
                lOBOPOEligibilityCalculatorPopup_component_1.LOBOPOEligibilityCalculatorPopupUserComponent,
                subscription_component_1.SubscriptionUserComponent,
                subscriptionPopup_component_1.SubscriptionPopupUserComponent,
                policyPopup_component_1.PolicyPopupUserComponent,
                termsConditionPopup_component_1.TermsConditionPopupUserComponent,
                EULAPopup_component_1.EndUserLicenseAggrementPopupUserComponent,
                subscriptionPolicyPopup_component_1.SubscriptionPolicyPopupUserComponent,
                legalAggrement_component_1.LegalAggrementUserComponent,
                userPayment_component_1.UserPaymentComponent,
                userProfile_component_1.UserProfileUserComponent,
                otpConfirmationForProfile_component_1.OTPConfirmationForProfileUserComponent,
                admin_component_1.AdminComponent,
                public_admin_component_1.PublicAdminComponent,
                login_component_1.LoginAdminComponent,
                dashboard_component_2.DashboardAdminComponent,
                actNames_component_1.ActNamesAdminComponent,
                actName_component_1.ActNameAdminComponent,
                allDefinition_component_1.AllDefinitionAdminComponent,
                regulations_component_1.RegulationsAdminComponent,
                regulation_component_1.RegulationAdminComponent,
                femaIndex_component_1.FemaIndexAdminComponent,
                indexAmendment_component_1.IndexAmendmentAdminComponent,
                femaSubIndex_component_1.FemaSubIndexAdminComponent,
                notification_component_1.NotificationAdminComponent,
                notifications_component_1.NotificationsAdminComponent,
                contentPopUp_component_1.ContentPopUpAdminComponent,
                aPDIRCircular_component_1.APDIRCircularAdminComponent,
                aPDIRCirculars_component_1.APDIRCircularsAdminComponent,
                aPDIRCircularBefore_component_1.APDIRCircularBeforeAdminComponent,
                aPDIRCircularAfter_component_1.APDIRCircularAfterAdminComponent,
                pressNote_component_1.PressNoteAdminComponent,
                pressNotes_component_1.PressNotesAdminComponent,
                pressNoteNotification_component_1.PressNoteNotificationAdminComponent,
                pressNoteAPDIRCircular_component_1.PressNoteAPDIRCircularAdminComponent,
                fDICircular_component_1.FDICircularAdminComponent,
                fDICirculars_component_1.FDICircularsAdminComponent,
                fDIChapter_component_1.FDIChapterAdminComponent,
                fDICircularIndex_component_1.FDICircularIndexAdminComponent,
                fDICircularIndexAmendment_component_1.FDICircularIndexAmendmentAdminComponent,
                fDICircularSubIndex_component_1.FDICircularSubIndexAdminComponent,
                sector_component_1.SectorAdminComponent,
                sectors_component_1.SectorsAdminComponent,
                sectorDetail_component_1.SectorDetailAdminComponent,
                subSector_component_1.SubSectorAdminComponent,
                masterCircular_component_1.MasterCircularAdminComponent,
                masterCircularDetail_component_1.MasterCircularDetailAdminComponent,
                masterCirculars_component_1.MasterCircularsAdminComponent,
                fAQ_component_1.FAQAdminComponent,
                fAQs_component_1.FAQsAdminComponent,
                fAQCategory_component_1.FAQCategoryAdminComponent,
                fAQCategories_component_1.FAQCategoriesAdminComponent,
                masterDirections_component_1.MasterDirectionsAdminComponent,
                masterDirection_component_1.MasterDirectionAdminComponent,
                masterDirectionFAQ_component_1.MasterDirectionFAQAdminComponent,
                masterDirectionChapter_component_1.MasterDirectionChapterAdminComponent,
                masterDirectionIndex_component_1.MasterDirectionIndexAdminComponent,
                masterDirectionSubIndex_component_1.MasterDirectionSubIndexAdminComponent,
                masterDirectionIndexAmendment_component_1.MasterDirectionIndexAmendmentAdminComponent,
                nICCodes_component_1.NICCodesAdminComponent,
                nICCode_component_1.NICCodeAdminComponent,
                manual_component_1.ManualAdminComponent,
                manuals_component_1.ManualsAdminComponent,
                fetersCode_component_1.FetersCodeAdminComponent,
                fetersCodes_component_1.FetersCodesAdminComponent,
                fetersCodeDetail_component_1.FetersCodeDetailAdminComponent,
                fetersCodeGroupDetail_component_1.FetersCodeGroupDetailAdminComponent,
                fIPBReview_component_1.FIPBReviewAdminComponent,
                fIPBReviews_component_1.FIPBReviewsAdminComponent,
                dIPPClarification_component_1.DIPPClarificationAdminComponent,
                dIPPClarifications_component_1.DIPPClarificationsAdminComponent,
                fIPBPressReleaseCase_component_1.FIPBPressReleaseCaseAdminComponent,
                fIPBPressReleaseCases_component_1.FIPBPressReleaseCasesAdminComponent,
                form_component_1.FormAdminComponent,
                forms_component_1.FormsAdminComponent,
                formDetail_component_1.FormDetailAdminComponent,
                summaries_component_1.SummariesAdminComponent,
                summary_component_1.SummaryAdminComponent,
                summaryDetail_component_1.SummaryDetailAdminComponent,
                documentation_component_1.DocumentationAdminComponent,
                documentations_component_1.DocumentationsAdminComponent,
                documentationDetail_component_1.DocumentationDetailAdminComponent,
                rBILiaisonOffice_component_1.RBILiaisonOfficeAdminComponent,
                rBILiaisonOffices_component_1.RBILiaisonOfficesAdminComponent,
                rBICompoundingOrder_component_1.RBICompoundingOrderAdminComponent,
                rBICompoundingOrders_component_1.RBICompoundingOrdersAdminComponent,
                rBIData_component_1.RBIDataAdminComponent,
                rBIDatas_component_1.RBIDatasAdminComponent,
                rBIDataDetail_component_1.RBIDataDetailAdminComponent,
                rules_component_1.RulesAdminComponent,
                ruless_component_1.RulessAdminComponent,
                rulesIndex_component_1.RulesIndexAdminComponent,
                rulesSubIndex_component_1.RulesSubIndexAdminComponent,
                gSRNotification_component_1.GSRNotificationAdminComponent,
                gSRNotifications_component_1.GSRNotificationsAdminComponent,
                rulesIndexAmendment_component_1.RulesIndexAmendmentAdminComponent,
                authorWriteUp_component_1.AuthorWriteUpAdminComponent,
                authorWriteUps_component_1.AuthorWriteUpsAdminComponent,
                authorWriteUpDetail_component_1.AuthorWriteUpDetailAdminComponent,
                authorFAQ_component_1.AuthorFAQAdminComponent,
                authorFAQs_component_1.AuthorFAQsAdminComponent,
                authorFAQDetail_component_1.AuthorFAQDetailAdminComponent,
                authorFAQQuestionReply_component_1.AuthorFAQQuestionReplyAdminComponent,
                keyDefinition_component_1.KeyDefinitionAdminComponent,
                keyDefinitions_component_1.KeyDefinitionsAdminComponent,
                keyEvent_component_1.KeyEventAdminComponent,
                keyEvents_component_1.KeyEventsAdminComponent,
                fEMAModule_component_1.FEMAModuleAdminComponent,
                fEMAModules_component_2.FEMAModulesAdminComponent,
                supportTicket_component_2.SupportTicketAdminComponent,
                supportTicketReply_component_2.SupportTicketReplyAdminComponent,
                postQuery_component_1.PostQueryAdminComponent,
                indexPrivacyPolicy_component_1.IndexPrivacyPolicyAdminComponent,
                indexTermsandCondition_component_1.IndexTermConditionAdminComponent,
                indexEULAggrement_component_1.IndexEndUserLicenseAggrementAdminComponent,
                indexSubscriptionPolicy_component_1.IndexSubscriptionPolicyAdminComponent,
                postQueryReply_component_1.PostQueryReplyAdminComponent,
                userProfiles_component_1.UserProfilesAdminComponent,
                userProfile_component_2.UserProfileAdminComponent,
                otpConfirmationForProfile_component_2.OTPConfirmationForProfileAdminComponent,
                subscriptionPackages_component_1.SubscriptionPackagesAdminComponent,
                subscriptionPackage_component_1.SubscriptionPackageAdminComponent,
                PaytmCallback_component_1.PaytmCallabckComponent,
                PrivacyPolicy_component_1.PrivacyPolicyAdminComponent,
                TermsandCondition_component_1.TermsConditionAdminComponent,
                EULAggrement_component_1.EULAggrementAdminComponent,
                SubscriptionPolicy_component_1.SubscriptionPolicyAdminComponent,
                safeHtmlPipe_1.SafeHtmlPipe,
                spinner_component_1.SpinnerComponent,
                sidebarPanel_component_1.SidebarPanelComponent
            ],
            providers: [
                {
                    provide: http_2.HTTP_INTERCEPTORS,
                    useClass: token_interceptor_1.TokenInterceptor,
                    multi: true
                },
                {
                    provide: ngx_perfect_scrollbar_1.PERFECT_SCROLLBAR_CONFIG,
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                },
                auth_guard_1.AuthGuardAdmin,
                auth_guard_1.AuthGuardUser,
                spinner_service_1.SpinnerService,
                commonField_service_1.CommonFieldService,
                search_service_1.SearchService,
                latesNews_service_1.LatesNewsService,
                fEMASubModuleOfModule_service_1.FEMASubModuleOfModuleUserService,
                userProfile_service_1.UserProfileUserService,
                regulationOfFEMASubModuleDetail_service_1.RegulationOfFEMASubModuleDetailUserService,
                authorWriteUp_service_1.AuthorWriteUpUserService,
                authorWriteUpDetail_service_1.AuthorWriteUpDetailUserService,
                actName_service_1.ActNameUserService,
                notification_service_1.NotificationUserService,
                rulesOfFEMASubModuleDetail_service_1.RulesOfFEMASubModuleDetailUserService,
                gSRNotification_service_1.GSRNotificationUserService,
                masterCircularOfFEMASubModuleDetail_service_1.MasterCircularOfFEMASubModuleDetailUserService,
                aPDIRCircularOfFEMASubModuleDetail_service_1.APDIRCircularOfFEMASubModuleDetailUserService,
                pressNoteOfFEMASubModuleDetail_service_1.PressNoteOfFEMASubModuleDetailUserService,
                masterDirectionOfFEMASubModuleDetail_service_1.MasterDirectionOfFEMASubModuleDetailUserService,
                fDICircularOfFEMASubModuleDetail_service_1.FDICircularOfFEMASubModuleDetailUserService,
                nICCode_service_1.NICCodeUserService,
                fetersCode_service_1.FetersCodeUserService,
                formSummaryDocumentation_service_1.FormSummaryDocumentationUserService,
                fIPBReview_service_1.FIPBReviewUserService,
                manual_service_1.ManualUserService,
                dIPPClarification_service_1.DIPPClarificationUserService,
                fIPBPressReleaseCase_service_1.FIPBPressReleaseCaseUserService,
                rBIData_service_1.RBIDataUserService,
                fAQ_service_1.FAQUserService,
                rBIFAQOfFEMASubModuleDetail_service_1.RBIFAQOfFEMASubModuleDetailUserService,
                rBICompoundingOrder_service_1.RBICompoundingOrderUserService,
                keyDefinitionEvent_service_1.KeyDefinitionEventUserService,
                sector_service_1.SectorUserService,
                supportTicket_service_1.SupportTicketUserService,
                supportTicketReply_service_1.SupportTicketReplyUserService,
                penaltyDetail_service_1.PenaltyDetailUserService,
                calculatorSubTopic_service_1.CalculatorSubTopicUserService,
                calculatorAnswer_service_1.CalculatorAnswerUserService,
                supportTicketSubTopic_service_1.SupportTicketSubTopicUserService,
                package_service_1.PackageUserService,
                subscription_service_1.SubscriptionUserService,
                account_service_1.AccountService,
                contactUs_service_1.ContactUsService,
                actName_service_2.ActNameAdminService,
                allDefinition_service_1.AllDefinitionAdminService,
                regulation_service_1.RegulationAdminService,
                femaIndex_service_1.FemaIndexAdminService,
                indexAmendment_service_1.IndexAmendmentAdminService,
                femaSubIndex_service_1.FemaSubIndexAdminService,
                notification_service_2.NotificationAdminService,
                aPDIRCircular_service_1.APDIRCircularAdminService,
                aPDIRCircularBefore_service_1.APDIRCircularBeforeAdminService,
                aPDIRCircularAfter_service_1.APDIRCircularAfterAdminService,
                pressNote_service_1.PressNoteAdminService,
                pressNoteNotification_service_1.PressNoteNotificationAdminService,
                pressNoteAPDIRCircular_service_1.PressNoteAPDIRCircularAdminService,
                fDICircular_service_1.FDICircularAdminService,
                fDIChapter_service_1.FDIChapterAdminService,
                fDICircularIndex_service_1.FDICircularIndexAdminService,
                fDICircularSubIndex_service_1.FDICircularSubIndexAdminService,
                fDICircularIndexAmendment_service_1.FDICircularIndexAmendmentAdminService,
                sector_service_2.SectorAdminService,
                sectorDetail_service_1.SectorDetailAdminService,
                subSector_service_1.SubSectorAdminService,
                masterCircular_service_1.MasterCircularAdminService,
                masterCircularDetail_service_1.MasterCircularDetailAdminService,
                fAQ_service_2.FAQAdminService,
                fAQCategory_service_1.FAQCategoryAdminService,
                masterDirection_service_1.MasterDirectionAdminService,
                masterDirectionFAQ_service_1.MasterDirectionFAQAdminService,
                masterDirectionChapter_service_1.MasterDirectionChapterAdminService,
                masterDirectionIndex_service_1.MasterDirectionIndexAdminService,
                masterDirectionSubIndex_service_1.MasterDirectionSubIndexAdminService,
                masterDirectionIndexAmendment_service_1.MasterDirectionIndexAmendmentAdminService,
                nICCode_service_2.NICCodeAdminService,
                manual_service_2.ManualAdminService,
                fetersCode_service_2.FetersCodeAdminService,
                fetersCodeDetail_service_1.FetersCodeDetailAdminService,
                fetersCodeGroupDetail_service_1.FetersCodeGroupDetailAdminService,
                fIPBReview_service_2.FIPBReviewAdminService,
                dIPPClarification_service_2.DIPPClarificationAdminService,
                fIPBPressReleaseCase_service_2.FIPBPressReleaseCaseAdminService,
                formSummaryDocumentation_service_2.FormSummaryDocumentationAdminService,
                formSummaryDocumentationDetail_service_1.FormSummaryDocumentationDetailAdminService,
                rBILiaisonOffice_service_1.RBILiaisonOfficeAdminService,
                rBICompoundingOrder_service_2.RBICompoundingOrderAdminService,
                rBIData_service_2.RBIDataAdminService,
                rBIDataDetail_service_1.RBIDataDetailAdminService,
                rules_service_1.RulesAdminService,
                rulesIndex_service_1.RulesIndexAdminService,
                rulesSubIndex_service_1.RulesSubIndexAdminService,
                gSRNotification_service_2.GSRNotificationAdminService,
                rulesIndexAmendment_service_1.RulesIndexAmendmentAdminService,
                authorWriteUp_service_2.AuthorWriteUpAdminService,
                authorWriteUpDetail_service_2.AuthorWriteUpDetailAdminService,
                authorFAQ_service_1.AuthorFAQAdminService,
                authorFAQDetail_service_1.AuthorFAQDetailAdminService,
                authorFAQQuestionReply_service_1.AuthorFAQQuestionReplyAdminService,
                keyDefinitionEvent_service_2.KeyDefinitionEventAdminService,
                fEMASubModuleOfModule_service_2.FEMASubModuleOfModuleAdminService,
                supportTicket_service_2.SupportTicketAdminService,
                supportTicketReply_service_2.SupportTicketReplyAdminService,
                userProfile_service_2.UserProfileAdminService,
                subscription_service_2.SubscriptionAdminService,
                subscriptionPackage_service_1.SubscriptionPackageAdminService,
                privacyPolicy_service_1.PrivacyPolicyAdminService,
                termsCondition_service_1.TermsConditionAdminService,
                endUserLicenseAggrement_service_1.EndUserLicenseAggrementAdminService,
                subscriptionPolicy_service_1.SubscriptionPolicyAdminService
            ],
            entryComponents: [
                contentPopUp_component_1.ContentPopUpAdminComponent,
                otpConfirmationForProfile_component_2.OTPConfirmationForProfileAdminComponent,
                loginRegisterPopup_component_1.LoginRegisterPopupGuestComponent,
                searchedPDFPopup_component_1.SearchedPDFPopupUserComponent,
                idlePopup_component_1.IdlePopupComponent,
                regulationPopup_component_1.RegulationPopupUserComponent,
                authorsWriteupPopup_component_1.AuthorsWriteupPopupUserComponent,
                actPopup_component_1.ActPopupUserComponent,
                masterDirectionPopup_component_1.MasterDirectionPopupUserComponent,
                fDICircularPopup_component_1.FDICircularPopupUserComponent,
                nICCodePopup_component_1.NICCodePopupUserComponent,
                fetersCodePopup_component_1.FetersCodePopupUserComponent,
                formSummaryDocumentationPopup_component_1.FormSummaryDocumentationPopupUserComponent,
                fIPBReviewPopup_component_1.FIPBReviewPopupUserComponent,
                manualPopup_component_1.ManualPopupUserComponent,
                rBIECBPopup_component_1.RBIECBPopupUserComponent,
                rBIODIPopup_component_1.RBIODIPopupUserComponent,
                rBIDIPPFAQPopup_component_1.RBIDIPPFAQPopupUserComponent,
                rBICompoundingOrderPopup_component_1.RBICompoundingOrderPopupUserComponent,
                keyDefinitionPopup_component_1.KeyDefinitionPopupUserComponent,
                keyEventPopup_component_1.KeyEventPopupUserComponent,
                sectorSnapshotPopup_component_1.SectorSnapshotPopupUserComponent,
                fDIPenaltyCalculatorPopup_component_1.FDIPenaltyCalculatorPopupUserComponent,
                eCBAverageMaturityCalculatorPopup_component_1.ECBAverageMaturityCalculatorPopupUserComponent,
                compoundingPenaltyCalculatorPopup_component_1.CompoundingPenaltyCalculatorPopupUserComponent,
                lOBOPOEligibilityCalculatorPopup_component_1.LOBOPOEligibilityCalculatorPopupUserComponent,
                subscriptionPopup_component_1.SubscriptionPopupUserComponent,
                policyPopup_component_1.PolicyPopupUserComponent,
                termsConditionPopup_component_1.TermsConditionPopupUserComponent,
                EULAPopup_component_1.EndUserLicenseAggrementPopupUserComponent,
                subscriptionPolicyPopup_component_1.SubscriptionPolicyPopupUserComponent,
                legalAggrement_component_1.LegalAggrementUserComponent,
                userPayment_component_1.UserPaymentComponent,
                otpConfirmationForProfile_component_1.OTPConfirmationForProfileUserComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map