import { AxiosInstance } from "axios";

export class BaseService {
  protected http: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.http = httpClient;
  }
}
