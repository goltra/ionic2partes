import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/about/about.html',
  selector: 'about-page'
})
export class AboutPage {
  constructor(private navCtrl: NavController) {
  }
}
