class HealthMonitor {
	constructor() {
		this.terminal = null
		this.terminalContent = null
		this.init()
	}

	init() {
		this.terminal = document.getElementById('terminal')
		this.terminalContent = document.getElementById('terminal-content')
		this.attachEventListeners()
	}

	attachEventListeners() {
		const healthButtons = document.querySelectorAll('.health-button')
		healthButtons.forEach(button => {
			button.addEventListener('click', e => {
				e.preventDefault()
				const endpoint = button.dataset.endpoint
				const name = button.dataset.name
				this.checkHealth(endpoint, name)
			})
		})

		// Close terminal button
		const closeBtn = document.getElementById('close-terminal')
		if (closeBtn) {
			closeBtn.addEventListener('click', () => {
				this.hideTerminal()
			})
		}
	}

	async fetchHealth(endpoint) {
		try {
			const response = await fetch(endpoint, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const data = await response.json()

			return {
				success: response.ok,
				status: response.status,
				data: data,
				timestamp: new Date().toISOString()
			}
		} catch (error) {
			return {
				success: false,
				status: 0,
				error: error.message,
				timestamp: new Date().toISOString()
			}
		}
	}

	async checkHealth(endpoint, name) {
		this.showTerminal()
		this.clearTerminal() // Clear previous content
		this.addTerminalLine(`> Checking ${name} health...`, 'command')
		this.addTerminalLine(`> GET ${endpoint}`, 'info')

		const result = await this.fetchHealth(endpoint)

		if (result.success) {
			this.addTerminalLine(`✅ ${name} is healthy`, 'success')
			this.addTerminalLine(JSON.stringify(result.data, null, 2), 'json')
		} else {
			this.addTerminalLine(`❌ ${name} check failed`, 'error')
			if (result.error) {
				this.addTerminalLine(`Error: ${result.error}`, 'error')
			} else {
				this.addTerminalLine(`Status: ${result.status}`, 'error')
				this.addTerminalLine(
					JSON.stringify(result.data, null, 2),
					'json'
				)
			}
		}

		this.addTerminalLine(`Timestamp: ${result.timestamp}`, 'timestamp')
		this.addTerminalLine('─'.repeat(50), 'separator')
	}

	showTerminal() {
		this.terminal.classList.add('show')
		// Ensure we start from the top when opening
		setTimeout(() => {
			this.terminalContent.scrollTop = 0
		}, 100)
	}

	hideTerminal() {
		this.terminal.classList.remove('show')
	}

	addTerminalLine(text, type = 'normal') {
		const line = document.createElement('div')
		line.className = `terminal-line terminal-${type}`
		line.textContent = text
		this.terminalContent.appendChild(line)
		// Only scroll to bottom when adding new content to an already visible terminal
		if (this.terminal.classList.contains('show')) {
			this.terminalContent.scrollTop = this.terminalContent.scrollHeight
		}
	}

	clearTerminal() {
		this.terminalContent.innerHTML = ''
		this.terminalContent.scrollTop = 0
	}
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	new HealthMonitor()
})
