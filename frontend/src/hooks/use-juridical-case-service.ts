import HttpJuridicalCaseService from "@/services/juridical-case-service";
import useHttpClient from "./operator/use-http-client";

export default function useJuridicalCaseService() {
  const httpClient = useHttpClient();
  return HttpJuridicalCaseService.getInstance(httpClient);
}
