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

import { getIndexRoute } from 'utils/router.config'

import ResourceStatus from './ResourceStatus'
import AppTemplate from './AppTemplate'
import EnvVariables from './EnvVariables'

const PATH =
  '/:workspace/clusters/:cluster/projects/:namespace/applications/template/:id'

export default [
  {
    path: `${PATH}/resource-status`,
    name: 'resource-status',
    title: 'Resource Status',
    component: ResourceStatus,
    exact: true,
  },
  {
    path: `${PATH}/template`,
    title: 'App Template',
    component: AppTemplate,
    exact: true,
  },
  {
    path: `${PATH}/env`,
    title: 'Environment Variables',
    component: EnvVariables,
    exact: true,
  },
  getIndexRoute({ path: PATH, to: `${PATH}/resource-status`, exact: true }),
]
