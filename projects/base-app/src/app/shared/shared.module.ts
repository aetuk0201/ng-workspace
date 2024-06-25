import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { EventBlockerDirective } from './directives/event-blocker.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SharedRoutingModule } from './shared-routing.module';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ErrorIndicatorDirective } from './directives/error-indicator.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({ declarations: [
        ModalComponent,
        InputComponent,
        AlertComponent,
        AlertModalComponent,
        EventBlockerDirective,
        FileUploadComponent,
        ErrorIndicatorDirective,
        SafeHtmlPipe,
        PaginationComponent
    ],
    exports: [
        ModalComponent,
        InputComponent,
        AlertComponent,
        AlertModalComponent,
        FileUploadComponent,
        EventBlockerDirective,
        ErrorIndicatorDirective,
        SafeHtmlPipe,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PaginationComponent
    ],
    imports:
        [CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedRoutingModule
        ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class SharedModule { }
