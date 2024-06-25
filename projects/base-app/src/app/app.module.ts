import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AppRoutingModule } from './app-routing.module';
import { CollectionsModule } from './collections/collections.module';
import { ElementsModule } from './elements/elements.module';
import { AuthModule } from './authentication/auth.module';
import { SharedModule } from "./shared/shared.module";
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { TestComponent } from './test/test.component';
import { AlbumsHomeComponent } from './albums/albums-home/albums-home.component';
import { AlbumsModule } from './albums/albums.module';
import { ChatComponent } from './chat/chat.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        HeaderComponent,
        SidebarComponent,
        TestComponent,
        AlbumsHomeComponent,
        ChatComponent],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CollectionsModule,
        ElementsModule,
        AuthModule,
        AlbumsModule,
        SharedModule
    ]
})
export class AppModule { }
