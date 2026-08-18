if i were to develop a similar website for my own business (deft-websites.vercel.app) what are the technical details and the business decisions i should be making to do things more like withunio.com ?

i want the technical things like the UI components, book an intro call service, apis, search queries, etc things that make their website look and perform so much better than mine, help me make business decisions that will help the website perform well in short consize dev notes and honest feedback.

THINK THEN ANSWER

---

I looked at your goal from two angles:

1. **Why WithUnio feels premium**
2. **Why most agency websites (including yours, likely) feel like student projects**

The biggest difference is **not design quality**. It's positioning, trust, and conversion architecture.

# 1. Business Decisions First (Most Important)

### Stop selling websites

WithUnio is not selling websites.

They're selling:

> More leads → More customers → More revenue

Your website should never say:

❌ "We build modern websites"

Instead:

✅ "We help service businesses get more leads through conversion-focused websites"

People buy outcomes.

---

### Pick one niche

Right now Deft probably feels like:

> "We can build anything for anyone"

That destroys trust.

Choose one:

* Local businesses
* Tailors
* Dentists
* SaaS startups
* Coaches
* Real estate

Example:

> "We build websites for tailoring and fashion businesses."

Immediately stronger.

---

### Productize your service

Don't offer:

* Basic Website
* Premium Website
* Enterprise Website

Offer:

### Lead Generation Website

₹40k

### Conversion Landing Page

₹15k

### Local Business Growth Package

₹60k

People buy solutions.

---

### Show proof early

WithUnio pushes trust quickly.

You need:

* Results
* Screenshots
* Metrics

Example:

> Increased appointment bookings by 37%

Even one real case study is worth more than 50 design screenshots.

---

# 2. Technical Stack I'd Use

If I rebuilt Deft today:

### Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui

Why?

* Fast
* SEO friendly
* Easy deployment

---

### Animations

WithUnio uses movement carefully.

Use:

* Framer Motion
* Motion One

Only:

* Fade
* Slide
* Hover

Avoid:

❌ Floating particles

❌ Typewriter effects

❌ Excessive parallax

These scream "student portfolio".

---

### Fonts

Premium combinations:

Option 1

* Inter
* Geist

Option 2

* Manrope
* Geist

Avoid:

❌ Poppins everywhere

---

# 3. UI Components You Need

### Sticky Navigation

Logo left

CTA right

"Book Intro Call"

Always visible.

---

### Hero

Simple:

Headline

Subheadline

Primary CTA

Proof

Example:

```
Websites that bring you more customers.

We design conversion-focused websites
for service businesses.

[Book Intro Call]
```

---

### Social Proof Strip

Immediately after hero:

```
Trusted by 10+ businesses
100k+ website visitors generated
```

---

### Services Grid

3 cards maximum.

Too many services = confusion.

---

### Process Section

1. Discovery
2. Strategy
3. Build
4. Launch

---

### Case Studies

Most important section.

Not portfolio.

Case studies.

---

### FAQ

Great for SEO.

---

### Final CTA

Every page ends with:

> Ready to grow?

Book Intro Call

---

# 4. Booking System

This is where many agencies lose leads.

Use:

### Option A (Best)

[Cal.com](https://cal.com?utm_source=chatgpt.com)

Advantages:

* Free
* Self hosted possible
* Google Calendar sync

---

### Option B

[Calendly](https://calendly.com?utm_source=chatgpt.com)

Easy setup.

---

### Booking Questions

Ask:

* Name
* Business
* Website
* Monthly revenue
* Biggest challenge

This qualifies leads.

---

# 5. Analytics Stack

Most people stop at Google Analytics.

Use:

### Analytics

[Google Analytics 4](https://analytics.google.com?utm_source=chatgpt.com)

Track:

* CTA clicks
* Form submits
* Scroll depth

---

### Session Recording

[Microsoft Clarity](https://clarity.microsoft.com?utm_source=chatgpt.com)

Watch:

* Rage clicks
* Dead clicks
* Scroll behavior

Free.

Massive advantage.

---

### Conversion Tracking

Track:

```
book_call_clicked
form_submitted
case_study_opened
```

Not page views.

---

# 6. SEO Strategy

Most agencies do SEO wrong.

You don't need 100 blogs.

You need:

### Service Pages

```
website-design-chennai
website-design-bangkok
tailor-website-design
fashion-brand-websites
```

---

### Case Studies

Google loves:

```
How We Increased Leads by 43%
```

---

### Technical SEO

Add:

* Sitemap
* Robots.txt
* Metadata
* OpenGraph
* Schema

Next.js handles most of this easily.

---

# 7. APIs Worth Adding

### Email

[Resend](https://resend.com?utm_source=chatgpt.com)

Best developer experience.

Lead notification:

```
New call booked
New inquiry
```

---

### CRM

[HubSpot](https://www.hubspot.com?utm_source=chatgpt.com)

or

[Notion](https://www.notion.so?utm_source=chatgpt.com)

Store leads automatically.

---

### Forms

Don't use Formspree.

Build API routes.

```
/api/contact
/api/book-call
```

Store everything.

---

# 8. Search Queries I Would Research

Look at what potential clients search.

Examples:

```
website designer for tailors
fashion website development
small business website design
website redesign services
conversion focused websites
landing page designer
web design agency near me
```

Create pages around these.

---

# 9. Brutally Honest Feedback

Most agency websites fail because:

### They talk about themselves

"We are passionate."

Nobody cares.

---

### They show skills

"React, Node, MongoDB"

Clients don't buy stacks.

They buy outcomes.

---

### Too much design

Fancy animations.

No proof.

No results.

No trust.

---

### Weak CTA

"Contact us"

Instead:

> Book a 15-Minute Strategy Call

Specific beats generic.

---

# If I were you

Given you're a CS student and trying to get clients, I'd rebuild Deft around:

**Hero**
→ Outcome

**Case Studies**
→ Proof

**Services**
→ Productized offers

**Calendly/Cal.com**
→ Book call

**Microsoft Clarity**
→ Behavior analytics

**Resend**
→ Lead notifications

**Next.js + Tailwind + shadcn**
→ Fast SEO-first stack

And I'd spend **80% of my effort getting 3 strong case studies and testimonials**, because that will increase conversions far more than any animation, component library, or fancy homepage effect.
