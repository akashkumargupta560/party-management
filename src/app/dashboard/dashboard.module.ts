import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { PartyDetailsComponent } from './components/party-details/party-details.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule }
  from '@angular/platform-browser/animations';
import { MessagesModule } from 'primeng/messages';
import { StyleClassModule } from 'primeng/styleclass';
import { CreatePartyComponent } from './components/create-party/create-party.component';
import { DialogModule } from 'primeng/dialog';
import { authGuard } from '../auth/auth.guard';
const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [authGuard]
  },
  {
    path: 'party-details', component: PartyDetailsComponent,canActivate: [authGuard]
  },
  {
    path:'create-party', component:CreatePartyComponent, canActivate: [authGuard]
  },
]

@NgModule({
  declarations: [
    DashboardComponent,
    PartyDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    TagModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    StyleClassModule,
    DialogModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
