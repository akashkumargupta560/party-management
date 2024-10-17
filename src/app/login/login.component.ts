import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = "";
  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login successful', this.loginForm.value);
      const authData = this.loginForm.getRawValue();
      this.authService.login(authData).subscribe(
        {
          next: (resposeData) => {
            console.log("response data :", resposeData);
            if (resposeData) {
              this.router.navigate(['/party-details']);
            }
          },
          error: (errorMessage) => {
            this.errorMessage = errorMessage;
          }
        });
      // Handle login logic here (e.g., call an authentication service)
    } else {
      this.errorMessage = "Provide valid Creds";
      console.log('Form is not valid');
    }
  }

}
