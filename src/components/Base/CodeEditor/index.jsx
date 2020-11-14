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

import React, { lazy, Suspense, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Loading } from '@kube-design/components'

import { getValue } from 'utils/yaml'

import styles from './index.scss'

const AceEditor = lazy(() =>
  import(/* webpackChunkName: "react-ace" */ './AceEditor')
)

class CodeEditor extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    mode: PropTypes.string,
    options: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: {},
    mode: 'yaml',
    options: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      value: getValue(props.value),
      originValue: props.value,
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { value } = props

    if (value !== state.originValue) {
      return {
        value: getValue(value),
        originValue: value,
      }
    }

    return null
  }

  handleChange = value => {
    const { onChange } = this.props
    this.setState({ value }, () => onChange(value))
  }

  render() {
    const { className, mode, options } = this.props

    return (
      <Suspense fallback={<Loading className="ks-page-loading" />}>
        <AceEditor
          {...options}
          className={classnames(styles.editor, className)}
          value={this.state.value}
          mode={mode}
          onChange={this.handleChange}
        />
      </Suspense>
    )
  }
}

export default CodeEditor
