import InputComponent from './Input'

import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Atoms',
  component: InputComponent,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
    type: {
      options: ['text', 'email'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof InputComponent>

const Template: ComponentStory<typeof InputComponent> = (args) => <InputComponent {...args} />

export const Input = Template.bind({})

Input.args = {
  size: 'medium',
  type: 'text',
}
