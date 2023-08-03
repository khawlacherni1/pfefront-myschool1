import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { MatDialogModule,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AddBanqueComponent } from './banque/add-banque/add-banque.component';
import { ListBanqueComponent } from './banque/list-banque/list-banque.component';
import { AddDomaineComponent } from './domaine/add-domaine/add-domaine.component';
import { ListDomaineComponent } from './domaine/list-domaine/list-domaine.component';
import { ListNationaliteComponent } from './nationalite/list-nationalite/list-nationalite.component';
import { AddNationaliteComponent } from './nationalite/add-nationalite/add-nationalite.component';
import { AddNiveauComponent } from './niveau/add-niveau/add-niveau.component';
import { ListNiveauComponent } from './niveau/list-niveau/list-niveau.component';
import { AddClasseComponent } from './classe/add-classe/add-classe.component';
import { ListClasseComponent } from './classe/list-classe/list-classe.component';
import { AddSpecialiteComponent } from './specialite/add-specialite/add-specialite.component';
import { ListSpecialiteComponent } from './specialite/list-specialite/list-specialite.component';
import { AddCycleComponent } from './cycle/add-cycle/add-cycle.component';
import { ListCycleComponent } from './cycle/list-cycle/list-cycle.component';
import { APP_BASE_HREF } from '@angular/common';
import { AddEtablissementComponent } from './etablissement/add-etablissement/add-etablissement.component';
import { ListEtablissementComponent } from './etablissement/list-etablissement/list-etablissement.component';
import { ListEnseignantComponent } from './enseignant/list-enseignant/list-enseignant.component';
import { AddEnseignantComponent } from './enseignant/add-enseignant/add-enseignant.component';
import { AddEtudiantComponent } from './etudiant/add-etudiant/add-etudiant.component';
import { ListEtudiantComponent } from './etudiant/list-etudiant/list-etudiant.component';
import { AddInscriptionComponent } from './inscription/add-inscription/add-inscription.component';
import { ListInscriptionComponent } from './inscription/list-inscription/list-inscription.component';
import { ListReglementComponent } from './reglement/list-reglement/list-reglement.component';
import { AddReglementComponent } from './reglement/add-reglement/add-reglement.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AttestationComponent } from './inscription/attestation/attestation.component';
import { AddTarifComponent } from './tarif/add-tarif/add-tarif.component';
import { ListTarifComponent } from './tarif/list-tarif/list-tarif.component';
import { RecuComponent } from './reglement/recu/recu.component';
import { AddLreglementComponent } from './reglement/add-lreglement/add-lreglement.component';
import { RegisterComponent } from './user/register/register.component';
import { MenuComponent } from './menu/menu.component';

import { ListMatiereComponent } from './matiere/list-matiere/list-matiere.component';
import { AddMatiereComponent } from './matiere/add-matiere/add-matiere.component';
import { AddInstitutComponent } from './institut/add-institut/add-institut.component';
import { ListInstitutComponent } from './institut/list-institut/list-institut.component';
import { ListTypepaiementComponent } from './typepaiement/list-typepaiement/list-typepaiement.component';
import { AddTypepaiementComponent } from './typepaiement/add-typepaiement/add-typepaiement.component';
import { AddCoursComponent } from './cours/add-cours/add-cours.component';
import { ListCoursComponent } from './cours/list-cours/list-cours.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListNoteComponent } from './note/list-note/list-note.component';
import { AddNoteComponent } from './note/add-note/add-note.component';
import { AddLnoteComponent } from './note/add-lnote/add-lnote.component';
import { ListLnoteComponent } from './note/list-lnote/list-lnote.component';
import { LoginComponent } from './user/login/login.component';
import { ListModreglementComponent } from './modreglement/list-modreglement/list-modreglement.component';
import { AddModreglementComponent } from './modreglement/add-modreglement/add-modreglement.component';
import { ListCoefficientComponent } from './coefficient/list-coefficient/list-coefficient.component';
import { AddCoefficientComponent } from './coefficient/add-coefficient/add-coefficient.component';
import { HomeComponent } from './home/home.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { FormationComponent } from './formation/formation.component';
import { AddQcmComponent } from './qcm/add-qcm/add-qcm.component';
import { ListQcmComponent } from './qcm/list-qcm/list-qcm.component';
import { AddEmploiComponent } from './emploi/add-emploi/add-emploi.component';
import { AddLemploiComponent } from './emploi/add-lemploi/add-lemploi.component';
import { ListEmploiComponent } from './emploi/list-emploi/list-emploi.component';
import { ListHoraireComponent } from './emploi/list-horaire/list-horaire.component';
import { AddHoraireComponent } from './emploi/add-horaire/add-horaire.component';
import { AddJourComponent } from './emploi/add-jour/add-jour.component';
import { ListJourComponent } from './emploi/list-jour/list-jour.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { AddAbsenceComponent } from './absence/add-absence/add-absence.component';
import { ListAbsenceComponent } from './absence/list-absence/list-absence.component';
import { ListEventComponent } from './event/list-event/list-event.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { AddExamenComponent } from './exame/add-examen/add-examen.component';
import { ListExamenComponent } from './exame/list-examen/list-examen.component';
import { AddLqcmComponent } from './qcm/add-lqcm/add-lqcm.component';
import { AddLabsenceComponent } from './absence/add-labsence/add-labsence.component';
import { ConsAbsenceComponent } from './absence/cons-absence/cons-absence.component';
import { ConsNoteComponent } from './note/cons-note/cons-note.component';
import { QcmComponent } from './qcm/qcm/qcm.component';
import { BulletinComponent } from './note/bulletin/bulletin.component';
const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
];
@NgModule({
  declarations: [
    AppComponent,
    AddBanqueComponent,
    ListBanqueComponent,
    AddDomaineComponent,
    ListDomaineComponent,
    ListNationaliteComponent,
    AddNationaliteComponent,
    AddNiveauComponent,
    ListNiveauComponent,
    AddClasseComponent,
    ListClasseComponent,
    AddSpecialiteComponent,
    ListSpecialiteComponent,
    AddCycleComponent,
    ListCycleComponent,
    AddEtablissementComponent,
    ListEtablissementComponent,
    ListEnseignantComponent,
    AddEnseignantComponent,
    AddEtudiantComponent,
    ListEtudiantComponent,
    AddInscriptionComponent,
    ListInscriptionComponent,
    ListReglementComponent,
    AddReglementComponent,
    ListUserComponent,
    AttestationComponent,
    AddTarifComponent,
    ListTarifComponent,
    RecuComponent,
    AddLreglementComponent,
    RegisterComponent,
    MenuComponent,
    AddMatiereComponent,
    ListMatiereComponent,
    AddInstitutComponent,
    ListInstitutComponent,
    ListTypepaiementComponent,
    AddTypepaiementComponent,
    AddCoursComponent,
    ListCoursComponent,
    DashboardComponent,
    ListNoteComponent,
    AddNoteComponent,
    AddLnoteComponent,
    ListLnoteComponent,
    LoginComponent,
    ListModreglementComponent,
    AddModreglementComponent,
    ListCoefficientComponent,
    AddCoefficientComponent,
    HomeComponent,
    PersonnelComponent,
    FormationComponent,
    AddQcmComponent,
    ListQcmComponent,

    AddEmploiComponent,
    AddLemploiComponent,
    ListEmploiComponent,
    ListHoraireComponent,
    AddHoraireComponent,
    AddJourComponent,
    ListJourComponent,
    ForgetPasswordComponent,
    AddAbsenceComponent,
    ListAbsenceComponent,
    ListEventComponent,
    AddEventComponent,
    AboutComponent,
    CourseComponent,
    AddExamenComponent,
    ListExamenComponent,
    AddLqcmComponent,
    AddLabsenceComponent,
    ConsAbsenceComponent,
    ConsNoteComponent,
    QcmComponent,
    BulletinComponent,










  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,

    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,

    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    NgxPaginationModule
  ],
  exports : MATERIAL_MODULES,
  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},{ provide: APP_BASE_HREF, useValue: '' },
    { provide: MatDialogRef, useValue: {} }],
    bootstrap: [AppComponent]})
export class AppModule { }
