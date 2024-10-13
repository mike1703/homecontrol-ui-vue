export interface HomeControlCommandResult<CommandTypeResult> {
  Result: Result<CommandTypeResult>;
}

export interface Result<CommandTypeResult> {
  timestamp: number;
  appliance_message: ApplianceMessage<CommandTypeResult>;
}

export interface ApplianceMessage<CommandTypeResult> {
  Command: Command<CommandTypeResult>;
}

export interface Command<CommandTypeResult> {
  id: number;
  command_result: CommandTypeResult;
}
