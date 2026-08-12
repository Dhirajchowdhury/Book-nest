## So , Welcome to BookNest repo ...
BookNest is a project or say solution for book lovers where they can manage and organize their books by recording the read status that is , already read , is reading or have finished reading , also user can store the title , author name , ratings for the finished books and cover image url ... 

## Deployed links
Deployed frontend :- https://book-nest-frontend-b2zb.onrender.com
Deployed Backend :- https://book-nest-mwao.onrender.com

for architecture and imagining the web design, architecture, folder structure, planning i have used excalidraw whose link is :- 
https://excalidraw.com/#json=QGgk-jLGy-CQMpB3axz,ANcueCw2pFT6o3_efgHQ

## Now for setting this up in your local computer , you have to follow these steps :-
1. Install latest version of node , and npm and set the path in your local pc
2. clone the repo by doing:-  git clone https://github.com/Dhirajchowdhury/Book-nest.git
3. then open two terminals 
4. in first terminal go inside frontend folder by doing:- cd frontend
5. similarily in second terminal go inside backend do:-  cd backend
6. then do npm install in both the terminals 
7. then just do npm run dev 


## setting up env 
## 1. frontend 
   env :- 
      NEXT_PUBLIC_BACKEND_URL = "for development just write localhost:5000"

## 2. backend
  nev:-
    PORT=5000
    NODE_ENV=development
    FRONTEND_URL=for development simply localhost:3000
    SUPABASE_URL=will_get_on_supabase
    SUPABASE_SERVICE_ROLE_KEY=will_get_on_supabase
    JWT_SECRET= secretkey_by_your_own

## schema:- 
## 1. user 
   columns:- 
      id as uuid 
      email as text 
      password_hash as text
      created_at as timestamptz

## 2. books
     id as uuid
     user_id as uuid
     title as text
     author as text
     cover_image_url as text
     status as text
     rating as int4
     personal_notes as text
     created_at and updated_at both as timestamptz



## Everything related to architecture is in excalidraw, so please refer to that for the architecture