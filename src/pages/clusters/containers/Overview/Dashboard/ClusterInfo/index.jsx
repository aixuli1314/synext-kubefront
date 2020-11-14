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
import { inject } from 'mobx-react'
import { Panel, Text } from 'components/Base'

import styles from './index.scss'

@inject('rootStore')
export default class ClusterInfo extends Component {
  handleClick = () => {
    const { cluster, rootStore } = this.props
    rootStore.routing.push(`/clusters/${cluster.name}/visibility`)
  }

  render() {
    const { cluster, version } = this.props
    return (
      <Panel title={t('Cluster Info')}>
        <div className={styles.level}>
          <Text title={cluster.provider} description={t('Provider')} />
          <Text
            title={cluster.kubernetesVersion || version}
            description={t('Kubernetes Version')}
          />
          <Text
            title={
              cluster.visibility === 'public'
                ? t('VISIBILITY_PUBLIC')
                : t('VISIBILITY_PART')
            }
            description={t('Cluster Visibility')}
            onClick={this.handleClick}
          />
        </div>
      </Panel>
    )
  }
}
