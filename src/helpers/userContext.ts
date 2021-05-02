import React from 'react'

export type UserConfiguration = {
  messageLabels: any
  translationLabels: any
  ticketData: any
  monacoThemeLight: boolean
  monacoMinimap: boolean
  monacoLineNumbers: boolean
  [key: string]: boolean | any
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

const loadFromStorage = (defaultConfiguration: UserConfiguration) => {
  const config: UserConfiguration = defaultConfiguration

  Object.keys(defaultConfiguration).forEach(key => {
    config[key] = localStorage.getItem(key) || config[key]
  });

  return config
}

const saveToStorage = (configuration: UserConfiguration) => {
  Object.keys(configuration).forEach(key => {
    localStorage.setItem(key, configuration[key])
  });
}

const userContext = React.createContext<UserContext>({
  configuration: defaultConfiguration,
  updateConfiguration: () => { }
});

export { userContext, defaultConfiguration, loadFromStorage, saveToStorage };
