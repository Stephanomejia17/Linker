import { Component } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { Swipe } from './swipe/swipe';
import { Filter } from './filter/filter';

@Component({
  selector: 'app-match',
  imports: [Sidebar, Swipe, Filter],
  templateUrl: './match.html',
  styleUrl: './match.css'
})
export class Match {


}
