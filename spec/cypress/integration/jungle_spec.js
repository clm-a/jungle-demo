
describe('Jungle Test', function() {
  beforeEach(() => {
    cy.app('clean')
    cy.appFixtures()
    cy.visit('/')
    cy.get('[href="/pipelines/stage-account-manager"]').click()
  })

  it('can reorder cards', function() {
    cy.get('[data-test-element=pipeline_column]').first().find("[data-test-element=pipeline_application]").first()
    .find("[data-test-element=user_display_name]").then(($firstCard) => {
      // First card is Steve
      expect($firstCard).to.contain('Steve')
    })
    cy.get('[data-rbd-drag-handle-draggable-id]').first()
      .focus()
      .type(' ')
      .type('{downArrow}')
      .type(' ')
    cy.wait(500)
    cy.get('[data-test-element=pipeline_column]').first().find("[data-test-element=pipeline_application]").first()
    .find("[data-test-element=user_display_name]").then(($firstCard) => {
      // now it should be Clément
      expect($firstCard).to.contain('Clément')
    })
  })

  it('can move cards through columns', function() {
    cy.get('[data-rbd-drag-handle-draggable-id]').first()
      .focus()
      .type(' ')
      .type('{rightArrow}')
      .type(' ')
    cy.wait(500)
    // Go to second column
    cy.get('[data-test-element=pipeline_column]').first().next().find("[data-test-element=pipeline_application]").first()
    .find("[data-test-element=user_display_name]").then(($firstCard) => {
      // Steve should be present
      expect($firstCard).to.contain('Steve')
    })
  })
})