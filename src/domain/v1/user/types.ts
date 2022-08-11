import { User } from "../../../models/user";

export interface UserRepository {
  getById(id: number): Promise<any>;
  save(user: User): Promise<Error | undefined>;
}

export interface UserUsecase {
  getById(id: number): Promise<any>;
  save(user: User): Promise<Error | undefined>;
}

export const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  UserUsecase: Symbol.for("UserUsecase"),
  UserController: Symbol.for("UserController"),
};
