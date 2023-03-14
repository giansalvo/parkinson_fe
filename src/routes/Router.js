import { BrowserRouter, Switch } from "react-router-dom";
import { useHistory, Route } from 'react-router'
import HomePage from "../pages/HomePage";
import Prediction from "../pages/Prediction";
import SignIn from "../pages/SignIn"
import Contact from "../pages/Contact"
import About from "../pages/About"
import Credits from "../pages/Credits"
import NoPage from "../pages/NoPage"

const Router = () => {

    const history = useHistory()

    console.log("Router")

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/prediction/" component={Prediction} />
                <Route exact path="/HomePage/" component={HomePage} />
                <Route exact path="/SignIn/" component={SignIn} />
                <Route exact path="/About/" component={About} />
                <Route exact path="/Contact/" component={Contact} />
                <Route exact path="/Credits/" component={Credits} />
                <Route path="*" component={NoPage} />
                {/* <Route path="*" element={<NoPage />} /> */}

                {/* <PublicRoute path='/login/:type' component={LoginPage} />
                <PublicRoute path='/register/:type' component={RegisterPage} />
                <PublicRoute path='/reset/:type' component={ResetPage} />
                <PublicRoute path='/reset-confirm/:type/:uid/:token' component={ResetConfirmPage} />

                <PrivateRoute path='/app/dashboard' component={DashboardPage} />
                <PrivateRoute path='/app/account' component={AccountPage} />

                <PublicRoute path='*' component={NotFoundView} /> */}

            </Switch>
        </BrowserRouter>
    );
};

export default Router;