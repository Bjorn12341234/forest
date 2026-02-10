import { Component, type ReactNode, type ErrorInfo } from 'react'
import { GlassCard } from './ui/GlassCard'

interface Props {
  children: ReactNode
  fallbackLabel?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[ErrorBoundary${this.props.fallbackLabel ? `: ${this.props.fallbackLabel}` : ''}]`, error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <GlassCard padding="md">
          <div className="text-center py-6">
            <p className="text-sm font-medium text-text-primary mb-1">
              Något gick fel{this.props.fallbackLabel ? ` i ${this.props.fallbackLabel}` : ''}.
            </p>
            <p className="text-xs text-text-muted mb-3">
              {this.state.error?.message ?? 'Okänt fel'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 text-xs font-medium bg-accent/10 border border-accent/30 text-accent rounded-sm cursor-pointer hover:bg-accent/20 transition-colors"
            >
              Försök igen
            </button>
          </div>
        </GlassCard>
      )
    }
    return this.props.children
  }
}
