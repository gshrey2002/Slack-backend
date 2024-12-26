import channel from "../Schema/channel.js";
import crudRepo from "./crudRepo.js";

const channelRepository={
...crudRepo(channel),
 
}

export default channelRepository