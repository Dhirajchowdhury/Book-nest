# BookNest - Comprehensive Project Implementation Details

## 1. Executive Summary & Core Concept

**BookNest** is a full-stack web application designed for book enthusiasts to track, manage, and organize their personal reading collections. The application enables users to manage their bookshelf by categorizing books into reading statuses (*Want to Read*, *Reading*, *Finished*), recording book metadata (title, author, cover image URL), providing star ratings for completed books (1 to 5 stars), attaching personal notes, and uploading actual PDF book documents.

> [!NOTE]
> **Phase 1 RAG Foundation**: BookNest currently supports full PDF document upload, persistence in Supabase Storage (`book-pdfs`), and document metadata linking (`book_documents` table). Full RAG features (text extraction, chunking, embeddings, pgvector search, LLM chat) are planned for Phase 2+.

### Deployment & Design References
- **Deployed Frontend:** [https://book-nest-frontend-b2zb.onrender.com](https://book-nest-frontend-b2zb.onrender.com)
- **Deployed Backend:** [https://book-nest-mwao.onrender.com](https://book-nest-mwao.onrender.com)
- **Architecture & UI Wireframe (Excalidraw):** [Excalidraw Diagram](https://excalidraw.com/#json=QGgk-jLGy-CQMpB3axz,ANcueCw2pFT6o3_efgHQ)

---

## 2. Tech Stack & Architecture Overview

The system follows a modern decoupled Client-Server architecture with a Next.js single-page application frontend communicating via a RESTful JSON API with an Express.js backend backed by a Supabase PostgreSQL database and Supabase Storage.

```
+-------------------------------------------------------------+
|                      Next.js Frontend                       |
|  (React 19, App Router, Tailwind CSS v4, Geist Typography)  |
+------------------------------+------------------------------+
                               |
                   HTTP / CORS | HttpOnly JWT Cookies & Multipart Upload
                               v
+-------------------------------------------------------------+
|                      Express.js Backend                     |
|  (ES Modules, Multer, JWT Auth, Bcrypt Hashing, Storage)    |
+------------------------------+------------------------------+
                               |
              +----------------+----------------+
              |                                 |
              v SQL Client                      v Storage API
+---------------------------+     +---------------------------+
|    Supabase PostgreSQL    |     |     Supabase Storage      |
| (users, books, documents) |     |     (book-pdfs bucket)    |
+---------------------------+     +---------------------------+
```

### Tech Stack Breakdown
| Domain | Technology / Library | Version / Details |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js (App Router) | `^16.3.0` |
| **UI Library** | React & React-DOM | `^19.2.8` |
| **Styling & Fonts** | Tailwind CSS & `@tailwindcss/postcss` | `^4.0.0`, Geist / Geist Mono Fonts |
| **Compiler & Tooling** | Babel Plugin React Compiler, ESLint | `babel-plugin-react-compiler: 1.0.0`, React Compiler enabled |
| **Backend Framework** | Node.js with Express.js | `^4.21.2` (ES Modules mode `"type": "module"`) |
| **Database & Storage** | Supabase Client | `@supabase/supabase-js: ^2.49.1` |
| **File Upload Handling** | Multer | `^1.4.5-lts.1` (In-memory storage & size filtering) |
| **Authentication & Hashing**| JSONWebToken (`jsonwebtoken`), `bcryptjs` | `jsonwebtoken: ^9.0.2`, `bcryptjs: ^3.0.2` |
| **HTTP Middleware** | `cors`, `cookie-parser`, `dotenv` | `cors: ^2.8.5`, `cookie-parser: ^1.4.7` |

---

## 3. Database Schema & Data Models

The persistence layer relies on three PostgreSQL tables hosted on Supabase: `users`, `books`, and `book_documents`.

### 3.1 `users` Table Schema
Stores user authentication credentials.

| Column Name | Data Type | Constraints / Details |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Auto-generated UUID |
| `email` | `text` | Unique, Normalized to lowercase |
| `password_hash` | `text` | Bcrypt hashed string (Salt rounds: 10) |
| `created_at` | `timestamptz` | Default `now()` |

### 3.2 `books` Table Schema
Stores individual book records tied to specific users.

| Column Name | Data Type | Constraints / Details |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Auto-generated UUID |
| `user_id` | `uuid` | Foreign Key referencing `users.id` |
| `title` | `text` | Required |
| `author` | `text` | Required |
| `cover_image_url` | `text` | Optional image link |
| `status` | `text` | Enum: `'Want to Read'`, `'Reading'`, `'Finished'` (Default: `'Want to Read'`) |
| `rating` | `int4` | Optional; Integer between 1 and 5. Only saved when `status === 'Finished'` |
| `personal_notes` | `text` | Optional text notes |
| `created_at` | `timestamptz` | Record creation timestamp |
| `updated_at` | `timestamptz` | Record update timestamp |

### 3.3 `book_documents` Table Schema (Phase 1 RAG Foundation)
Stores metadata for uploaded PDF files linked to a book and user.

| Column Name | Data Type | Constraints / Details |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Auto-generated UUID (`gen_random_uuid()`) |
| `book_id` | `uuid` | Foreign Key referencing `books.id` (`ON DELETE CASCADE`) |
| `user_id` | `uuid` | Foreign Key referencing `users.id` (`ON DELETE CASCADE`) |
| `file_name` | `text` | Original uploaded PDF filename |
| `storage_path` | `text` | Path inside Supabase Storage (`<user_id>/<book_id>/<timestamp>-<name>.pdf`) |
| `mime_type` | `text` | Must be `'application/pdf'` |
| `file_size` | `bigint` | File size in bytes |
| `source_type` | `text` | Default `'pdf_upload'` |
| `processing_status` | `text` | Default `'uploaded'` (Future states: `'processing'`, `'ready'`, `'failed'`) |
| `created_at` | `timestamptz` | Default `now()` |
| `updated_at` | `timestamptz` | Default `now()` |

#### SQL Migration Script:
```sql
CREATE TABLE IF NOT EXISTS public.book_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    mime_type TEXT NOT NULL DEFAULT 'application/pdf',
    file_size BIGINT NOT NULL,
    source_type TEXT NOT NULL DEFAULT 'pdf_upload',
    processing_status TEXT NOT NULL DEFAULT 'uploaded',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_book_documents_book_user 
ON public.book_documents(book_id, user_id);
```

---

## 4. Backend Architecture & API Specifications

The backend (`/backend`) adopts a classic Layered Architecture: **Routes $\rightarrow$ Middlewares $\rightarrow$ Controllers $\rightarrow$ Models $\rightarrow$ Database Configuration**.

### 4.1 File Tree Structure
```
backend/
├── config/
│   └── supabase.js           # Initializes Supabase Client with Service Role Key
├── controllers/
│   ├── auth.controller.js    # Signup, Login, Logout, getMe handlers
│   ├── book.controller.js    # CRUD handlers for user books
│   └── document.controller.js# PDF upload, signed URL generation, rollback & delete handlers
├── middleware/
│   ├── auth.middleware.js    # JWT Cookie verification middleware
│   ├── error.middleware.js   # Global JSON error handling middleware
│   └── upload.middleware.js  # Multer PDF upload & file size validation middleware
├── models/
│   ├── user.model.js         # Direct database queries for Users table
│   ├── book.model.js         # Direct database queries for Books table (with relations)
│   └── document.model.js     # Direct database queries for book_documents table
├── routes/
│   ├── auth.routes.js        # Auth endpoint definitions
│   ├── book.routes.js        # Book endpoint definitions (all protected)
│   └── document.routes.js    # Sub-router for /api/books/:bookId/document
├── utils/
│   ├── jwt.js                # JWT token generation & verification
│   ├── logger.js             # Structured JSON logger
│   └── password.js           # Bcrypt hashing and comparison helpers
├── .env                      # Environment variable secrets
├── index.js                  # Express server entry point
└── package.json              # Package metadata and dependencies
```

### 4.2 Security & Multi-Tenancy Architecture
1. **JWT Auth Verification**: All document endpoints use `requireAuth` middleware to derive `req.user.id` from the HttpOnly session cookie.
2. **Book Ownership Enforcement**: Before any PDF upload, signed URL request, or deletion, the system queries `findBookByIdAndUserId(bookId, userId)`. If the book does not belong to the user, access is denied (`404 Not Found`).
3. **PDF Validation**:
   - Multer filter checks `mimetype === 'application/pdf'` and `.pdf` extension.
   - Controller performs **magic byte signature validation** (`%PDF-` header check) on the file buffer.
   - Max file size enforced via `MAX_BOOK_PDF_SIZE_MB` env variable.
4. **Compensating Rollback / Failure Safety**: If database record insertion fails after uploading the PDF buffer to Supabase Storage, the backend automatically deletes the uploaded storage object to prevent orphaned files.

### 4.3 REST API Endpoints Reference

#### Health Check
- `GET /health` $\rightarrow$ `{ status: 'ok', message: 'BookNest Auth Backend is running' }`

#### Authentication Routes (`/api/auth`)
- `POST /api/auth/signup` $\rightarrow$ Body: `{ email, password }`
- `POST /api/auth/login` $\rightarrow$ Body: `{ email, password }` + Sets HttpOnly JWT Cookie
- `POST /api/auth/logout` $\rightarrow$ Clears HttpOnly Cookie
- `GET /api/auth/me` $\rightarrow$ Returns current user profile

#### Book Management Routes (`/api/books`) - Protected
- `GET /api/books` $\rightarrow$ Returns user books with attached document metadata.
- `POST /api/books` $\rightarrow$ Creates new book metadata.
- `GET /api/books/:id` $\rightarrow$ Fetches single book by ID.
- `PUT /api/books/:id` $\rightarrow$ Updates book metadata.
- `DELETE /api/books/:id` $\rightarrow$ Deletes book record (Cascades document deletion).

#### Book Document Routes (`/api/books/:bookId/document`) - Protected
- `POST /api/books/:bookId/document`
  - **Body**: `multipart/form-data` with field `pdf`
  - **Logic**: Validates magic bytes, replaces old PDF if present, uploads buffer to Supabase Storage (`book-pdfs/<userId>/<bookId>/<timestamp>-<name>.pdf`), inserts `book_documents` DB record (`processing_status = 'uploaded'`).
  - **Response**: `201 Created` `{ message, document }`
- `GET /api/books/:bookId/document/url`
  - **Logic**: Generates a secure, short-lived signed download URL (valid 1 hour) for the PDF.
  - **Response**: `200 OK` `{ signedUrl, document }`
- `DELETE /api/books/:bookId/document`
  - **Logic**: Removes PDF from Supabase Storage bucket and deletes DB record.
  - **Response**: `200 OK` `{ message: 'PDF document deleted successfully!' }`

---

## 5. Frontend Architecture & UI Components

### 5.1 PDF Upload & Management UI
1. **`BookForm.jsx`**:
   - PDF Drag & Drop dropzone + click-to-select input.
   - Selected file name, formatted size (e.g. `4.2 MB`), and clear/remove button.
   - Notice banner: "PDF only (Max 10MB)".
   - Displays existing attached PDF when editing a book.
2. **`BookDetails.jsx`**:
   - Attached PDF metadata box showing filename, size, and status badge (`UPLOADED`).
   - "View / Download PDF" button that fetches a secure signed URL from the backend and opens it in a new tab.
   - "Delete PDF" action button.
3. **`BookList.jsx`**:
   - Displays a `📄 PDF` indicator badge in table rows for books that have an attached PDF.
4. **`ProtectedDashboardPage` (`app/protected/page.jsx`)**:
   - Coordinates multi-part save flow: saves metadata to `/api/books`, then uploads PDF file via `FormData` to `/api/books/:bookId/document`.

---

## 6. Environment Configuration

### Backend Environment Variables (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
JWT_SECRET=your_custom_jwt_secret_key
MAX_BOOK_PDF_SIZE_MB=10
SUPABASE_STORAGE_BUCKET=book-pdfs
```

### Frontend Environment Variables (`frontend/.env`)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

---

## 7. RAG Pipeline Future Readiness (Phase 2+)

The Phase 1 architecture establishes the storage and metadata foundation for downstream RAG processing:

```
[Uploaded PDF] 
     │ (Phase 1 Complete - Status: 'uploaded')
     ▼
[Text Extraction Service (pdf-parse / PyMuPDF)]
     │ (Phase 2 - Status: 'processing')
     ▼
[Text Chunking & Tokenization]
     │ 
     ▼
[Embedding Generation (OpenAI / HuggingFace)]
     │ 
     ▼
[Vector Store Persistence (pgvector)]
     │ (Status: 'ready')
     ▼
[Retrieval-Augmented Generation & Book Chat UI]
```
