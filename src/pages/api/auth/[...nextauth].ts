import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import OutsetaApiClient from 'outseta-api-client';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      type: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        
      }
      ,
      async authorize(credentials, req) {

        const { email, password} = credentials as {
          email: string,
          password: string
        }

        if(credentials) {

          let client = new OutsetaApiClient({
            subdomain: process.env.NEXT_PUBLIC_OUTSETA_SUBDOMAIN as string
          });
  
          const response = await client.user.login(email,password);
  
          if( !response ) {
            return null;
          } else {
  
            const token = response.access_token;
            
            const loggedIn = new OutsetaApiClient({
              subdomain: process.env.NEXT_PUBLIC_OUTSETA_SUBDOMAIN as string,
              accessToken: token,
            });
  
            const user_get = await loggedIn.user.profile.get();
  
            return {
              id: user_get?.Uid,
              name: user_get?.FullName,
              email: user_get?.Email
            }

        }


        return null

        }

      },
    }),
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
    // .. add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ credentials }) {

      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },

    async session({ session, user, token }) {
    
      return session
    },

    async redirect({ url, baseUrl }) {
      return baseUrl
    },


  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/logo.svg', // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
});




