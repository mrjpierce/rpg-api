import "reflect-metadata";
import { Container } from "inversify";
import { HTTPEvent, IContainer, IContainerFactory } from "@ifit/fleece";
import { TYPES } from "./types";
import { GameDAO, IGameDAO } from "./dao/game-dao";
import { IUnitDAO, UnitDAO } from "./dao/unit-dao";
import { IGameModel, getGameModel } from "./models/game-model";
import { IUnitModel, getUnitModel } from "./models/unit-model";

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

    // DAOs
    container.bind<IGameDAO>(TYPES.IGameDAO).to(GameDAO);
    container.bind<IUnitDAO>(TYPES.IUnitDAO).to(UnitDAO);

    // Models
    container.bind<IGameModel>(TYPES.IGameModel).toConstantValue(getGameModel());
    container.bind<IUnitModel>(TYPES.IUnitModel).toConstantValue(getUnitModel());

    return container;
  }
}
