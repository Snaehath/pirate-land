import Para, { Environment } from "@getpara/react-sdk";

const paraClient = new Para(Environment.BETA, import.meta.env.VITE_PARA_API_KEY);

export default paraClient;