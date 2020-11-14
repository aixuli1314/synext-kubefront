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

import Base from 'components/Forms/Service/ServiceSettings'

import { Form } from '@kube-design/components'
import { TypeSelect } from 'components/Base'

export default class ServiceSettingsForm extends Base {
  renderTypeSelect() {
    return (
      <Form.Item label={t('Access Type')}>
        <TypeSelect
          className="margin-b12"
          value={this.state.serviceType}
          onChange={this.handleTypeChange}
          options={this.types}
          disabled
        />
      </Form.Item>
    )
  }
}
