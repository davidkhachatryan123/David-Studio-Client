import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntroContentService {
  constructor(private translocoService: TranslocoService) { }
  
  getData(url: string): [Observable<string>, Observable<string>] {
    let translationPath: string = 'template';

    let pathParts: string[] = url.split('/');
    pathParts.shift();

    if(url === '/') pathParts = ['home'];
    pathParts.forEach(element => {
      translationPath = translationPath.concat('.', element);
    });

    return [
      this.getTranslation(translationPath + '.title'),
      this.getTranslation(translationPath + '.subtitle')
    ];
  }

  private getTranslation(path: string) {
    return this.translocoService.selectTranslate(path);
  }
}