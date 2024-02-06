"use client";

import { ReactElement, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

type Childrentype = {
  children: ReactElement | ReactElement[];
};

const ThemeProviders = ({ children }: Childrentype) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
    >
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviders;

//  INSTALL NEXT THEMES AND PROCEED TO HANDLE APP LIGHT AND DARK THEMES
