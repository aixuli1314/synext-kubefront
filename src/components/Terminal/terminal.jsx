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
import { debounce } from 'lodash'
import { Terminal } from 'xterm'
import PropTypes from 'prop-types'
import * as fit from 'xterm/lib/addons/fit/fit'

import './terminal.css'
import './xterm.css'

Terminal.applyAddon(fit)

const DEFAULT_TERMINAL_OPTS = {
  lineHeight: 1.2,
  cursorBlink: true,
  cursorStyle: 'underline',
  fontSize: 12,
  fontFamily: "Monaco, Menlo, Consolas, 'Courier New', monospace",
  theme: {
    background: '#181d28',
  },
}

export default class ContainerTerminal extends React.Component {
  static propsTypes = {
    terminalOpts: PropTypes.object,
    websocketUrl: PropTypes.string,
    initText: PropTypes.string,
  }

  static defaultProps = {
    terminalOpts: {},
    initText: 'Connecting...',
  }

  get isWsOpen() {
    return this.ws && this.ws.readyState === 1
  }

  constructor(props) {
    super(props)

    this.first = true
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.term = this.initTerm()
    this.ws = this.createWS()

    this.addWSListeners()
    this.onTerminalResize()
    this.onTerminalKeyPress()

    this.disableTermStdin()
  }

  componentWillUnmount() {
    this.term.destroy()
    this.disconnect()
    this.removeResizeListener()
  }

  initTerm() {
    const { initText } = this.props
    const terminalOpts = this.getTerminalOpts()
    const term = new Terminal(terminalOpts)
    term.open(this.containerRef.current)
    term.write(initText)
    term.fit()

    return term
  }

  disableTermStdin(disabled = true) {
    const { textarea = {} } = this.term
    textarea.disabled = disabled
  }

  getTerminalOpts() {
    const { terminalOpts } = this.props
    return { ...DEFAULT_TERMINAL_OPTS, ...terminalOpts }
  }

  onTerminalResize() {
    window.addEventListener('resize', this.onResize)
    this.term.on('resize', this.resizeRemoteTerminal)
  }

  onTerminalKeyPress() {
    this.term.on('data', this.sendTerminalInput)
  }

  sendTerminalInput = data => {
    if (this.isWsOpen) {
      this.ws.send(this.packStdin(data))
    }
  }

  resizeRemoteTerminal = () => {
    const { cols, rows } = this.term
    if (this.isWsOpen) {
      this.ws.send(this.packResize(cols, rows))
    }
  }

  removeResizeListener() {
    window.removeEventListener('resize', this.onResize)
  }

  fitTerm = () => this.term.fit()

  onResize = debounce(this.fitTerm, 800)

  packStdin = data =>
    JSON.stringify({
      Op: 'stdin',
      Data: data,
    })

  packResize = (col, row) =>
    JSON.stringify({
      Op: 'resize',
      Cols: col,
      Rows: row,
    })

  unpackStdout = data => JSON.parse(data).Data

  createWS() {
    return new WebSocket(this.props.websocketUrl)
  }

  addWSListeners() {
    this.ws.onmessage = this.onWSReceive
    this.ws.onclose = this.onWSClose
    this.ws.onerror = this.onWSError
  }

  onWSError = ex => {
    this.fatal(ex.message)
  }

  onWSClose = ev => {
    this.fatal(ev.reason)
  }

  onWSReceive = ev => {
    const data = ev.data
    const term = this.term

    if (this.first) {
      this.first = false
      this.disableTermStdin(false)
      term.reset()
      term.element && term.focus()
      this.resizeRemoteTerminal()
    }

    const stdout = this.unpackStdout(data)
    term.write(stdout)
  }

  disconnect = () => {
    if (this.term) {
      this.disableTermStdin(true)
    }

    if (this.ws) {
      const ws = this.ws
      ws.onopen = null
      ws.onmessage = null
      ws.onerror = null
      ws.onclose = null
      if (ws.readyState < 2) {
        ws.close()
        this.ws = null
      }
    }
  }

  fatal = message => {
    const first = this.first
    if (!message && first)
      message =
        'Could not connect to the container. Do you have sufficient privileges?'
    if (!message) message = 'disconnected'
    if (!first) message = `\r\n${message}`
    if (first) this.term.reset()
    this.term.write(`\x1b[31m${message}\x1b[m\r\n`)
    this.disconnect()
  }

  render() {
    return (
      <kubernetes-container-terminal
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        ref={this.containerRef}
      />
    )
  }
}
