import { Switch } from '@headlessui/react'
import React from 'react'

export type ToggleProps = {
  label: string
  description?: string
  enabled: boolean
  onChange: (checked: boolean) => void
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Toggle: React.FC<ToggleProps> = ({ label, description, enabled, onChange }) => {
  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <Switch.Label as="span" className="flex flex-col" passive>
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <span className="text-sm text-gray-500">{description}</span>
      </Switch.Label>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={classNames(
          enabled ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
    </Switch.Group>
  )
}

export default Toggle