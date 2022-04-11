import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-radio',
  templateUrl: './custom-radio.component.html',
  styleUrls: ['./custom-radio.component.css']
})
export class CustomRadioComponent implements OnInit {
  @Input() textosOpt: string[];
  @Input() titulo: string;
  @Input() naoSeAplica: boolean;
  @Input() radioForm: FormControl;
  public textos = [
    "Discordo Completamente",
    "Discordo",
    "Neutro",
    "Concordo",
    "Concordo Completamente"
  ]

  constructor() { }

  ngOnInit(): void {
    if(this.textosOpt) this.textos = this.textosOpt;
  }

}
