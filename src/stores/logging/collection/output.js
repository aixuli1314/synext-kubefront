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

import Base from 'stores/base'

const collectionDefaultSetting = {
  es: {
    logstashFormat: true,
    timeKey: '@timestamp',
    logstashPrefix: 'ks-logstash-log',
  },
}

const KS_LOG_NAMESPACE = 'kubeSphere-logging-system'

const MATCHS = {
  logging: 'kube.*',
  events: 'kube_events',
  auditing: 'kube_auditing',
}

export default class outputStore extends Base {
  module = 'outputs'

  get apiVersion() {
    return 'apis/logging.kubeSphere.io/v1alpha2'
  }

  getDetailUrl = ({ name, cluster }) =>
    `${this.getListUrl({ namespace: KS_LOG_NAMESPACE, cluster })}/${name}`

  fetch(params) {
    this.fetchListByK8s({
      namespace: KS_LOG_NAMESPACE,
      ...params,
    })
  }

  create({ Name, enabled = true, cluster, component, ...params }) {
    const createParams = {
      apiVersion: 'logging.kubeSphere.io/v1alpha2',
      kind: 'Output',
      metadata: {
        name: `${Name}-${component}`,
        namespace: KS_LOG_NAMESPACE,
        labels: {
          'logging.kubeSphere.io/enabled': `${enabled}`,
          'logging.kubeSphere.io/component': component,
        },
      },
      spec: {
        match: MATCHS[component],
        [Name]: { ...collectionDefaultSetting[Name], ...params },
      },
    }
    return super.create(createParams, { cluster, namespace: KS_LOG_NAMESPACE })
  }
}
