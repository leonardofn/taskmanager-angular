import { FormGroup } from '@angular/forms';

export class FormUtils {
    public constructor(private form: FormGroup){

    }

    public fieldClassForErrorOrSuccess(fieldName: string){
        return{
            // Errors
            "is-invalid": this.showFieldError(fieldName),
            "text-danger": this.showFieldError(fieldName),
            // Success
            "is-valid": this.getField(fieldName).valid,
            "text-success": this.getField(fieldName).valid
        }
    }

    public showFieldError(fieldName: string): boolean{
        let field = this.getField(fieldName);
        return field.invalid && (field.touched || field.dirty);
    }

    public getField(fieldName: string){
        return this.form.get(fieldName);
    }
}