import { Resend } from 'resend'
import { VercelInviteUserEmail } from '@/components/email-template'
import { NextRequest } from 'next/server'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      name: string
      email: string
      message: string
    }
    const { data, error } = await resend.emails.send({
      from: 'Nhat Cap Dang <noreply@nhatcapdang.com>',
      to: [body.email],
      subject: `Thank you for your feedback ${body.name}`,
      react: VercelInviteUserEmail({
        username: body.name,
        userImage: 'https://resend.com/image.png',
        teamName: 'Nhat Cap Dang',
        teamImage: 'https://resend.com/image.png',
        inviteLink: 'https://nhatcapdang.com',
        inviteFromIp: request.headers.get('x-forwarded-for') || '',
        inviteFromLocation: request.headers.get('x-vercel-ip-country') || '',
      }),
    })
    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
