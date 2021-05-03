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

export type ConfigurationDispatch = {
  property: keyof UserConfiguration
  value: UserConfiguration[keyof UserConfiguration]
}

type UserContext = {
  configuration: UserConfiguration
  dispatchUserConfiguration: React.Dispatch<ConfigurationDispatch>
}

const defaultConfiguration: UserConfiguration = {
  messageLabels: null,
  translationLabels: null,
  ticketData: null,
  monacoThemeLight: false,
  monacoMinimap: true,
  monacoLineNumbers: true,
}

const loadFromStorage = () => {
  let config: UserConfiguration = defaultConfiguration

  try {
    config = JSON.parse(localStorage.getItem('userConfig') || '')
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
