import { FormControl } from '@angular/forms';

export function requiredFileType( types: string[] ) {
    return function ( control: FormControl ) {
        const file = control.value;
        if ( file ) {
            const pieces = file.name.split(/[\s.]+/);
            const extension = pieces[pieces.length - 1].toLowerCase();
            for (let i = 0 ; i < types.length; i++) {
                if ( types[i].toLowerCase() === extension.toLowerCase() ) {
                    return null;
                }
            }
            return {
                requiredFileType: true
            };
        }

        return null;
    };
}
