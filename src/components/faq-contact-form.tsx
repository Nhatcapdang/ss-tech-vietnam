'use client'

import { useDisclosure } from '@/hooks/use-disclosure'
import { zodResolver } from '@hookform/resolvers/zod'
import { MailIcon, MessageCircleCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './ui/input-group'
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormSeparator,
} from './ui/popover-form'

const faqFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export default function FaqContactForm() {
  const [opened, handlers] = useDisclosure(false)
  const t = useTranslations('faq')
  // const { mutateAsync: sendFeedBackAsync, isPending } = useFeedBackMutation()
  const formFaq = useForm<z.infer<typeof faqFormSchema>>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(data: z.infer<typeof faqFormSchema>) {
    // sendFeedBackAsync(data, {
    //   onSuccess: () => {
    //     handlers.toggle()
    //     formFaq.reset()
    //   },
    // })
    console.log(data)
  }

  return (
    <PopoverForm
      open={opened}
      setOpen={handlers.toggle}
      showSuccess={false}
      title={t('contact_support_team')}
      height="470px"
      width="400px"
      showCloseButton={true}
      openChild={
        <Form
          onSubmit={formFaq.handleSubmit(onSubmit)}
          form={formFaq}
          className="flex h-full flex-col p-4"
        >
          <div className="mt-8 flex-1 space-y-3">
            <FormField
              control={formFaq.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                    <span aria-required="true" className="text-destructive">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoFocus
                      aria-required="true"
                      placeholder="John Doe"
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formFaq.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email{' '}
                    <span aria-required="true" className="text-destructive">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupAddon>
                        <MailIcon className="text-muted-foreground" />
                      </InputGroupAddon>
                      <InputGroupInput
                        placeholder="john.doe@example.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formFaq.control}
              name="message"
              render={({ field, fieldState }) => (
                <FormItem className="col-span-2 md:col-span-3">
                  <FormControl>
                    <InputGroup>
                      <InputGroupTextarea
                        id="message"
                        placeholder={t('how_can_we_help_you')}
                        {...field}
                        aria-invalid={!!fieldState.error}
                        className="max-h-16 min-h-10"
                        maxLength={200}
                      />
                      <InputGroupAddon align="block-start">
                        <MessageCircleCheck aria-hidden="true" />
                        <InputGroupText>
                          Message{' '}
                          <span
                            aria-required="true"
                            className="text-destructive"
                          >
                            *
                          </span>
                        </InputGroupText>
                      </InputGroupAddon>
                      <InputGroupAddon align="block-end">
                        <InputGroupText>
                          {field.value.length}
                          /200
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="relative mt-3 flex items-center justify-between border-t pt-3">
            <PopoverFormSeparator />
            <span className="text-xs text-muted-foreground">
              {t('we_will_respond_within_24_hours')}
            </span>
            <PopoverFormButton loading={false} text="Send" />
          </div>
        </Form>
      }
    />
  )
}
