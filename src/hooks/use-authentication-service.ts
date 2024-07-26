import { AxiosInstance } from "axios";
import useHttpClient from "./operator/use-http-client";

interface AttendantResponse {
  id: number;
  name: string;
  email: string;
  dni: string;
  enabled: boolean;
}

export class Attendant {
  id: number;
  name: string;
  email: string;
  dni: string;
  enabled: boolean;

  constructor(
    id: number,
    name: string,
    email: string,
    dni: string,
    enabled: boolean
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.dni = dni;
    this.enabled = enabled;
  }
}

class HttpAuthenticationService {
  private static instance: HttpAuthenticationService;
  public moduleIp: string;
  private httpClient: AxiosInstance;

  private constructor(httpClient: AxiosInstance, moduleIp: string) {
    this.httpClient = httpClient;
    this.moduleIp = moduleIp;
  }

  public static getInstance(
    httpClient: AxiosInstance,
    moduleIp: string
  ): HttpAuthenticationService {
    if (!HttpAuthenticationService.instance) {
      HttpAuthenticationService.instance = new HttpAuthenticationService(
        httpClient,
        moduleIp
      );
    }

    HttpAuthenticationService.instance.moduleIp = moduleIp;
    return HttpAuthenticationService.instance;
  }

  public async login(email: string, password: string): Promise<string> {
    const res = await this.httpClient.post<{
      token: string;
    }>(
      "/attendants/login",
      { email, password },
      {
        headers: {
          "X-Module-Ip": this.moduleIp,
        },
      }
    );
    return res.data.token;
  }

  public async logout(token: string): Promise<void> {
    await this.httpClient.post(
      "/attendants/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Module-Ip": this.moduleIp,
        },
      }
    );
  }

  public async profile(token: string): Promise<Attendant> {
    const res = await this.httpClient.get<{
      data: AttendantResponse;
    }>("/attendants/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Module-Ip": this.moduleIp,
      },
    });

    return new Attendant(
      res.data.data.id,
      res.data.data.name,
      res.data.data.email,
      res.data.data.dni,
      res.data.data.enabled
    );
  }

  public async refreshToken(token: string): Promise<string> {
    const res = await this.httpClient.post<{
      token: string;
    }>("/attendants/refresh", null, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Module-Ip": this.moduleIp,
      },
    });

    return res.data.token;
  }
}

export default function useAuthenticationService(moduleIp: string | undefined) {
  const httpClient = useHttpClient();
  return HttpAuthenticationService.getInstance(
    httpClient,
    moduleIp ?? "0.0.0.0"
  );
}
