import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/assessment')({
  component: AssessmentPage,
})

function AssessmentPage() {
  const content = `'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Create the /assessment route and page.\n\n1. Create src/pages/Assessment.tsx and register /assessment in the router.\n\n2. Page layout: no site header or footer. Hide the WhatsApp and back-to-top buttons on this route.\n\n3. Top bar: fixed, 68px tall (60px mobile), --bg at 88% with backdrop blur, 1px --border bottom. Left: Logo 30px + \"GoRebalance\" in Fraunces 500 19px linking to \"/\". Right: dark mode toggle.\n\n4. Page background --surface-alt with the global grain overlay.\n\n5. Container: max-width 820px, centred, padding-top calc(68px + 40px), padding-bottom 80px, padding-inline 20px (32px on desktop).\n\n6. Inside the container, render a placeholder card: --surface background, 1px --border, radius 26px, padding 40px. Heading in Fraunces 500 clamp(1.5rem, 3vw, 2.125rem): \"Assessment\". Body at 15px --text-muted: \"Form coming next.\"\n\n7. Wire every assessment CTA on the site to navigate here using the router Link component: the header button, hero primary button, symptom checker CTA, treatments strip CTA, assessment CTA band, footer button, and the CTAs on About, Treatments, Gallery, Testimonials and Contact.\n\nDo not add any form fields yet.`

  return (
    <div className="pt-32 px-12 whitespace-pre-wrap">
      {content}
    </div>
  )
}
