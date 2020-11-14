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

import { Card } from 'components/Base'
import Placement from 'projects/components/Cards/Placement'

import styles from './index.scss'

@inject('detailStore')
@observer
class ConfigMapDetail extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.module = props.module
  }

  renderContent(data = {}) {
    return (
      <div className={styles.wrapper}>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <div className="h6">{key}</div>
              <pre className={styles.value}>{value}</pre>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderPlacement() {
    const { name, namespace } = this.props.match.params
    const { detail } = this.store
    if (detail.isFedManaged) {
      return (
        <Placement
          module={this.store.module}
          name={name}
          namespace={namespace}
        />
      )
    }
    return null
  }

  render() {
    const { detail, isLoading } = this.store

    return (
      <div>
        {this.renderPlacement()}
        <Card title={t('Config Value')} loading={isLoading}>
          {this.renderContent(detail.data)}
        </Card>
      </div>
    )
  }
}

export default ConfigMapDetail
