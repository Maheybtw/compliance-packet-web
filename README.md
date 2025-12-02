# 🌐 Compliance Packet Web  
**Frontend documentation site & live tester for the Universal Compliance Packet API.**  
Built with Next.js, styled for clarity, and designed to help developers integrate trust/safety in minutes.

---

## 🚀 Overview

This repository contains the **public web interface** for Compliance Packet, including:

- 📄 **Product landing page**  
- 📘 **Developer documentation**  
- 🧪 **Live API tester**  
- 📊 **Usage dashboard**  
- 🗝 **API key creation interface** (via backend)

It is deployed on **Vercel** and tightly integrated with the Compliance Packet backend API (Railway).

---

## 🛠 Tech Stack

- **Next.js 14** (App Router)  
- **React**  
- **TailwindCSS**  
- **TypeScript**  
- Hosted on **Vercel**

---

## 🧑‍💻 Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```


The site will be available at:

👉 http://localhost:3000

Hot reload is enabled — edit any file in `/app/**` and the page updates automatically.

Production site: **<https://compliance-packet-web.vercel.app>**

---

## 📁 Important Structure

```
app/
  page.tsx            → Landing page
  docs/page.tsx       → Documentation
  tester/page.tsx     → Live API tester
  components/         → UI components
public/
  assets/             → Logos & branding
```

---

## 🔌 Backend Connection

The frontend communicates with the Compliance Packet API via:

```
NEXT_PUBLIC_API_BASE_URL=https://your-api-url
```

You must set this in your Vercel environment variables for production.

---

## 📦 SDK Links

The site surfaces official SDKs:

- **JavaScript / TypeScript**  
  https://www.npmjs.com/package/compliance-packet

- **Python**  
  https://pypi.org/project/compliance-packet/

---

## 🚀 Deployment

Deployment is handled automatically by Vercel when pushing to `main`.

Manual deploy:

```bash
vercel --prod
```

Before deploying, ensure environment variables are present in Vercel:

- `NEXT_PUBLIC_API_BASE_URL`

---

## 🤝 Contributing

Contributions are welcome!  
Open issues, submit PRs, or request features — the goal is to make Compliance Packet the **simplest AI trust layer on the market.**

---

## 📄 License

MIT
