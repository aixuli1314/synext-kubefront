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

import { withProps } from 'utils'

import BaseInfo from 'components/Forms/Workload/BaseInfo'
import ContainerSettings from 'components/Forms/Workload/ContainerSettings'
import VolumeSettings from 'components/Forms/Workload/VolumeSettings'
import AdvanceSettings from 'components/Forms/Workload/AdvanceSettings'

export default [
  { title: 'Basic Info', icon: 'cdn', component: BaseInfo, required: true },
  {
    title: 'Container Image',
    icon: 'docker',
    component: withProps(ContainerSettings, { withService: true }),
    required: true,
  },
  {
    title: 'Mount Volumes',
    icon: 'storage',
    component: VolumeSettings,
    required: true,
  },
  {
    title: 'Advanced Settings',
    icon: 'slider',
    component: AdvanceSettings,
    required: true,
  },
]
