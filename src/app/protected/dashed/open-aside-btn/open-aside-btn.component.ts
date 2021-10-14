import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashedService } from '../dashed.service';
import { AsideEstado } from '../interfaces/dashed.interface';

@Component({
  selector: 'app-open-aside-btn',
  templateUrl: './open-aside-btn.component.html',
  styleUrls: ['./open-aside-btn.component.css']
})
export class OpenAsideBtnComponent implements OnInit {

  @ViewChild('btnOpen',{static:true}) btnOpen!:ElementRef
  asideEstado!: AsideEstado;

  constructor(
    private dashed: DashedService
  ) { }

  ngOnInit(): void {
    // console.warn("Estamos cargando el btn")
  }

  ngDoCheck(): void {
    this.asideEstado = this.dashed.getAside();
  }

  openAside() {
    this.dashed.asideOpen(this.btnOpen);
    // console.log("abrir aside...", this.btnOpen.nativeElement)
  }

}
