<div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/-React-blue?style=for-the-badge&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/-TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/-Convex-f0a203?style=for-the-badge&logoColor=white" alt="Convex" />
    <img src="https://img.shields.io/badge/-ShadCN-black?style=for-the-badge&logoColor=white" alt="ShadCN" />
    <img src="https://img.shields.io/badge/-Stripe-9c28e6?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
    <img src="https://img.shields.io/badge/-EdenAI-063fe0?style=for-the-badge&logoColor=white" alt="EdenAI" />
    <img src="https://img.shields.io/badge/Google%20OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google OAuth" />
</div>

## 📋 <a name="table">Table of Contents</a>

1. ✨ [Introduction](#introduction)
2. ✅ [Tech Stack](#tech-stack)
3. 🕹️ [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 📱 [Snippets](#snippets)

## <a name="introduction">✨ Introduction</a>

**AI Assistant Chat** is a full-featured web app that allows users to create and interact with personalized AI assistants. Whether for productivity, brainstorming, coding help, or casual conversation, AI Assistant Chat lets users tailor their AI experience by selecting or creating an assistant, defining a title and instructions, and choosing from various AI models provided by EdenAI. By offering a customizable chat environment, the platform optimizes AI interactions to align with each user's unique needs. With AI Assistant Chat, users can craft dynamic and intelligent conversations, enhancing their workflows and knowledge-sharing with ease.

### Disclaimer

**AI Assistant Chat** is inspired by the TubeGuruji YouTube channel. However, while drawing from a similar concept, this web app goes beyond by offering a more advanced database structure with detailed relational models, a fully customizable UI, and a mobile app version is also in development, further enhancing accessibility and user experience across platforms.

## <a name="tech-stack">✅ Tech Stack</a>

- **[Next.js](https://nextjs.org/)** – React framework for server-side rendering and optimized performance  
- **[React](https://react.dev/)** – Core library for building the interactive UI  
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for styling  
- **[ShadCN](https://ui.shadcn.com/)** – Pre-styled UI components for a modern and accessible design  
- **[Convex](https://convex.dev/)** – Backend-as-a-service for real-time database and queries  
- **[EdenAI](https://www.edenai.co/)** – AI model provider for diverse assistant capabilities  
- **[Stripe](https://stripe.com/)** – Payment processing for monetization and premium features  
- **[Google OAuth](https://developers.google.com/identity)** – Secure authentication and user sign-in

## <a name="features">🕹️ Features</a>

- **🛠 Create Custom AI Assistants** – Users can create AI assistants by defining a title, providing instructions, and selecting an AI model.  
- **🤖 Multiple AI Model Support** – Choose from various AI models provided by EdenAI to optimize responses based on different needs.  
- **💬 Real-Time Conversations** – Engage in interactive chats with AI assistants, with smooth and responsive messaging.  
- **📂 Chat History & Persistence** – Save and access past conversations for continuity and reference.    
- **🔐 Secure Authentication** – Google OAuth integration ensures a safe and seamless login experience.  
- **💳 Subscription & Monetization** – Stripe integration allows for premium AI assistants and pay-as-you-go features.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to run the AI Assistant Chat app locally.

### 📌 Prerequisites  
- **Node.js** (Latest LTS recommended)  
- **Yarn or npm** (Package manager)  
- **Convex CLI** (`npm install -g convex`)

### 🚀 Setup & Run  

1. **Clone the repository**  
```sh
git clone https://github.com/your-repo/ai-assistant-chat.git
cd ai-assistant-chat
```
2. **Install dependencies**
```sh
npm install
# or
yarn install
```
3. **Set up environment variables**
Create a .env.local file in the root directory and add the following:
```ini
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
```
4. **Start the Convex backend**
```sh
npx convex dev
```
5. **Run the Next.js app**
```sh
npm run dev
# or
yarn dev
```
6. **Open in browser**
Open [http://localhost:3000](http://localhost:3000) with your browser to start using the app! 🚀

## <a name="snippets">📱 Snippets</a>

Visit deployed website [HERE](https://next-js-ai-assistants.vercel.app/signin)
