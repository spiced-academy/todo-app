'use client'
import { ChakraProvider as CP } from "@chakra-ui/react";
import React, { ReactNode } from 'react';
import { theme } from "@/theme";

export const ChakraProvider = ({ children }: { children: ReactNode }) => {
    return <CP theme={theme}>
        {children}
    </CP>
};
