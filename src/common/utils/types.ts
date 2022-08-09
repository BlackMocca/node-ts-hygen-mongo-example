export interface ApdaterConnection {
  getClient(): any;
  connect(): Promise<void>;
  close(): Promise<void>;
}
