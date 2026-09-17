import { MessageCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import FaqContactForm from './faq-contact-form'

export default function Faq() {
  const t = useTranslations('faq')
  const faqQuestions = t.raw('faq_question') as {
    question: string
    answer: string
  }[]

  return (
    <section
      id="faq-section"
      className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="relative z-10 container">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Left Side - Contact Form */}
          <div className="col-span-12 flex flex-col justify-center space-y-6 md:col-span-5 md:space-y-8 lg:col-span-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                <MessageCircle className="size-4" />
                <span>{t('need_help')}</span>
              </div>
              <h2
                id="faq-heading"
                className="font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl lg:text-5xl"
              >
                {t('still_have_questions')}{' '}
                <span className="text-linear-gradient">
                  {t('still_have_questions_highlight')}
                </span>
              </h2>
              <p className="text-base text-muted-foreground md:text-lg lg:text-xl">
                {t('cant_find_answer')}
              </p>
            </div>

            <FaqContactForm />
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="col-span-12 flex flex-col space-y-6 md:col-span-7 md:space-y-8 lg:col-span-6">
            <div className="space-y-3">
              <h3 className="font-display text-2xl leading-tight font-bold tracking-tight md:text-3xl lg:text-4xl">
                {t('common_questions_you_might_have')}
              </h3>
              <p className="text-base text-muted-foreground md:text-lg">
                {t('common_questions_you_might_have_description')}
              </p>
            </div>

            <Accordion type="multiple" className="space-y-3">
              {faqQuestions.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-lg border border-b-0 border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80"
                >
                  <AccordionTrigger className="px-4 py-4 text-left font-semibold text-foreground hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-muted-foreground">
                    <div className="border-t border-border pt-2">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
