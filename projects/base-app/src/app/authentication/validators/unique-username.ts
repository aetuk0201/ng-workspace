import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { AuthService, UsernameAvailableResponse } from "../auth.service";

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) {       
    }

    validate = (control: FormControl): Observable<ValidationErrors> => {
        const { value } = control;

        return this.authService.usernameAvailable(value)
            .pipe(
                map((value:UsernameAvailableResponse) => {
                    if (value.available) {
                        return {};
                    }
                    return {};
                }
                ),
                catchError((err) => {
                    console.log(err);
  
                    if (err.error.username) {
                        return of([{ nonUniqueUsername: true }]);
                    } else {
                        return of([{ noConnection: true }]);
                    }
                })
            )
        };

    }
