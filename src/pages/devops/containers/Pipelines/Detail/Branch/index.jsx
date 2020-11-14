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

import { result, get, omit } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { parse } from 'qs'
import { Link } from 'react-router-dom'
import { Button, Notify } from '@kube-design/components'
import { getLocalTime } from 'utils'
import Status from 'devops/components/Status'
import { getPipelineStatus } from 'utils/status'
import Health from 'projects/components/Health'
import { ReactComponent as ForkIcon } from 'assets/fork.svg'

import Table from 'components/Tables/List'
import EmptyCard from 'devops/components/Cards/EmptyCard'

@inject('rootStore', 'detailStore')
@observer
export default class Branch extends React.Component {
  name = 'branch'

  store = this.props.detailStore || {}

  get enabledActions() {
    const { cluster, devops } = this.props.match.params

    return globals.app.getActions({
      module: 'pipelines',
      cluster,
      devops,
    })
  }

  componentDidMount() {
    const { params } = this.props.match

    this.unsubscribe = this.routing.history.subscribe(location => {
      if (location.pathname === this.props.match.url) {
        const query = parse(location.search.slice(1))
        this.getData({ ...params, ...query })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  getData(params) {
    this.store.getBranches({
      ...params,
    })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleScanRepository = async () => {
    const { params } = this.props.match
    const { detail } = this.props.detailStore

    await this.props.detailStore.scanRepository({
      devops: params.devops,
      cluster: params.cluster,
      name: detail.name,
    })
    this.store.fetchDetail(params)
    Notify.success({
      content: t('Scan repo success'),
    })
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get prefix() {
    return this.props.match.url
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '19%',
      render: name => (
        <Link className="item-name" to={`${this.prefix}/${name}/activity`}>
          <ForkIcon style={{ width: '20px', height: '20px' }} />{' '}
          {decodeURIComponent(name)}
        </Link>
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      width: '10%',
      render: (status, record) => (
        <Status {...getPipelineStatus(get(record, 'latestRun', {}))} />
      ),
    },
    {
      title: t('WeatherScore'),
      dataIndex: 'weatherScore',
      width: '15%',
      render: weatherScore => <Health score={weatherScore} />,
    },
    {
      title: t('Last Message'),
      dataIndex: 'latestRun',
      width: '15%',
      render: latestRun => result(latestRun, 'causes[0].shortDescription', ''),
    },
    {
      title: t('Updated Time'),
      dataIndex: 'updateTime',
      width: '15%',
      render: (updateTime, record) =>
        getLocalTime(record.latestRun.startTime).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  render() {
    const { data, filters, isLoading, total, page, limit } = toJS(
      this.store.branchList
    )

    const isEmptyList = isLoading === false && total === 0

    const omitFilters = omit(filters, 'page', 'workspace')
    const runnable = this.enabledActions.includes('edit')

    if (isEmptyList && !filters.page) {
      return (
        <EmptyCard desc={t('No branches found')}>
          {runnable && (
            <Button type="control" onClick={this.handleScanRepository}>
              {t('Scan Repository')}
            </Button>
          )}
        </EmptyCard>
      )
    }

    const pagination = { total, page, limit }

    return (
      <Table
        rowkey="name"
        data={data}
        columns={this.getColumns()}
        filters={omitFilters}
        pagination={pagination}
        isLoading={isLoading}
        onFetch={this.handleFetch}
        hideSearch
      />
    )
  }
}
