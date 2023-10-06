import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";

import bcrypt from "bcrypt";

import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

// temporary i change the password to username to make example
interface IUser {
  email: string;
  password: string;
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // const user = await getEmailUser(credentials.email);
        // const user = await getEmailUser(credentials.email);

        // console.log(user);
        console.log(credentials.email, credentials.password);

        const user = await axios.post("http://3.27.132.94/api/Auth/login", {
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        // console.log(user);
        // console.log(user.data);
        // console.log(user.data.token);


        return user.data;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",

  // encode
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

// import { AuthOptions } from "next-auth";
// import NextAuth from "next-auth";
// import bcrypt from "bcrypt";
// import axios from "axios";

// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

// interface IUser {
//   email: string;
//   password: string; // This should be the hashed password in the database
// }

// export const authOptions: AuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET as string,
//     }),

//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "email", type: "text" },
//         password: { label: "password", type: "password" },
//       },

//       async authorize(
//         credentials: Record<"email" | "password", string> | undefined
//       ): Promise<{ email: string }> {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid credentials");
//         }

//         try {
//           // Gọi API để kiểm tra thông tin đăng nhập
//           const response = await axios.post<IUser>("/api/login", {
//             email: credentials.email,
//             password: credentials.password,
//           });

//           console.log(response);
//           if (!response || !response.data?.password) {
//             throw new Error("Invalid credentials");
//           }

//           // So sánh mật khẩu đã hash trong cơ sở dữ liệu
//           const isCorrectPassword = await bcrypt.compare(
//             credentials.password,
//             response.data.password
//           );

//           console.log(isCorrectPassword);

//           // Nếu mật khẩu không khớp, ném lỗi
//           if (!isCorrectPassword) {
//             throw new Error("Invalid credentials");
//           }

//           // Trả về thông tin người dùng
//           return {
//             email: response.data.email,
//           };
//         } catch (error) {
//           console.error(error);
//           throw new Error("Invalid credentials");
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/",
//   },
//   debug: process.env.NODE_ENV === "development",

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);

// import { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('https://your-backend-api/login', {
//         email: email,
//         password: password,
//       });

//       const token = response.data.token;

//       // Lưu token vào local storage
//       localStorage.setItem('accessToken', token);

//       alert('Đăng nhập thành công!');
//     } catch (error) {
//       // Xử lý lỗi
//       alert('Đăng nhập thất bại: ' + error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label><br />
//       <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><br />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;

// const token = localStorage.getItem('accessToken');

// axios.get('https://your-backend-api/some-endpoint', {
//   headers: {
//     Authorization: Bearer ${token},
//   },
// })s
//   .then(response => {
//     // Xử lý phản hồi
//   })
//   .catch(error => {
//     // Xử lý lỗi
//   });
