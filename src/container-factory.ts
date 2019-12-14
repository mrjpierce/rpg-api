import "reflect-metadata";
import { Container } from "inversify";
import { HTTPEvent, IContainer, IContainerFactory } from "@ifit/fleece";
import { TYPES } from "./types";
import { GameDAO, IGameDAO } from "./dao/game-dao";
import { IPlayerDAO, PlayerDAO } from "./dao/player-dao";

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
    container.bind<IPlayerDAO>(TYPES.IPlayerDAO).to(PlayerDAO);

    return container;
  }
}
