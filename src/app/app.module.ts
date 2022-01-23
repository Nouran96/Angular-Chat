import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storageSyncMetaReducer } from 'ngrx-store-persist';

import { AppRoutingModule } from './app-routing.module';
import { reducers } from './store/reducers';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/Chat/chat.component';
import { environment } from 'src/environments/environment';
import { AuthFormComponent } from './components/AuthForm/auth-form.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from './modules/material-ui/material-ui.module';
import { InputFieldComponent } from './components/controls/input-field/input-field.component';
import { ButtonComponent } from './components/controls/button/button.component';
import { SnackbarComponent } from './components/controls/snackbar/snackbar.component';
import { SpinnerComponent } from './components/controls/spinner/spinner.component';
import { ChatUserComponent } from './components/ChatUser/chat-user.component';
import { ChatMessageComponent } from './components/ChatMessage/chat-message.component';
import { MainLayoutComponent } from './components/MainLayout/main-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { BannerComponent } from './components/Banner/banner.component';
import { AllRestaurantsComponent } from './components/AllRestaurants/all-restaurants.component';
import { StylePaginatorDirective } from './directives/style-paginator.directive';
import { RestaurantComponent } from './views/restaurant/restaurant.component';
import { RestaurantDetailsComponent } from './components/RestaurantDetails/restaurant-details.component';
import { SafePipe } from './pipes/safe.pipe';
import { RestaurantCardComponent } from './components/RestaurantCard/restaurant-card.component';
import { MenuComponent } from './components/Menu/menu.component';
import { CartCounterComponent } from './components/CartCounter/cart-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    AuthFormComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    InputFieldComponent,
    ButtonComponent,
    SnackbarComponent,
    SpinnerComponent,
    ChatUserComponent,
    ChatMessageComponent,
    MainLayoutComponent,
    BannerComponent,
    AllRestaurantsComponent,
    StylePaginatorDirective,
    RestaurantComponent,
    RestaurantDetailsComponent,
    SafePipe,
    RestaurantCardComponent,
    MenuComponent,
    CartCounterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialUiModule,
    StoreModule.forRoot(reducers, { metaReducers: [storageSyncMetaReducer] }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
