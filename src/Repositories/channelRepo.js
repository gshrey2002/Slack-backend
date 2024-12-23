import channel from "../Schema/channel.js";
// import user from "../Schema/userSchema.js";
// import user from "../Schema/userSchema.js";
import crudRepo from "./crudRepo.js";

const channelRepository={
...crudRepo(channel),
 
}

export default channelRepository