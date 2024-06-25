import { FormControl } from '@angular/forms';

export class DateFormControl extends FormControl {
    override setValue(value: string | null, options: any) {
        if (!value) {
            super.setValue('', {...options, emitModelToViewChange: true});
            return;
        }
        super.setValue(value, {...options, emitModelToViewChange: true});
    }
}
