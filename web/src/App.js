import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import ProfilePage from './profile/pages/ProfilePage';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import NewHeader from './profile/header/pages/NewHeader';
import UpdateHeader from './profile/header/pages/UpdateHeader';
import NewExperience from './profile/experiences/pages/NewExperience';
import UpdateExperience from './profile/experiences/pages/UpdateExperience';
import NewEducation from './profile/education/pages/NewEducation';
import UpdateEducation from './profile/education/pages/UpdateEducation';
import NewOther from './profile/others/pages/NewOther';
import UpdateOther from './profile/others/pages/UpdateOther';

const App = () => {
  const { token, login, logout, userId, isAdmin } = useAuth();


  let routes;
  if (token && isAdmin) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/profile" exact>
          <ProfilePage userId={userId}/>
        </Route>
        <Route path="/header/:headerId">
          <UpdateHeader />
        </Route>
        <Redirect to="/">
          <Users />
        </Redirect>
      </Switch>
    );
  }

  else if (token && !isAdmin) {
    routes = (
      <Switch>
        <Route path="/:userId/profile" exact>
          <ProfilePage userId={userId}/>
        </Route>
        {/* HEADERS */}
        <Route path="/header/new" exact>
          <NewHeader />
        </Route>
        <Route path="/header/:headerId">
          <UpdateHeader />
        </Route>
        {/* EXPERIENCES */}
        <Route path="/experiences/new" exact>
          <NewExperience />
        </Route>
        <Route path="/experience/:experienceId">
          <UpdateExperience />
        </Route>
        {/* EDUCATION */}
        <Route path="/education/new" exact>
          <NewEducation />
        </Route>
        <Route path="/education/:educationId">
          <UpdateEducation />
        </Route>
        {/* OTHERS */}
        <Route path="/others/new" exact>
          <NewOther />
        </Route>
        <Route path="/other/:otherId">
          <UpdateOther />
        </Route>
      </Switch>
    );
  } 
  
  else {
    routes = (
      <Switch>
        <Route path="/:userId/page" exact>
          <ProfilePage />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        isAdmin: isAdmin,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation userId={userId} />
        <main style={{display:'flex', flexDirection:'column'}}>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
