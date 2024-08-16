import { Component, OnInit, ViewChild, HostListener, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';

import SignaturePad from 'signature_pad';

import { AnexosService } from './../../../services/anexos/anexos.service';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
})
export class SignaturePadComponent implements OnInit, AfterViewInit {

  @Output()
  onSave: EventEmitter<any> = new EventEmitter();

  @ViewChild('canvas', { static: true }) signaturePadElement;
  signaturePad: SignaturePad;
  canvasWidth: number;
  canvasHeight: number;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly anexosService: AnexosService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.init();
  }

  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 140;
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
  }

  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor: 'rgb(0, 0, 0)',
    });
  }

  async save() {
    const img = this.signaturePad.toDataURL();
    await this.anexosService.setBase64File(img);
    this.onSave.emit(true);
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }
}