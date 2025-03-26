# MERN-tailwind-daisyui-react-query-TwitterClone
 ![2025-03-25_201053](https://github.com/user-attachments/assets/4e389e57-46f4-4190-bed2-3724468de580)

## Tech Stack
### MERN 
### style: tailwind@3   
### daisyui@4  UI Components
### React-query
### Authentication and Authorization:
#### JSON Web Token jwt
- **Purpose:** Used for generating and verifying tokens for authentication.  
- **Why Use It:** Securely transmit data between parties as a JSON object using a token. Useful for user authentication and authorization.  
- **Common Usage:**  
  - Generate JWT upon login.
  - Verify JWT to authenticate protected routes.
####  bcrypt**  
- **Purpose:** Used for hashing passwords securely.  
- **Why Use It:** Password hashing ensures that even if your database is compromised, user passwords remain safe.  
- **Common Usage:**  
  - Hash a password before storing it in the database.
  - Compare a plaintext password with a hashed password during login.  

###  cloudinary**  
- **Purpose:** A cloud-based media management service.  
- **Why Use It:** Efficiently store, optimize, and manage images, videos, and other media. Ideal for image uploads in web apps.  
- **Common Usage:**  
  - Upload and store images.
  - Generate optimized image URLs.
  - Perform transformations like resizing or applying filters.  
- **Example:**  
  ```javascript
  import cloudinary from 'cloudinary';

  cloudinary.config({
    cloud_name: 'your-cloud-name',
    api_key: 'your-api-key',
    api_secret: 'your-api-secret',
  });

  const result = await cloudinary.uploader.upload('path/to/image.jpg');
  console.log(result.url); // URL of uploaded image
  ```

---

###  cookie-parser**  
- **Purpose:** Middleware to parse cookies in a Node.js application.  
- **Why Use It:** Useful for handling cookies sent from the client, often for storing authentication tokens or session data.  
- **Common Usage:**  
  - Read cookies from incoming HTTP requests.
  - Set or modify cookies in the response.  
- **Example:**  
  ```javascript
  import express from 'express';
  import cookieParser from 'cookie-parser';

  const app = express();
  app.use(cookieParser());

  app.get('/', (req, res) => {
    console.log(req.cookies); // Access cookies from request
    res.cookie('token', '123456', { httpOnly: true });
    res.send('Cookie set!');
  });

  app.listen(3000, () => console.log('Server running on port 3000'));
  ```

Some Features:

-   ⚛️ Tech Stack: React.js, MongoDB, Node.js, Express, Tailwind
-   🔐 Authentication with JSONWEBTOKENS (JWT)
-   🔥 React Query for Data Fetching, Caching etc.
-   👥 Suggested Users to Follow
-   ✍️ Creating Posts
-   🗑️ Deleting Posts
-   💬 Commenting on Posts
-   ❤️ Liking Posts
-   🔒 Delete Posts (if you are the owner)
-   📝 Edit Profile Info
-   🖼️ Edit Cover Image and Profile Image
-   📷 Image Uploads using Cloudinary
-   🔔 Send Notifications
-   🌐 Deployment
-   ⏳ And much more!






## SETUP tailwindcss@3   daisyui@4
### backend

```
mkdir react-twitter-clone

npm init -y
npm install express dotenv mongoose nodemon jsonwebtoken bcryptjs

put the .env file here

mkdir backend
cd backend  
echo ""> server.js
```
### config package.json
add "type" :"module", in package.json so can use import not require and export default not models.export
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon backend/server.js"
  },
```

so can run the backend: ``` npm run dev```          

### frontend
https://v3.tailwindcss.com/docs/guides/vite
```
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

#### style 
Install tailwindv3  and daisy UI: https://v3.tailwindcss.com/docs/installation
```
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

config tailwind.config.js

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
copy the following to src/index.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Install daisyUI as a Tailwind plugin 
https://daisyui.com/docs/install/       daisyui won't work for theme
```npm install daisyui@4
npm install  @tanstack/react-query  react-icons react-router-dom
```

### react-query
```
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
```

### .env
```
MONGO_URI=""
PORT=5000 
NODE_ENV="development"
JWT_SECRET=""
JWT_EXPIRE=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### jwt
- **Example:**  
  ```javascript
  import jwt from 'jsonwebtoken';

  const secretKey = 'yourSecretKey';
  const payload = { userId: 123 };

  // Generate a JWT token
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  // Verify token
  const decoded = jwt.verify(token, secretKey);
  console.log(decoded); // { userId: 123, iat: ..., exp: ... }
  ```
JWT (**JSON Web Token**) uses **signing** rather than traditional hashing or encryption.

### 🔎 **How JWT Generates a Token**
JWT consists of **three parts**:
1. **Header** → Contains metadata (e.g., algorithm, token type).
2. **Payload** → Contains data (e.g., user info, expiration).
3. **Signature** → Ensures data integrity using a secret key.

The structure looks like this:
```
HEADER.PAYLOAD.SIGNATURE
```
Each section is **Base64 URL encoded** for easy transport.

---

### ⚙️ **Is JWT Using Hashing or Encryption?**

- **JWT does not encrypt data** by default.  
  - The payload (containing user data) is **not hidden**. It’s only **encoded**, meaning it can be decoded using Base64.  
  - **Never store sensitive information (like passwords) in a JWT.**

- **JWT uses signing, not hashing for integrity**  
  - JWT uses an algorithm (e.g., **HS256** or **RS256**) to **sign** the token using a **secret key**.  
  - This ensures the token is **tamper-proof**. If the data changes, the signature won’t match, and the token will be rejected.  
  - **HS256** = HMAC + SHA256 (Symmetric)  
  - **RS256** = RSA + SHA256 (Asymmetric)  

---

### 🚀 **How JWT Generation Works**
Here’s the step-by-step process using **HS256** (Symmetric signing):

1. **Create Header**  
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

2. **Create Payload**  
```json
{
  "userId": 123,
  "role": "admin",
  "exp": 1713800000
}
```
`exp` is an expiration timestamp.

3. **Sign the Token**  
- Using the formula:
```
HMACSHA256(Base64UrlEncode(header) + "." + Base64UrlEncode(payload), secret)
```

4. **Generate JWT**  
You’ll get a token like this:
```
### ⚡ **Verifying JWT**
When the server receives a JWT:
1. It decodes the header and payload.
2. It **recalculates the signature** using the header, payload, and secret key.
3. If the recalculated signature matches the provided signature, the token is **valid**.
4. If the signature doesn’t match or the token has expired, it’s rejected.

---

### 🔔 **In Summary**
- ✅ JWT uses **signing** (e.g., HS256) for integrity, not encryption for confidentiality.  
- ✅ Data inside JWT is only **Base64 encoded** (not encrypted).  
- ✅ **Do not store sensitive data** (like passwords) in a JWT.  
- ✅ JWT can be verified using the secret key (for HS256) or a public key (for RS256).  
### Security Hazard:
❗ **Is Decoding a JWT a Security Risk?**
- **Yes, if sensitive data is stored in the payload.**
  - JWT is **not encrypted**, so any sensitive information (like passwords, tokens, or private keys) can be exposed if included in the payload.
- **No, if it’s just basic data like userId or role.**
  - JWTs are often used to store non-sensitive data like `userId` and `role`, which is generally safe.

🔔 **Best Practices to Keep JWTs Secure**:
1. **Never store sensitive information in a JWT** (e.g., passwords, payment info).
2. **Use HTTPS** to prevent MITM (Man-in-the-Middle) attacks.
3. **Set expiration (`exp`)** to limit the token’s validity.
4. **Sign the JWT securely** using a strong secret key.
5. **Verify tokens on the server** using `jwt.verify()` before granting access.





###  bcrypt**  
- **Purpose:** Used for hashing passwords securely.  
- **Why Use It:** Password hashing ensures that even if your database is compromised, user passwords remain safe.  
- **Common Usage:**  
  - Hash a password before storing it in the database.
  - Compare a plaintext password with a hashed password during login.  
- **Example:**  
  ```javascript
  import bcrypt from 'bcrypt';

  const saltRounds = 10;
  const password = 'userPassword123';

  // Hashing a password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Compare password
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log(isMatch); // true if matched
### 
