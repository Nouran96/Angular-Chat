import { Component, OnInit } from '@angular/core';
import { MenuSections } from 'src/app/mocks/MenuItems';
import { MenuSection } from 'src/app/models/Restaurants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuSections: Array<MenuSection>;

  constructor() {}

  ngOnInit(): void {
    // Get 5 random sections from array and sort them alphabetically
    this.menuSections = MenuSections.sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .sort((a, b) => a.section_name.localeCompare(b.section_name));
  }
}
