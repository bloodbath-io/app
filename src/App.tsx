//
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import CustomerRoute from './guards/CustomerRoute';
import GuestRoute from './guards/GuestRoute';

import { analytics, settings, list } from 'ionicons/icons';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import EventsPage from './pages/EventsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const isAuthenticated = () => {
  if (localStorage.getItem('apiKey') !== null) return true
  return false
}


const App: React.FC = () => {

  const Routes = (
    <IonRouterOutlet>
      <CustomerRoute exact path="/events" unauthorizedTo="/signin">
        <EventsPage />
      </CustomerRoute>
      <CustomerRoute exact path="/analytics" unauthorizedTo="/signin">
        <AnalyticsPage />
      </CustomerRoute>
      <CustomerRoute path="/settings" unauthorizedTo="/signin">
        <SettingsPage />
      </CustomerRoute>
      <Route exact path="/">
        <Redirect to="/signin" />
      </Route>
      <GuestRoute exact path="/signin" unauthorizedTo="/events">
        <SigninPage />
      </GuestRoute>
      <GuestRoute exact path="/signup" unauthorizedTo="/events">
        <SignupPage />
      </GuestRoute>
    </IonRouterOutlet>
  )

  const Footer = (!isAuthenticated() ? null :
    <IonReactRouter>
      <IonTabs>
        {Routes}
        <IonTabBar slot="bottom">
          <IonTabButton tab="events" href="/events">
            <IonIcon icon={list} />
            <IonLabel>Events</IonLabel>
          </IonTabButton>
          <IonTabButton tab="analytics" href="/analytics">
            <IonIcon icon={analytics} />
            <IonLabel>Analytics</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  )

  return (
    <IonApp>
      <IonReactRouter>
        {Routes}
      </IonReactRouter>
      {Footer}
    </IonApp>
  )
}

export default App
