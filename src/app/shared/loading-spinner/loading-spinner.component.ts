import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() theme: ThemePalette = 'accent';
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  @Input() value = 50;
  @Input() diameter = 70;

  constructor() {}

  ngOnInit(): void {}
}
