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
import PropTypes from 'prop-types'
import { Form, Input, TextArea } from '@kube-design/components'

import { PATTERN_VERSION_NO } from 'utils/constants'

import styles from './index.scss'

@observer
export default class VersionEdit extends React.Component {
  static propTypes = {
    formData: PropTypes.object,
    handleChange: PropTypes.func,
  }

  static defaultProps = {
    formData: {},
    handleChange() {},
  }

  handleChange = (value, name) => {
    this.props.handleChange(value, name)
  }

  render() {
    const { formData, formRef } = this.props

    return (
      <Form data={formData} ref={formRef} className={styles.editForm}>
        <Form.Item
          label={t('Version Number')}
          desc={t('VERSION_NUMBER_DESC')}
          rules={[
            { required: true, message: t('Please input version number') },
            {
              pattern: PATTERN_VERSION_NO,
              message: t('VERSION_NUMBER_ERROR_NOTE'),
            },
          ]}
        >
          <Input
            name="name"
            autoFocus={true}
            maxLength={30}
            onChange={value => this.handleChange(value, 'name')}
          />
        </Form.Item>
        <Form.Item label={t('Update Log')} desc={t('UPDATE_LOG_DESC')}>
          <TextArea
            name="description"
            onChange={value => this.handleChange(value, 'description')}
          />
        </Form.Item>
      </Form>
    )
  }
}
