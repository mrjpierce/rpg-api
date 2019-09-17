import { Container } from '../node_modules/inversify';
import Board from './board';
import Player from './player';

const DIContainer = new Container();
DIContainer.bind<Board>(Board).toSelf();
DIContainer.bind<Player>(Player).toSelf();

export default DIContainer;