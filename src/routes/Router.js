import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from 'react-router'
import HomePage from "../pages/HomePage";
import Prediction from "../pages/Prediction";
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp";
import Contact from "../pages/Contact"
import About from "../pages/About"
import Credits from "../pages/Credits"
import NoPage from "../pages/NoPage"
import AddAnnotation from "../pages/AddAnnotation"
import Dashboard from "../pages/Dashboard"
import Prediction2 from "../pages/Prediction2";
import ExportData from "../pages/ExportData";
import EditableTable from "../pages/EditableTable";
import SignOut from "../pages/SignOut";

const Router = () => {

    console.log("Router")

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/SignOut" component={SignOut} />
                <Route exact path="/prediction2/" component={Prediction2} />
                <Route exact path="/prediction/" component={Prediction} />
                <Route exact path="/HomePage/" component={HomePage} />
                <Route exact path="/SignIn/" component={SignIn} />
                <Route exact path="/SignUp/" component={SignUp} />
                <Route exact path="/About/" component={About} />
                <Route exact path="/Contact/" component={Contact} />
                <Route exact path="/Credits/" component={Credits} />
                <Route exact path="/AddAnnotation/" component={AddAnnotation} />
                <Route exact path="/Dashboard/" component={EditableTable} />
                <Route exact path="/DashboardOld/" component={Dashboard} />
                <Route exact path="/ExportData/" component={ExportData} />
                <Route exact path="/" component={HomePage} />
                
                <Route path="*" component={NoPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;