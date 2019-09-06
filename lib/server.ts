import app from "./app";
import BoardCreator from '../src/board';
import GameCreator from './../src/game'
import Player from "../src/player";

const port = 4040;
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log(new GameCreator(new BoardCreator(3,3), new Player(1,1,1), new Player(2,2,2)))
});