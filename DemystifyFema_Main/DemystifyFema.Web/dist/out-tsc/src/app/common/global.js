"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
var Global = /** @class */ (function () {
    function Global() {
        //public static API_SITE = 'http://localhost:51159/';
        this.key = CryptoJS.enc.Utf8.parse('7061737323313233');
        this.iv = CryptoJS.enc.Utf8.parse('7061737323313233');
    }
    Global.prototype.getCookie = function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    Global.prototype.setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };
    Global.prototype.deleteCookie = function (cname) {
        document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };
    Global.prototype.getToken = function () {
        try {
            return (this.getCookie(Global.LOGIN_TOKEN)) ? "Bearer " + this.getCookie(Global.LOGIN_TOKEN) : this.getCookie(Global.LOGIN_TOKEN);
        }
        catch (e) {
            return null;
        }
    };
    Global.prototype.getUserToken = function () {
        try {
            return (this.getCookie(Global.USER_LOGIN_TOKEN)) ? "Bearer " + this.getCookie(Global.USER_LOGIN_TOKEN) : this.getCookie(Global.USER_LOGIN_TOKEN);
        }
        catch (e) {
            return null;
        }
    };
    Global.prototype.getRoleId = function () {
        return this.getCookie((window.location.pathname.indexOf('/admin/') >= 0) ? Global.ROLEID : Global.USERROLEID);
    };
    Global.prototype.deleteToken = function () {
        this.deleteCookie(Global.LOGIN_TOKEN);
        this.deleteCookie(Global.ROLEID);
    };
    Global.prototype.deleteUserToken = function () {
        this.deleteCookie(Global.USER_LOGIN_TOKEN);
        this.deleteCookie(Global.USERROLEID);
        this.deleteCookie(Global.USER_ID);
    };
    Global.prototype.setToken = function (tokenValue, roleId) {
        this.deleteToken();
        this.setCookie(Global.LOGIN_TOKEN, tokenValue, 365);
        this.setCookie(Global.ROLEID, roleId, 365);
    };
    Global.prototype.setUserToken = function (userId, tokenValue, roleId) {
        this.deleteUserToken();
        this.setCookie(Global.USER_LOGIN_TOKEN, tokenValue, 365);
        this.setCookie(Global.USERROLEID, roleId, 365);
        this.setCookie(Global.USER_ID, userId, 365);
    };
    Global.prototype.convertArrayToCommaSeperatedString = function (arrayData) {
        return (arrayData) ? (Array.isArray(arrayData)) ? arrayData.map(function (x) { return x.Value; }).join(',') : arrayData.split(",").map(function (x) { return x.Value; }).join(',') : null;
    };
    Global.prototype.getPDFPath = function (pdfPath) {
        return (navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Android/i)) ? 'https://docs.google.com/viewer?url=' + pdfPath + '&embedded=true' : pdfPath;
    };
    //getToken() {
    //    try {
    //        return (this._cookieService.get(Global.LOGIN_TOKEN)) ? "Bearer " + this._cookieService.get(Global.LOGIN_TOKEN) : this._cookieService.get(Global.LOGIN_TOKEN);
    //    } catch (e) {
    //        return null;
    //    }
    //}
    //getUserToken() {
    //    try {
    //        return (this._cookieService.get(Global.USER_LOGIN_TOKEN)) ? "Bearer " + this._cookieService.get(Global.USER_LOGIN_TOKEN) : this._cookieService.get(Global.USER_LOGIN_TOKEN);
    //    } catch (e) {
    //        return null;
    //    }
    //}
    //getRoleId() {
    //    return this._cookieService.get(Global.ROLEID);
    //}
    //deleteToken() {
    //    this._cookieService.set(Global.LOGIN_TOKEN, '', new Date().getDate() - 365);
    //    this._cookieService.set(Global.ROLEID, '', new Date().getDate() - 365);
    //}
    //deleteUserToken() {
    //    this._cookieService.set(Global.USER_LOGIN_TOKEN, '', new Date().getDate() - 365);
    //    this._cookieService.set(Global.ROLEID, '', new Date().getDate() - 365);
    //}
    //setToken(tokenValue: string, roleId: string) {
    //    this.deleteToken();
    //    this._cookieService.set(Global.LOGIN_TOKEN, tokenValue, new Date().getDate() + 365);
    //    this._cookieService.set(Global.ROLEID, roleId, new Date().getDate() + 365);
    //}
    //setUserToken(tokenValue: string, roleId: string) {
    //    this.deleteUserToken();
    //    this._cookieService.set(Global.USER_LOGIN_TOKEN, tokenValue, new Date().getDate() + 365);
    //    this._cookieService.set(Global.ROLEID, roleId, new Date().getDate() + 365);
    //}
    Global.prototype.getRBIDataName = function () {
        return ["RBI Liaison Office Data", "RBI Branch Office Data", "RBI External Commercial Borrowings Data", "RBI Overseas Direct Investment Data"];
    };
    Global.prototype.encryptValue = function (value) {
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var encryptedValue = (encrypted.toString()) ? encrypted.toString().replace(/\+/g, '-aFaFa-').replace(/\//g, '-bFbFb-').replace(/=+$/, '-cFcFc-') : encrypted.toString();
        return encryptedValue;
    };
    Global.prototype.decryptValue = function (value) {
        if (value) {
            var decrypted = CryptoJS.AES.decrypt(value.replace(/-aFaFa-/g, '+').replace(/-bFbFb-/g, '/').replace(/-cFcFc-/g, '='), this.key, {
                keySize: 128 / 8,
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
        else {
            return '';
        }
    };
    Global.API_SITE = 'http://servicebeta.demystifyfema.com/';
    //public static API_SITE = 'http://service.demystifyfema.com/';  // 
    //public static API_SITE = 'http://demystifyfemaservice/';
    /* Paytm Payment Gateway Params */
    Global.MID = "gNgGqX79582965764461";
    Global.MerchantKey = "XkLE%!5Y1ihx0pbt";
    Global.WEBSITE = "WEBSTAGING";
    Global.INDUSTRY_TYPE_ID = "Retail";
    Global.CHANNEL_ID = "WEB";
    Global.CALLBACK_URL = "http://localhost:4200/Home"; //"http://localhost:4200/user/secure/PaytmCallback";
    Global.ERROR_MESSAGE = "Error on page, please reload page. <br/>If error persists, contact administrator for support.";
    Global.API_SUCCESS = "Success";
    Global.IS_SUBSCRIBED = "IsSubscribed";
    Global.LOGIN_TOKEN = "LoginToken";
    Global.USER_LOGIN_TOKEN = "UserLoginToken";
    Global.USER_ID = "UserId";
    Global.ROLEID = "RoleId";
    Global.USERROLEID = "UserRoleId";
    Global.ADMIN_ROLEID = 1;
    Global.USER_ROLEID = 2;
    Global.ADMINID = 1;
    Global.FORM_TYPE = 'Form';
    Global.SUMMARY_TYPE = 'Summary';
    Global.DOCUMENTATION_TYPE = 'Documentation';
    Global.TOASTR_LOGIN_TITLE = "Login";
    Global.TOASTR_REGISTER_TITLE = "Register";
    Global.TOASTR_VERIFYACCOUNT_TITLE = "Verify Account";
    Global.TOASTR_LOGOUT_TITLE = "Logout";
    Global.LOGIN_FROM_WEB = "WEB";
    Global.USER_PAGE_SIZE = 20;
    Global.MASTER_DIRECTION_ALL_CHAPTER = "all chapter";
    Global.KEY_EVENT_FIELDNAME = "Event";
    Global.KEY_DEFINITION_FIELDNAME = "Definition";
    Global.COMMON_FIELD_MODULE_NAME = "ModuleName";
    Global.COMMON_FIELD_FEMA_MODULE = "FEMAModule";
    Global.COMMON_FIELD_FEMA_SUBMODULE = "FEMASubModule";
    Global.COMMON_FIELD_CALCULATOR_TOPIC = "CalculatorTopicName";
    Global.COMMON_FIELD_PROFESSIONAL_QUALIFICATION = "ProfessionalQualification";
    Global.COMMON_FIELD_PLACE_OF_ESTABLISHMENT_OF_BO = "PlaceOfEstablishmentOfBranchOffice";
    Global.COMMON_FIELD_SUPPORT_TICKET_DEPARTMENT = "SupportTicketDepartment";
    Global.COMMON_FIELD_SEARCH_CATEGORY = "SearchCategory";
    Global.RBIDATA_LO_NAME = "RBI Liaison Office Data";
    Global.RBIDATA_BO_NAME = "RBI Branch Office Data";
    Global.RBIDATA_ECB_NAME = "RBI External Commercial Borrowings Data";
    Global.RBIDATA_ODI_NAME = "RBI Overseas Direct Investment Data";
    Global.AMENDMENT_CONTENT_MODULE_FEMA_REGULATION = 1;
    Global.AMENDMENT_CONTENT_MODULE_MASTER_DIRECTION = 2;
    Global.AMENDMENT_CONTENT_MODULE_FEMA_RULES = 3;
    Global.AMENDMENT_CONTENT_MODULE_FDI_CIRCULAR = 4;
    Global.SEARCH_CATEGORY_ID_NOTIFICATION = 1;
    Global.SEARCH_CATEGORY_ID_AP_DIR_CIRCULAR = 2;
    Global.SEARCH_CATEGORY_ID_MASTER_DIRECTION = 3;
    Global.SEARCH_CATEGORY_ID_FDI_CIRCULAR = 4;
    Global.SEARCH_CATEGORY_ID_COMPOUNDING_ORDER = 5;
    Global.SEARCH_CATEGORY_ID_PRESS_NOTE = 6;
    Global.SEARCH_CATEGORY_ID_ACT = 7;
    Global.SEARCH_CATEGORY_ID_FORM = 8;
    Global.SEARCH_CATEGORY_ID_SUMMARY = 9;
    Global.SEARCH_CATEGORY_ID_DOCUMENTATION = 10;
    Global.SEARCH_CATEGORY_ID_MASTER_CIRCULAR = 11;
    Global.SEARCH_CATEGORY_ID_RULES_GSR = 12;
    Global.SEARCH_CATEGORY_ID_FIPB_REVIEW = 13;
    Global.SEARCH_CATEGORY_ID_DIPP_CLARIFICATION = 14;
    Global.SEARCH_CATEGORY_ID_FIPB_PRESS_RELEASE_CASE = 15;
    Global.SEARCH_CATEGORY_ID_REGULATION_INDEX = 16;
    Global.LATEST_NEWS_ID_NOTIFICATION = 1;
    Global.LATEST_NEWS_ID_AP_DIR_CIRCULAR = 2;
    Global.LATEST_NEWS_ID_PRESS_NOTE = 3;
    Global.LATEST_NEWS_ID_MASTER_DIRECTION = 4;
    Global.LATEST_NEWS_ID_COMPOUNDING_ORDER = 5;
    Global.SEARCH_CATEGORY_NAME_NOTIFICATION = "Notification";
    Global.SEARCH_CATEGORY_NAME_AP_DIR_CIRCULAR = "AP DIR Circular";
    Global.SEARCH_CATEGORY_NAME_MASTER_DIRECTION = "Master Direction";
    Global.SEARCH_CATEGORY_NAME_FDI_CIRCULAR = "FDI Circular";
    Global.SEARCH_CATEGORY_NAME_COMPOUNDING_ORDER = "Compounding Order";
    Global.SEARCH_CATEGORY_NAME_PRESS_NOTE = "Press Note";
    Global.SEARCH_CATEGORY_NAME_ACT = "Act";
    Global.SEARCH_CATEGORY_NAME_FORM = "Form";
    Global.SEARCH_CATEGORY_NAME_SUMMARY = "Summary";
    Global.SEARCH_CATEGORY_NAME_DOCUMENTATION = "Documentation";
    Global.SEARCH_CATEGORY_NAME_MASTER_CIRCULAR = "Master Circular";
    Global.SEARCH_CATEGORY_NAME_RULES_GSR = "Rules-GSR";
    Global.SEARCH_CATEGORY_NAME_FIPB_REVIEW = "FIPB Review";
    Global.SEARCH_CATEGORY_NAME_DIPP_CLARIFICATION = "DIPP Clarification";
    Global.SEARCH_CATEGORY_NAME_FIPB_PRESS_RELEASE_CASE = "FIPB Press Release Case";
    Global.SEARCH_CATEGORY_NAME_REGULATION_INDEX = "Regulation Index / Sub-index";
    Global.COMMON_FIELD_MODULE_AUTHORSWRITEUP = 1;
    Global.COMMON_FIELD_MODULE_FOREIGNEXCHANGEMANAGEMENTACT = 2;
    Global.COMMON_FIELD_MODULE_FEMA_REGULATIONS_FEMA_NOTIFICATIONS_GSR = 3;
    Global.COMMON_FIELD_MODULE_MASTERDIRECTION_MASTERCIRCULAR_APDIRCIRCULAR = 4;
    Global.COMMON_FIELD_MODULE_FDICIRCULAR_PRESSNOTE = 5;
    Global.COMMON_FIELD_MODULE_SECTOR_SNAPSHOT = 6;
    Global.COMMON_FIELD_MODULE_NICCODE = 7;
    Global.COMMON_FIELD_MODULE_FIPBREVIEW_CLARIFICATION_FIBCPRESSRELEASECASE = 8;
    Global.COMMON_FIELD_MODULE_FDI_PENALTY_CALCULATOR = 9;
    Global.COMMON_FIELD_MODULE_RBI_ECB_DATA = 11;
    Global.COMMON_FIELD_MODULE_ECB_AVERAGE_MATURITY_CALCULATOR = 12;
    Global.COMMON_FIELD_MODULE_RBI_ODI_DATA = 13;
    Global.COMMON_FIELD_MODULE_RBI_LO_DATA = 14;
    Global.COMMON_FIELD_MODULE_RBI_BO_DATA = 15;
    Global.COMMON_FIELD_MODULE_LO_BO_PO_ELIGIBILITY_CALCULATOR = 16;
    Global.COMMON_FIELD_MODULE_FORM_SUMMARY_DOCUMENTATION = 17;
    Global.COMMON_FIELD_MODULE_FETERSCODE = 18;
    Global.COMMON_FIELD_MODULE_KEYDEFINITION = 19;
    Global.COMMON_FIELD_MODULE_RBI_COMPOUNDING_ORDER = 20;
    Global.COMMON_FIELD_MODULE_RBI_DIPP_FAQ = 22;
    Global.COMMON_FIELD_MODULE_COMPOUNDING_CALCULATOR = 25;
    Global.COMMON_FIELD_MODULE_MANUAL = 27;
    Global.COMMON_FIELD_MODULE_KEYEVENT = 28;
    //public static COMMON_FIELD_MODULE_ACT = 5;
    Global.COMMON_FIELD_FDI_PENALTY_CALCULATOR = 1;
    Global.COMMON_FIELD_COMPOUNDING_PENALTY_CALCULATOR = 2;
    Global.FDI_PENALTY_CALCULATOR_FIXED_DATE = new Date(2017, 10, 7);
    Global.FDI_PENALTY_CALCULATOR_RANGE_UPTO_10_LAKHS = "upto 10 Lakhs";
    Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_40_LAKHS = "10-40 Lakhs";
    Global.FDI_PENALTY_CALCULATOR_RANGE_40_TO_100_LAKHS = "40-100 Lakhs";
    Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_10_CRORE = "1-10 Crore";
    Global.FDI_PENALTY_CALCULATOR_RANGE_10_TO_100_CRORE = "10-100 Crore";
    Global.FDI_PENALTY_CALCULATOR_RANGE_ABOVE_100_CRORE = "Above 100 Crore";
    Global.FDI_PENALTY_CALCULATOR_RANGE_1ST_YEAR = "1st Year";
    Global.FDI_PENALTY_CALCULATOR_RANGE_1_TO_2_YEARS = "1-2 Years";
    Global.FDI_PENALTY_CALCULATOR_RANGE_2_TO_3_YEARS = "2-3 Years";
    Global.FDI_PENALTY_CALCULATOR_RANGE_3_TO_4_YEARS = "3-4 Years";
    Global.FDI_PENALTY_CALCULATOR_RANGE_4_TO_5_YEARS = "4-5 Years";
    Global.FDI_PENALTY_CALCULATOR_RANGE_GRATER_THAN_5_YEARS = ">5 Years";
    //public static COMMON_FIELD_MODULE_APDIRCIRCULAR = 7;
    Global.CALCULATOR_OUTCOME_AUTOMATIC_ROUTE = "Automatic Route";
    Global.CALCULATOR_OUTCOME_RBI_APPROVAL_ROUTE = "RBI Approval Route";
    Global.QUESTION_TEXT_APPLICANT_ENTITY_LO = 1;
    Global.QUESTION_TEXT_SECTORAL_CAP_LO = 2;
    Global.QUESTION_TEXT_SECTOR_LO = 3;
    Global.QUESTION_TEXT_APPLICANT_COUNTRY_LO = 4;
    Global.QUESTION_TEXT_STATE_OF_INDIA_LO = 5;
    Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_LO = 6;
    Global.QUESTION_TEXT_NET_WORTH_YEAR_LO = 7;
    Global.QUESTION_TEXT_WHETHER_SUBSIDIARY_OF_ANOTHER_COMPANY_LO = 8;
    Global.QUESTION_TEXT_WHETHER_LETTER_OF_COMFORT_AVAILABLE_LO = 9;
    Global.QUESTION_TEXT_APPLICANT_ENTITY_BO = 10;
    Global.QUESTION_TEXT_SECTORAL_CAP_BO = 11;
    Global.QUESTION_TEXT_SECTOR_BO = 12;
    Global.QUESTION_TEXT_APPLICANT_COUNTRY_BO = 13;
    Global.QUESTION_TEXT_STATE_OF_INDIA_BO = 14;
    Global.QUESTION_TEXT_PROFIT_MAKING_TRACK_RECORD_YEAR_BO = 15;
    Global.QUESTION_TEXT_NET_WORTH_YEAR_BO = 16;
    Global.QUESTION_TEXT_WHETHER_SUBSIDIARY_OF_ANOTHER_COMPANY_BO = 17;
    Global.QUESTION_TEXT_WHETHER_LETTER_OF_COMFORT_AVAILABLE_BO = 18;
    Global.QUESTION_TEXT_WHETHER_BOS_COMPLY_WITH_CHAPTER_XXII_OF_COMPANIES_ACT_2013_BO = 19;
    Global.QUESTION_TEXT_WHETHER_BO_FUNTION_ON_STANDALONE_BASIS_BO = 20;
    Global.QUESTION_TEXT_APPLICANT_ENTITY_PO = 21;
    Global.QUESTION_TEXT_SECTORAL_CAP_PO = 22;
    Global.QUESTION_TEXT_SECTOR_PO = 23;
    Global.QUESTION_TEXT_APPLICANT_COUNTRY_PO = 24;
    Global.QUESTION_TEXT_STATE_OF_INDIA_PO = 25;
    Global.QUESTION_TEXT_WHETHER_YOU_HAVE_SECURED_CONTRACT_FROM_AN_INDIAN_COMPANY_FOR_EXECUTING_THECONTRACT_PO = 26;
    Global.QUESTION_TEXT_FUNDED_DIRECTLY_BY_INWARD_REMITTANCE_FROM_ABROAD_PO = 27;
    Global.QUESTION_TEXT_FUNDED_BY_BILATERAL_OR_MULTILATERAL_INTERNATIONAL_FINANCING_AGENCY_PO = 28;
    Global.QUESTION_TEXT_CLEARED_BY_AN_APPROPRIATE_AUTHORITY_PO = 29;
    Global.QUESTION_TEXT_PUBLIC_FINANCIAL_INSTITUTION_PO = 30;
    Global.COMMON_FIELD_REGULATION_FIELDID = 1;
    Global.COMMON_FIELD_RULES_FIELDID = 2;
    Global.COMMON_FIELD_FDICIRCULAR_FIELDID = 3;
    Global.COMMON_FIELD_PRESSNOTE_FIELDID = 4;
    Global.COMMON_FIELD_ACT_FIELDID = 5;
    Global.COMMON_FIELD_MASTERDIRECTION_FIELDID = 6;
    Global.COMMON_FIELD_APDIRCIRCULAR_FIELDID = 7;
    Global.COMMON_FIELD_OTHER_FIELDID = 8;
    Global.COMMON_FIELD_MASTERCIRCULAR_FIELDID = 9;
    Global.COMMON_FIELD_RBIFAQ_FIELDID = 10;
    Global.COMMON_FIELD_FORM_FIELDID = 11;
    Global.COMMON_FIELD_SUMMARY_FIELDID = 12;
    Global.COMMON_FIELD_DOCUMENTATION_FIELDID = 13;
    Global.TOASTR_CONTACT_US_TITLE = "Contact Us";
    Global.TOASTR_ADMIN_ACTNAME_TITLE = "Act";
    Global.TOASTR_ADMIN_ALLDEFINITION_TITLE = "Definition";
    Global.TOASTR_ADMIN_REGULATION_TITLE = "Regulation";
    Global.TOASTR_ADMIN_INDEX_TITLE = "Index";
    Global.TOASTR_ADMIN_NOTIFICATION_TITLE = "Notification";
    Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE = "Subscription Package";
    Global.TOASTR_ADMIN_PRIVACYPOLICY_TITLE = "Privacy Policy";
    Global.TOASTR_ADMIN_TERMSCONDITION_TITLE = "Terms and Conditions";
    Global.TOASTR_ADMIN_ENDUSERLICENSEAGGREMENT_TITLE = "End User License Aggrement";
    Global.TOASTR_ADMIN_SUBSCRIPTIONPOLICY_TITLE = "Subscription Policy";
    Global.TOASTR_ADMIN_NO_SUBSCRIPTION_POLICY_FOUND = "No Subscription Policy Found!";
    Global.TOASTR_ADMIN_NO_PRIVACY_POLICY_FOUND = "No Privacy Policy Found!";
    Global.TOASTR_ADMIN_NO_END_USER_LICENSE_AGGREMENT_FOUND = "No End User  License Aggrement Found!";
    Global.TOASTR_ADMIN_NO_TERMS_CONDITION_FOUND = "No Terms & Condition Found!";
    Global.TOASTR_ADMIN_SUBINDEX_TITLE = "SubIndex";
    Global.TOASTR_ADMIN_INDEXAMENDMENT_TITLE = "Index Amendment";
    Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE = "AP DIR Circular";
    Global.TOASTR_ADMIN_APDIR_CIRCULAR_BEFORE_TITLE = "Before AP DIR Circular";
    Global.TOASTR_ADMIN_APDIR_CIRCULAR_AFTER_TITLE = "After AP DIR Circular";
    Global.TOASTR_ADMIN_PRESSNOTE_TITLE = "Press Note";
    Global.TOASTR_ADMIN_PRESSNOTE_NOTIFICATION_TITLE = "Press Note Notification";
    Global.TOASTR_ADMIN_PRESSNOTE_APDIR_CIRCULAR_TITLE = "Press Note AP DIR Circular";
    Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE = "FDI Circular";
    Global.TOASTR_ADMIN_FDI_CIRCULAR_CHAPTER_TITLE = "FDI Circular Chapter";
    Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_TITLE = "FDI Circular Index";
    Global.TOASTR_ADMIN_FDI_CIRCULAR_SUBINDEX_TITLE = "FDI Circular SubIndex";
    Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE = "FDI Circular Index Amendment";
    Global.TOASTR_ADMIN_SECTOR_TITLE = "Sector";
    Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE = "Sector Detail";
    Global.TOASTR_ADMIN_SUBSECTOR_TITLE = "SubSector";
    Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE = "Master Circular";
    Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE = "Master Circular Detail";
    Global.TOASTR_ADMIN_FAQ_TITLE = "FAQ";
    Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE = "FAQ Category";
    Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE = "Master Direction";
    Global.TOASTR_ADMIN_MASTER_DIRECTION_FAQ_TITLE = "Master Direction FAQ";
    Global.TOASTR_ADMIN_MASTER_DIRECTION_CHAPTER_TITLE = "Master Direction Chapter";
    Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_TITLE = "Master Direction Index";
    Global.TOASTR_ADMIN_MASTER_DIRECTION_SUB_INDEX_TITLE = "Master Direction SubIndex";
    Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE = "Master Direction Index Amendment";
    Global.TOASTR_ADMIN_NICCODE_TITLE = "NIC Code";
    Global.TOASTR_ADMIN_MANUAL_TITLE = "Manual";
    Global.TOASTR_ADMIN_FETERSCODE_TITLE = "Feters Code";
    Global.TOASTR_ADMIN_FETERSCODE_DETAIL_TITLE = "Feters Code Detail";
    Global.TOASTR_ADMIN_FETERSCODE_GROUP_DETAIL_TITLE = "Feters Code Group Detail";
    Global.TOASTR_ADMIN_FIPBREVIEW_TITLE = "FIPB Review";
    Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE = "DIPP Clarification";
    Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE = "FIPB Press Release Case";
    Global.TOASTR_ADMIN_FORM_TITLE = "Form";
    Global.TOASTR_ADMIN_SUMMARY_TITLE = "Summary";
    Global.TOASTR_ADMIN_DOCUMENTATION_TITLE = "Documentation";
    Global.TOASTR_ADMIN_FORMDETAIL_TITLE = "Form Detail";
    Global.TOASTR_ADMIN_SUMMARYDETAIL_TITLE = "Summary Detail";
    Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE = "Documentation Detail";
    Global.TOASTR_ADMIN_RBI_LIAISON_OFFICE_TITLE = "RBI Liaison Office";
    Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE = "RBI Compounding Order";
    Global.TOASTR_ADMIN_RBIDATA_TITLE = "RBI Data";
    Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE = "RBI Data Detail";
    Global.TOASTR_ADMIN_RULES_TITLE = "Rules";
    Global.TOASTR_ADMIN_RULES_INDEX_TITLE = "Rules Index";
    Global.TOASTR_ADMIN_RULES_SUBINDEX_TITLE = "Rules SubIndex";
    Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE = "GSR Notification";
    Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE = "Rules Index Amendment";
    Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE = "Author's Write Up";
    Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE = "Author's Write Up Detail";
    Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE = "Author's FAQ";
    Global.TOASTR_ADMIN_AUTHOR_FAQ_DETAIL_TITLE = "Author's FAQ Detail";
    Global.TOASTR_ADMIN_AUTHOR_FAQ_QUESTION_REPLY_TITLE = "Author's FAQ Question Reply";
    Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE = "Key Definition";
    Global.TOASTR_ADMIN_KEY_EVENT_TITLE = "Key Event";
    Global.TOASTR_ADMIN_FEMA_MODULE_TITLE = "FEMA Module";
    Global.TOASTR_ADMIN_USER_PROFILE_TITLE = "User Profile";
    Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE = "FEMA SubModule of Module";
    Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE = "Post Query";
    Global.TOASTR_ADMIN_END_USER_LICENSE_AGGREMENT_TITLE = "End User License Aggrement";
    Global.TOASTR_ADMIN_SUBSCRIPTION_POLICY_TITLE = "Subscription Policy";
    Global.TOASTR_ADMIN_SUPPORT_TICKET_REPLY_TITLE = "Post Query Reply";
    Global.TOASTR_ADMIN_PENALTY_DETAIL_TITLE = "Penalty Detail";
    Global.TOASTR_AVERAGE_MATURITY_CALCULATOR_TITLE = "Average Maturity Calculator";
    Global.TOASTR_FDI_PENALTY_CALCULATOR_TITLE = "FDI Penalty Calculator";
    Global.TOASTR_COMPOUNDING_PENALTY_CALCULATOR_TITLE = "Compounding Penalty Calculator";
    Global.TOASTR_LO_BO_PO_ELIGIBILITY_CALCULATOR_TITLE = "LO / BO / PO Eligibility Calculator";
    Global.TOASTR_SUBSCRIPTION_TITLE = "Subscription";
    Global.TOASTR_ADMIN_SUPPORT_TICKET_CHAT_TITLE = "Support Ticket";
    Global.TOASTR_LATEST_NEWS_TITLE = "Latest News";
    Global.TOASTR_SEARCH_TITLE = "Search";
    Global.TOASTR_PROFILE_TITLE = "Profile Setting";
    Global.POPUP_INDEX_HEADER_TITLE = "Index Content";
    Global.POPUP_SUBINDEX_HEADER_TITLE = "Sub-index Content";
    Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE = "Index Amendment Content";
    Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE = "Sub-index Amendment Content";
    Global.ACT_PDF_FILEPATH = Global.API_SITE + "Assets/ActPDF/";
    Global.APDIRCIRCULAR_PDF_FILEPATH = Global.API_SITE + "Assets/APDIRCircularPDF/";
    Global.FDICIRCULAR_PDF_FILEPATH = Global.API_SITE + "Assets/FDICircularPDF/";
    Global.NOTIFICATION_PDF_FILEPATH = Global.API_SITE + "Assets/NotificationPDF/";
    Global.GSR_PDF_FILEPATH = Global.API_SITE + "Assets/GSRPDF/";
    Global.PRESSNOTE_PDF_FILEPATH = Global.API_SITE + "Assets/PressNotePDF/";
    Global.MASTERCIRCULAR_PDF_FILEPATH = Global.API_SITE + "Assets/MasterCircularPDF/";
    Global.FAQ_PDF_FILEPATH = Global.API_SITE + "Assets/FAQPDF/";
    Global.MASTERDIRECTION_PDF_FILEPATH = Global.API_SITE + "Assets/MasterDirectionPDF/";
    Global.NICCODE_PDF_FILEPATH = Global.API_SITE + "Assets/NICCodePDF/";
    Global.MANUAL_PDF_FILEPATH = Global.API_SITE + "Assets/ManualPDF/";
    Global.FETERSCODE_PDF_FILEPATH = Global.API_SITE + "Assets/FetersCodePDF/";
    Global.FIPBREVIEW_PDF_FILEPATH = Global.API_SITE + "Assets/FIPBReviewPDF/";
    Global.DIPPCLARIFICATION_PDF_FILEPATH = Global.API_SITE + "Assets/DIPPClarificationPDF/";
    Global.FIPB_PRESS_RELEASE_CASE_PDF_FILEPATH = Global.API_SITE + "Assets/FIPBPressReleaseCasePDF/";
    Global.FORM_SUMMARY_DOCUMENTATION_WORD_FILEPATH = Global.API_SITE + "Assets/FormSummaryDocumentationDetail/Word/";
    Global.FORM_SUMMARY_DOCUMENTATION_EXCEL_FILEPATH = Global.API_SITE + "Assets/FormSummaryDocumentationDetail/Excel/";
    Global.FORM_SUMMARY_DOCUMENTATION_PDF_FILEPATH = Global.API_SITE + "Assets/FormSummaryDocumentationDetail/PDF/";
    Global.RBI_LIAISON_OFFICE_PDF_FILEPATH = Global.API_SITE + "Assets/RBILiaisonOfficeExcel/";
    Global.RBI_COMPOUNDING_ORDER_PDF_FILEPATH = Global.API_SITE + "Assets/RBICompoundingOrderPDF/";
    Global.RBIDATA_EXCEL_FILEPATH = Global.API_SITE + "Assets/RBIDataExcel/";
    Global.RBIDATA_DETAIL_EXCEL_FILEPATH = Global.API_SITE + "Assets/RBIDataDetail/Excel/";
    Global.RBIDATA_DETAIL_PDF_FILEPATH = Global.API_SITE + "Assets/RBIDataDetail/PDF/";
    Global.AUTHOR_WRITE_UP_PDF_FILEPATH = Global.API_SITE + "Assets/AuthorWriteUpPDF/";
    Global.AUTHOR_WRITE_UP_DETAIL_PDF_FILEPATH = Global.API_SITE + "Assets/AuthorWriteUpDetailPDF/";
    Global.GSR_NOTIFICATION_PDF_FILEPATH = Global.API_SITE + "Assets/GSRNotificationPDF/";
    Global.PAGE_SIZES = [10, 25, 50, 100];
    return Global;
}());
exports.Global = Global;
//# sourceMappingURL=global.js.map