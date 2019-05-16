import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({ name: 'timing' })
export class TimingPipe implements PipeTransform {
    transform($time: number): any {
        return moment($time).format('YYYY-MM-DD HH:mm:ss');
    }
}
