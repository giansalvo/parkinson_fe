import { BrowserRouter, Switch } from "react-router-dom";
import { useHistory, Route } from 'react-router'
import HomePage from "../pages/HomePage";
import Prediction from "../pages/Prediction";
import SignIn from "../pages/SignIn"
import Contact from "../pages/Contact"
import About from "../pages/About"
import Credits from "../pages/Credits"
import NoPage from "../pages/NoPage"
import AddAnnotation from "../pages/AddAnnotation"
import Dashboard from "../pages/Dashboard"
import Prediction2 from "../pages/Prediction2";
import ExportData from "../pages/ExportData";

const Router = () => {

    const history = useHistory()

    console.log("Router")

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/prediction2/" component={Prediction2} />
                <Route exact path="/prediction/" component={Prediction} />
                <Route exact path="/HomePage/" component={HomePage} />
                <Route exact path="/SignIn/" component={SignIn} />
                <Route exact path="/About/" component={About} />
                <Route exact path="/Contact/" component={Contact} />
                <Route exact path="/Credits/" component={Credits} />
                <Route exact path="/AddAnnotation/" component={AddAnnotation} />
                <Route exact path="/Dashboard/" component={Dashboard} />
                <Route exact path="/ExportData/" component={ExportData} />
                <Route exact path="/" component={HomePage} />
                
                <Route path="*" component={NoPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;