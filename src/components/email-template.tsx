import {
  Body,
  Button,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface VercelInviteUserEmailProps {
  username?: string
  userImage?: string
  teamName?: string
  teamImage?: string
  inviteLink?: string
  inviteFromIp?: string
  inviteFromLocation?: string
}

export const VercelInviteUserEmail = ({
  username,
  userImage,
  teamName,
  teamImage,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: VercelInviteUserEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <div className="container-2 mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="nhatcapdang.com/images/nhat-cap-dang-text.png"
                alt="Nhat Cap Dang Platform Logo"
                className="mx-auto my-0"
                width="200px"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Thank you for your feedback <strong>{username}</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {username},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              We have received your feedback and will get back to you as soon as
              possible.
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    src={userImage}
                    width="64"
                    height="64"
                    alt={`${username}'s profile picture`}
                  />
                </Column>
                <Column align="center">
                  <Img
                    src="/svgs/nhat-cap-dang-text.svg"
                    width="12"
                    height="9"
                    alt="Nhat Cap Dang Platform Logo"
                  />
                </Column>
                <Column align="left">
                  <Img
                    className="rounded-full"
                    src={teamImage}
                    width="64"
                    height="64"
                    alt={`${teamName} team logo`}
                  />
                </Column>
              </Row>
            </Section>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{' '}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for{' '}
              <span className="text-black">{username}</span>. This invite was
              sent from <span className="text-black">{inviteFromIp}</span>{' '}
              located in{' '}
              <span className="text-black">{inviteFromLocation}</span>. If you
              were not expecting this invitation, you can ignore this email. If
              you are concerned about your account&apos;s safety, please reply
              to this email to get in touch with us.
            </Text>
          </div>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default VercelInviteUserEmail
