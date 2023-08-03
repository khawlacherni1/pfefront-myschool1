import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBanqueComponent } from './banque/add-banque/add-banque.component';
import { ListBanqueComponent } from './banque/list-banque/list-banque.component';
import { ListClasseComponent } from './classe/list-classe/list-classe.component';
import { AddClasseComponent } from './classe/add-classe/add-classe.component';
import { AddDomaineComponent } from './domaine/add-domaine/add-domaine.component';
import { ListDomaineComponent } from './domaine/list-domaine/list-domaine.component';
import { AddSpecialiteComponent } from './specialite/add-specialite/add-specialite.component';
import { ListSpecialiteComponent } from './specialite/list-specialite/list-specialite.component';
import { ListNationaliteComponent } from './nationalite/list-nationalite/list-nationalite.component';
import { AddNationaliteComponent } from './nationalite/add-nationalite/add-nationalite.component';
import { AddNiveauComponent } from './niveau/add-niveau/add-niveau.component';
import { ListNiveauComponent } from './niveau/list-niveau/list-niveau.component';
import { AddCycleComponent } from './cycle/add-cycle/add-cycle.component';
import { ListCycleComponent } from './cycle/list-cycle/list-cycle.component';
import { AddEtudiantComponent } from './etudiant/add-etudiant/add-etudiant.component';
import { ListEtudiantComponent } from './etudiant/list-etudiant/list-etudiant.component';
import { AddEtablissementComponent } from './etablissement/add-etablissement/add-etablissement.component';
import { ListEtablissementComponent } from './etablissement/list-etablissement/list-etablissement.component';
import { ListTarifComponent } from './tarif/list-tarif/list-tarif.component';
import { AddTarifComponent } from './tarif/add-tarif/add-tarif.component';
import { AddReglementComponent } from './reglement/add-reglement/add-reglement.component';
import { ListReglementComponent } from './reglement/list-reglement/list-reglement.component';
import { AttestationComponent } from './inscription/attestation/attestation.component';
import { ListInscriptionComponent } from './inscription/list-inscription/list-inscription.component';
import { AddInscriptionComponent } from './inscription/add-inscription/add-inscription.component';
import { ListEnseignantComponent } from './enseignant/list-enseignant/list-enseignant.component';
import { AddEnseignantComponent } from './enseignant/add-enseignant/add-enseignant.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './user/register/register.component';
import { AddMatiereComponent } from './matiere/add-matiere/add-matiere.component';
import { ListMatiereComponent } from './matiere/list-matiere/list-matiere.component';
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
import { AuthGaurdService as AuthGuard} from './service/auth-gaurd.service';
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
import { ListEmploiComponent } from './emploi/list-emploi/list-emploi.component';
import { ListHoraireComponent } from './emploi/list-horaire/list-horaire.component';
import { AddHoraireComponent } from './emploi/add-horaire/add-horaire.component';
import { AddJourComponent } from './emploi/add-jour/add-jour.component';
import { ListJourComponent } from './emploi/list-jour/list-jour.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { AboutComponent } from './about/about.component';
import { AddAbsenceComponent } from './absence/add-absence/add-absence.component';
import { ListAbsenceComponent } from './absence/list-absence/list-absence.component';
import { ListEventComponent } from './event/list-event/list-event.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { CourseComponent } from './course/course.component';
import { AddExamenComponent } from './exame/add-examen/add-examen.component';
import { ListExamenComponent } from './exame/list-examen/list-examen.component';
import { ConsAbsenceComponent } from './absence/cons-absence/cons-absence.component';
import { ConsNoteComponent } from './note/cons-note/cons-note.component';
import { QcmComponent } from './qcm/qcm/qcm.component';
import { BulletinComponent } from './note/bulletin/bulletin.component';
const routes: Routes = [
  {
    path: '', component: MenuComponent, canActivate: [AuthGuard],children: [
      {path: 'banques', component: ListBanqueComponent},
      {path: 'banque', component: AddBanqueComponent},
      {path: 'classes', component: ListClasseComponent},
      {path: 'classe', component: AddClasseComponent},
      {path: 'domaines', component: ListDomaineComponent},
      {path: 'domaine', component: AddDomaineComponent},
      {path: 'specialites', component: ListSpecialiteComponent},
      {path: 'specialite', component: AddSpecialiteComponent},
      {path: 'nationalites', component: ListNationaliteComponent},
      {path: 'nationalite', component: AddNationaliteComponent},
      {path: 'niveaus', component: ListNiveauComponent},
      {path: 'niveau', component: AddNiveauComponent},
      {path: 'cycles', component: ListCycleComponent},
      {path: 'cycle', component: AddCycleComponent},
      {path: 'etablissements', component: ListEtablissementComponent},
      {path: 'etablissement', component: AddEtablissementComponent},
      {path: 'attestation', component: AttestationComponent},
      {path: 'tarifs', component: ListTarifComponent},
      {path: 'tarif', component: AddTarifComponent},
      {path: 'reglements', component:  ListReglementComponent},
      {path: 'reglement', component:  AddReglementComponent},
      {path: 'inscriptions', component: ListInscriptionComponent},
      {path: 'inscription', component: AddInscriptionComponent},
      {path: 'enseignants', component: ListEnseignantComponent},
      {path: 'enseignant', component: AddEnseignantComponent},
      {path: 'users', component: ListUserComponent},
      {path: 'matieres', component: ListMatiereComponent},
      {path: 'matiere', component: AddMatiereComponent},
      {path: 'instituts', component: ListInstitutComponent},
      {path: 'institut', component: AddInstitutComponent},
      {path: 'typepaiements', component: ListTypepaiementComponent},
      {path: 'typepaiement', component: AddTypepaiementComponent},
      {path: 'courss', component: ListCoursComponent},
      {path: 'cours', component: AddCoursComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'notes', component: ListNoteComponent},
      {path: 'note', component: AddNoteComponent},
      {path: 'lnote', component: AddLnoteComponent},
      {path: 'typepaiements', component: ListTypepaiementComponent},
      {path: 'typepaiement', component: AddTypepaiementComponent},
      {path: 'modereglments', component: ListModreglementComponent},
      {path: 'modreglement', component: AddModreglementComponent},
      {path: 'coefficients', component: ListCoefficientComponent},
      {path: 'coefficient', component: AddCoefficientComponent},
      {path: 'home', component: HomeComponent},
      {path: 'personnel', component: PersonnelComponent},
      {path: 'formation', component: FormationComponent},
      {path: 'qcm', component: AddQcmComponent},
      {path: 'qcms', component: ListQcmComponent},
      {path: 'emploi', component: AddEmploiComponent},
      {path: 'emplois', component: ListEmploiComponent},
      {path: 'jour', component: AddJourComponent},
      {path: 'jours', component: ListJourComponent},
      {path: 'horaire', component: AddHoraireComponent},
      {path: 'horaires', component: ListHoraireComponent},
      {path: 'etudiants', component: ListEtudiantComponent},
      {path: 'etudiant', component: AddEtudiantComponent},
      {path: 'about', component: AboutComponent},
      {path: 'course', component: CourseComponent},
      {path: 'absence', component:  AddAbsenceComponent},
      {path: 'absences', component:  ListAbsenceComponent},
      {path: 'event', component: AddEventComponent},
      {path: 'events', component: ListEventComponent},
      {path: 'examen', component: AddExamenComponent},
      {path: 'examens', component: ListExamenComponent},
      {path: 'consAbsences', component:  ConsAbsenceComponent},
      {path: 'consQcms', component: QcmComponent},
      {path: 'consNotes', component: ConsNoteComponent},
      {path: 'bulletin', component: BulletinComponent},
       ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dash', component: DashboardComponent},
  {path: 'forgetpwd', component: ForgetPasswordComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
