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
import { analytics, settings, list } from 'ionicons/icons';
import Signin from './pages/Signin';
import Events from './pages/Events';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        <Route exact path="/signin">
            <Signin />
          </Route>
          <Route exact path="/events">
            <Events />
          </Route>
          <Route exact path="/analytics">
            <Analytics />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Redirect to="/events" />
          </Route>
        </IonRouterOutlet>
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
  </IonApp>
);

export default App;
