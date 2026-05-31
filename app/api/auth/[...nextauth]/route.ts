import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const users = [
          { id: "1", name: "erfan", password: "3577" },
          { id: "2", name: "sajad", password: "123456789" },
          { id: "3", name: "amir", password: "amir123" },
        ];

        const user = users.find(
          (u) =>
            u.name === credentials?.username &&
            u.password === credentials?.password,
        );

        if (user) {
          return { id: user.id, name: user.name };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
