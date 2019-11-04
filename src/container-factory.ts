import { HTTPEvent, IContainer, IContainerFactory } from "@ifit/fleece";
import { Container } from "inversify";
// import Player, { PlayerBuildFuncType } from "./player";
// import Board, { IBoard } from "./board";
import { TYPES } from "./types";
import { GameDAO, IGameDAO } from "./dao/game-dao";

type ServiceEvent = HTTPEvent;

export class ContainerFactory implements IContainerFactory<ServiceEvent> {
  private sharedContainer: Container;

  constructor() {
    this.sharedContainer = this.initializeSharedContainer();
  }

  public async initializeContainer(event: any): Promise<IContainer> {
    const eventContainer = this.sharedContainer.createChild();

    // event-specific container bindings here
    // pretty much like more life cycle methods
    
    return eventContainer;
  }

  private initializeSharedContainer() {
    const container = new Container({
      autoBindInjectable: true,
      skipBaseClassChecks: true
    });

  container.bind<IGameDAO>(TYPES.IGameDAO).to(GameDAO);

    /*
    const board = new Board(3);
    container.bind<IBoard>(TYPES.IBoard).toConstantValue(board);
    container.bind<PlayerBuildFuncType>(TYPES.IPlayerBuilder)
      .toConstantValue((id: number, xPos: number, yPos: number, board: IBoard) => 
        Player.Build(id, xPos, yPos, board)
      );
    */

    return container;
  }
}