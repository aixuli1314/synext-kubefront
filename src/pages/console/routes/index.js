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

import Dashboard from '../containers/Dashboard'
import NotFound from '../containers/NotFound'
import KubeCtl from '../containers/KubeCtl'
import LogQuery from '../containers/LogQuery'
import EventSearch from '../containers/EventSearch'
import AuditingSearch from '../containers/AuditingSearch'
import ContainerTerminal from '../containers/ContainerTerminal'

export default [
  { path: '/404', component: NotFound, exact: true },
  { path: '/dashboard', component: Dashboard, exact: true },
  { path: `/kubectl`, exact: true, component: KubeCtl },
  { path: `/logquery`, exact: true, component: LogQuery },
  { path: '/eventsearch', exact: true, component: EventSearch },
  { path: '/auditingsearch', exact: true, component: AuditingSearch },
  {
    path:
      '/terminal/cluster/:cluster/projects/:namespace/pods/:podName/containers/:containerName',
    component: ContainerTerminal,
  },
  {
    path: '/',
    redirect: { from: '/', to: '/dashboard', exact: true },
  },
  {
    path: '*',
    redirect: { from: '*', to: '/404', exact: true },
  },
]
