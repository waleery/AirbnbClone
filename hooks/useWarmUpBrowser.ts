import * as WebBrowser from 'expo-web-browser'
import { useEffect } from 'react'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    //to prepare browser in the background
    void WebBrowser.warmUpAsync()

    return () => {
      WebBrowser.coolDownAsync()
    }
  })
}
