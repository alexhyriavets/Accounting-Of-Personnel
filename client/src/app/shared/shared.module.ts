import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule,
         MatCardModule,
         MatDialogModule,
         MatFormFieldModule,
         MatInputModule,
         MatRadioModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatIconModule,
         MatTableModule,
         MatProgressSpinnerModule,
         MatSelectModule,
         MatCheckboxModule,
         MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatCheckboxModule,
        MatToolbarModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatCheckboxModule,
        MatToolbarModule
    ]
})
export class SharedModule { }
