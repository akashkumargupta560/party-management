import { Component } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PartyService } from 'src/app/services/party.service';
import { Party } from 'src/app/model/Party.model';
@Component({
    selector: 'app-party-details',
    templateUrl: './party-details.component.html',
    styleUrls: ['./party-details.component.scss'],
    providers: [MessageService]
})
export class PartyDetailsComponent {

    ReadMore: boolean = true
    //hiding info box
    visibleForm: boolean = false;
    visibleAddress: boolean = false;
    visible: boolean = false;
    parties: any = [];

    clonedParties: { [s: string]: any } = {};
    partyDataSubscription!: Subscription;


    partyForm!: FormGroup;
    constructor(private fb: FormBuilder, private messageService: MessageService, private partyService: PartyService) { }

    ngOnInit() {
        this.partyDataSubscription = this.partyService.partyDetailsSubject.subscribe((partydetails: Party[]) => {
            this.parties = partydetails;
          })
          this.parties = this.partyService.getPartyDetails();
        this.partyForm = this.fb.group({
            name: ['', Validators.required],
            company_name: [''],
            mobile_no: ['', Validators.required],
            whatsapp_no: [''],
            email: ['', [Validators.required, Validators.email]],
            remark: [''],
            telephone_no: [''],
            date_of_birth: [''],
            anniversary_date: [''],
            gstin: [''],
            pan_no: [''],
            credit_limit: [''],
            login_access: ['true'],
            apply_tds: ['true'],
            image: [null, Validators.required],
            bank: this.fb.array([]),
            address: this.fb.array([])
        });
    }
    createBankDetails(): FormGroup {
        return this.fb.group({
            account_no: ['', Validators.required],
            account_holder_name: ['', Validators.required],
            bank_name: ['', Validators.required],
            branch_name: ['', Validators.required],
            bank_ifsc_code: ['', Validators.required],
        });
    }
    createAddress(): FormGroup {
        return this.fb.group({
            address_line_1: ['', Validators.required],
            address_line_2: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            pincode: ['', Validators.required],
            country: ['', Validators.required]
        });
    }
    // Get the bankDetails as a FormArray
    get bank(): FormArray {
        return this.partyForm.get('bank') as FormArray;
    }
    get address(): FormArray {
        return this.partyForm.get('address') as FormArray;
    }
    // Method to add new bank detail
    addBankDetail() {
    //    (<FormArray>this.partyForm.get("bank"))?.push(this.createBankDetails());
        this.bank.push(this.createBankDetails());
    }
    removeBankDetail(){
        this.bank.controls.pop();
    }
    onclick() {
        this.ReadMore = !this.ReadMore; //not equal to condition
        this.visibleForm = !this.visibleForm
    }
    addressDetails() {
        this.ReadMore = !this.ReadMore; //not equal to condition
        this.visibleAddress = !this.visibleAddress
    }
    removeAddressDetails(){
        this.address.controls.pop();
    }
    addAddressDetails(){
        this.address.push(this.createAddress());

    }
    onRowEditInit(party: any) {
        this.clonedParties[party.id as string] = { ...party };
    }
  
    onRowEditSave(party:any) {
        if (party?.company_name !== ''){
            //  && party.mobileNo && party.creditLimit ) {
            delete this.clonedParties[party.id as string];
            this.partyService.patchValue(party, party.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Party Details updated' });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Party Details' });
        }
    }
  
    onRowEditCancel(party: any, index: number) {
        this.parties[index] = this.clonedParties[party.id as string];
        delete this.clonedParties[party.id as string];
    }
    
    /**
     * to delete partyDetails by ID
     * @param party 
     */
    onRowDelete(party:any){
        this.partyService.deletePartyById(party.id);
    }
    ngOnDestroy(): void {
      this.partyDataSubscription.unsubscribe();
    }

    showDialog() {
        this.visible = true;
    }
    // Handle the file input change event
    onFileSelected(event: any): void {
        const file = event.target.files[0];
        // const reader = new FileReader();
        // reader.readAsDataURL(file);

        // const formData = new FormData()
        // formData.append('image', file, file.name);
        if (file) {
            // this.partyForm.append('image', file, file.name);
            this.partyForm.patchValue({
                image: file
            });
            this.partyForm.updateValueAndValidity();
        }
    }
    onSubmit() {
        if (this.partyForm.valid) {
            console.log('Form Submitted:', this.partyForm.value);
            const partyDetail = this.partyForm.value;
            this.partyService.createPartyDetails(partyDetail);
            this.partyForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Party Details added successfully' });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Party Details' });

        }
    }
}
