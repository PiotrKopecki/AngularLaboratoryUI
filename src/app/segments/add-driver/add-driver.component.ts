import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDriverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    let stringValidation = [Validators.minLength(3), Validators.required,
      Validators.pattern('^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]+$')]
    if(this.data != null){
      this.form = this.fb.group({
        name: new FormControl(this.data.n, stringValidation),
        age: new FormControl(this.data.num, [Validators.minLength(1), Validators.required]),
        companyName: new FormControl(this.data.com, stringValidation)
      })
    }else{
      this.form = this.fb.group({
        name: new FormControl('', stringValidation),
        age: new FormControl('', [Validators.minLength(1), Validators.required]),
        companyName: new FormControl('', stringValidation),
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
