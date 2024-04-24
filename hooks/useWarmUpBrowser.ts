import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
    useEffect(() => {
        //to prepare browser in the background
        void WebBrowser.warmUpAsync();

        return () => {
            WebBrowser.coolDownAsync();
        };
    });
};
