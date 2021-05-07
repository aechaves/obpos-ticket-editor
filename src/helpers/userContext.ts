import React from 'react'

export type UserConfiguration = {
  messageLabels: Record<string, string>
  translationLabels: Record<string, string>
  ticketData: any
  translationFilename?: string
  messageFilename?: string
  ticketDataFilename?: string
  monacoThemeLight: boolean
  monacoMinimap: boolean
  monacoLineNumbers: boolean
  [key: string]: boolean | Record<string, string> | any
}

export type ConfigurationDispatch = {
  property: keyof UserConfiguration
  value: UserConfiguration[keyof UserConfiguration]
}

type UserContext = {
  configuration: UserConfiguration
  dispatchUserConfiguration: React.Dispatch<ConfigurationDispatch>
}

const defaultConfiguration: UserConfiguration = {
  messageLabels: {},
  translationLabels: {},
  ticketData: null,
  monacoThemeLight: false,
  monacoMinimap: true,
  monacoLineNumbers: true,
}

const loadFromStorage = () => {
  let config: UserConfiguration = defaultConfiguration

  try {
    const configString = localStorage.getItem('userConfig')
    if (configString) {
      config = JSON.parse(configString)
    }
  } catch (error) {
    console.error(error)
  }

  return config
}

const saveToStorage = (configuration: UserConfiguration) => {
  localStorage.setItem('userConfig', JSON.stringify(configuration))
}

const userContext = React.createContext<UserContext>({
  configuration: defaultConfiguration,
  dispatchUserConfiguration: () => { }
});

export { userContext, defaultConfiguration, loadFromStorage, saveToStorage };
