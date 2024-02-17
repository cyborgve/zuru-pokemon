import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleCasePipe, registerLocaleData } from '@angular/common';
import esVE from '@angular/common/locales/es-VE';
import packajeJson from '../../package.json';

registerLocaleData(esVE, 'es-VE');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng17 template';
  version = `v${packajeJson.version}`;
}
