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

import { action, observable } from 'mobx'

import Base from 'stores/base'

export default class QuotaStore extends Base {
  module = 'resourcequotas'

  @observable
  data = {}

  @action
  async fetch(params) {
    this.isLoading = true

    const result = await request.get(
      `kapis/resources.kubeSphere.io/v1alpha2${this.getPath(params)}/quotas`
    )

    this.data = result.data

    this.isLoading = false
  }
}
