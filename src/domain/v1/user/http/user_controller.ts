import "reflect-metadata";
import {
  controller,
  httpGet,
  httpPost,
  requestParam,
} from "inversify-express-utils";
import { inject } from "inversify";
import { UserUsecase, TYPES } from "../types";
import { User } from "../../../../models/user";
import { v4 as uuidv4 } from "uuid";
import express, { response } from "express";
import { StatusCodes } from "http-status-codes";

@controller("/v1/user")
export class UserController {
  private readonly userUs: UserUsecase;

  constructor(@inject(TYPES.UserUsecase) userUs: UserUsecase) {
    this.userUs = userUs;
    console.log("inject controller");
  }

  @httpGet("/:id")
  public async getById(
    @requestParam("id") id: string,
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    res.status(200).json({
      message: "foo",
    });
  }

  @httpPost("/")
  public async save(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    let { email, firstName, lastName } = req.body;
    let user: User = <User>{
      id: uuidv4(),
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

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
