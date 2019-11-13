"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("../areas/guest/home/home.component");
var aboutus_component_1 = require("../areas/guest/aboutus/aboutus.component");
var contactus_component_1 = require("../areas/guest/contactus/contactus.component");
var dashboard_component_1 = require("../areas/user/dashboard/dashboard.component");
var fEMAModules_component_1 = require("../areas/user/fEMAModule/fEMAModules.component");
var supportTicket_component_1 = require("../areas/user/supportTicket/supportTicket.component");
var supportTicketReply_component_1 = require("../areas/user/supportTicketReply/supportTicketReply.component");
var subscription_component_1 = require("../areas/user/subscription/subscription.component");
var userProfile_component_1 = require("../areas/user/userProfile/userProfile.component");
var userPayment_component_1 = require("../areas/user/userPayment/userPayment.component");
var PaytmCallback_component_1 = require("../areas/user/PaytmCallback/PaytmCallback.component");
exports.PUBLIC_USER_ROUTES = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeGuestComponent },
    { path: 'aboutus', component: aboutus_component_1.AboutUsGuestComponent },
    { path: 'contactus', component: contactus_component_1.ContactUsGuestComponent },
];
exports.USER_ROUTES = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: dashboard_component_1.DashboardUserComponent },
    { path: 'femamodules', component: fEMAModules_component_1.FEMAModulesUserComponent },
    { path: 'postquery', component: supportTicket_component_1.SupportTicketUserComponent },
    { path: 'postqueryreply/:supportTicketId', component: supportTicketReply_component_1.SupportTicketReplyUserComponent },
    { path: 'subscription', component: subscription_component_1.SubscriptionUserComponent },
    { path: 'userprofile', component: userProfile_component_1.UserProfileUserComponent },
    { path: 'userPayment', component: userPayment_component_1.UserPaymentComponent },
    { path: 'PaytmCallback', component: PaytmCallback_component_1.PaytmCallabckComponent }
];
//# sourceMappingURL=user.routes.js.map