/*
 * This file i s part of kubeSphere Console.
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

import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'

import Breadcrumb from './index'

it('renders correctly', () => {
  const breadcrumbs = [
    {
      label: 'Project',
      url: '/projects/:namespace',
    },
    {
      label: 'Deployments',
      url: `/projects/:namespace/deployments`,
    },
  ]

  const routes = [
    {
      name: 'resource-status',
      title: 'Resource Status',
      path: '/projects/:namespace/deployments/:name/resource-status',
    },
    {
      name: 'revision-control',
      title: 'Revision Records',
      path: '/projects/:namespace/deployments/:name/revision-control',
    },
  ]

  const props = {
    params: { namespace: 'kubeSphere-system', name: 'ks-console' },
    pathname:
      '/projects/kubeSphere-system/deployments/ks-console/resource-status',
    breadcrumbs,
    routes,
  }

  const wrapper = mount(
    <Router>
      <Breadcrumb {...props} />
    </Router>
  )
  expect(wrapper.find('a[href="/projects/kubeSphere-system"]')).toHaveLength(1)
  expect(
    wrapper.find('a[href="/projects/kubeSphere-system/deployments"]')
  ).toHaveLength(1)
})
