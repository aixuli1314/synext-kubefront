/*
 * This file is part of kubeSphere Console.
 * Copyright (C) 2019 The kubeSphere Console Authors.
 *
 * kubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * kubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with kubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

describe('The Workspace Overview Page', function() {
  beforeEach('login', function() {
    cy.login('admin')
  })

  it('successfully loads', function() {
    cy.server()

    cy.route('GET', /\/workspaces/).as('getWorkspace')

    cy.visit('/workspaces/e2e-test')

    cy.wait('@getWorkspace')

    cy.get('.ks-page-main a[href="/workspaces/e2e-test/projects"]')
      .its('length')
      .should('be.eq', 1)

    cy.get('.ks-page-main a[href="/workspaces/e2e-test/roles"]')
      .its('length')
      .should('be.eq', 1)

    cy.get('.ks-page-main a[href="/workspaces/e2e-test/members"]')
      .its('length')
      .should('be.eq', 1)
  })
})
