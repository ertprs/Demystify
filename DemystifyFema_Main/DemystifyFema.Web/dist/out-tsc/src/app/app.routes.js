"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var auth_guard_1 = require("./common/auth.guard");
var public_admin_component_1 = require("./areas/admin/layout/public_admin.component");
var guest_component_1 = require("./areas/guest/layout/guest.component");
var admin_component_1 = require("./areas/admin/layout/admin.component");
var user_component_1 = require("./areas/user/layout/user.component");
var admin_routes_1 = require("./routes/admin.routes");
var user_routes_1 = require("./routes/user.routes");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: guest_component_1.GuestComponent, data: { title: 'Guest Views' }, children: user_routes_1.PUBLIC_USER_ROUTES },
    { path: 'user/secure', component: user_component_1.UserComponent, canActivate: [auth_guard_1.AuthGuardUser], data: { title: 'User Views' }, children: user_routes_1.USER_ROUTES },
    { path: 'admin', component: public_admin_component_1.PublicAdminComponent, data: { title: 'Public Views For Admin' }, children: admin_routes_1.PUBLIC_ADMIN_ROUTES },
    { path: 'admin/secure', component: admin_component_1.AdminComponent, canActivate: [auth_guard_1.AuthGuardAdmin], data: { title: 'Admin Views' }, children: admin_routes_1.ADMIN_ROUTES },
    { path: '**', redirectTo: 'home' }
];
exports.AppRoutes = router_1.RouterModule.forRoot(appRoutes, { preloadingStrategy: router_1.PreloadAllModules });
//# sourceMappingURL=app.routes.js.map