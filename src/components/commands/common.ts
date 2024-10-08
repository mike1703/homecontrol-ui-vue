export interface HomeControlCommandResult {
  Result: Result;
}

export interface Result {
  timestamp: number;
  appliance_message: ApplianceMessage;
}

export interface ApplianceMessage {
  Command: Command;
}

export interface Command {
  id: number;
  command_result: CommandResult;
}

export interface CommandResult {
  Meter: Meter;
}

export interface Meter {
  MeterSet: MeterSet;
  MeterGet: MeterGet;
}

export interface MeterSet {
  name: string;
  value: number;
  old_value: number;
}

export interface MeterGet {
  name: string;
  value: number;
}
