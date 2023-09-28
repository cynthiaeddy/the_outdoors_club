import { Faq } from './Faq'
import membership from '../../assets/OC_membership.pdf'
import { NavLink } from 'react-router-dom'
import './Faq.css'

function FaqData() {
  const faqItems = [
    {
      question: 'How do I find out about upcoming Outdoors Club outings?',
      answer: (
        <div>
          <p>
            Outdoors Club outings are promoted on Meetup, in Wanderings
            newsletter (sent twice a year) and via periodic email blasts. The
            latter two are for dues-paying members only. To subscribe to the{' '}
            <button
              type='button'
              className='Faqs-href'
              onClick={e => {
                e.preventDefault()
                window.location.href = 'https://www.meetup.com/outdoorsclubny'
              }}>
              Outdoors Club
            </button>{' '}
            Meetup page click on “join the group” button. If you are not a dues-
            paying member, the hike leader will ask you to pay $5 at the event.
          </p>
        </div>
      ),
    },

    {
      question:
        'How do I ensure the best chance of getting on the list for popular Outdoors Club outings?',
      answer: (
        <div>
          <p>
            Be sure to check your Meetup settings on the Outdoors Club page. See
            that Email updates are toggled “on” for "new event announcements".
            For popular events, consider getting on the waitlist anyway. A
            certain number of folks tend to drop out a day or two before the
            event. Also, unfortunately, there are no-shows so contact a hike
            leader directly and they may let you join as they will take no-shows
            into account. Members can review the Wanderings newsletter for walks
            of interest and let the hike leader know. Many of the walks listed
            in newsletter are for members only and some of our hike leaders
            prefer to only receive RSVP via email/phone (i.e., not use Meetup).
            Lastly, members need to keep an eye out for Outdoors Club emails
            which notify of upcoming events that might not be featured in Meetup
            or the newsletter. Some are impromptu outings, not scheduled far in
            advance.
          </p>
        </div>
      ),
    },

    {
      question:
        'I have questions about a specific outing. Who and how do I ask?',
      answer: (
        <div>
          <p>
            Reach out to the hike leader directly. Usually, they will specify
            how and when they would like to be contacted, along with their email
            or phone number. For outings posted on Meetup, you can also post
            your question on the specific event page. Or if the hike leader
            enables the feature, you can message them directly on Meetup. If you
            have not heard back using the above approach, send an email to:{' '}
            <a href='mailto:outdoorsclubny@yahoo.com' className='Faqs-ahref'>
              outdoorsclubny@yahoo.com
            </a>
          </p>
        </div>
      ),
    },

    {
      question: 'What are the benefits of becoming a dues-paying member?',
      answer: (
        <div>
          <p>
            Great value, membership pays for itself within 2-3 outings. Members
            don’t pay a $5 per-hike fee. Convenience, don’t have to bring $5
            cash to each outing. Access to member-only events which are promoted
            in Wanderings newsletter and emails. Support for the Outdoors Club’s
            120+ volunteer-led outings per year, which is very much appreciated.
          </p>
        </div>
      ),
    },

    {
      question: 'When does my membership start and expire?',
      answer: (
        <div>
          <p>
            You sign up for either a 1 or 2 year membership. For new members,
            your start month begins the month you initiate your membership. If
            you are renewing, your current membership expiration date is
            extended another 12 or 24 months.
          </p>
        </div>
      ),
    },

    {
      question: 'How do I become a member?',
      answer: (
        <div>
          <p>
            There are three ways to pay membership dues. <br />
            You can <NavLink to={'/signup'} className='Faqs-ahref'>sign up here,</NavLink> then proceed to the membership panel on the home page.
            <br /> You can print the{' '}
            <a href={membership} download className='Faqs-ahref'>
              membership form,{' '}
            </a>
            complete it and mail it in with check payment. <br />
            You can also pay membership dues directly with a hike leader. Be
            sure to write your email, address and phone on the sign-in sheet.
          </p>
        </div>
      ),
    },
    {
      question:
        'I’m a member but haven’t received any Outdoors Club emails via Google Group. How do I fix that?',
      answer: (
        <div>
          <p>
            Send an email to{' '}
            <a href='mailto:outdoorsclubny@yahoo.com' className='Faqs-ahref'>
              outdoorsclubny@yahoo.com
            </a>{' '}
            and we’ll confirm we have the correct email address on file for you.
            Also, please check your Google Group settings to ensure you hadn’t
            switched off receiving them. Go to this link:{' '}
            <a
              href='https://groups.google.com/my-groups'
              className='Faqs-ahref'>
              https://groups.google.com/my-groups
            </a>
          </p>
          <p>
            Click on the Settings button (usually upper right) which looks like
            a gear. In the dropdown menu, Click on "Global settings". In the
            popup screen, make sure all the boxes have X in them and then click
            "Save"
          </p>
        </div>
      ),
    },
    {
      question:
        'How do I notify The Outdoors Club that my contact information (email, phone, address) has changed? How do I change how I receive my newsletter (USPS mail or email)? How do I find out when my membership expires?',
      answer: (
        <div>
          <p>
            After you log in, you can click on your Account in the Navigation Bar. That will tell you when your membership expires. There is an Edit your Profile link to update all your personal information. Or you can send an email to{' '}
            <a href='mailto:outdoorsclubny@yahoo.com' className='Faqs-ahref'>
              outdoorsclubny@yahoo.com
            </a>{' '}
            Lastly you can write to us at: Outdoors Club Inc. P. O. Box 227 - Lenox
            Hill Station New York, NY 10021-0014
          </p>
        </div>
      ),
    },
    {
      question: 'How do I share feedback, make a suggestion or complaint?',
      answer: (
        <div>
          <p>
            You can click on the Contact Us link at the bottom of the page. Or send an email to{' '}
            <a href='mailto:outdoorsclubny@yahoo.com' className='Faqs-ahref'>
              outdoorsclubny@yahoo.com
            </a>{' '}
            Lastly you can write to us at: Outdoors Club Inc. P. O. Box 227 - Lenox
            Hill Station New York, NY 10021-0014
          </p>
        </div>
      ),
    },
  ]

  return (
    <section className='FaqsContainer'>
      <h3 className='Main_hed faqs'>FAQS</h3>

      <Faq items={faqItems} />
    </section>
  )
}
export default FaqData
