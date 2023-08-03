import { Component, OnInit } from '@angular/core';
import { VERSION ,ViewChild ,ElementRef} from '@angular/core';
//declare var jsPDF: any;
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InscriptionService } from '../../service/inscription.service';
import { EtudiantService } from '../../service/etudiant.service';
import { InstitutService } from '../../service/institut.service';
import { TarifService } from '../../service/tarif.service';
@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: [ 
    
   ]
})

export class AttestationComponent implements OnInit {
  inscription : any ;
  etudiant : any ;
  institut : any ;
  tarif :any;
  Date: any;
  annee : any;
  ann :any;
  montr :any;
  constructor(public service : InscriptionService,
    public tarifService : TarifService,
    public etudiantService : EtudiantService,
    public institutService : InstitutService,
    ) { }
  ngOnInit() {
    this.annee = localStorage.getItem('annee');
  //  this.ann = this.annee -1999;
    this.getInstitut();
    this.getData(this.service.id);
   this.getTarif(this.annee);
  }
  getData(id :number) {
    this.service.getData(id).subscribe(
      response => {
        this.inscription = response;
        this.etudiantService.getEtudiant(this.inscription.matricule).subscribe(
          response => {
            this.etudiant = response;
          }
        );
      }
    );
   
   
  
  }

  getInstitut() {
    this.institutService.getData(41).subscribe(
      response => {
        this.institut = response;
      }
    );
  }
  getTarif(id :number) {
    this.tarifService.getTarif(id).subscribe(
      response => {
        this.tarif = response;
        this.montr = (this.tarif.montant*0.95);
      }
    );
  }
  impAttestation() {
    let DATA: any = document.getElementById('attestation');
   // const doc = new jsPDF('letter')
   // const ta = document.getElementById('attestation');
  //  doc.fromHTML(ta, 0, 0);
  //  doc.save('demo.pdf')

    html2canvas(DATA).then((canvas :any) => {
     let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
     // const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
  //    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('attestation.pdf');
    });
}
}
