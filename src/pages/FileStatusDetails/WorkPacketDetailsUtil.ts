import { WorkPacketCommandType, WorkPacketStatusDetails } from 'src/data/services/graphql';

/**
 * Check if the given Work Packet Status Details has the given command and return it if found
 * @param workPacket Work Packet Status Details
 * @param command Command Type
 */
export const getCommand = (workPacket?: WorkPacketStatusDetails, command?: WorkPacketCommandType) => {
  if (!workPacket || !command) {
    return null;
  }

  return workPacket?.commands?.find((cmd) => cmd?.commandType == command);
};
