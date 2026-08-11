import { callAppsScript, callAppsScriptSafe } from "./appsScriptService";

export const getLoginLink = () => `${window.location.origin}/login`;

export const sendApprovalEmail = async (
  toEmail: string,
  toName: string,
  loginLink: string,
  tempPassword = "umeed@123",
) => {
  const result = await callAppsScript({
    action: "send",
    toEmail,
    toName,
    loginLink,
    tempPassword,
  });
  return { status: "success", response: result };
};

export interface ApplicationSheetPayload {
  applicationId: string;
  fullName: string;
  email: string;
  phone?: string;
  age?: string | number | null;
  gender?: string | null;
  address?: string;
  occupation?: string | null;
  skills?: string;
  languages?: string;
  availability?: string | null;
  motivation?: string | null;
  status?: string;
}

export const logApplicationToSheet = (data: ApplicationSheetPayload) =>
  callAppsScriptSafe({
    action: "logApplication",
    timestamp: new Date().toISOString(),
    applicationId: data.applicationId,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone || "",
    age: data.age != null ? String(data.age) : "",
    gender: data.gender || "",
    address: data.address || "",
    occupation: data.occupation || "",
    skills: data.skills || "",
    languages: data.languages || "",
    availability: data.availability || "",
    motivation: data.motivation || "",
    status: data.status || "pending",
  });

export const updateApplicationStatusInSheet = (
  applicationId: string,
  status: string,
) =>
  callAppsScriptSafe({
    action: "updateApplication",
    applicationId,
    status,
  });
