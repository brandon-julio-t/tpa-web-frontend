import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-register-phase-two',
  templateUrl: './register-phase-two.component.html',
  styleUrls: ['./register-phase-two.component.scss'],
})
export class RegisterPhaseTwoComponent implements OnInit {
  @Output() done = new EventEmitter<{
    accountName: string;
    password: string;
  }>();

  registerPhaseTwoForm: FormGroup;

  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.registerPhaseTwoForm = fb.group({
      accountName: fb.control('', Validators.required),
      password: fb.control('', Validators.required),
      confirmPassword: fb.control('', Validators.required),
      otp: fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const {
      accountName,
      password,
      confirmPassword,
      otp,
    } = this.registerPhaseTwoForm.value;

    this.registerPhaseTwoForm.markAllAsTouched();
    if (this.registerPhaseTwoForm.invalid || password !== confirmPassword) {
      return;
    }

    this.apollo
      .mutate<{ verifyOTP: boolean }>({
        mutation: gql`
          mutation verifyOTP($otp: String!) {
            verifyOTP(otp: $otp)
          }
        `,
        variables: { otp },
      })
      .subscribe((data) => {
        if (data.data?.verifyOTP) {
          this.done.emit({ accountName, password });
        }
      });
  }
}
