"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("../areas/admin/login/login.component");
var dashboard_component_1 = require("../areas/admin/dashboard/dashboard.component");
var actNames_component_1 = require("../areas/admin/actName/actNames.component");
var actName_component_1 = require("../areas/admin/actName/actName.component");
var allDefinition_component_1 = require("../areas/admin/allDefinition/allDefinition.component");
var regulations_component_1 = require("../areas/admin/regulation/regulations.component");
var regulation_component_1 = require("../areas/admin/regulation/regulation.component");
var femaIndex_component_1 = require("../areas/admin/femaIndex/femaIndex.component");
var indexAmendment_component_1 = require("../areas/admin/indexAmendment/indexAmendment.component");
var femaSubIndex_component_1 = require("../areas/admin/femaSubIndex/femaSubIndex.component");
var notification_component_1 = require("../areas/admin/notification/notification.component");
var notifications_component_1 = require("../areas/admin/notification/notifications.component");
var aPDIRCircular_component_1 = require("../areas/admin/aPDIRCircular/aPDIRCircular.component");
var aPDIRCirculars_component_1 = require("../areas/admin/aPDIRCircular/aPDIRCirculars.component");
var aPDIRCircularBefore_component_1 = require("../areas/admin/aPDIRCircularBefore/aPDIRCircularBefore.component");
var aPDIRCircularAfter_component_1 = require("../areas/admin/aPDIRCircularAfter/aPDIRCircularAfter.component");
var pressNote_component_1 = require("../areas/admin/pressNote/pressNote.component");
var pressNotes_component_1 = require("../areas/admin/pressNote/pressNotes.component");
var pressNoteNotification_component_1 = require("../areas/admin/pressNoteNotification/pressNoteNotification.component");
var pressNoteAPDIRCircular_component_1 = require("../areas/admin/pressNoteAPDIRCircular/pressNoteAPDIRCircular.component");
var fDICircular_component_1 = require("../areas/admin/fDICircular/fDICircular.component");
var fDICirculars_component_1 = require("../areas/admin/fDICircular/fDICirculars.component");
var fDIChapter_component_1 = require("../areas/admin/fDIChapter/fDIChapter.component");
var fDICircularIndex_component_1 = require("../areas/admin/fDICircularIndex/fDICircularIndex.component");
var fDICircularIndexAmendment_component_1 = require("../areas/admin/fDICircularIndexAmendment/fDICircularIndexAmendment.component");
var fDICircularSubIndex_component_1 = require("../areas/admin/fDICircularSubIndex/fDICircularSubIndex.component");
var sector_component_1 = require("../areas/admin/sector/sector.component");
var sectors_component_1 = require("../areas/admin/sector/sectors.component");
var subSector_component_1 = require("../areas/admin/subSector/subSector.component");
var sectorDetail_component_1 = require("../areas/admin/sectorDetail/sectorDetail.component");
var masterCircular_component_1 = require("../areas/admin/masterCircular/masterCircular.component");
var masterCircularDetail_component_1 = require("../areas/admin/masterCircularDetail/masterCircularDetail.component");
var masterCirculars_component_1 = require("../areas/admin/masterCircular/masterCirculars.component");
var fAQ_component_1 = require("../areas/admin/fAQ/fAQ.component");
var fAQs_component_1 = require("../areas/admin/fAQ/fAQs.component");
var fAQCategory_component_1 = require("../areas/admin/fAQCategory/fAQCategory.component");
var fAQCategories_component_1 = require("../areas/admin/fAQCategory/fAQCategories.component");
var masterDirection_component_1 = require("../areas/admin/masterDirection/masterDirection.component");
var masterDirections_component_1 = require("../areas/admin/masterDirection/masterDirections.component");
var masterDirectionFAQ_component_1 = require("../areas/admin/masterDirectionFAQ/masterDirectionFAQ.component");
var masterDirectionChapter_component_1 = require("../areas/admin/masterDirectionChapter/masterDirectionChapter.component");
var masterDirectionIndex_component_1 = require("../areas/admin/masterDirectionIndex/masterDirectionIndex.component");
var masterDirectionSubIndex_component_1 = require("../areas/admin/masterDirectionSubIndex/masterDirectionSubIndex.component");
var masterDirectionIndexAmendment_component_1 = require("../areas/admin/masterDirectionIndexAmendment/masterDirectionIndexAmendment.component");
var nICCodes_component_1 = require("../areas/admin/nICCode/nICCodes.component");
var nICCode_component_1 = require("../areas/admin/nICCode/nICCode.component");
var manuals_component_1 = require("../areas/admin/manual/manuals.component");
var manual_component_1 = require("../areas/admin/manual/manual.component");
var fetersCodes_component_1 = require("../areas/admin/fetersCode/fetersCodes.component");
var fetersCode_component_1 = require("../areas/admin/fetersCode/fetersCode.component");
var fetersCodeDetail_component_1 = require("../areas/admin/fetersCodeDetail/fetersCodeDetail.component");
var fetersCodeGroupDetail_component_1 = require("../areas/admin/fetersCodeGroupDetail/fetersCodeGroupDetail.component");
var fIPBReview_component_1 = require("../areas/admin/fIPBReview/fIPBReview.component");
var fIPBReviews_component_1 = require("../areas/admin/fIPBReview/fIPBReviews.component");
var dIPPClarification_component_1 = require("../areas/admin/dIPPClarification/dIPPClarification.component");
var dIPPClarifications_component_1 = require("../areas/admin/dIPPClarification/dIPPClarifications.component");
var fIPBPressReleaseCase_component_1 = require("../areas/admin/fIPBPressReleaseCase/fIPBPressReleaseCase.component");
var fIPBPressReleaseCases_component_1 = require("../areas/admin/fIPBPressReleaseCase/fIPBPressReleaseCases.component");
var form_component_1 = require("../areas/admin/form/form.component");
var forms_component_1 = require("../areas/admin/form/forms.component");
var formDetail_component_1 = require("../areas/admin/formDetail/formDetail.component");
var summaries_component_1 = require("../areas/admin/summary/summaries.component");
var summary_component_1 = require("../areas/admin/summary/summary.component");
var summaryDetail_component_1 = require("../areas/admin/summaryDetail/summaryDetail.component");
var documentation_component_1 = require("../areas/admin/documentation/documentation.component");
var documentations_component_1 = require("../areas/admin/documentation/documentations.component");
var documentationDetail_component_1 = require("../areas/admin/documentationDetail/documentationDetail.component");
var rBILiaisonOffice_component_1 = require("../areas/admin/rBILiaisonOffice/rBILiaisonOffice.component");
var rBILiaisonOffices_component_1 = require("../areas/admin/rBILiaisonOffice/rBILiaisonOffices.component");
var rBICompoundingOrder_component_1 = require("../areas/admin/rBICompoundingOrder/rBICompoundingOrder.component");
var rBICompoundingOrders_component_1 = require("../areas/admin/rBICompoundingOrder/rBICompoundingOrders.component");
var rBIData_component_1 = require("../areas/admin/rBIData/rBIData.component");
var rBIDatas_component_1 = require("../areas/admin/rBIData/rBIDatas.component");
var rBIDataDetail_component_1 = require("../areas/admin/rBIDataDetail/rBIDataDetail.component");
var rules_component_1 = require("../areas/admin/rules/rules.component");
var ruless_component_1 = require("../areas/admin/rules/ruless.component");
var rulesIndex_component_1 = require("../areas/admin/rulesIndex/rulesIndex.component");
var rulesSubIndex_component_1 = require("../areas/admin/rulesSubIndex/rulesSubIndex.component");
var gSRNotification_component_1 = require("../areas/admin/gSRNotification/gSRNotification.component");
var gSRNotifications_component_1 = require("../areas/admin/gSRNotification/gSRNotifications.component");
var rulesIndexAmendment_component_1 = require("../areas/admin/rulesIndexAmendment/rulesIndexAmendment.component");
var authorWriteUp_component_1 = require("../areas/admin/authorWriteUp/authorWriteUp.component");
var authorWriteUps_component_1 = require("../areas/admin/authorWriteUp/authorWriteUps.component");
var authorWriteUpDetail_component_1 = require("../areas/admin/authorWriteUpDetail/authorWriteUpDetail.component");
var authorFAQ_component_1 = require("../areas/admin/authorFAQ/authorFAQ.component");
var authorFAQs_component_1 = require("../areas/admin/authorFAQ/authorFAQs.component");
var authorFAQDetail_component_1 = require("../areas/admin/authorFAQDetail/authorFAQDetail.component");
var authorFAQQuestionReply_component_1 = require("../areas/admin/authorFAQQuestionReply/authorFAQQuestionReply.component");
var keyDefinition_component_1 = require("../areas/admin/keyDefinition/keyDefinition.component");
var keyDefinitions_component_1 = require("../areas/admin/keyDefinition/keyDefinitions.component");
var keyEvent_component_1 = require("../areas/admin/keyEvent/keyEvent.component");
var keyEvents_component_1 = require("../areas/admin/keyEvent/keyEvents.component");
var fEMAModule_component_1 = require("../areas/admin/fEMAModule/fEMAModule.component");
var fEMAModules_component_1 = require("../areas/admin/fEMAModule/fEMAModules.component");
var supportTicket_component_1 = require("../areas/admin/supportTicket/supportTicket.component");
var supportTicketReply_component_1 = require("../areas/admin/supportTicketReply/supportTicketReply.component");
var postQuery_component_1 = require("../areas/admin/postQuery/postQuery.component");
var indexPrivacyPolicy_component_1 = require("../areas/admin/PrivacyPolicy/indexPrivacyPolicy.component");
var indexTermsandCondition_component_1 = require("../areas/admin/TermsandCondition/indexTermsandCondition.component");
var indexEULAggrement_component_1 = require("../areas/admin/EULAggrement/indexEULAggrement.component");
var indexSubscriptionPolicy_component_1 = require("../areas/admin/SubscriptionPolicy/indexSubscriptionPolicy.component");
var postQueryReply_component_1 = require("../areas/admin/postQueryReply/postQueryReply.component");
var userProfiles_component_1 = require("../areas/admin/userProfile/userProfiles.component");
var userProfile_component_1 = require("../areas/admin/userProfile/userProfile.component");
var subscriptionPackages_component_1 = require("../areas/admin/subscriptionPackage/subscriptionPackages.component");
var subscriptionPackage_component_1 = require("../areas/admin/subscriptionPackage/subscriptionPackage.component");
var PrivacyPolicy_component_1 = require("../areas/admin/privacyPolicyAdd/PrivacyPolicy.component");
var TermsandCondition_component_1 = require("../areas/admin/termsandConditionAdd/TermsandCondition.component");
var EULAggrement_component_1 = require("../areas/admin/EULAggrementAdd/EULAggrement.component");
var SubscriptionPolicy_component_1 = require("../areas/admin/SubscriptionPolicyAdd/SubscriptionPolicy.component");
exports.PUBLIC_ADMIN_ROUTES = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginAdminComponent }
];
exports.ADMIN_ROUTES = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: dashboard_component_1.DashboardAdminComponent },
    { path: 'actnames', component: actNames_component_1.ActNamesAdminComponent },
    { path: 'actname', component: actName_component_1.ActNameAdminComponent },
    { path: 'actname/:actId', component: actName_component_1.ActNameAdminComponent },
    { path: 'alldefinition/:actId', component: allDefinition_component_1.AllDefinitionAdminComponent },
    { path: 'alldefinition/:actId/:id', component: allDefinition_component_1.AllDefinitionAdminComponent },
    { path: 'regulations', component: regulations_component_1.RegulationsAdminComponent },
    { path: 'regulation', component: regulation_component_1.RegulationAdminComponent },
    { path: 'regulation/:regulationId', component: regulation_component_1.RegulationAdminComponent },
    { path: 'femaindex/:regulationId', component: femaIndex_component_1.FemaIndexAdminComponent },
    { path: 'femaindex/:regulationId/:indexId', component: femaIndex_component_1.FemaIndexAdminComponent },
    { path: 'indexamendment/:regulationId', component: indexAmendment_component_1.IndexAmendmentAdminComponent },
    { path: 'indexamendment/:regulationId/:indexAmendmentId', component: indexAmendment_component_1.IndexAmendmentAdminComponent },
    { path: 'femasubindex/:regulationId/:indexId', component: femaSubIndex_component_1.FemaSubIndexAdminComponent },
    { path: 'femasubindex/:regulationId/:indexId/:subIndexId', component: femaSubIndex_component_1.FemaSubIndexAdminComponent },
    { path: 'notifications', component: notifications_component_1.NotificationsAdminComponent },
    { path: 'notification', component: notification_component_1.NotificationAdminComponent },
    { path: 'notification/:notificationId', component: notification_component_1.NotificationAdminComponent },
    { path: 'apdircirculars', component: aPDIRCirculars_component_1.APDIRCircularsAdminComponent },
    { path: 'apdircircular', component: aPDIRCircular_component_1.APDIRCircularAdminComponent },
    { path: 'apdircircular/:aPDIRCircularId', component: aPDIRCircular_component_1.APDIRCircularAdminComponent },
    { path: 'apdircircularbefore/:aPDIRCircularParentId', component: aPDIRCircularBefore_component_1.APDIRCircularBeforeAdminComponent },
    { path: 'apdircircularbefore/:aPDIRCircularParentId/:aPDIRCircularBeforeId', component: aPDIRCircularBefore_component_1.APDIRCircularBeforeAdminComponent },
    { path: 'apdircircularafter/:aPDIRCircularParentId', component: aPDIRCircularAfter_component_1.APDIRCircularAfterAdminComponent },
    { path: 'apdircircularafter/:aPDIRCircularParentId/:aPDIRCircularAfterId', component: aPDIRCircularAfter_component_1.APDIRCircularAfterAdminComponent },
    { path: 'pressnotes', component: pressNotes_component_1.PressNotesAdminComponent },
    { path: 'pressnote', component: pressNote_component_1.PressNoteAdminComponent },
    { path: 'pressnote/:pressNoteId', component: pressNote_component_1.PressNoteAdminComponent },
    { path: 'pressnotenotification/:pressNoteId', component: pressNoteNotification_component_1.PressNoteNotificationAdminComponent },
    { path: 'pressnotenotification/:pressNoteId/:pressNoteNotificationId', component: pressNoteNotification_component_1.PressNoteNotificationAdminComponent },
    { path: 'pressnoteapdircircular/:pressNoteId', component: pressNoteAPDIRCircular_component_1.PressNoteAPDIRCircularAdminComponent },
    { path: 'pressnoteapdircircular/:pressNoteId/:pressNoteAPDIRCircularId', component: pressNoteAPDIRCircular_component_1.PressNoteAPDIRCircularAdminComponent },
    { path: 'fdicirculars', component: fDICirculars_component_1.FDICircularsAdminComponent },
    { path: 'fdicircular', component: fDICircular_component_1.FDICircularAdminComponent },
    { path: 'fdicircular/:fDICircularId', component: fDICircular_component_1.FDICircularAdminComponent },
    { path: 'fdichapter/:fDICircularId', component: fDIChapter_component_1.FDIChapterAdminComponent },
    { path: 'fdichapter/:fDICircularId/:fDIChapterId', component: fDIChapter_component_1.FDIChapterAdminComponent },
    { path: 'fdicircularindex/:fDICircularId/:fDIChapterId', component: fDICircularIndex_component_1.FDICircularIndexAdminComponent },
    { path: 'fdicircularindex/:fDICircularId/:fDIChapterId/:fDICircularIndexId', component: fDICircularIndex_component_1.FDICircularIndexAdminComponent },
    { path: 'fdicircularindexamendment/:fDICircularId', component: fDICircularIndexAmendment_component_1.FDICircularIndexAmendmentAdminComponent },
    { path: 'fdicircularindexamendment/:fDICircularId/:fDICircularIndexAmendmentId', component: fDICircularIndexAmendment_component_1.FDICircularIndexAmendmentAdminComponent },
    { path: 'fdicircularsubindex/:fDICircularId/:fDIChapterId/:fDICircularIndexId', component: fDICircularSubIndex_component_1.FDICircularSubIndexAdminComponent },
    { path: 'fdicircularsubindex/:fDICircularId/:fDIChapterId/:fDICircularIndexId/:fDICircularSubIndexId', component: fDICircularSubIndex_component_1.FDICircularSubIndexAdminComponent },
    { path: 'sectors', component: sectors_component_1.SectorsAdminComponent },
    { path: 'sector', component: sector_component_1.SectorAdminComponent },
    { path: 'sector/:sectorId', component: sector_component_1.SectorAdminComponent },
    { path: 'sectordetail/:sectorId', component: sectorDetail_component_1.SectorDetailAdminComponent },
    { path: 'sectordetail/:sectorId/:sectorDetailId', component: sectorDetail_component_1.SectorDetailAdminComponent },
    { path: 'subsector/:sectorId', component: subSector_component_1.SubSectorAdminComponent },
    { path: 'subsector/:sectorId/:subSectorId', component: subSector_component_1.SubSectorAdminComponent },
    { path: 'mastercirculars', component: masterCirculars_component_1.MasterCircularsAdminComponent },
    { path: 'mastercircular', component: masterCircular_component_1.MasterCircularAdminComponent },
    { path: 'mastercircular/:masterCircularId', component: masterCircular_component_1.MasterCircularAdminComponent },
    { path: 'mastercirculardetail/:masterCircularId', component: masterCircularDetail_component_1.MasterCircularDetailAdminComponent },
    { path: 'mastercirculardetail/:masterCircularId/:masterCircularDetailId', component: masterCircularDetail_component_1.MasterCircularDetailAdminComponent },
    { path: 'faqs', component: fAQs_component_1.FAQsAdminComponent },
    { path: 'faq', component: fAQ_component_1.FAQAdminComponent },
    { path: 'faq/:fAQId', component: fAQ_component_1.FAQAdminComponent },
    { path: 'faqcategories', component: fAQCategories_component_1.FAQCategoriesAdminComponent },
    { path: 'faqcategory', component: fAQCategory_component_1.FAQCategoryAdminComponent },
    { path: 'faqcategory/:fAQCategoryId', component: fAQCategory_component_1.FAQCategoryAdminComponent },
    { path: 'masterdirections', component: masterDirections_component_1.MasterDirectionsAdminComponent },
    { path: 'masterdirection', component: masterDirection_component_1.MasterDirectionAdminComponent },
    { path: 'masterdirection/:masterDirectionId', component: masterDirection_component_1.MasterDirectionAdminComponent },
    { path: 'masterdirectionfaq/:masterDirectionId', component: masterDirectionFAQ_component_1.MasterDirectionFAQAdminComponent },
    { path: 'masterdirectionfaq/:masterDirectionId/:masterDirectionFAQId', component: masterDirectionFAQ_component_1.MasterDirectionFAQAdminComponent },
    { path: 'masterdirectionchapter/:masterDirectionId', component: masterDirectionChapter_component_1.MasterDirectionChapterAdminComponent },
    { path: 'masterdirectionchapter/:masterDirectionId/:masterDirectionChapterId', component: masterDirectionChapter_component_1.MasterDirectionChapterAdminComponent },
    { path: 'masterdirectionindex/:masterDirectionId/:masterDirectionChapterId', component: masterDirectionIndex_component_1.MasterDirectionIndexAdminComponent },
    { path: 'masterdirectionindex/:masterDirectionId/:masterDirectionChapterId/:masterDirectionIndexId', component: masterDirectionIndex_component_1.MasterDirectionIndexAdminComponent },
    { path: 'masterdirectionsubindex/:masterDirectionId/:masterDirectionChapterId/:masterDirectionIndexId', component: masterDirectionSubIndex_component_1.MasterDirectionSubIndexAdminComponent },
    { path: 'masterdirectionsubindex/:masterDirectionId/:masterDirectionChapterId/:masterDirectionIndexId/:masterDirectionSubIndexId', component: masterDirectionSubIndex_component_1.MasterDirectionSubIndexAdminComponent },
    { path: 'masterdirectionindexamendment/:masterDirectionId', component: masterDirectionIndexAmendment_component_1.MasterDirectionIndexAmendmentAdminComponent },
    { path: 'masterdirectionindexamendment/:masterDirectionId/:masterDirectionIndexAmendmentId', component: masterDirectionIndexAmendment_component_1.MasterDirectionIndexAmendmentAdminComponent },
    { path: 'niccodes', component: nICCodes_component_1.NICCodesAdminComponent },
    { path: 'niccode', component: nICCode_component_1.NICCodeAdminComponent },
    { path: 'niccode/:nICCodeId', component: nICCode_component_1.NICCodeAdminComponent },
    { path: 'manuals', component: manuals_component_1.ManualsAdminComponent },
    { path: 'manual', component: manual_component_1.ManualAdminComponent },
    { path: 'manual/:manualId', component: manual_component_1.ManualAdminComponent },
    { path: 'feterscodes', component: fetersCodes_component_1.FetersCodesAdminComponent },
    { path: 'feterscode', component: fetersCode_component_1.FetersCodeAdminComponent },
    { path: 'feterscode/:fetersCodeId', component: fetersCode_component_1.FetersCodeAdminComponent },
    { path: 'feterscodedetail/:fetersCodeId', component: fetersCodeDetail_component_1.FetersCodeDetailAdminComponent },
    { path: 'feterscodedetail/:fetersCodeId/:fetersCodeDetailId', component: fetersCodeDetail_component_1.FetersCodeDetailAdminComponent },
    { path: 'feterscodegroupdetail/:fetersCodeId/:fetersCodeDetailId', component: fetersCodeGroupDetail_component_1.FetersCodeGroupDetailAdminComponent },
    { path: 'feterscodegroupdetail/:fetersCodeId/:fetersCodeDetailId/:fetersCodeGroupDetailId', component: fetersCodeGroupDetail_component_1.FetersCodeGroupDetailAdminComponent },
    { path: 'fipbreviews', component: fIPBReviews_component_1.FIPBReviewsAdminComponent },
    { path: 'fipbreview', component: fIPBReview_component_1.FIPBReviewAdminComponent },
    { path: 'fipbreview/:fIPBReviewId', component: fIPBReview_component_1.FIPBReviewAdminComponent },
    { path: 'dippclarifications', component: dIPPClarifications_component_1.DIPPClarificationsAdminComponent },
    { path: 'dippclarification', component: dIPPClarification_component_1.DIPPClarificationAdminComponent },
    { path: 'dippclarification/:dIPPClarificationId', component: dIPPClarification_component_1.DIPPClarificationAdminComponent },
    { path: 'fipbpressreleasecases', component: fIPBPressReleaseCases_component_1.FIPBPressReleaseCasesAdminComponent },
    { path: 'fipbpressreleasecase', component: fIPBPressReleaseCase_component_1.FIPBPressReleaseCaseAdminComponent },
    { path: 'fipbpressreleasecase/:fIPBPressReleaseCaseId', component: fIPBPressReleaseCase_component_1.FIPBPressReleaseCaseAdminComponent },
    { path: 'forms', component: forms_component_1.FormsAdminComponent },
    { path: 'form', component: form_component_1.FormAdminComponent },
    { path: 'form/:formSummaryDocumentationId', component: form_component_1.FormAdminComponent },
    { path: 'formdetail/:formSummaryDocumentationId', component: formDetail_component_1.FormDetailAdminComponent },
    { path: 'formdetail/:formSummaryDocumentationId/:formSummaryDocumentationDetailId', component: formDetail_component_1.FormDetailAdminComponent },
    { path: 'summaries', component: summaries_component_1.SummariesAdminComponent },
    { path: 'summary', component: summary_component_1.SummaryAdminComponent },
    { path: 'summary/:formSummaryDocumentationId', component: summary_component_1.SummaryAdminComponent },
    { path: 'summarydetail/:formSummaryDocumentationId', component: summaryDetail_component_1.SummaryDetailAdminComponent },
    { path: 'summarydetail/:formSummaryDocumentationId/:formSummaryDocumentationDetailId', component: summaryDetail_component_1.SummaryDetailAdminComponent },
    { path: 'documentations', component: documentations_component_1.DocumentationsAdminComponent },
    { path: 'documentation', component: documentation_component_1.DocumentationAdminComponent },
    { path: 'documentation/:formSummaryDocumentationId', component: documentation_component_1.DocumentationAdminComponent },
    { path: 'documentationdetail/:formSummaryDocumentationId', component: documentationDetail_component_1.DocumentationDetailAdminComponent },
    { path: 'documentationdetail/:formSummaryDocumentationId/:formSummaryDocumentationDetailId', component: documentationDetail_component_1.DocumentationDetailAdminComponent },
    { path: 'rbiliaisonoffices', component: rBILiaisonOffices_component_1.RBILiaisonOfficesAdminComponent },
    { path: 'rbiliaisonoffice', component: rBILiaisonOffice_component_1.RBILiaisonOfficeAdminComponent },
    { path: 'rbicompoundingorders', component: rBICompoundingOrders_component_1.RBICompoundingOrdersAdminComponent },
    { path: 'rbicompoundingorder', component: rBICompoundingOrder_component_1.RBICompoundingOrderAdminComponent },
    { path: 'rbicompoundingorder/:rBICompoundingOrderId', component: rBICompoundingOrder_component_1.RBICompoundingOrderAdminComponent },
    { path: 'rbidatas', component: rBIDatas_component_1.RBIDatasAdminComponent },
    { path: 'rbidata', component: rBIData_component_1.RBIDataAdminComponent },
    { path: 'rbidata/:rBIDataId', component: rBIData_component_1.RBIDataAdminComponent },
    { path: 'rbidatadetail/:rBIDataId', component: rBIDataDetail_component_1.RBIDataDetailAdminComponent },
    { path: 'rbidatadetail/:rBIDataId/:rBIDataDetailId', component: rBIDataDetail_component_1.RBIDataDetailAdminComponent },
    { path: 'rules', component: ruless_component_1.RulessAdminComponent },
    { path: 'rule', component: rules_component_1.RulesAdminComponent },
    { path: 'rule/:rulesId', component: rules_component_1.RulesAdminComponent },
    { path: 'rulesindex/:rulesId', component: rulesIndex_component_1.RulesIndexAdminComponent },
    { path: 'rulesindex/:rulesId/:indexId', component: rulesIndex_component_1.RulesIndexAdminComponent },
    { path: 'rulessubindex/:rulesId/:indexId', component: rulesSubIndex_component_1.RulesSubIndexAdminComponent },
    { path: 'rulessubindex/:rulesId/:indexId/:subIndexId', component: rulesSubIndex_component_1.RulesSubIndexAdminComponent },
    { path: 'gsrnotifications', component: gSRNotifications_component_1.GSRNotificationsAdminComponent },
    { path: 'gsrnotification', component: gSRNotification_component_1.GSRNotificationAdminComponent },
    { path: 'gsrnotification/:gSRNotificationId', component: gSRNotification_component_1.GSRNotificationAdminComponent },
    { path: 'rulesindexamendment/:rulesId', component: rulesIndexAmendment_component_1.RulesIndexAmendmentAdminComponent },
    { path: 'rulesindexamendment/:rulesId/:rulesIndexAmendmentId', component: rulesIndexAmendment_component_1.RulesIndexAmendmentAdminComponent },
    { path: 'authorwriteups', component: authorWriteUps_component_1.AuthorWriteUpsAdminComponent },
    { path: 'authorwriteup', component: authorWriteUp_component_1.AuthorWriteUpAdminComponent },
    { path: 'authorwriteup/:authorWriteUpId', component: authorWriteUp_component_1.AuthorWriteUpAdminComponent },
    { path: 'authorwriteupdetail/:authorWriteUpId', component: authorWriteUpDetail_component_1.AuthorWriteUpDetailAdminComponent },
    { path: 'authorwriteupdetail/:authorWriteUpId/:authorWriteUpDetailId', component: authorWriteUpDetail_component_1.AuthorWriteUpDetailAdminComponent },
    { path: 'authorfaqs', component: authorFAQs_component_1.AuthorFAQsAdminComponent },
    { path: 'authorfaq', component: authorFAQ_component_1.AuthorFAQAdminComponent },
    { path: 'authorfaq/:authorFAQId', component: authorFAQ_component_1.AuthorFAQAdminComponent },
    { path: 'authorfaqdetail/:authorFAQId', component: authorFAQDetail_component_1.AuthorFAQDetailAdminComponent },
    { path: 'authorfaqdetail/:authorFAQId/:authorFAQDetailId', component: authorFAQDetail_component_1.AuthorFAQDetailAdminComponent },
    { path: 'authorfaqquestionreply/:authorFAQId/:authorFAQDetailId', component: authorFAQQuestionReply_component_1.AuthorFAQQuestionReplyAdminComponent },
    { path: 'authorfaqquestionreply/:authorFAQId/:authorFAQDetailId/:authorFAQQuestionReplyId', component: authorFAQQuestionReply_component_1.AuthorFAQQuestionReplyAdminComponent },
    { path: 'keydefinitions', component: keyDefinitions_component_1.KeyDefinitionsAdminComponent },
    { path: 'keydefinition', component: keyDefinition_component_1.KeyDefinitionAdminComponent },
    { path: 'keydefinition/:keyDefinitionEventId', component: keyDefinition_component_1.KeyDefinitionAdminComponent },
    { path: 'keyevents', component: keyEvents_component_1.KeyEventsAdminComponent },
    { path: 'keyevent', component: keyEvent_component_1.KeyEventAdminComponent },
    { path: 'keyevent/:keyDefinitionEventId', component: keyEvent_component_1.KeyEventAdminComponent },
    { path: 'femamodule/:fEMAModuleId', component: fEMAModule_component_1.FEMAModuleAdminComponent },
    { path: 'femamodule/:fEMAModuleId/:fEMASubModuleOfModuleId', component: fEMAModule_component_1.FEMAModuleAdminComponent },
    { path: 'femamodules', component: fEMAModules_component_1.FEMAModulesAdminComponent },
    { path: 'postquery', component: postQuery_component_1.PostQueryAdminComponent },
    { path: 'PrivacyPolicy', component: indexPrivacyPolicy_component_1.IndexPrivacyPolicyAdminComponent },
    { path: 'TermsandCondition', component: indexTermsandCondition_component_1.IndexTermConditionAdminComponent },
    { path: 'EULAggrement', component: indexEULAggrement_component_1.IndexEndUserLicenseAggrementAdminComponent },
    { path: 'SubscriptionPolicy', component: indexSubscriptionPolicy_component_1.IndexSubscriptionPolicyAdminComponent },
    { path: 'postqueryreply/:supportTicketId', component: postQueryReply_component_1.PostQueryReplyAdminComponent },
    { path: 'supportticket', component: supportTicket_component_1.SupportTicketAdminComponent },
    { path: 'supportticketreply/:supportTicketId', component: supportTicketReply_component_1.SupportTicketReplyAdminComponent },
    { path: 'userprofiles', component: userProfiles_component_1.UserProfilesAdminComponent },
    { path: 'userprofile/:userId', component: userProfile_component_1.UserProfileAdminComponent },
    { path: 'subscriptionPackages', component: subscriptionPackages_component_1.SubscriptionPackagesAdminComponent },
    { path: 'subscriptionPackage', component: subscriptionPackage_component_1.SubscriptionPackageAdminComponent },
    { path: 'subscriptionPackage/:PackageId', component: subscriptionPackage_component_1.SubscriptionPackageAdminComponent },
    { path: 'privacyPolicyAdd/:id', component: PrivacyPolicy_component_1.PrivacyPolicyAdminComponent },
    { path: 'termsandConditionAdd/:id', component: TermsandCondition_component_1.TermsConditionAdminComponent },
    { path: 'EULAggrementAdd/:id', component: EULAggrement_component_1.EULAggrementAdminComponent },
    { path: 'SubscriptionPolicyAdd/:id', component: SubscriptionPolicy_component_1.SubscriptionPolicyAdminComponent },
    { path: 'TermsandCondition', component: TermsandCondition_component_1.TermsConditionAdminComponent },
    { path: 'EULAggrement', component: EULAggrement_component_1.EULAggrementAdminComponent },
    { path: 'SubscriptionPolicy', component: SubscriptionPolicy_component_1.SubscriptionPolicyAdminComponent }
];
//# sourceMappingURL=admin.routes.js.map