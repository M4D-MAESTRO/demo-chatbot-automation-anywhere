import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attention-surface',
  templateUrl: './attention-surface.component.html',
  styleUrls: ['./attention-surface.component.scss'],
})
export class AttentionSurfaceComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  subtitle: string;

  @Input()
  message: string;

  constructor() { }

  ngOnInit() {}

}
