import { StatusCodes } from "http-status-codes";

import UserModel from "../Schema/userSchema.js";
import WorkSpaceModel from "../Schema/workSpace.js";
import clientError from "../Utils/Errors/clientError.js";
import channelRepository from "./channelRepo.js";
import crudRepo from "./crudRepo.js";

const workSpaceRepository = {
  ...crudRepo(WorkSpaceModel),

  getWorkSpaceByName: async function (name) {
    const workspace = await WorkSpaceModel.findOne({ name });
    if (!workspace) {
      throw new clientError({
        explanation: "Invalid data sent from client",
        message: "Workspace not found with this name",
        statusCode: StatusCodes.NOT_FOUND,
        error: ["Workspace not found"],
      });
    }
    return workspace;
  },

  getWorkSpaceByJoinCode: async function (joinCode) {
    const workspace = await WorkSpaceModel.findOne({ joinCode });
    if (!workspace) {
      throw new clientError({
        explanation: "Invalid data sent from client",
        message: "Workspace not found with this JOIN CODE",
        statusCode: StatusCodes.NOT_FOUND,
        error: ["Workspace not found"],
      });
    }
    return workspace;
  },

  addMemberToWorkSpace: async function (workSpaceId, memberId, role) {
    const workspace = await WorkSpaceModel.findById(workSpaceId);
    if (!workspace) {
      throw new clientError({
        explanation: "Invalid data sent from client",
        message: "Workspace not found",
        statusCode: StatusCodes.NOT_FOUND,
        error: ["Workspace not found"],
      });
    }

    const member = await UserModel.findById(memberId);
    if (!member) {
      throw new clientError({
        explanation: "Invalid data sent from client",
        message: "Member not found",
        statusCode: StatusCodes.NOT_FOUND,
        error: ["Member not found"],
      });
    }

    // Ensure members array exists
    if (!Array.isArray(workspace.members)) {
      workspace.members = [];
    }

    const userAlreadyExists = workspace.members.find(
      (member) => member.memberId.toString() === memberId.toString()
    );

    if (userAlreadyExists) {
      throw new clientError({
        explanation: "Invalid data sent from client",
        message: "Member already exists",
        statusCode: StatusCodes.FORBIDDEN,
        error: ["Member already exists"],
      });
    }

    workspace.members.push({ memberId, role });
    await workspace.save();
    return workspace;
  },

  fetchAllWorkspacesByMemberId: async function (memberId) {
    const member = await UserModel.findById(memberId);
    if (!member) {
      throw new clientError({
        explanation: "Invalid data sent from client",
        message: "Member not found",
        statusCode: StatusCodes.NOT_FOUND,
        error: ["Member not found"],
      });
    }

    const workspaces = await WorkSpaceModel.find({
      "members.memberId": memberId,
    }).populate("members.memberId", "username avatar email");

    return workspaces;
  },

  addChannelToWorkSpace: async function (workSpaceId, channelName) {
    const workspace = await WorkSpaceModel.findById(workSpaceId).populate(
      "channels"
    );
    if (!workspace) {
      throw new clientError({
        explanation: "Invalid data sent from client",
        message: "Workspace not found",
        statusCode: StatusCodes.NOT_FOUND,
        error: ["Workspace not found"],
      });
    }

    // Ensure channels array exists
    if (!Array.isArray(workspace.channels)) {
      workspace.channels = [];
    }

    const isChannelExist = workspace.channels.find(
      (channel) => channel.name === channelName
    );

    if (isChannelExist) {
      throw new clientError({
        explanation: "Invalid data sent from client",
        message: "Channel already exists",
        statusCode: StatusCodes.FORBIDDEN,
        error: ["Channel already exists"],
      });
    }

    const channel = await channelRepository.create({ name: channelName });
    workspace.channels.push(channel);
    await workspace.save();
    return workspace;
  },
};

export default workSpaceRepository;
