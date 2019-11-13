import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PressNote, GetPressNoteRequest } from '../../../model/pressNote';
import { Sector, GetSectorRequest } from '../../../model/sector';
import { SubSector, GetSubSectorRequest } from '../../../model/subSector';
import { PressNoteAdminService } from '../../../service/admin/pressNote.service';
import { SectorAdminService } from '../../../service/admin/sector.service';
import { SubSectorAdminService } from '../../../service/admin/subSector.service';

import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { SpinnerService } from '../../../service/common/spinner.service';


@Component({
    selector: 'my-app',
    templateUrl: './pressNote.component.html'
})

export class PressNoteAdminComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _pressNoteService: PressNoteAdminService,
        private _sectorService: SectorAdminService,
        private _subSectorService: SubSectorAdminService,
        vcr: ViewContainerRef,
        private spinnerService: SpinnerService) { }

    _global: Global = new Global();

    pressNote: PressNote;
    pressNoteId: number = 0;
    searchText: string = '';
    frmPressNote: FormGroup;
    msg: string;
    files: any;

    addUpdateText: string;
    pressNoteYears: any[];

    sectors: Sector[] = [];
    subSectors: SubSector[] = [];

    sectorDropDownSettings = {};
    subSectorDropDownSettings = {};

    selectedSectors: any = [];
    selectedSubSectors: any = [];
    selectedSubSectorIds: any = [];

    pdfServerPath: string = Global.PRESSNOTE_PDF_FILEPATH;
    pressNotePDFName: string;

    minDate: any = { year: 1970, month: 1, day: 1 };

    isSubmited: boolean = false;

    ngOnInit(): void {
        this.frmPressNote = this.formBuilder.group({
            PressNoteId: [''],
            PressNoteNo: ['', Validators.required],
            PressNoteName: ['', Validators.required],
            PressNoteDate: ['', Validators.required],
            PressNoteEffectiveDate: ['', Validators.required],
            Year: ['', Validators.required],
            PressNotePDF: ['', Validators.required],
            SectorIds: [''],
            SubSectorIds: ['']
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            let pressNoteId = this._global.decryptValue(params['pressNoteId']);

            if (pressNoteId) {
                this.addUpdateText = "Update";
                this.pressNoteId = parseInt(pressNoteId);
                this.EditPressNote(parseInt(pressNoteId));
            } else {
                this.GetPressNoteYear(null);
                this.GetSector(null);

                this.addUpdateText = "Add";
            }
        });
    }

    GetSector(pressNoteData): void {
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

                    if (pressNoteData != null) {
                        if (pressNoteData.SectorIds)
                            pressNoteData.SectorIds.split(',').forEach(item => {
                                if (item)
                                    selectedSectors.push({ SectorId: parseInt(item), Name: this.sectors.filter(x => x.SectorId == item)[0].Name });
                            });

                        this.selectedSectors = selectedSectors;
                        this.GetSubSector(pressNoteData);
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

    GetSubSector(pressNoteData): void {
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

                        if (pressNoteData != null) {
                            if (pressNoteData.SubSectorIds)
                                pressNoteData.SubSectorIds.split(',').forEach(item => {
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

    GetPressNoteYear(pressNoteData): void {
        this.spinnerService.show();

        this._pressNoteService.getPressNoteYear()
            .subscribe(data => {
                this.spinnerService.hide();

                this.pressNoteYears = [];

                if (data.Status == Global.API_SUCCESS) {

                    this.pressNoteYears.push({ YearId: null, YearName: "--Select--" });

                    data.Response.forEach(item => {
                        this.pressNoteYears.push({ YearId: item, YearName: item });
                    });

                    this.frmPressNote.get("Year").setValue((pressNoteData != null) ? pressNoteData.Year : pressNoteData);
                    this.frmPressNote.updateValueAndValidity();
                } else {
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                }
            }, error => {
                this.spinnerService.hide();
                this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
            });
    }

    fileChange(event: any) {
        this.files = event.target.files;

        if (this.files[0].type == "application/pdf") {
            this.frmPressNote.get('PressNotePDF').setValue(this.files[0].name);
            this.frmPressNote.updateValueAndValidity();
        } else {
            this.frmPressNote.get('PressNotePDF').setValue(null);
            this.frmPressNote.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
        }
    }

    EditPressNote(pressNoteId: number) {
        this.spinnerService.show();

        let getPressNoteRequest = new GetPressNoteRequest();
        getPressNoteRequest.PressNoteId = pressNoteId;
        getPressNoteRequest.IsActive = null;

        this._pressNoteService.getPressNote(getPressNoteRequest)
            .subscribe(data => {
                this.spinnerService.hide();

                this.GetPressNoteYear(data.Response[0]);
                this.GetSector(data.Response[0]);

                this.pressNotePDFName = data.Response[0].PressNotePDF;

                let pressNoteDate = new Date(data.Response[0].PressNoteDate);
                let pressNoteEffectiveDate = new Date(data.Response[0].PressNoteEffectiveDate);

                this.frmPressNote.setValue({
                    PressNoteId: pressNoteId,
                    PressNoteNo: data.Response[0].PressNoteNo,
                    PressNoteName: data.Response[0].PressNoteName,
                    PressNoteDate: { year: pressNoteDate.getFullYear(), month: pressNoteDate.getMonth() + 1, day: pressNoteDate.getDate() },
                    PressNoteEffectiveDate: { year: pressNoteEffectiveDate.getFullYear(), month: pressNoteEffectiveDate.getMonth() + 1, day: pressNoteEffectiveDate.getDate() },
                    Year: data.Response[0].Year,
                    PressNotePDF: data.Response[0].PressNotePDF,
                    SectorIds: [],
                    SubSectorIds: []
                });

                this.frmPressNote.updateValueAndValidity();
            }, error => this.msg = <any>error);
    }

    SavePressNote(formData) {
        this.spinnerService.show();

        formData.value.SectorIds = formData.value.SectorIds.map(x => x.SectorId).join(',');
        formData.value.SubSectorIds = formData.value.SubSectorIds.map(x => x.SubSectorId).join(',');

        if (formData.value.SectorIds == 'null')
            formData.value.SectorIds = null;

        if (formData.value.SubSectorIds == 'null')
            formData.value.SubSectorIds = null;

        formData.value.PressNoteDate = (formData.value.PressNoteDate != null) ? formData.value.PressNoteDate.year + "/" + formData.value.PressNoteDate.month + "/" + formData.value.PressNoteDate.day : null;
        formData.value.PressNoteEffectiveDate = (formData.value.PressNoteEffectiveDate != null) ? formData.value.PressNoteEffectiveDate.year + "/" + formData.value.PressNoteEffectiveDate.month + "/" + formData.value.PressNoteEffectiveDate.day : null;

        if (formData.value.PressNoteId) {
            this._pressNoteService.updatePressNote(formData.value)
                .subscribe(data => {
                    this.spinnerService.hide();

                    if (data.Status == Global.API_SUCCESS) {
                        this.activatedRoute.queryParams.subscribe(params => {
                            this.router.navigate(['/admin/secure/pressnotes'], {
                                queryParams: {
                                    indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                                }
                            }).then(() => {
                                this.toastr.success(data.Description, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                            });
                        });
                    } else {
                        this.toastr.error(data.Description, Global.TOASTR_ADMIN_PRESSNOTE_TITLE);
                    }
                },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true });
                });
        } else {
            this._pressNoteService.addPressNote(formData.value)
                .subscribe(data => {
                    this.spinnerService.hide();

                    if (data.Status == Global.API_SUCCESS) {
                        this.activatedRoute.queryParams.subscribe(params => {
                            this.router.navigate(['/admin/secure/pressnotes'], {
                                queryParams: {
                                    indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                                }
                            }).then(() => {
                                this.toastr.success(data.Description, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                            });
                        });
                    } else {
                        this.toastr.error(data.Description, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                    }
                },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
                });
        }
    }

    OnSubmitPressNote(formData: any) {
        this.isSubmited = true;
        
        if (this.frmPressNote.valid) {

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

                this._pressNoteService.fileUpload(fileFormData)
                    .subscribe(response => {
                        if (response.Status == "Success") {
                            this.frmPressNote.get('PressNotePDF').setValue(response.Response);
                            this.frmPressNote.updateValueAndValidity();
                            formData.value.PressNotePDF = response.Response;

                            this.files = null;
                            this.SavePressNote(formData);
                        } else {
                            this.spinnerService.hide();
                            this.toastr.error(response.Description, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
                        }
                    },
                    error => {
                        this.spinnerService.hide();
                        this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
                    });
            } else {
                if (formData.value.PressNotePDF) {
                    this.SavePressNote(formData);
                } else {
                    this.spinnerService.hide();
                }
            }
        }
    }

    ClearPressNoteDate() {
        this.frmPressNote.get("PressNoteDate").setValue("");
        this.frmPressNote.updateValueAndValidity();
    }

    ClearPressNoteEffectiveDate() {
        this.frmPressNote.get("PressNoteEffectiveDate").setValue("");
        this.frmPressNote.updateValueAndValidity();
    }

    CancelPressNote() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.router.navigate(['/admin/secure/pressnotes'], {
                queryParams: {
                    indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    }
}
