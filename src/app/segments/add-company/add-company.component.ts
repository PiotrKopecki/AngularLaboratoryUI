import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    let stringValidation = [Validators.minLength(3), Validators.required,
      Validators.pattern('^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]+$')]
    if(this.data != null){
      this.form = this.fb.group({
        name: new FormControl(this.data.n, stringValidation),
        numberOfTrucks: new FormControl(this.data.num, [Validators.minLength(1), Validators.required])
      })
    }else{
      this.form = this.fb.group({
        name: new FormControl('', stringValidation),
        numberOfTrucks: new FormControl('', [Validators.minLength(1), Validators.required])
      })
    }
  }

  onSubmit(){
    this.dialogRef.close(this.form.value)
  }

  close(){
    this.dialogRef.close('');
  }

}
