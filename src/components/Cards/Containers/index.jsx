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
import PropTypes from 'prop-types'

import { Panel } from 'components/Base'
import ContainerItem from './Item'

import styles from './index.scss'

export default class ContainersCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    title: PropTypes.string,
    containers: PropTypes.array,
    initContainers: PropTypes.array,
  }

  static defaultProps = {
    prefix: '',
    containers: [],
    initContainers: [],
  }

  render() {
    const {
      className,
      prefix,
      cluster,
      containers,
      initContainers,
      podName,
    } = this.props
    const title = this.props.title || t('Container Config')

    return (
      <Panel className={className} title={title}>
        <div className={styles.wrapper}>
          {containers.map((item, index) => (
            <ContainerItem
              key={index}
              prefix={prefix}
              cluster={cluster}
              detail={item}
              podName={podName}
            />
          ))}
          {initContainers.map((item, index) => (
            <ContainerItem
              key={index}
              prefix={prefix}
              cluster={cluster}
              detail={item}
              podName={podName}
              isInit
            />
          ))}
        </div>
      </Panel>
    )
  }
}
