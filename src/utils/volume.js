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

import { get } from 'lodash'

export const getVolumeType = volume => {
  if (volume.persistentVolumeClaim) {
    return 'Volume'
  }
  if (volume.hostPath) {
    return 'HostPath'
  }
  if (volume.emptyDir) {
    return 'EmptyDir'
  }
}

export const isNotPersistentVolume = volume =>
  volume.emptyDir || volume.hostPath || volume.configMap || volume.secret

export const findVolume = (volumes, newVolume) => {
  let volume

  if (!newVolume) {
    return volume
  }

  if (isNotPersistentVolume(newVolume)) {
    volume = volumes.find(item => item.name === newVolume.name)
  } else {
    volume = volumes.find(
      item => get(item, 'persistentVolumeClaim.claimName') === newVolume.name
    )
  }

  return volume
}
