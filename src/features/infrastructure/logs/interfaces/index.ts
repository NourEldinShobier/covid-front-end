/// models

export interface LogEntry {
  date: string;
  location: Location;
  temperature: string;
  symptoms: string;
}

export interface Location {
  long: number;
  lat: number;
}

/// value-objects

export interface LogEntryValue extends LogEntry {}
