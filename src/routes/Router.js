import { BrowserRouter, Switch } from "react-router-dom";
import { useHistory, Route } from 'react-router'
import Prediction from "../pages/Prediction";



const Router = () => {

    const history = useHistory()

    console.log("Router")

    return (
        <BrowserRouter>
            <Switch>

                {/* <PublicRoute exact path="/" component={HomePage} /> */}
                <Route path="/" component={Prediction} />

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