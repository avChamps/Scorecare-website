import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import scorecareLogo from "../../assets/scorecare-logo.png";
import { PLAY_STORE_URL } from "../api/api";
import PrivacyPolicyNav from "./privacy-policy-nav";
import WebsitePrivacyPolicy from "./website-privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy | ScoreCare",
  description:
    "Learn how ScoreCare collects, uses, stores, and protects your personal information.",
};

const sections = [
  ["information-we-collect", "Information We collect"],
  ["your-consent", "Your consent"],
  ["use-of-information", "Use and processing"],
  ["information-sharing", "Disclosure and sharing"],
  ["storage-retention", "Storage and retention"],
  ["tracking-technologies", "Tracking technologies"],
  ["your-rights", "Your rights and choices"],
  ["your-duties", "Your duties"],
  ["information-security", "Information security"],
  ["no-children", "No children"],
  ["policy-changes", "Policy changes"],
  ["privacy-questions", "Privacy questions"],
  ["withdrawal-of-consent", "Withdrawal of consent"],
  ["dispute-redressal", "Dispute redressal"],
];

const navLinks = [
  ["About", "/#about"],
  ["Credit Score", "/#credit-score"],
  ["Benefits", "/#benefits"],
  ["Policies", "/#policies"],
  ["Contact", "/#contact"],
];

const personalInformation = [
  "Your name",
  "Gender",
  "Residential/correspondence address",
  "Date of birth",
  "Email address",
  "Mobile number",
  "Relevant emails and SMS data",
];

const sensitiveInformation = [
  "Credit card details",
  "Debit card details",
  "Photograph",
  "Signature",
  "Credit scores",
  'Bank account details and know your customer ("KYC") documents such as PAN Card details, etc.',
];

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-[#E8EEF2] px-6 py-9 last:border-b-0 sm:px-10 sm:py-11"
    >
      <div className="mb-6 flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F9F5] text-sm font-extrabold text-[#15977A]">
          {number.padStart(2, "0")}
        </span>
        <h2 className="font-heading pt-1 text-2xl font-extrabold leading-tight text-[#1B3A57]">
          {title}
        </h2>
      </div>
      <div className="space-y-5 text-[15px] leading-7 text-[#52677C] sm:text-base">
        {children}
      </div>
    </section>
  );
}

function Subsection({
  number,
  title,
  children,
}: {
  number: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-heading text-base font-bold text-[#274D6D]">
        <span className="mr-2 text-[#15977A]">{number}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function LetterList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2 pl-1">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3">
          <span className="font-semibold text-[#15977A]">
            ({String.fromCharCode(97 + index)})
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F5F9F9] text-[#1B3A57]">
      <nav className="sticky top-0 z-50 flex h-[72px] items-center justify-between border-b border-[#EEF2F6] bg-white/95 px-5 backdrop-blur md:px-10 lg:px-[5%]">
        <Link href="/" className="flex items-center" aria-label="ScoreCare home">
          <span className="flex h-14 w-40 origin-left items-center overflow-hidden">
            <Image
              src={scorecareLogo}
              alt="ScoreCare"
              className="h-10 w-40 origin-left scale-[2.1] object-contain object-left"
              priority
            />
          </span>
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-[#3D5066] transition hover:text-[#2EC4A0]"
            >
              {label}
            </Link>
          ))}
        </div>
        <a
          href={PLAY_STORE_URL}
          className="hidden rounded-full bg-[#2EC4A0] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#20A882] sm:inline-flex"
        >
          Download App
        </a>
        <details className="group relative lg:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden">
            <span className="relative h-5 w-6">
              <span className="absolute left-0 top-0 h-0.5 w-6 rounded bg-[#1B3A57] transition group-open:translate-y-[9px] group-open:rotate-45" />
              <span className="absolute left-0 top-[9px] h-0.5 w-6 rounded bg-[#1B3A57] transition group-open:opacity-0" />
              <span className="absolute left-0 top-[18px] h-0.5 w-6 rounded bg-[#1B3A57] transition group-open:-translate-y-[9px] group-open:-rotate-45" />
            </span>
          </summary>
          <div className="absolute right-0 top-[50px] w-[min(320px,calc(100vw-40px))] rounded-2xl border border-[#EEF2F6] bg-white p-4 shadow-[0_16px_48px_rgba(27,58,87,0.16)]">
            <div className="grid gap-1">
              {navLinks.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-xl px-3 py-3 text-sm font-bold text-[#1B3A57] transition hover:bg-[#E6FAF5] hover:text-[#2EC4A0]"
                >
                  {label}
                </Link>
              ))}
              <a
                href={PLAY_STORE_URL}
                className="mt-2 rounded-full bg-[#2EC4A0] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#20A882]"
              >
                Download App
              </a>
            </div>
          </div>
        </details>
      </nav>

      <header className="relative overflow-hidden bg-[#102F49] px-5 py-16 sm:py-20">
        <div className="absolute -right-28 -top-32 size-96 rounded-full bg-[#2EC4A0]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 size-80 rounded-full bg-[#4FC3F7]/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-[#63E2C4] shadow-lg shadow-black/10">
            <svg
              aria-hidden="true"
              className="size-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6l-7-3Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 12 1.6 1.6 3.7-4" />
            </svg>
          </div>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#63E2C4]">
            Your privacy matters
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            This policy explains what information ScoreCare collects and how we use,
            store, share, and protect it.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl items-start gap-8 px-5 py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-14">
        <aside className="hidden rounded-2xl border border-[#E1EAEF] bg-white p-5 shadow-[0_12px_35px_rgba(27,58,87,0.06)] lg:sticky lg:top-24 lg:block">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.14em] text-[#15977A]">
            On this page
          </p>
          <PrivacyPolicyNav sections={sections} />
        </aside>

        <WebsitePrivacyPolicy>
          <article className="overflow-hidden rounded-2xl border border-[#E1EAEF] bg-white shadow-[0_18px_50px_rgba(27,58,87,0.07)]">
          <div className="border-b border-[#E8EEF2] bg-gradient-to-br from-[#F1FBF8] to-white px-6 py-9 sm:px-10">
            <p className="text-[15px] leading-7 text-[#52677C] sm:text-base">
              Welcome to ScoreCare (Scoresathi Technologies Pvt. Ltd.) (Company, We,
              Us, Our).
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[#52677C] sm:text-base">
              We respect the privacy of our customers (You, Your, User) and have
              implemented necessary technical and organizational safeguards and
              measures in this regard, to ensure its compliance with applicable data
              protection laws (Applicable Law).
            </p>
            <div className="mt-6 rounded-xl border border-[#CDEDE5] bg-white p-5">
              <p className="font-heading text-lg font-bold leading-7 text-[#1B3A57]">
                Your privacy is at the core of the way we design and build the
                services and products you know and love, so that you can fully trust
                them.
              </p>
            </div>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#52677C] sm:text-base">
              <p>
                We prioritize the establishment and maintenance of your trust. The
                Company places paramount importance on safeguarding the privacy and
                security of your Information (defined below).
              </p>
              <p>
                This privacy policy (Privacy Policy) applies to Your use of the: (i)
                website of the Company, hosted at scorecareapp.com (Website); and/or
                (ii) the Services (as defined under the Terms); and/or (iii) Our
                applications on mobile platforms (App). The Website and App shall
                collectively be referred to as Platform. It does not apply to third-party
                websites linked to Our Platform, individuals or entities with whom We
                have contractual relationships, or relationships You may have with
                businesses listed on Our Platform.
              </p>
              <p>
                Our Privacy Policy may change at any time without prior notice. To stay
                informed about any changes, we recommend reviewing this Privacy Policy
                periodically. You agree that it is Your responsibility to review the
                Privacy Policy regularly.
              </p>
              <p>
                The Company&apos;s terms and conditions are an integral part of Your use
                of this Platform and the Services We provide and should be read
                alongside this Privacy Policy.
              </p>
              <p>
                By using the Company&apos;s Platform and the Services, You: (a) provide
                Your free, specific, informed, explicit, clear, unconditional and
                unambiguous consent to collection, storage, processing and use of the
                Information You provide for any of the Services that We offer; and (b)
                consent to this Privacy Policy and Our Terms.
              </p>
              <p>
                By choosing to provide Your Information via the Platform or while
                availing Our Services, You expressly consent to the Company&apos;s use of
                Your Information for the purposes listed in this Privacy Policy.
              </p>
              <p>
                This Privacy Policy seeks to explain: (a) what information We collect,
                use, disclose, process, store and safeguard; (b) the manner and purpose
                of collecting and handling Your information; (c) Your rights in relation
                to the Information and how You may exercise them; and (d) how You may
                raise complaints or grievances.
              </p>
              <p>
                By accessing Our Platform or using Our Services, You agree to the terms
                outlined in this Privacy Policy. If You do not agree with this Privacy
                Policy, please refrain from using Our Platform and Services.
              </p>
            </div>
          </div>

          <PolicySection id="information-we-collect" number="1" title="Information We collect">
            <Subsection number="1.1">
              <p>
                For utilization of the Platform, it is a prerequisite for You to share
                specific data during registration and for Your activities on the
                Platform. We may collect this information during account registration,
                when You contact Us, or when You interact with customer support. When
                You create an account with the Company (Account), or otherwise use the
                Platform, We may collect:
              </p>
              <LetterList items={personalInformation} />
              <p>
                We may also store other personally identifiable information that You
                voluntarily give to Us when participating in activities related to the
                Platform, such as chat, comment sections, forums, liking posts, sending
                feedback, responding to surveys, or availing Our Services. Information
                You disclose through Your profile, online chat, or other interactive
                areas of the Platform may be public and accessible to anyone who uses
                the Platform.
              </p>
            </Subsection>
            <Subsection number="1.2">
              <p>
                If You agree to avail the Services on the Platform, We may also collect
                and store sensitive personal data or information, including:
              </p>
              <LetterList items={sensitiveInformation} />
              <p>
                Information collected under Paragraph 1.1 and Paragraph 1.2 shall be
                collectively referred to as Personal Information.
              </p>
            </Subsection>
            <Subsection number="1.3">
              <p>
                Pursuant to the Services availed by You from time to time, We may
                require You to provide additional information to comply with Applicable
                Law or for additional services or products offered via the Platform. You
                may choose to provide such information if You wish to use those
                Services.
              </p>
            </Subsection>
            <Subsection number="1.4" title="Information automatically collected while using the Platform">
              <h4 className="font-bold text-[#274D6D]">(a) Device Information and Activity Data</h4>
              <p>
                When You interact with Our Platform, We automatically collect native
                actions integral to the Platform and other interactions via server log
                files. This information does not reveal Your specific identity but may
                include device, activity and usage information, such as Your IP/MAC
                address, browser and device characteristics, operating system, language
                preferences, referring URLs, time spent, device name, country,
                location, information about how and when You use Our Services, screens
                or pages You view, and other technical information.
              </p>
              <p>
                This information is primarily needed to maintain the security and
                operation of Our Services and for internal analytics, reporting, and
                customer-related processes under Paragraph 3.4. We also collect
                information through cookies and similar technologies.
              </p>
              <h4 className="font-bold text-[#274D6D]">(b) User log data</h4>
              <p>
                We will store Your login information, including registration date, date
                of last password change, and date of the last successful login.
                Personal Information and information collected under Paragraphs 1.3
                and 1.4 shall collectively be referred to as Information.
              </p>
            </Subsection>
          </PolicySection>

          <PolicySection id="your-consent" number="2" title="Your consent">
            <p>
              By choosing to provide Your Information via the Platform, You expressly
              consent to the Company&apos;s use of Your Information for the purposes
              listed in this Privacy Policy. From time to time, We may ask for Your
              specific consent to collect certain additional information in relation to
              the Services provided by the Platform.
            </p>
            <p>
              You may choose not to provide such information or You may withdraw Your
              consent at any time by adapting Your privacy settings on Our Platform or
              by contacting Our customer support services at the address provided at
              the end of this Privacy Policy.
            </p>
          </PolicySection>

          <PolicySection id="use-of-information" number="3" title="Use and processing of Your Information">
            <Subsection number="3.1">
              <p>
                We use and process Your Information to carry out Our contractual
                commitments towards You in connection with the Platform, for purposes
                based on legitimate business interests and to provide better Services.
              </p>
            </Subsection>
            <Subsection number="3.2">
              <p>
                We use and process Your Information to provide, measure, and improve
                Our Services and Platform, and to create and maintain a trusted, safe,
                and secure environment. The Information collected allows Us to assess
                usage and effectiveness and enhance the functionality of Our Platform
                and Services.
              </p>
            </Subsection>
            <Subsection number="3.3">
              <p>
                We use Your Information for internal operations necessary to provide
                Our Services, including troubleshooting, data analysis, testing,
                research, monitoring usage and activity trends, obtaining feedback, and
                statistical consumer research.
              </p>
            </Subsection>
            <Subsection number="3.4">
              <p>We may also use and process Information collected about You to:</p>
              <LetterList
                items={[
                  "Conduct know your customer (KYC) checks and other customer background checks required by Applicable Law.",
                  "Assist Us or Our business partners in delivering services, processing payments and applications, and communicating about products, services, and promotional offers.",
                  "Respond to Your queries or requests and resolve grievances, issues, or problems regarding services supplied to You.",
                  "Administer or carry out Our obligations under agreements with Our business partners.",
                  "Send information about special promotions, offers, new features, products, or services from Us or third parties with whom ScoreCare has a tie-up.",
                  "Perform internal analysis and provide location-based services, advertising, search results, and other personalized content.",
                  "Improve Our Platform, prevent or detect fraud or abuse, and enable third parties to perform technical, logistical, or other functions on Our behalf. We may combine information from You with information obtained from third parties.",
                  "Send notices and communications, recommend services, update Our records, maintain Your accounts, and display content and customer reviews.",
                  "Send notices or important news about Your account, request feedback or opinions, and provide updates on special deals and offers when You provide Your contact details.",
                  "Obtain file-storage permissions on Android, iOS, and the Website to upload customer documents for processing customer applications by Our Partners.",
                  "With Your consent, obtain one-time access to Your camera, microphone, location, and other facilities for service facilitation, onboarding, KYC, ease of access, and login.",
                  "Act on Your behalf and engage with lending partners to facilitate loan-related actions, including repayments, closures, and settlements.",
                  "Contact Your lending partners and share relevant personal, financial, and loan-related information as necessary to perform actions You request.",
                  "Use Your Information as otherwise provided in this Privacy Policy and in compliance with applicable laws.",
                ]}
              />
            </Subsection>
          </PolicySection>

          <PolicySection id="information-sharing" number="4" title="Disclosure and sharing of Your Information">
            <Subsection number="4.1" title="By Applicable Law or to protect rights">
              <p>
                If We believe releasing Information about You is necessary to respond
                to legal process, investigate or remedy potential policy violations, or
                protect the rights, property, and safety of others, We may share it as
                permitted or required under Applicable Law. This includes fraud
                protection, credit risk reduction, governmental requests, judicial
                proceedings, court orders, summons, national security, and law
                enforcement requirements.
              </p>
            </Subsection>
            <Subsection number="4.2" title="Third-party service providers">
              <p>
                We use third-party providers for website and application development,
                hosting, maintenance, backup, storage, payment processing, analysis,
                and other services. They may access or use Information only to the
                extent required to perform their function and agree to strict
                confidentiality and data-protection obligations.
              </p>
              <p>
                Only required information will be shared with authorized third parties
                for verification. We may also share Information with providers of data
                analysis, email delivery, customer service, and marketing assistance,
                and aggregated Information for research, analysis, testing, and
                improving the Platform and User experience.
              </p>
            </Subsection>
            <Subsection number="4.3" title="Marketing communications">
              <p>
                With Your explicit consent, or with an opportunity for You to withdraw
                consent, We may share Your Information with third parties for marketing
                purposes as permitted by Applicable Law.
              </p>
            </Subsection>
            <Subsection number="4.4" title="Third-party advertisers">
              <p>
                We may use third-party advertising companies to serve ads when You
                visit the Platform. These companies may use information about Your
                visits to the Platform and other websites contained in web cookies to
                provide advertisements about goods and services of interest to You.
              </p>
            </Subsection>
            <Subsection number="4.5" title="Commercial partners">
              <p>
                We may share Your Information with Our business partners to offer You
                certain products, services, or promotions.
              </p>
            </Subsection>
            <Subsection number="4.6" title="Sale or bankruptcy">
              <p>
                If We reorganize, sell assets, merge, undergo a change in control or
                ownership, or are acquired, We may transfer Your Information to the
                successor entity. If We go out of business or enter bankruptcy, Your
                Information may be an asset transferred to or acquired by a third party.
              </p>
            </Subsection>
            <Subsection number="4.7" title="Performance of a contract">
              <p>
                Where We have entered into a contract with You, We may process Your
                Information to fulfill its terms. We are not responsible for the actions
                of third parties with whom You share personal or sensitive data. If You
                no longer wish to receive third-party correspondence, You are
                responsible for contacting the third party directly.
              </p>
            </Subsection>
          </PolicySection>

          <PolicySection id="storage-retention" number="5" title="Storage, retention and deletion of Your Information">
            <Subsection number="5.1">
              <p>Information that the Company collects will be stored in India.</p>
            </Subsection>
            <Subsection number="5.2">
              <p>
                We retain Your Information only as long as necessary to provide the
                Services, comply with legal obligations, or until You request erasure,
                deletion, or cessation of processing, whichever is earlier. We do not
                retain Your Information beyond 10 (Ten) years from onboarding, except
                where required by Applicable Law.
              </p>
            </Subsection>
            <Subsection number="5.3">
              <p>
                After Your account is terminated, We may continue to use anonymised
                data aggregated or combined with other Users&apos; anonymised data. Where
                a User violates the Terms or requests deletion, We will promptly take
                necessary action to delete the Information in accordance with
                Paragraph 7.5.
              </p>
            </Subsection>
            <Subsection number="5.4">
              <p>
                To withdraw consent for processing Your Information, contact Lingala
                Ramu at grievances@scorecareapp.com. We will continue to retain
                Information required under Applicable Law and may retain certain
                Information shared in connection with Services You have availed.
              </p>
            </Subsection>
          </PolicySection>

          <PolicySection id="tracking-technologies" number="6" title="Tracking Technologies">
            <Subsection number="6.1" title="Cookies and web beacons">
              <p>
                We may use cookies and web beacons when You access the Platform. Most
                browsers accept cookies by default. You can remove or reject cookies,
                but doing so may affect the availability and functionality of the
                Platform. Web beacons can be rendered ineffective by declining cookies
                or changing browser settings to notify You each time a cookie is
                offered.
              </p>
            </Subsection>
            <Subsection number="6.2" title="Internet-based advertising">
              <p>
                We may use third-party software to serve ads, implement email marketing
                campaigns, and manage interactive marketing initiatives. This software
                may use cookies or similar tracking technology to manage and optimize
                Your online experience with Us.
              </p>
            </Subsection>
            <Subsection number="6.3" title="Security of Your Information">
              <p>
                We use administrative, technical, and physical security measures to
                help protect Your Information. Despite reasonable steps, no security
                measure is perfect or impenetrable and no transmission method can be
                guaranteed against interception or misuse. Therefore, We cannot
                guarantee complete security if You provide Information. Please also see
                Paragraph 9.
              </p>
            </Subsection>
          </PolicySection>

          <PolicySection id="your-rights" number="7" title="Your rights and choices">
            <Subsection number="7.1" title="Access/rectify">
              <p>
                Platform tools and account settings can help You access, rectify, or
                remove Personal Information associated with Your account. You can edit
                Your profile directly. For non-editable or inaccurate Information,
                contact Lingala Ramu at grievances@scorecareapp.com.
              </p>
            </Subsection>
            <Subsection number="7.2" title="Device permission">
              <p>
                Your device may have permissions for contacts, pictures, location,
                push notifications, advertising identifiers, and other data. You can
                change device settings to consent to or oppose collection, use, or
                notifications, although certain Services may lose functionality.
              </p>
            </Subsection>
            <Subsection number="7.3" title="Uninstall and account closure">
              <p>
                You can stop Information collection by uninstalling the App through the
                standard process for Your device. Uninstalling does not close Your
                account. You can close Your account using the corresponding
                functionality directly within the Service.
              </p>
            </Subsection>
            <Subsection number="7.4" title="Reviewing Your Information">
              <p>
                You may have the right to review the Personal Information We keep about
                You, which may be called a right of access or portability. You can also
                request a copy of Your Personal Information through the Platform.
              </p>
            </Subsection>
            <Subsection number="7.5" title="Delete/erase">
              <p>
                You may request deletion of Personal Information through the Platform
                or by contacting Lingala Ramu at grievances@scorecareapp.com. This
                right is subject to retention requirements under Applicable Law. If You
                request deletion or processing restrictions, We reserve the right to
                suspend or terminate Services to You.
              </p>
            </Subsection>
            <Subsection number="7.6" title="Nominate">
              <p>
                You have the right to nominate another individual who, in the event of
                Your death or incapacity, may exercise Your rights in accordance with
                Applicable Law.
              </p>
            </Subsection>
          </PolicySection>

          <PolicySection id="your-duties" number="8" title="Your duties">
            <p>You shall perform the following duties, including but not limited to:</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["8.1", "Comply with the provisions of Applicable Law."],
                ["8.2", "Do not impersonate another person while providing personal data for a specified purpose."],
                ["8.3", "Do not suppress material information when providing data for identity or address documents issued by the State or its instrumentalities."],
                ["8.4", "Do not register a false or frivolous grievance or complaint with Us or legal authorities."],
                ["8.5", "Furnish only genuine and correct information that is verifiably authentic under Applicable Law."],
              ].map(([number, duty]) => (
                <div key={number} className="rounded-xl border border-[#E3EBEF] bg-[#F9FBFC] p-4">
                  <span className="mb-2 block text-xs font-extrabold text-[#15977A]">{number}</span>
                  <p className="text-sm leading-6">{duty}</p>
                </div>
              ))}
            </div>
          </PolicySection>

          <PolicySection id="information-security" number="9" title="Information security">
            <Subsection number="9.1">
              <p>
                We adopt reasonable security measures designed to protect against
                unauthorized access to Your Information. These include periodic reviews
                of data collection, storage, processing, encryption, and physical
                security practices. Information gathered on Our Platform is securely
                stored in a controlled database. Server access is password-protected,
                controlled, and strictly limited.
              </p>
            </Subsection>
            <Subsection number="9.2">
              <p>
                We audit Our security practices and procedures annually or whenever the
                Platform undergoes a significant process upgrade.
              </p>
            </Subsection>
          </PolicySection>

          <PolicySection id="no-children" number="10" title="No children">
            <p>
              Our Services are restricted to individuals who are 18 (Eighteen) years
              of age or older. We do not permit individuals under 18 to access Our
              Platform. If You suspect that a member is under 18, please use the
              reporting mechanism available on the Platform.
            </p>
          </PolicySection>

          <PolicySection id="policy-changes" number="11" title="Changes to Privacy Policy">
            <Subsection number="11.1">
              <p>
                We reserve the right to modify, change, or update this Privacy Policy at
                Our discretion at any time and without assigning any reason. Changes
                are effective immediately when the revised Privacy Policy is posted.
              </p>
            </Subsection>
            <Subsection number="11.2">
              <p>
                You are encouraged to periodically review this Privacy Policy. By
                continuing to use the Website or App after a revision is posted, You
                will be deemed aware of, subject to, and accepting of the changes.
              </p>
            </Subsection>
            <Subsection number="11.3">
              <p>The date on this Privacy Policy reflects the last amended date.</p>
            </Subsection>
          </PolicySection>

          <PolicySection id="privacy-questions" number="12" title="Privacy questions and access">
            <p>
              If You have questions, concerns, or suggestions regarding Our Privacy
              Policy, contact Lingala Ramu at grievances@scorecareapp.com. Where Your
              Personal Information is not accessible online, contact customer support
              via Chat Support to request a copy, correct it, or exercise Your rights.
            </p>
            <p>
              If Your queries or complaints are not resolved within 15 (Fifteen) days,
              You may contact Our compliance officer at grievances@scorecareapp.com.
            </p>
          </PolicySection>

          <PolicySection id="withdrawal-of-consent" number="13" title="Withdrawal of consent">
            <Subsection number="13.1">
              <p>
                Subject to legal and contractual requirements for providing Services,
                You can refuse to consent to collection, use, storage, retention,
                processing, or disclosure of Personal Information, or withdraw Your
                consent to further handling of Personal Information at any time by
                writing to Our compliance officer.
              </p>
            </Subsection>
            <Subsection number="13.2">
              <p>
                For grievances regarding this Privacy Policy, data usage policy, data
                usage practices, or digital-lending complaints, contact customer
                support via Chat Support. If unresolved within 15 (Fifteen) days,
                contact Our compliance officer:
              </p>
              <div className="grid gap-4 rounded-2xl bg-[#102F49] p-6 text-white sm:grid-cols-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#63E2C4]">Compliance Officer</span>
                  <p className="mt-1 font-semibold">Lingala Ramu</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#63E2C4]">Email</span>
                  <a className="mt-1 block font-semibold hover:text-[#63E2C4]" href="mailto:grievances@scorecareapp.com">
                    grievances@scorecareapp.com
                  </a>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#63E2C4]">Contact number</span>
                  <a className="mt-1 block font-semibold hover:text-[#63E2C4]" href="tel:+917799440409">
                    +91 77 99 44 04 09
                  </a>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#63E2C4]">Address</span>
                  <p className="mt-1 text-sm leading-6 text-white/75">
                    P.No.18/2, Sector III, HUDA Techno Enclave, Madhapur, Shaikpet,
                    Hyderabad - 500081, Telangana
                  </p>
                </div>
              </div>
              <p>
                Upon the User opting out to withdraw consent, the Company will not be
                under any obligation to provide the Services.
              </p>
            </Subsection>
          </PolicySection>

          <PolicySection id="dispute-redressal" number="14" title="Dispute redressal">
            <p>
              The Users agree that the courts at Hyderabad, India shall have exclusive
              jurisdiction to settle any legal action or proceedings arising out of
              Your use of this Platform.
            </p>
          </PolicySection>
          </article>
        </WebsitePrivacyPolicy>
      </div>

      <footer className="bg-[#1B3A57] px-5 py-10 text-white/65 md:px-10 lg:px-[5%]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-9 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 text-white">
              <span className="flex h-14 w-40 items-center overflow-hidden rounded-xl bg-white">
                <Image
                  src={scorecareLogo}
                  alt="ScoreCare"
                  className="h-10 w-40 scale-[2.05] object-contain"
                />
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
              ScoreCare by Scoresathi Technologies, helping every Indian understand,
              monitor, and improve their credit score.
            </p>
          </div>
          {[
            ["Product", [["Credit Score", "/#credit-score"], ["Features", "/#benefits"], ["Download App", PLAY_STORE_URL]]],
            ["Company", [["About Us", "/#about"], ["Contact", "/#contact"], ["Careers", "/#contact"]]],
            ["Legal", [["Privacy Policy", "/privacy-policy"], ["Terms of Service", "/#policies"], ["Disclaimer", "/#policies"]]],
          ].map(([title, links]) => (
            <div key={title as string} className="min-w-0">
              <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-white">
                {title as string}
              </h4>
              <ul className="space-y-3 text-sm">
                {(links as string[][]).map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="transition hover:text-[#2EC4A0]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs leading-5 text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Scoresathi Technologies Pvt. Ltd. All rights reserved.</p>
          <p>Integrated with Experian &amp; CRIF High Mark.</p>
        </div>
      </footer>
    </main>
  );
}
