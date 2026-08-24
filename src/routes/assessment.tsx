import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/assessment')({
  component: AssessmentPage,
})

function AssessmentPage() {
  return <div className="pt-32 px-12">Assessment Page Placeholder</div>
}
