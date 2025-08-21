const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

if (!backendBaseUrl) {
  throw new Error("NEXT_PUBLIC_BACKEND_BASE_URL NOT SET IN .env");
}

export { backendBaseUrl };
