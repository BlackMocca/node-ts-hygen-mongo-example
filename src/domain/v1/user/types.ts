import { User } from "../../../models/user";
import express from "express";

export interface UserRepository {
  getById(id: number): Promise<any>;
  save(user: User): Promise<Error | undefined>;
}

export interface UserUsecase {
  getById(id: number): Promise<any>;
  save(user: User): Promise<Error | undefined>;
}

export interface UserHTTPHandler {
  getById(req: express.Request, res: express.Response): Promise<void>;
  save(req: express.Request, res: express.Response): Promise<void>;
}

export const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  UserUsecase: Symbol.for("UserUsecase"),
  UserHTTPHandler: Symbol.for("UserHTTPHandler"),
};
