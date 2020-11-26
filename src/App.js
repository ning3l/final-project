import { Route, Switch } from "react-router-dom";
const { default: PlantCatalog } = require("./components/PlantCatalog");
const { default: PlantDetail } = require("./components/PlantDetail");
const { default: PlantRepo } = require("./components/PlantRepo");

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <PlantCatalog {...props} />} />
      <Route path="/my-plants" render={(props) => <PlantRepo {...props} />} />
      <Route path="/:plantId" render={(props) => <PlantDetail {...props} />} />
    </Switch>
  );
}

export default App;
