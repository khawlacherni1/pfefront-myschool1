import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ReglementService } from '../../service/reglement.service';
import { LreglementService } from '../../service/lreglement.service';
import { EtudiantService } from '../../service/etudiant.service';
import { InstitutService } from '../../service/institut.service';
//declare var jsPDF: any;
@Component({
  selector: 'app-recu',
  templateUrl: './recu.component.html',

  styleUrls: [
    
  ]
})
export class RecuComponent implements OnInit {
  reglement: any;
  etudiant: any;
  institut: any;
  nom: any;
  list : any = [];
  num :any;
   @ViewChild('recu') recu !: ElementRef;
  constructor(public patientService: EtudiantService,
    public institutService: InstitutService,
    public service: ReglementService,
    public lservice: LreglementService) { }

  ngOnInit(): void {
    this.institutService.getData(104).subscribe(
      response => {
        this.institut = response;
      }
    );
    this.getData(this.service.id);

  }
  getData(id: number) {
    this.service.getData(id).subscribe(
      response => {
        this.reglement = response;
        this.num = this.reglement.numero;
        this.lservice.getAll(this.num).subscribe(
          response => {
            this.list = response;
          }
        );
      }
    );
  }

 public impAttestation() :void {
   
    };
  }



