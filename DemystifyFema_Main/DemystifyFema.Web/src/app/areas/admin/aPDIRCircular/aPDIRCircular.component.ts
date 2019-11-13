import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APDIRCircular, GetAPDIRCircularRequest } from '../../../model/aPDIRCircular';
import { MasterDirection, GetMasterDirectionRequest } from '../../../model/masterDirection';
import { Sector, GetSectorRequest } from '../../../model/sector';
import { SubSector, GetSubSectorRequest } from '../../../model/subSector';
import { APDIRCircularAdminService } from '../../../service/admin/aPDIRCircular.service';
import { MasterDirectionAdminService } from '../../../service/admin/masterDirection.service';
import { SectorAdminService } from '../../../service/admin/sector.service';
import { SubSectorAdminService } from '../../../service/admin/subSector.service';

import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { SpinnerService } from '../../../service/common/spinner.service';


import { DropDown } from '../../../common/dropDown';

@Component({
    selector: 'my-app',
    templateUrl: './aPDIRCircular.component.html'
})

export class APDIRCircularAdminComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _aPDIRCircularService: APDIRCircularAdminService,
        private _masterDirectionService: MasterDirectionAdminService,
        private _sectorService: SectorAdminService,
        private _subSectorService: SubSectorAdminService,
        vcr: ViewContainerRef,
        private spinnerService: SpinnerService) { }

    _global: Global = new Global();

    aPDIRCircular: APDIRCircular;
    aPDIRCircularId: number = 0;
    searchText: string = '';
    frmAPDIRCircular: FormGroup;
    msg: string;
    files: any;
    aPDIRCircularYears: DropDown[] = [];
    masterDirections: DropDown[] = [];

    addUpdateText: string;

    pdfServerPath: string = Global.APDIRCIRCULAR_PDF_FILEPATH;
    aPDIRCircularPDFName: string;

    sectors: Sector[] = [];
    subSectors: SubSector[] = [];

    sectorDropDownSettings = {};
    subSectorDropDownSettings = {};

    selectedSectors: any = [];
    selectedSubSectors: any = [];
    selectedSubSectorIds: any = [];

    minDate: any = { year: 1970, month: 1, day: 1 };

    isSubmited: boolean = false;

    ngOnInit(): void {
        this.frmAPDIRCircular = this.formBuilder.group({
            APDIRCircularId: [''],
            MasterDirectionId: [''],
            APDIRCircularNo: ['', Validators.required],
            APDIRCircularName: ['', Validators.required],
            APDIRCircularDate: ['', Validators.required],
            APDIRCircularEffectiveDate: ['', Validators.required],
            Year: ['', Validators.required],
            APDIRCircularPDF: ['', Validators.required],
            SectorIds: [''],
            SubSectorIds: ['']
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            let aPDIRCircularId = this._global.decryptValue(params['aPDIRCircularId']);

            if (aPDIRCircularId) {
                this.addUpdateText = "Update";
                this.aPDIRCircularId = parseInt(aPDIRCircularId);
                this.EditAPDIRCircular(parseInt(aPDIRCircularId));
            } else {
                this.GetMasterDirection(null);
                this.GetAPDIRCircularYear(null);
                this.GetSector(null);
                this.addUpdateText = "Add";
            }
        });
    }

    GetSector(aPDIRCircularData): void {
        this.spinnerService.show();

        let getSectorRequest = new GetSectorRequest();

        this._sectorService.getSector(getSectorRequest)
            .subscribe(data => {
                this.spinnerService.hide();

                this.sectors = [];

                if (data.Status == Global.API_SUCCESS) {
                    data.Response.forEach(item => {
                        this.sectors.push({ SectorId: item.SectorId, Name: item.Name, CreatedDate: null, IsActive: null, IsDeleted: null, ModifiedDate: null });
                    });

                    this.sectorDropDownSettings = {
                        singleSelection: false,
                        idField: 'SectorId',
                        textField: 'Name',
                        selectAllText: 'Select All',
                        unSelectAllText: 'UnSelect All',
                        enableCheckAll: false,
                        allowSearchFilter: true
                    };

                    let selectedSectors = [];

                    if (aPDIRCircularData != null) {
                        if (aPDIRCircularData.SectorIds)
                            aPDIRCircularData.SectorIds.split(',').forEach(item => {
                                if (item)
                                    selectedSectors.push({ SectorId: parseInt(item), Name: this.sectors.filter(x => x.SectorId == item)[0].Name });
                            });

                        this.selectedSectors = selectedSectors;
                        this.GetSubSector(aPDIRCircularData);
                    }
                } else {
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                }
            }, error => {
                this.spinnerService.hide();
                this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
            });
    }

    OnSectorSelect(item: any) {
        this.GetSubSector(null);
    }

    OnSectorDeSelect(item: any) {
        this.GetSubSector(null);
    }

    GetSubSector(aPDIRCircularData): void {
        let t_this = this;
        if (this.selectedSectors.length > 0) {
            this.spinnerService.show();

            let getSubSectorRequest = new GetSubSectorRequest();
            getSubSectorRequest.SectorId = Array.prototype.map.call(this.selectedSectors, function (item) { return item.SectorId; }).join(",");

            this._subSectorService.getSubSector(getSubSectorRequest)
                .subscribe(data => {
                    this.spinnerService.hide();
                    this.subSectors = [];

                    if (data.Status == Global.API_SUCCESS) {

                        data.Response.forEach(item => {
                            this.subSectors.push({ SubSectorId: item.SubSectorId, Name: item.Name, SectorId: item.SectorId, CreatedDate: null, APDIRCircularId: null, APDIRCircularNo: null, NotificationId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, NotificationNo: null, PressNoteNo: null, Year: null, PressNoteId: null });
                        });

                        this.subSectorDropDownSettings = {
                            singleSelection: false,
                            idField: 'SubSectorId',
                            textField: 'Name',
                            selectAllText: 'Select All',
                            unSelectAllText: 'UnSelect All',
                            enableCheckAll: false,
                            allowSearchFilter: true
                        };

                        let selectedSubSectors = [];

                        if (aPDIRCircularData != null) {
                            if (aPDIRCircularData.SubSectorIds)
                                aPDIRCircularData.SubSectorIds.split(',').forEach(item => {
                                    if (item)
                                        selectedSubSectors.push({ SubSectorId: parseInt(item), Name: this.subSectors.filter(x => x.SubSectorId == item)[0].Name, SectorId: this.subSectors.filter(x => x.SubSectorId == item)[0].SectorId });
                                });

                            this.selectedSubSectors = selectedSubSectors;
                        } else {
                            let props = ['SubSectorId', 'Name'];

                            this.selectedSubSectors = this.selectedSubSectors.filter(function (o1) {
                                return t_this.subSectors.some(function (o2) {
                                    return o1.SubSectorId === o2.SubSectorId;
                                });
                            }).map(function (o) {
                                return props.reduce(function (newo, name) {
                                    newo[name] = o[name];
                                    return newo;
                                }, {});
                            });
                        }
                    } else {
                        this.toastr.error(data.Description, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                    }
                }, error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
                });
        } else {
            this.subSectors = [];
            this.selectedSubSectors = [];
        }
    }

    fileChange(event: any) {
        this.files = event.target.files;

        if (this.files[0].type == "application/pdf") {
            this.frmAPDIRCircular.get('APDIRCircularPDF').setValue(this.files[0].name);
            this.frmAPDIRCircular.updateValueAndValidity();
        } else {
            this.frmAPDIRCircular.get('APDIRCircularPDF').setValue(null);
            this.frmAPDIRCircular.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
        }
    }

    GetMasterDirection(aPDIRCircularData): void {
        this.spinnerService.show();

        let getMasterDirectionRequest = new GetMasterDirectionRequest();

        this._masterDirectionService.getMasterDirection(getMasterDirectionRequest)
            .subscribe(data => {
                this.spinnerService.hide();
                this.masterDirections = [];

                if (data.Status == Global.API_SUCCESS) {

                    this.masterDirections.push({ Value: "", Text: "--Select--" });

                    data.Response.forEach(item => {
                        this.masterDirections.push({ Value: item.MasterDirectionId, Text: item.MasterDirectionName });
                    });

                    this.frmAPDIRCircular.get("MasterDirectionId").setValue((aPDIRCircularData != null) ? (aPDIRCircularData.MasterDirectionId) ? aPDIRCircularData.MasterDirectionId : "" : "");
                    this.frmAPDIRCircular.updateValueAndValidity();
                } else {
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                }
            }, error => {
                this.spinnerService.hide();
                this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
    }

    GetAPDIRCircularYear(aPDIRCircularData): void {
        this.spinnerService.show();

        this._aPDIRCircularService.getAPDIRCircularYears()
            .subscribe(data => {
                this.spinnerService.hide();
                this.aPDIRCircularYears = [];

                if (data.Status == Global.API_SUCCESS) {

                    this.aPDIRCircularYears.push({ Value: "", Text: "--Select--" });

                    data.Response.forEach(item => {
                        this.aPDIRCircularYears.push({ Value: item.APDIRCircularYearId, Text: item.APDIRCircularYearName });
                    });

                    this.frmAPDIRCircular.get("Year").setValue((aPDIRCircularData != null) ? aPDIRCircularData.Year : "");
                    this.frmAPDIRCircular.updateValueAndValidity();
                } else {
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                }
            }, error => {
                this.spinnerService.hide();
                this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
    }

    EditAPDIRCircular(aPDIRCircularId: number) {
        this.spinnerService.show();

        let getAPDIRCircularRequest = new GetAPDIRCircularRequest();
        getAPDIRCircularRequest.APDIRCircularId = aPDIRCircularId;
        getAPDIRCircularRequest.PageNumber = 1;
        getAPDIRCircularRequest.PageSize = 10;
        getAPDIRCircularRequest.IsActive = null;

        this._aPDIRCircularService.getAPDIRCircular(getAPDIRCircularRequest)
            .subscribe(data => {
                this.spinnerService.hide();

                this.GetAPDIRCircularYear(data.Response[0]);
                this.GetMasterDirection(data.Response[0]);
                this.GetSector(data.Response[0]);

                this.aPDIRCircularPDFName = data.Response[0].APDIRCircularPDF;

                let aPDIRCircularDate = new Date(data.Response[0].APDIRCircularDate);
                let aPDIRCircularEffectiveDate = new Date(data.Response[0].APDIRCircularEffectiveDate);
                console.log(data.Response);
                this.frmAPDIRCircular.setValue({
                    APDIRCircularId: aPDIRCircularId,
                    MasterDirectionId: data.Response[0].MasterDirectionId,
                    APDIRCircularNo: data.Response[0].APDIRCircularNo,
                    APDIRCircularName: data.Response[0].APDIRCircularName,
                    APDIRCircularDate: { year: aPDIRCircularDate.getFullYear(), month: aPDIRCircularDate.getMonth() + 1, day: aPDIRCircularDate.getDate() },
                    APDIRCircularEffectiveDate: { year: aPDIRCircularEffectiveDate.getFullYear(), month: aPDIRCircularEffectiveDate.getMonth() + 1, day: aPDIRCircularEffectiveDate.getDate() },
                    Year: data.Response[0].Year,
                    APDIRCircularPDF: data.Response[0].APDIRCircularPDF,
                    SectorIds: [],
                    SubSectorIds: []
                });

                this.frmAPDIRCircular.updateValueAndValidity();
            }, error => this.msg = <any>error);
    }

    SaveAPDIRCircular(formData) {
        this.spinnerService.show();

        formData.value.SectorIds = formData.value.SectorIds.map(x => x.SectorId).join(',');
        formData.value.SubSectorIds = formData.value.SubSectorIds.map(x => x.SubSectorId).join(',');

        if (formData.value.SectorIds == 'null')
            formData.value.SectorIds = null;

        if (formData.value.SubSectorIds == 'null')
            formData.value.SubSectorIds = null;

        formData.value.APDIRCircularDate = (formData.value.APDIRCircularDate != null) ? formData.value.APDIRCircularDate.year + "/" + formData.value.APDIRCircularDate.month + "/" + formData.value.APDIRCircularDate.day : null;
        formData.value.APDIRCircularEffectiveDate = (formData.value.APDIRCircularEffectiveDate != null) ? formData.value.APDIRCircularEffectiveDate.year + "/" + formData.value.APDIRCircularEffectiveDate.month + "/" + formData.value.APDIRCircularEffectiveDate.day : null;

        if (formData.value.APDIRCircularId) {
            this._aPDIRCircularService.updateAPDIRCircular(formData.value)
                .subscribe(data => {
                    this.spinnerService.hide();

                    if (data.Status == Global.API_SUCCESS) {
                        this.activatedRoute.queryParams.subscribe(params => {
                            this.router.navigate(['/admin/secure/apdircirculars'], {
                                queryParams: {
                                    indexAPDIRCircular1: params["indexAPDIRCircular1"], indexAPDIRCircular2: params["indexAPDIRCircular2"], sortingAPDIRCircularField: params["sortingAPDIRCircularField"], sortingAPDIRCircularDirection: params["sortingAPDIRCircularDirection"], sortingAPDIRCircularBeforeField: params["sortingAPDIRCircularBeforeField"], sortingAPDIRCircularBeforeDirection: params["sortingAPDIRCircularBeforeDirection"], sortingAPDIRCircularAfterField: params["sortingAPDIRCircularAfterField"], sortingAPDIRCircularAfterDirection: params["sortingAPDIRCircularAfterDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                                }
                            }).then(() => {
                                this.toastr.success(data.Description, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                            });
                        });
                    } else {
                        this.toastr.error(data.Description, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE);
                    }
                },
                    error => {
                        this.spinnerService.hide();
                        this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true });
                    });
        } else {
            this._aPDIRCircularService.addAPDIRCircular(formData.value)
                .subscribe(data => {
                    this.spinnerService.hide();

                    if (data.Status == Global.API_SUCCESS) {
                        this.activatedRoute.queryParams.subscribe(params => {
                            this.router.navigate(['/admin/secure/apdircirculars'], {
                                queryParams: {
                                    indexAPDIRCircular1: params["indexAPDIRCircular1"], indexAPDIRCircular2: params["indexAPDIRCircular2"], sortingAPDIRCircularField: params["sortingAPDIRCircularField"], sortingAPDIRCircularDirection: params["sortingAPDIRCircularDirection"], sortingAPDIRCircularBeforeField: params["sortingAPDIRCircularBeforeField"], sortingAPDIRCircularBeforeDirection: params["sortingAPDIRCircularBeforeDirection"], sortingAPDIRCircularAfterField: params["sortingAPDIRCircularAfterField"], sortingAPDIRCircularAfterDirection: params["sortingAPDIRCircularAfterDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                                }
                            }).then(() => {
                                this.toastr.success(data.Description, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                            });
                        });
                    } else {
                        this.toastr.error(data.Description, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                    }
                },
                    error => {
                        this.spinnerService.hide();
                        this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
                    });
        }
    }

    OnSubmitAPDIRCircular(formData: any) {
        this.isSubmited = true;

        if (this.frmAPDIRCircular.valid) {
            this.spinnerService.show();

            // Check SubSector is selected for Sector with SubSector
            let selectedSectorIds = formData.value.SectorIds.map(x => x.SectorId);
            let selectedSubSectorIds = formData.value.SubSectorIds.map(x => x.SubSectorId);

            let errorMessage = '';

            // Traverse all Sectors
            for (var selectedSectorIdItem in selectedSectorIds) {

                let selectedSectorId = (selectedSectorIds[selectedSectorIdItem]);

                // Get SubSectors of Sector
                let subSectorsOfSelectedSector = this.subSectors.filter(function (o1) {
                    return o1.SectorId == selectedSectorId;
                });
                if (subSectorsOfSelectedSector.length > 0) {

                    // Check SubSector is selected for selected Sector
                    let isSubSectorExist = false;
                    for (var subSectorOfSelectedSector in subSectorsOfSelectedSector) {
                        let subSectorIdOfSelectedSector = (subSectorsOfSelectedSector[subSectorOfSelectedSector].SubSectorId);
                        isSubSectorExist = selectedSubSectorIds.indexOf(subSectorIdOfSelectedSector) > -1 ? true : false;
                        if (isSubSectorExist)
                            break;
                    }

                    if (!isSubSectorExist) {
                        let sector = this.sectors.filter(function (o1) {
                            return o1.SectorId == selectedSectorId;
                        }).shift();

                        errorMessage += sector.Name + ', ';
                    }
                }
            }

            if (errorMessage.length > 0) {
                errorMessage = "Please select SubSector of Sector(s) : " + errorMessage.substr(0, errorMessage.length - 2);
                this.toastr.error(errorMessage, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
                this.spinnerService.hide();
                return false;
            }

            if (this.files != null && this.files.length > 0) {
                let fileFormData: FormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }

                this._aPDIRCircularService.fileUpload(fileFormData)
                    .subscribe(response => {
                        if (response.Status == "Success") {
                            this.frmAPDIRCircular.get('APDIRCircularPDF').setValue(response.Response);
                            this.frmAPDIRCircular.updateValueAndValidity();
                            formData.value.APDIRCircularPDF = response.Response;

                            this.files = null;

                            this.SaveAPDIRCircular(formData);
                        } else {
                            this.spinnerService.hide();
                            this.toastr.error(response.Description, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
                        }
                    },
                        error => {
                            this.spinnerService.hide();
                            this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
                        });
            } else {
                if (formData.value.APDIRCircularPDF) {
                    this.SaveAPDIRCircular(formData);
                } else {
                    this.spinnerService.hide();
                }
            }
        }
    }

    ClearAPDIRCircularDate() {
        this.frmAPDIRCircular.get("APDIRCircularDate").setValue("");
        this.frmAPDIRCircular.updateValueAndValidity();
    }

    ClearAPDIRCircularEffectiveDate() {
        this.frmAPDIRCircular.get("APDIRCircularEffectiveDate").setValue("");
        this.frmAPDIRCircular.updateValueAndValidity();
    }

    CancelAPDIRCircular() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.router.navigate(['/admin/secure/apdircirculars'], {
                queryParams: {
                    indexAPDIRCircular1: params["indexAPDIRCircular1"], indexAPDIRCircular2: params["indexAPDIRCircular2"], sortingAPDIRCircularField: params["sortingAPDIRCircularField"], sortingAPDIRCircularDirection: params["sortingAPDIRCircularDirection"], sortingAPDIRCircularBeforeField: params["sortingAPDIRCircularBeforeField"], sortingAPDIRCircularBeforeDirection: params["sortingAPDIRCircularBeforeDirection"], sortingAPDIRCircularAfterField: params["sortingAPDIRCircularAfterField"], sortingAPDIRCircularAfterDirection: params["sortingAPDIRCircularAfterDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    }
}
