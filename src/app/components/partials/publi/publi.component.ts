import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-publi',
  templateUrl: './publi.component.html',
  styleUrls: ['./publi.component.less'],
})
export class PubliComponent implements OnInit {
  @Input() bigPubli: boolean = true;
  @Input() hasHeader: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
