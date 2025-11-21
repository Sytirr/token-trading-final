'use client'
import React from 'react';

export default class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err: any) { console.error(err); }
  render() {
    if (this.state.hasError) {
      return <div className="p-4 bg-red-900 text-white rounded">Something went wrong.</div>
    }
    return this.props.children;
  }
}
