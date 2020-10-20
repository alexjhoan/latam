import Console from "./console";
import getConfig from "next/config";
const { NODE_ENV } = getConfig().publicRuntimeConfig;

export const RedirectToHome = () => {
  const url = document.location.protocol +  "//" + document.location.host + document.location.pathname + "?legacy=1";
  
  if (NODE_ENV === "production") {
    document.location.href = url;
  } else {
    Console.error(  "If this were in production, you would have been redirected to: " + url );
  }
};
