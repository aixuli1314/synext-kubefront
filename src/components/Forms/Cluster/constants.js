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

export const IMPORT_CLUSTER_SPEC = {
  apiVersion: 'cluster.kubeSphere.io/v1alpha1',
  kind: 'Cluster',
  spec: {
    provider: '',
    connection: {
      type: 'direct',
      kubeconfig: '',
    },
    joinFederation: true,
  },
}

export const NEW_CLUSTER_SPEC = {
  apiVersion: 'kubekey.kubeSphere.io/v1alpha1',
  kind: 'Cluster',
  metadata: {},
  spec: {
    hosts: [],
    roleGroups: {},
    controlPlaneEndpoint: {
      domain: 'lb.kubeSphere.local',
      address: '',
      port: 6443,
    },
    kubernetes: {
      clusterName: 'cluster.local',
      maxPods: 110,
      etcdBackupDir: '/var/backups/kube_etcd',
      etcdBackupPeriod: 30,
      keepBackupNumber: 5,
    },
    network: {
      plugin: 'calico',
      kubePodsCIDR: '10.233.64.0/18',
      kubeServiceCIDR: '10.233.0.0/18',
      ipipMode: 'Always',
      vxlanMode: 'Never',
      vethMTU: 1440,
    },
    registry: {
      privateRegistry: '',
    },
    addons: [{}, {}],
  },
}

export const NETWORK_PLUGIN_ICONS = {
  calico: '',
  flannel: '',
  cilium: '',
}

export const STORAGE_PLUGIN_ICONS = {
  nfs: 'vsan',
}
