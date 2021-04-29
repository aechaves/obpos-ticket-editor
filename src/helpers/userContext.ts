import React from 'react'

export type UserConfiguration = {
  messageLabels: any
  translationLabels: any
  ticketData: any
  monacoThemeLight: boolean
  monacoMinimap: boolean
  monacoLineNumbers: boolean
}

type UserContext = {
  configuration: UserConfiguration
  updateConfiguration: (property: keyof UserConfiguration, value: UserConfiguration[keyof UserConfiguration]) => void
}

const defaultConfiguration: UserConfiguration = {
  messageLabels: null,
  translationLabels: null,
  ticketData: null,
  monacoThemeLight: false,
  monacoMinimap: true,
  monacoLineNumbers: true,
}

const userContext = React.createContext<UserContext>({
  configuration: defaultConfiguration,
  updateConfiguration: () => { }
});

export { userContext, defaultConfiguration };
