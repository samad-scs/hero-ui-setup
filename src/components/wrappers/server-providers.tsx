import React from "react";
import ClientProvider from "./client-providers";

const ServerProvider = ({ children }: { children: React.ReactNode }) => {
  return <ClientProvider>{children}</ClientProvider>;
};

export default ServerProvider;
