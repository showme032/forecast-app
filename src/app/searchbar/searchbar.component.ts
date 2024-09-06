import { AfterContentChecked, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent implements AfterContentChecked {
  @Output() search = new EventEmitter<string>();

  searchQuery = '';

  onSubmit(form: HTMLFormElement) {
    this.search.emit(this.searchQuery);
    form.reset();
    form.blur();
  }

  ngAfterContentChecked() {
    if (this.searchQuery.length >= 3) {
      console.log(this.searchQuery);
    //   Start searching and displaying suggestions
    }
  }
}