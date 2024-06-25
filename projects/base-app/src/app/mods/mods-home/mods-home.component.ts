import { Component } from '@angular/core';

@Component({
  selector: 'app-mods-home',
  templateUrl: './mods-home.component.html',
  styleUrls: ['./mods-home.component.css']
})
export class ModsHomeComponent {
  items = [  
    { menuHeader: 'Menu Header 1', menuItems: [{ item: 'Link 1' }, { item: 'Link 2' }] },
    { menuHeader: 'Menu Header 2',  menuItems: [{ item: 'Link 1' }, { item: 'Link 2' }, { item: 'Link 3' }, { item: 'Link 4' }] },
    { menuHeader: 'Menu Header 3',  menuItems: [{ item: 'Link 1' }] }
  ];
}
