"use client";

import React, { ComponentProps, ComponentType, FC } from "react";
import EmotionProvider from "@/app/provider/EmotionProvider";
import RecoilProvider from "@/app/provider/RecoilProvider";
import theme from "@/app/provider/theme";
import { ThemeProvider } from "@mui/material";
import ReactQueryProvider from "@/app/provider/ReactQueryProvider";

type Providers = [ComponentType<any>, ComponentProps<any>?][];

const combineProviders = (providers: Providers): FC<any> =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) =>
      ({ children }) => (
        <AccumulatedProviders>
          <Provider {...props}>
            <>{children}</>
          </Provider>
        </AccumulatedProviders>
      ),
    ({ children }) => <>{children}</>,
  );

const CombineProvider = combineProviders([
  [EmotionProvider],
  [RecoilProvider],
  [ThemeProvider, { theme }],
  [ReactQueryProvider],
]);

export default CombineProvider;
