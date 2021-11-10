import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {DemandeService} from '../../services/demande.service';
import {Globals} from '../../Globals';
import {AnnuaireService} from '../../services/annuaire.service';
import {Person} from '../../models/person';

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.css']
})
export class AnnuaireComponent implements OnInit {
  public sidebarVisible = true;
  persons: Person[] = [];

  constructor(
      private sidebarService: SidebarService,
      private cdr: ChangeDetectorRef,
      private global: Globals,
      private annuaireService: AnnuaireService,
  ) {
  }
  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.annuaireService.getAnnuaireFromServer().subscribe(
        (res: Person[]) => {
          this.persons = res;
        }
    );
  }

  getPersonMedia(path) {
    return this.global.Medias + 'people/' + path
  }

}
