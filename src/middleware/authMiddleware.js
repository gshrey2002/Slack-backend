import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { customErrorResponse, internalErrorResponse } from "../common/customResponse.js";
import { JWT_SECRET } from "../Config/serverConfig.js";
import userRepository from "../Repositories/userRepo.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: "Invalid data sent from client",
          message: "Token not found",
        })
      );
    }

    // Verify the token
    const verifyToken = jwt.verify(token, JWT_SECRET);
    if (!verifyToken) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: "Invalid data sent from client",
          message: "Invalid token found",
        })
      );
    }

    // Find user and attach to request object
    const user = await userRepository.getById(verifyToken.id);
    req.user = user.id;
    next();
  } catch (error) {
    console.log("Auth middleware error:", error);

    // Handle expired token error
    if (error.name === "TokenExpiredError") {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: "Token has expired",
          message: "Expired token",
        })
      );
    }

    // Handle invalid token error
    if (error.name === "JsonWebTokenError") {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: "Invalid data sent from client",
          message: "Invalid token",
        })
      );
    }

    // Handle all other errors
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
  }
};
