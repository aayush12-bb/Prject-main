import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, info: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, info) {
        this.setState({ error, info })
        // also log to console
        // eslint-disable-next-line no-console
        console.error('Uncaught error:', error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 24, fontFamily: 'Inter, system-ui' }}>
                    <h2 style={{ color: '#b91c1c' }}>Something went wrong</h2>
                    <pre style={{ whiteSpace: 'pre-wrap', background: '#111', color: '#fff', padding: 12, borderRadius: 6 }}>
                        {String(this.state.error && this.state.error.toString())}
                        {this.state.info?.componentStack}
                    </pre>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
