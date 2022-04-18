import ButtonComponent from './Button'

import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Components/Atoms',
  component: ButtonComponent,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
    fill: {
      options: ['solid', 'outline'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['primary', 'gray', 'danger'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof ButtonComponent>

const Template: ComponentStory<typeof ButtonComponent> = (args) => (
  <ButtonComponent {...args}> Click me </ButtonComponent>
)

export const Button = Template.bind({})

Button.args = {
  size: 'medium',
  fill: 'solid',
  variant: 'primary',
}
