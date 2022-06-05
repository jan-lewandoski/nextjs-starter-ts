export {}

describe('Sign in test', () => {
  it('Should sign in', () => {
    cy.visit('/')

    cy.contains(/sign in/i).click()

    cy.findByLabelText(/email/i).type('jan+1@gm.com')

    cy.findByLabelText(/password/i).type('Password123!')

    cy.contains(/sign in/i).click()

    cy.contains(/sign out/i)
  })
})
