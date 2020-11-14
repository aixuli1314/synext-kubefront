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

import { get, groupBy } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'

import { Card } from 'components/Base'
import RuleList from 'components/Cards/RuleList'

@inject('detailStore')
@observer
export default class AuthorizationList extends React.Component {
  render() {
    const { detail, roleTemplates, isLoading } = toJS(this.props.detailStore)

    const templates = groupBy(
      roleTemplates.data.filter(
        rt =>
          get(rt, 'annotations["iam.kubeSphere.io/module"]') &&
          detail.roleTemplates.includes(rt.name)
      ),
      'annotations["iam.kubeSphere.io/module"]'
    )

    return (
      <Card
        title={t('Authorization List')}
        empty={t('No Authorization')}
        loading={isLoading}
        isEmpty={Object.keys(templates).length <= 0}
      >
        <RuleList templates={templates} />
      </Card>
    )
  }
}
