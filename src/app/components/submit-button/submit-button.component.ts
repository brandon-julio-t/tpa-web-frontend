import { Component, Input, OnInit } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent implements OnInit {
  @Input() loading = false;

  faCircleNotch = faCircleNotch;

  constructor() {}

  ngOnInit(): void {}
}
