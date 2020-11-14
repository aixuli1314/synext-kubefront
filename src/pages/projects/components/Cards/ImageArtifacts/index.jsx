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
import { observer } from 'mobx-react'

import Base from 'projects/components/Cards/ImageRunRecord'

import RunItem from './Item'

@observer
export default class ImageArtifacts extends Base {
  fetchData = async (params = {}) => {
    const { limit, params: _params } = this.props
    _params.status = 'Successful'
    await this.store.fetchS2IRunRecords({
      limit,
      ..._params,
      ...params,
    })
    this.setAutoRefresh()
  }

  renderItem(run) {
    const { isLoading } = this.store.list

    return (
      <RunItem
        key={run.name}
        runDetail={run}
        loading={isLoading}
        store={this.store}
      />
    )
  }
}
