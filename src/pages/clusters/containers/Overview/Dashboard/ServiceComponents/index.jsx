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

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Icon } from '@kube-design/components'
import { Panel } from 'components/Base'
import { COMPONENT_ICON_MAP } from 'utils/constants'

import ComponentStore from 'stores/component'

import styles from './index.scss'

@observer
export default class ServiceComponents extends Component {
  store = new ComponentStore()

  get configs() {
    const { cluster } = this.props
    return [
      {
        type: 'kubeSphere',
        title: 'kubeSphere',
      },
      {
        type: 'kubernetes',
        title: 'Kubernetes',
      },
      {
        type: 'openpitrix',
        title: 'OpenPitrix',
        disabled: !globals.app.hasClusterModule(cluster, 'openpitrix'),
      },
      {
        type: 'istio',
        title: 'Istio',
        disabled: !globals.app.hasClusterModule(cluster, 'servicemesh'),
      },
      {
        type: 'monitoring',
        title: 'Monitoring',
        disabled: !globals.app.hasClusterModule(cluster, 'monitoring'),
      },
      {
        type: 'logging',
        title: 'Logging',
        disabled: !globals.app.hasClusterModule(cluster, 'logging'),
      },
      {
        type: 'devops',
        title: 'DevOps',
        disabled: !globals.app.hasClusterModule(cluster, 'devops'),
      },
    ]
  }

  componentDidMount() {
    const { cluster } = this.props
    this.store.fetchList({ cluster })
  }

  render() {
    const { cluster } = this.props
    return (
      <Panel title={t('Service Components')}>
        <div className={styles.icons}>
          {this.configs
            .filter(item => !item.disabled)
            .map(item => (
              <span key={item.type} data-tooltip={item.title}>
                <Link to={`/clusters/${cluster}/components?type=${item.type}`}>
                  <Icon
                    name={COMPONENT_ICON_MAP[item.type]}
                    size={44}
                    clickable
                  />
                </Link>
              </span>
            ))}
        </div>
      </Panel>
    )
  }
}
