# House of EdTech Assignment Reference Document

Fullstack Developer Assignment 

## Phase 1: Strategic Planning & Idea Generation (The Intellectual Showcase)

### Step 1.1: Define the Problem & User Group (The 'Why')

You must choose a **user group** and a **real-world problem** that is more complex than a simple To-Do List.

| User Group Example | Scenario/Problem Example | CRUD Entity | **AI Feature Add-on Idea (Optional)** |
| --- | --- | --- | --- |
| **Small Business Owner** | Managing project scopes and client revisions. | `Project Scope Document` | Auto-generate a **Risk Assessment** summary based on the document's content. |
| **Remote Learning Students** | Tracking study progress across multiple courses and topics. | `Learning Topic/Module` | Generate **Flashcards or Quiz Questions** instantly based on the module's summary text. |
| **Freelance Developers** | Tracking time spent on various feature branches and client projects. | `Time Log Entry` | Predict **project completion time** based on current log entries and historical data. |

**Action:** Choose one compelling idea that allows for sophisticated data relationships and demonstrates value.

### Step 1.2: Design the Data Schema (The 'What')

Before coding, define your main entities and their fields.

- **Example (Learning Tracker):**
    - **Entity:** `Module`
    - **Fields:** `moduleId (string/UUID)`, `title (string)`, `status (enum: 'Planned', 'In Progress', 'Completed')`, `estimatedHours (number)`, `notes (text)`.

### Step 1.3: Choose Your Database

The requirement lists **PostgreSQL** (SQL) and **MongoDB** (NoSQL).

- **Recommendation:**
    - For relational data (like users, courses, and lessons linked together), **PostgreSQL** is ideal.
    - For flexible or document-based data (like settings, logs, or complex, unstructured data), **MongoDB** is a good choice.

## Phase 2: Technology Setup (The Foundation)

This ensures your project starts with the right mandatory tools and best practices.

### Step 2.1: Initialize the Next.js Project (TypeScript Mandatory)

Use the official Next.js setup, ensuring you select **TypeScript**, **App Router**, and **Tailwind CSS**.

```
npx create-next-app@latest my-fullstack-assignment
# Select:
# ✔ Would you like to use TypeScript? · Yes
# ✔ Would you like to use ESLint? · Yes
# ✔ Would you like to use Tailwind CSS? · Yes
# ✔ Would you like to use the `src/` directory? · Yes
# ✔ Use App Router (recommended)? · Yes
# ✔ Would you like to customize the default import alias (@/*)? · No

```

### Step 2.2: Setup Database Connection

Use an **ORM (Object-Relational Mapper)** or **ODM (Object-Document Mapper)** to manage your database, as this is a modern best practice.

- **For PostgreSQL/MySQL:** Use **Prisma** (Highly recommended for type safety with TypeScript).
    - Install: `npm install prisma typescript ts-node @types/node --save-dev`
    - Initialize: `npx prisma init` (This creates `schema.prisma` and sets up the connection string in `.env`).
- **For MongoDB:** Use **Mongoose**.
    - Install: `npm install mongoose @types/mongoose`

### Step 2.3: Configure ESLint and Prettier

Ensure your `package.json` includes scripts and configurations for clean, consistent code. This addresses the "Code Quality" evaluation criterion.

## Phase 3: Backend and Data Layer (Secure CRUD)

This phase focuses on implementing the CRUD operations, leveraging Next.js API Routes (Route Handlers) and TypeScript.

### Step 3.1: Define Data Types (Type Safety)

If using Prisma, your database schema automatically generates TypeScript types. If using Mongoose, define strong interfaces. This is crucial for **TypeScript maintainability**.

```
// Example: src/types/module.ts
export interface Module {
  id: string;
  title: string;
  status: 'Planned' | 'In Progress' | 'Completed';
  notes: string;
}

```

### Step 3.2: Implement CRUD API Route Handlers

In the Next.js App Router, API routes are created in `app/api/your-entity/route.ts`.

| Operation | HTTP Method | Route Example |
| --- | --- | --- |
| **Read (All)** | `GET` | `app/api/modules/route.ts` |
| **Read (Single)** | `GET` | `app/api/modules/[id]/route.ts` |
| **Create** | `POST` | `app/api/modules/route.ts` |
| **Update** | `PUT`/`PATCH` | `app/api/modules/[id]/route.ts` |
| **Delete** | `DELETE` | `app/api/modules/[id]/route.ts` |

### Step 3.3: Implement Robust Validation and Sanitization

**Security Requirement:** Never trust client input.

1. **Server-Side Validation:** Use a validation library like **Zod** in your API Route Handlers to ensure data types and formats are correct *before* hitting the database.
2. **Sanitization:** For free-form text fields (like `notes`), ensure you are sanitizing to prevent **XSS (Cross-Site Scripting)** attacks if that content is ever rendered as raw HTML.

### Step 3.4: Implement Authentication (Good to Have)

Use a service like **NextAuth.js** (recommended) or **Clerk** to handle user sign-in and sign-up flows.

- **Authorization Check:** In every API Route Handler (`POST`, `PUT`, `DELETE`), check if the request is from an authenticated user before executing the operation.
- **Data Scoping:** Ensure users can only read/write *their own* data by filtering database queries based on the authenticated user's ID (`userId`). This is essential for a "secure" application.

## Phase 4: Frontend and UI/UX (Design & Accessibility)

This phase focuses on creating a responsive and intuitive user interface using the specified tools.

### Step 4.1: Component Architecture (React.js Basics)

Leverage React's component-based architecture by separating your UI logic:

- **Page/Route Components:** Handle overall layout and data fetching (e.g., `app/dashboard/page.tsx`).
- **Container Components:** Manage state and data fetching for a section (e.g., `ModuleList.tsx`).
- **Presentational Components:** Simple UI elements (e.g., `ModuleCard.tsx`, `Button.tsx`).

### Step 4.2: Data Fetching Strategy (Next.js Optimization)

Use modern Next.js 15 data fetching practices to optimize performance:

- **Server Components:** Fetch initial, public, or slow-changing data directly inside Server Components to minimize client-side JavaScript.
- **Client Components (for mutations):** Use hooks like **React Query** (or similar) within Client Components for handling CRUD mutations (`POST`, `PUT`, `DELETE`) and optimizing client-side caching/revalidation.

### Step 4.3: Styling with Tailwind CSS & Radix UI

- **Tailwind CSS:** Use utility classes for responsive design (`md:`, `lg:` prefixes), layout (`flex`, `grid`), and basic styling.
- **Radix UI:** Use the unstyled components (like `Dialog`, `DropdownMenu`, `Tabs`) for highly accessible and customizable UI elements. This directly addresses the **accessibility** requirement.

### Step 4.4: Responsive Design

Use Tailwind's responsive classes (`sm:`, `md:`, `lg:`) extensively to ensure the layout adapts flawlessly from mobile devices to large desktops.

## Phase 5: Real-World & Advanced Features

These steps demonstrate a holistic understanding of deploying production-ready applications.

### Step 5.1: Performance Optimization

- **Code Splitting:** Next.js handles this automatically by default (routes/components are only loaded when needed).
- **Caching:** Leverage Next.js's data fetching caching mechanisms (built into the App Router) and use aggressive static rendering (`SSG`) for static pages (like a landing page) or incremental static regeneration (`ISR`) for pages that change infrequently.

### Step 5.2: Error Handling

Implement a global error boundary in React to gracefully catch and display errors without crashing the entire UI. On the backend, ensure your API Route Handlers return standard HTTP error codes (`400`, `401`, `403`, `500`) with clear, non-sensitive JSON error messages.

### Step 5.3: AI Integration (Optional but Highly Recommended)

This is a major opportunity to "showcase innovation."

1. **Choose a Library:** Install an AI SDK (e.g., `@google/genai` for the Gemini API).
2. **Create a New API Route:** Create a route handler (e.g., `app/api/ai/quiz/route.ts`) that accepts user data (like a long `notes` field or a `Module` text).
3. **Generate AI Content:** Use the model to perform a non-trivial task (e.g., turn complex notes into a simplified summary, or generate a JSON list of flashcards based on the text).

### Step 5.4: Testing Strategy (Good to Have)

- **Unit Tests:** Use **Jest** or **Vitest** for testing individual functions (like Zod validation schemas or utility functions).
- **End-to-End (E2E) Tests:** Use **Playwright** or **Cypress** to simulate a user flow (e.g., "A user can sign in, create a module, and see it appear in the list"). This proves the entire stack works together.

## Phase 6: Deployment and Submission (Final Polish)

### Step 6.1: Vercel/Netlify Deployment

Since Next.js is optimized for **Vercel**, this is the recommended platform.

1. **Initialize Git:** `git init` and commit your code.
2. **Create Repository:** Push the code to a new GitHub repository.
3. **Deploy:** Connect your GitHub repo to Vercel/Netlify. It should automatically detect the Next.js project and deploy.

### Step 6.2: CI/CD Configuration

Vercel/Netlify provides basic Continuous Integration/Continuous Deployment (CI/CD) out of the box (deploying on every main branch commit).

- **Advanced CI:** For a strong submission, consider adding a **GitHub Action** workflow that automatically runs your `npm test` script and `npm run lint` on every Pull Request before allowing the code to be merged.

### Step 6.3: Submission Guidelines Check

**MANDATORY:**

1. **GitHub Repository:** Share the link to your public repository.
2. **Live Deployment:** Share the link to the live application.
3. **Footer Information:** Ensure the deployed application's footer visibly includes:
    - Your Name
    - Your GitHub Profile Link
    - Your LinkedIn Profile Link
    - *Self-Correction: Make sure to include this information dynamically or statically in your main layout component.*