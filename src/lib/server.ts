import app from "./app";
import BoardCreator from '../board';
import GameCreator from '../game'
import Player from "../player";

const port = 4040;
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});