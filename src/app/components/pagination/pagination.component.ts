import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage = 0;
  @Input() totalPages = 0;
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
