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
var SidebarPanelComponent = /** @class */ (function () {
    function SidebarPanelComponent() {
        this.opened = false;
        this.toggle = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SidebarPanelComponent.prototype, "opened", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SidebarPanelComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SidebarPanelComponent.prototype, "headerclass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SidebarPanelComponent.prototype, "contentclass", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SidebarPanelComponent.prototype, "toggle", void 0);
    SidebarPanelComponent = __decorate([
        core_1.Component({
            selector: 'panel',
            template: "<div class=\"panel panel-header\">\n                <div class=\"panel-heading {{headerclass}}\" (click)=\"toggle.emit()\">\n                  <b><i [class]=\"(opened) ? 'fa fa-minus' : 'fa fa-plus'\"></i>&nbsp;&nbsp;{{title}}</b>\n                </div>\n                <div class=\"panel-body {{contentclass}}\" *ngIf=\"opened\">\n                  <ng-content></ng-content>\n                </div>\n              <div>"
        })
    ], SidebarPanelComponent);
    return SidebarPanelComponent;
}());
exports.SidebarPanelComponent = SidebarPanelComponent;
//# sourceMappingURL=sidebarPanel.component.js.map