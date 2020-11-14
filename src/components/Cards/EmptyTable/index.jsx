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
import classnames from 'classnames'

import { Button, Columns, Column } from '@kube-design/components'

import styles from './index.scss'

export default class EmptyList extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    createText: PropTypes.string,
    operations: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    onCreate: PropTypes.func,
  }

  static defaultProps = {
    name: '',
  }

  render() {
    const { className, name, operations, onCreate, createText } = this.props
    const desc =
      this.props.desc ||
      t(
        `${name
          .split(' ')
          .join('_')
          .toUpperCase()}_CREATE_DESC`
      )

    const btnText = createText || `${t('Create ')}${t(name)}`

    return (
      <div className={classnames(styles.wrapper, className)}>
        <Columns>
          <Column className="is-narrow">
            <img src="/assets/empty-card.svg" alt="" />
          </Column>
          <Column>
            <p
              className={styles.desc}
              dangerouslySetInnerHTML={{
                __html: desc,
              }}
            />
            {operations ||
              (onCreate && (
                <Button
                  type="control"
                  onClick={onCreate}
                  data-test="table-create"
                >
                  {btnText}
                </Button>
              ))}
          </Column>
        </Columns>
      </div>
    )
  }
}
