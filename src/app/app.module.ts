import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { CommunicationState } from './school/state/comm.state';
import { loadRemoteModule } from './utils/federation-utils';

export function initializeApp(): () => void {
  return () => {
    loadRemoteModule({
      remoteEntry: 'http://localhost:3002/remoteEntry.js',
      remoteName: 'list_user',
      exposedModule: './ListUserReactComponent',
    });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([CommunicationState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
