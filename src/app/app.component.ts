import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { userNameValidator } from './shared/username.validator';
import { passwordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reactive-forms';
  registrationForm : FormGroup;
  constructor(private fb: FormBuilder,private registrationService : RegistrationService) {
    this.registrationForm = this.fb.group({
      userName : ['', [Validators.required, Validators.minLength(3), userNameValidator(/admin/)]],
      password : [''],
      cnfPassword : [''],
      email : [''],
      subscribe : [false],
      address : this.fb.group({
        state : [''],
        city : ['']
      }),
      alternateEmails : this.fb.array([])
    },{validator: passwordValidator});

    this.registrationForm.get('subscribe')?.valueChanges.subscribe(
      checkedValue => {
        const email = this.registrationForm.get('email');
        if(checkedValue) {
          email?.setValidators([Validators.required, Validators.email]);
        }
        else{
          email?.clearValidators();
        }
        email?.updateValueAndValidity();
      });
  }
  get userName() {
    return this.registrationForm.get('userName');
  }
  get userEmail() {
    return this.registrationForm.get('email');
  }
  get userAlternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }
  addAlternateEmail() {
    this.userAlternateEmails.push(this.fb.control(''));
  }
  onSubmit(){
   this.registrationService.registerUser(this.registrationForm.value)
   .subscribe(
    response => console.log("Success",response),
    error => console.log("Error",error)
   );
  }

  // registrationForm =  new FormGroup({
  //   userName : new FormControl('Mujtaba'),
  //   address : new FormGroup({
  //     state : new FormControl(''),
  //     city : new FormControl(''),
  //   }),
  //   password : new FormControl(''),
  //   cnfPassword: new FormControl(''),
  // })
  loadData() {
    this.registrationForm.setValue({
      userName : 'Mujtaba',
      password : '123',
      cnfPassword : '123',
      email: 'abc@gmail.com',
      subscribe : true,
      alternateEmails : ['def@gmail.com'],
      address : {
        state : 'Maharashtra',
        city : 'Thane'
      }
    })
  }
  loadPatchData() {
    this.registrationForm.patchValue({
      userName : 'Mujtaba',
      password : '123',
      cnfPassword : '123'
    })
  }
}
