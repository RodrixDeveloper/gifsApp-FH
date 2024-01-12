import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interface/gifs.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() gif!: Gif;  //  ! siempre me llegara el gif

  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required');
  }
}
