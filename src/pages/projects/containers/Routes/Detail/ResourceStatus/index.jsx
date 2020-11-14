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

import { isEmpty } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Card } from 'components/Base'
import Placement from 'projects/components/Cards/Placement'

import Rule from './Rule'

import styles from './index.scss'

@inject('detailStore')
@observer
class ResourceStatus extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.module = this.store.module
  }

  componentDidMount() {
    const detail = toJS(this.store.detail)
    this.store.getGateway(detail)
  }

  renderPlacement() {
    const { name, namespace } = this.props.match.params
    const { detail } = this.store
    if (detail.isFedManaged) {
      return (
        <Placement module={this.module} name={name} namespace={namespace} />
      )
    }
    return null
  }

  renderRules() {
    const detail = toJS(this.store.detail)
    const gateway = toJS(this.store.gateway.data)

    const tls = detail.tls[0] || {}

    if (isEmpty(detail.rules)) {
      return null
    }

    const { workspace, cluster, namespace } = this.props.match.params

    return (
      <Card title={t('Rules')}>
        {detail.rules.map(rule => (
          <Rule
            key={rule.host}
            tls={tls}
            rule={rule}
            gateway={gateway}
            prefix={`${
              workspace ? `/${workspace}` : ''
            }/clusters/${cluster}/projects/${namespace}`}
          />
        ))}
      </Card>
    )
  }

  renderContent() {
    return (
      <div>
        {this.renderPlacement()}
        {this.renderRules()}
      </div>
    )
  }

  render() {
    return <div className={styles.main}>{this.renderContent()}</div>
  }
}

export default ResourceStatus
