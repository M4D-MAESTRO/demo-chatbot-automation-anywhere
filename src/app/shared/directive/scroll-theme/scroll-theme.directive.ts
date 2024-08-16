import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollTheme]'
})
export class ScrollThemeDirective {

  constructor(el: ElementRef) {
    const stylesheet = `
      ::-webkit-scrollbar {
      width: 10px;
      }
      ::-webkit-scrollbar-track {
      background: #0f0f0f;
      }
      ::-webkit-scrollbar-thumb {
      border-radius: 1rem;
      background: linear-gradient(var(--primary-color), var(--ion-color-dark));
      border: 4px solid #020202;
      }
      ::-webkit-scrollbar-thumb:hover {
      }
    `;
    
    const styleElmt = el.nativeElement.shadowRoot.querySelector('style');

    if (styleElmt) {
      styleElmt.append(stylesheet);
    } else {
      const barStyle = document.createElement('style');
      barStyle.append(stylesheet);
      el.nativeElement.shadowRoot.appendChild(barStyle);
    }

  }

}
