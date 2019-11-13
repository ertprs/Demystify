import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './PaytmCallback.component.html',
})

export class PaytmCallabckComponent implements OnInit {
    
    ngOnInit(): void {
        console.log("Paytm callback...!!");
        console.log("Paytm callback...!!");
    }

    constructor() { }
}