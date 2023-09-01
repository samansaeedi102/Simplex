import { NextFunction, Request, Response } from "express";
import { GetUsersInp } from "../../database/repository/userRepo/getUsersRepo";
import { getUsersService } from "../../services/user/getUsersService";
export const getUsersApi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const inputs: GetUsersInp = {
      city: req.query.city
        ? JSON.parse((req.query.city as string).toLowerCase())
        : undefined,
      province: req.query.province
        ? JSON.parse((req.query.province as string).toLowerCase())
        : undefined,
      gender: req.query.gender
        ? (req.query.gender as string)
        : undefined,
      filterProvince: req.query.filterProvince
        ? (req.query.filterProvince as string)
        : undefined,
      filterType: req.query.filterType
        ? (req.query.filterType as string)
        : undefined,
      filterCity: req.query.filterCity
        ? (req.query.filterCity as string)
        : undefined,
      filterName: req.query.filterName
        ? (req.query.filterName as string)
        : undefined,
      filterNumber: req.query.filterNumber
        ? (req.query.filterNumber as string)
        : undefined,
    //   page: req.query.page
    //     ? Number(req.query.page as string)
    //     : undefined,
    //   take: req.query.take
    //     ? Number(req.query.take as string)
    //     : undefined,
    };

    const { data } = await getUsersService({
      inputs,
    });

    return res.json(data);
  } catch (err) {
    return next(err);
  }
};