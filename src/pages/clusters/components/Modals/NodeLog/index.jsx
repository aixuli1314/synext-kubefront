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
import { get } from 'lodash'

import { Modal } from 'components/Base'

import ContainerLog from 'components/Cards/ContainerLog'

import KubeKeyClusterStore from 'stores/cluster/kubekey'

import { observer } from 'mobx-react'
import styles from './index.scss'

@observer
export default class NodeLogModal extends React.Component {
  kubekeyClusterStore = new KubeKeyClusterStore()

  componentDidMount() {
    this.fetchPod()
  }

  fetchPod = () => {
    const kkName = get(this.props, 'detail.kkName')
    if (kkName) {
      this.kubekeyClusterStore.fetchDetail({ name: kkName })
    }
  }

  renderContent() {
    const { namespace, pods } = get(
      this.kubekeyClusterStore.detail,
      'status.jobInfo',
      {}
    )
    const podName = get(pods, '[0].name')
    const containerName = get(pods, '[0].containers[0].name')

    return (
      <ContainerLog
        className={styles.containerLog}
        contentClassName={styles.containerLogContent}
        namespace={namespace}
        podName={podName}
        containerName={containerName}
        isRealtime
      />
    )
  }

  render() {
    const { visible, onCancel } = this.props
    return (
      <Modal
        bodyClassName={styles.body}
        title={t('Logs')}
        visible={visible}
        onCancel={onCancel}
        fullScreen
        hideFooter
      >
        {this.renderContent()}
      </Modal>
    )
  }
}
