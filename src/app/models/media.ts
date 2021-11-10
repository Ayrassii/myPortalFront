import {SafeResourceUrl} from '@angular/platform-browser';

export class Media {
    id: number;
    type: string;
    path: string | SafeResourceUrl;
    entry_id: number;
}
