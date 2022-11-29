import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, firstValueFrom } from 'rxjs';

@Pipe({
  name: 'intro'
})
export class IntroPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}
  
  async transform(value: any, propertyName: string) {
    let translationPath: string = 'template';

    value = value.split('#')[0].split('?')[0];

    let pathParts: string[] = value.split('/');
    pathParts.shift();

    if(value === '/') pathParts = ['home'];
    pathParts.forEach(element => {
      translationPath = translationPath.concat('.', element);
    });

    return await firstValueFrom(this.getTranslation(translationPath + '.' + propertyName));
  }

  private getTranslation(path: string) {
    return this.translocoService.selectTranslate(path);
  }
}