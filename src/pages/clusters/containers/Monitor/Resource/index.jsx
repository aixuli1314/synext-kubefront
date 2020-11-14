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

import React from 'react'
import { observer, inject } from 'mobx-react'

import { renderRoutes } from 'utils/router.config'

import Banner from 'components/Cards/Banner'

import routes from './routes'

@inject('rootStore')
@observer
class ResourceStatus extends React.Component {
  get routes() {
    return routes
      .filter(item => !!item.title)
      .map(item => ({
        ...item,
        name: item.path.split('/').pop(),
      }))
  }

  render() {
    return (
      <div>
        <Banner
          icon="linechart"
          title={t('Application Resources Monitoring')}
          description={t('MONITORING_APPLICATION_DESC')}
          routes={this.routes}
        />
        {renderRoutes(routes)}
      </div>
    )
  }
}

export default ResourceStatus
