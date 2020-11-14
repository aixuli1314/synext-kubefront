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

import VersionManage from 'apps/containers/Store/Detail/VersionManage'
import AppInformation from 'apps/containers/Store/Detail/AppInformation'
import AuditRecord from 'apps/containers/Store/Detail/AuditRecord'
import AppInstances from 'apps/containers/Store/Detail/AppInstances'

const PATH = '/workspaces/:workspace/apps/:appId'

export default [
  {
    path: `${PATH}/versions`,
    title: 'Versions',
    component: VersionManage,
    exact: true,
  },
  {
    path: `${PATH}/app-information`,
    title: 'App Information',
    component: AppInformation,
    exact: true,
  },
  {
    path: `${PATH}/audit-records`,
    title: 'Audit Records',
    component: AuditRecord,
    exact: true,
  },
  {
    path: `${PATH}/app-instances`,
    title: 'App Instances',
    component: AppInstances,
    exact: true,
  },
  getIndexRoute({ path: PATH, to: `${PATH}/versions`, exact: true }),
]
