import { enableProdMode, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DividerModule } from 'primeng/divider';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { authInterceptorProvider } from './shared/interceptors/auth-interceptor';
import { errorInterceptorProvider } from './shared/interceptors/error-interceptor';
import { PipeModule } from './shared/pipes/pipe.module';
import { DirectivesModule } from './shared/directive/directives.module';
import { loadingInterceptorProvider } from './shared/interceptors/loading-interceptor';

registerLocaleData(localeBr, 'pt-BR');

enableProdMode();


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}



@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        HttpClientModule,
        ToastModule,
        FormsModule,
        DynamicDialogModule,
        BlockUIModule,
        ButtonModule,
        RippleModule,
        DividerModule,
        RadioButtonModule,
        InputSwitchModule,
        ButtonModule,
        SidebarModule,
        PipeModule,
        ProgressBarModule,
        FontAwesomeModule,
        ProgressSpinnerModule,
        DirectivesModule,
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        MessageService,
        ConfirmationService,
        DialogService,
        loadingInterceptorProvider,
        authInterceptorProvider,
        errorInterceptorProvider,
        {
            provide: LOCALE_ID,
            useValue: 'pt-BR'
        },
    ],
    bootstrap: [AppComponent],
    exports: [ToastModule, PipeModule, ProgressBarModule]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
        library.addIconPacks(far);
        library.addIconPacks(fab);
    }
}

defineCustomElements(window);
