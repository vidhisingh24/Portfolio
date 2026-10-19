import { notify } from '../lib/notify';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { profile } from '../data/profile';
import { copyText } from '../lib/palette';

const { contact, links, email } = profile;

const Contact = () => {
  const onCopy = async () => {
    const ok = await copyText(email);
    notify(ok ? `Copied ${email}` : `Couldn’t copy. My email is ${email}`);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader id="contact-title" eyebrow={contact.eyebrow} title={contact.title} lead={contact.lead} />

        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="card flex flex-col justify-between gap-8 p-6 sm:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent-strong">Email</p>
              <a
                href={`mailto:${email}`}
                className="mt-3 block break-all font-display text-3xl leading-tight text-ink hover:text-accent-strong sm:text-4xl"
              >
                {email}
              </a>
              <p className="mt-3 font-mono text-xs text-muted">
                <span className="status-dot mr-2 align-middle" aria-hidden="true" />
                {profile.availability}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={onCopy} className="btn btn-primary">
                Copy email
              </button>
              <a href={`mailto:${email}`} className="btn btn-ghost">
                Send an email <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="card p-6 sm:p-8">
            <h3 className="font-display text-3xl text-ink">{contact.linksTitle}</h3>
            <ul className="mt-5 divide-y divide-line">
              {[
                { label: 'LinkedIn', href: links.linkedin, note: 'linkedin.com/in/vidhisingh24' },
                { label: 'GitHub', href: links.github, note: 'github.com/vidhisingh24' },
                { label: 'Resume', href: links.resume, note: 'PDF' },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 py-3.5 text-ink hover:text-accent-strong"
                  >
                    <span>
                      <span className="font-medium">{l.label}</span>
                      <span className="block font-mono text-xs text-muted">{l.note}</span>
                    </span>
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
