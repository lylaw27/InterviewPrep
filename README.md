# InterviewPrep - Full Stack Project

## 🧭 Overview

**InterviewPrep** is a full-featured e-commerce web application designed for job seekers looking to ace interviews with curated question packs. Built using the modern **Next.js full stack framework**, it combines dynamic content delivery, secure user authentication, payment processing, and AI-powered resume analysis.

Users can browse and purchase question packs tailored for different job roles, upload their resumes for personalized improvement suggestions using **OpenAI**, and manage their shopping experience with a responsive and intuitive interface. An admin dashboard enables efficient management of interview packs and user submissions.


## 🛠️ Tech Stack

| Area                  | Tech                                     |
|-----------------------|------------------------------------------|
| Full Stack Framework  | [Next.js](https://nextjs.org/)           |
| Styling               | [Tailwind CSS](https://tailwindcss.com/) |
| User Authentication   | [Auth0](https://auth0.com/)              |
| Database              | [PostgreSQL](https://www.postgresql.org/)|
| Payment System        | [Stripe](https://stripe.com/)            |
| Resume Analysis       | [OpenAI API](https://platform.openai.com)|
| Deployment            | [Vercel](https://vercel.com)             |


## 🚀 Features

<p align="center" width="100%">
    <img width="60%" src="/public/interviewDiagram.png">
</p>

### 🛒 User-Facing
- Browse & purchase curated **interview question packs**

- **Stripe-powered** checkout and secure payments

- **Resume Upload Page** with in-depth **AI analysis** using OpenAI

- **Auth0 Authentication** – Login/signup with secure OAuth

- **Shopping cart** with sessions stored in database and authenticated syncing

### 💳 Stripe Payments
- Stripe checkout is used to handle secure payments.

- After payment, users will have full access to the interview question package that they paid for.

- Purchases are saved in the PostgreSQL database and linked to the authenticated user.

### 📄 Resume Upload & Analysis (OpenAI)
- Users can upload a .pdf resume for analysis.

- OpenAI is used to:
    - Rate resumes according to job descriptions given by users
    - Identify strengths and weaknesses
    - Suggest possible improvements

- Results are then saved to database and shown to users.

### 🔐 Admin Panel
- Accessible only by users with a designated admin role.

- Create/edit/delete interview question packs

- View uploaded resumes and their results

- Monitor Stripe order history

### 🌐 API Routes for Data Handling
API routes are called when third-party app integrations are needed. For interaction with the local database, it is done by NextJS server actions for simplicity. The key API endpoints are as follows:

```http
POST /api/checkout_sessions: Create stripe checkout session

POST /api/ats: Create prompt with the uploaded resume.pdf and job description for OpenAI API
```

## Installation

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/lylaw27/InterviewPrep.git
cd InterviewPrep
```

### 2. Install Dependencies

Install the required dependencies using either npm or yarn:

```bash
npm install
# or
yarn install
```

This will install all the necessary packages from package.json including Next.js, CSS3, and other dependencies.

### 3. Set Up Environment Variables
Create a .env.local file in the root of the project and add the following environment variables. These variables are used to configure authentication, image storage, and the database connection.

```bash
#PostgreSQL (Supabase)
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anonKey>

#Stripe
STRIPE_SECRET_KEY=<your-stripe-secretKey>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishableKey>

#OpenAI
OPENAI_API_KEY=<your-openai-apiKey>
```

### 4. Run the Project Locally
Now that everything is set up, you can run the development server with:

```bash
npm run dev
# or
yarn dev
```

The application will be running at http://localhost:3000. Visit this URL in your browser to see the blog site in action.

### 5. Admin Login
To access the Admin Panel, you'll need to log in through Auth0. Visit the following route:

```bash
/dashboard
```
This will redirect you to the Auth0 login page, where you can log in using your credentials. Once authenticated, you'll be able to access the Admin Panel to create, edit, or delete interview questions.

## Project Structure

```bash
interviewprep/
├── app/
│   ├── api/
│   │   ├── ats/
│   │   │   └── route.ts                #API for creating OpenAI prompt for resume analysis
│   │   └── checkout_sessions/
│   │       └── route.ts                #Create Stripe checkout session
│   ├── 50qpage/
│   │   └── page.tsx                    #Top 50 Questions Page
│   ├── atspage/
│   │   └── page.tsx                    #Product Page for resume analysis
│   ├── atsscan/
│   │   ├── page.tsx                    #Page for uploading resume     
│   │   └── [resultId]/                 
│   │       ├── action.tsx
│   │       └── page.tsx                #Resume analysis result page
│   ├── checkout/                       
│   │   ├── action.tsx                  #Checkout server actions
│   │   ├── checkout.tsx                
│   │   └── page.tsx                    #Checkout page
│   ├── dashboard/
│   │   ├── action.tsx                  #Interview jobs server actions
│   │   ├── jobtable.tsx                
│   │   ├── page.tsx                    #Dashboard page for read/write interview jobs
│   │   └── [jobid]/
│   │       ├── action.tsx              #Interview questions server actions
│   │       ├── questiontable.tsx
│   │       └── page.tsx                #Dashboard page for read/write interview questions
│   ├── layout.tsx
│   ├── login/
│   │   ├── actions.tsx                 #Authentication server actions
│   │   └── page.tsx                    #User Login page
│   ├── myquestion/
│   │   └── [career]/
│   │       ├── accordianPage.tsx
│   │       ├── action.tsx              #Interview questions server action
│   │       └── page.tsx                #Interview Questions page
│   ├── page.tsx                        #Home Page
│   ├── providers.tsx
│   └── return/
│       └── page.tsx                    #Payment Success Page
└── components/                         #React components
    ├── types/
    │   └── careerTypes.ts              #Typescript Interfaces
    │
    ...
```

## Deployment
You can deploy this project on platforms like Vercel (ideal for Next.js) or Netlify. After pushing the code to your GitHub repository, connect it to your Vercel/Netlify account for continuous deployment.

### Deployment Steps:
##### 1. Push your project to a GitHub repository.

##### 2. Connect the repository to Vercel or Netlify.

##### 3. Set the environment variables on the deployment platform.

##### 4. Your project will be automatically deployed, and you’ll receive a live URL.
