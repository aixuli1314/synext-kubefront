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

import { get, set } from 'lodash'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import { mergeLabels, updateFederatedAnnotations } from 'utils'
import FORM_TEMPLATES from 'utils/form.templates'

import DeployAppModal from 'projects/components/Modals/DeployApp'
import CreateAppModal from 'projects/components/Modals/CreateApp'
import CreateServiceModal from 'projects/components/Modals/ServiceCreate/InApp'
import ServiceMonitorModal from 'projects/components/Modals/ServiceMonitor'

import ServiceMonitorStore from 'stores/monitoring/service.monitor'

export default {
  'app.deploy': {
    on({ store, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
        },
        modal: DeployAppModal,
        store,
        ...props,
      })
    },
  },
  'crd.app.create': {
    on({ store, cluster, namespace, workspace, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.create(data, { cluster, namespace }).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        store,
        cluster,
        namespace,
        modal: CreateAppModal,
        ...props,
      })
    },
  },
  'crd.app.addcomponent': {
    on({ store, detail, cluster, namespace, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          const labels = detail.selector
          const serviceMeshEnable = String(detail.serviceMeshEnable)

          const component = {
            service: data.Service,
            workload: data.Deployment || data.StatefulSet,
          }

          mergeLabels(component.service, labels)
          mergeLabels(component.workload, labels)

          set(
            component.workload,
            'metadata.annotations["servicemesh.kubeSphere.io/enabled"]',
            serviceMeshEnable
          )
          set(
            component.service,
            'metadata.annotations["servicemesh.kubeSphere.io/enabled"]',
            serviceMeshEnable
          )

          set(
            component.workload,
            'spec.template.metadata.annotations["sidecar.istio.io/inject"]',
            serviceMeshEnable
          )

          if (props.isFederated) {
            updateFederatedAnnotations(component.workload)
            updateFederatedAnnotations(component.service)
            await store.create(component, { namespace })
          } else {
            await store.addComponent(component, {
              name: detail.name,
              cluster,
              namespace,
            })
          }

          Modal.close(modal)
          Notify.success({ content: `${t('Add Component Successfully')}!` })
          success && success()
        },
        store,
        cluster,
        namespace,
        modal: CreateServiceModal,
        ...props,
      })
    },
  },
  'app.service.monitor': {
    on({ store, cluster, namespace, success, ...props }) {
      const serviceMonitorStore = new ServiceMonitorStore()
      const formTemplate = FORM_TEMPLATES.servicemonitors({
        name: get(store, 'components.data[0].name'),
        namespace,
      })
      const modal = Modal.open({
        onOk: async data => {
          const name = get(data, 'metadata.name')
          const result = await serviceMonitorStore.checkName({
            name,
            cluster,
            namespace,
          })

          if (!result.exist) {
            await serviceMonitorStore.create(data, { cluster, namespace })
          } else {
            await serviceMonitorStore.update({ name, cluster, namespace }, data)
          }

          Modal.close(modal)
          success && success()
        },
        cluster,
        namespace,
        formTemplate,
        appStore: store,
        store: serviceMonitorStore,
        modal: ServiceMonitorModal,
        ...props,
      })
    },
  },
}
