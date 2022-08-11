import { injectable, inject } from "inversify";
import "reflect-metadata";
import { UserUsecase, TYPES } from "../types";
import { User } from "../../../../models/user";
import { v4 as uuidv4 } from "uuid";
import express, { response } from "express";
import { StatusCodes } from "http-status-codes";

@injectable()
export default class UserController {
  private readonly userUs: UserUsecase;

  public constructor(@inject(TYPES.UserUsecase) userUs: UserUsecase) {
    this.userUs = userUs;
  }

  public g() {
    console.log(`is undefined? ${this.userUs}`);
  }

  public async getById(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    console.log(this.userUs);
    res.status(200).json({
      message: "foo",
    });
  }

  public async save(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    let { email, firstName, lastName } = req.body;
    let user: User = <User>{
      email: email,
      firstName: firstName,
      lastName: lastName,
    };
    user.id = uuidv4();
    console.log(this);

    let err = await this.userUs.save(user);
    if (err != undefined) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }

    res.status(StatusCodes.OK).json({
      message: "foo",
      user: user,
    });
  }
}
