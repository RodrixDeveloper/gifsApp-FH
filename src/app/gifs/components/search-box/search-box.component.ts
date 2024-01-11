import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
    <!-- (keyup.enter)="searchTag(txtTagInput.value)" -->
  `,
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput') tagInput!: ElementRef<HTMLInputElement>;

  //  searchTag(newTag: String) {
  //   console.log(newTag);
  // }

  constructor(private _gifsService: GifsService) {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    console.log(newTag);
    this._gifsService.searhTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
