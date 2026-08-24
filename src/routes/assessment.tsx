import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/assessment')({
  component: AssessmentPage,
})

function AssessmentPage() {
  const content = `'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            the whatsapp icon is not real and it was not centered correctly inside it so correct it and change the color into button color`

  return (
    <div className="pt-32 px-12 whitespace-pre-wrap">
      {content}
    </div>
  )
}
