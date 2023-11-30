import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent {

  public publishers =[
    {
      id:'DC Comics', desc: 'DC - comics'
    },
    {
      id:'Marvel Comics', desc: 'Marvel - comics'
    }
  ]
}
