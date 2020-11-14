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

import React, { Component } from 'react'
import KubeModal from 'components/Modals/KubeCtl'

class KubeCtlWindow extends Component {
  get cluster() {
    return this.props.match.params.cluster
  }

  pageClose() {
    window.opener = null
    window.open('', '_self', '')
    window.close()
  }

  render() {
    return (
      <KubeModal
        onCancel={this.pageClose}
        title="kubectl"
        cluster={this.cluster}
      />
    )
  }
}

export default KubeCtlWindow
