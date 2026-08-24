import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/assessment')({
  component: AssessmentPage,
})

function AssessmentPage() {
  const content = `'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Do not use Fast Visual Edit. Write actual code.\n\nThe file src/routes/assessment.tsx exists but the /assessment route does not load when clicking any CTA. Check the router configuration and confirm /assessment is registered and pointing to that file. Then check the \"Start My Assessment\" button in the header and make it navigate to /assessment using the router Link component. Report which files you changed.`

  return (
    <div className="pt-32 px-12 whitespace-pre-wrap">
      {content}
    </div>
  )
}
