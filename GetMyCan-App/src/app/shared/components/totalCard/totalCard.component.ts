import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-total-card',
  templateUrl: './totalCard.component.html',
  styleUrls: ['./totalCard.component.scss'],
})
export class TotalCardComponent implements OnInit {

  @Output() handleNext = new EventEmitter();
  @Input() total = 0;
  @Input() buttonText = 'Proceed';
  constructor() { }

  ngOnInit() {

  }

  handleClick() {
    this.handleNext.emit();
  }
}
