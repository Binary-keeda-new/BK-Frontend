import 'dotenv/config'
import DescopeClient from "@descope/node-sdk";

const projectId = process.env.DESCOPE_PROJECT_ID;

if (!projectId) {
  throw new Error("Missing DESCOPE_PROJECT_ID in .env");
}

const descopeClient = DescopeClient({
  projectId,
});

export default descopeClient;