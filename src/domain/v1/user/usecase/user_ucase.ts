import { injectable, inject } from "inversify";
import "reflect-metadata";
import { UserRepository, UserUsecase, TYPES } from "../types";
import { User } from "../../../../models/user";

@injectable()
export default class UserLogic implements UserUsecase {
  private userRepo: UserRepository;

  public constructor(@inject(TYPES.UserRepository) userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  public async getById(id: number): Promise<any> {
    return this.userRepo.getById(id);
  }

  public async save(user: User): Promise<Error | undefined> {
    return this.userRepo.save(user);
  }
}
