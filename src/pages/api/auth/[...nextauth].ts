import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import OutsetaApiClient from 'outseta-api-client';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      async authorize(credentials) {

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        let client = new OutsetaApiClient({
          subdomain: process.env.NEXT_PUBLIC_OUTSETA_SUBDOMAIN as string
        });

        // get users access token
        const response = await client.user.login(email, password);

        if (!response) {
          return null;
        }

        const token = response.access_token;

        // request the users data information by passing the the access token as one of the parameters.
        const clientWith = new OutsetaApiClient({
          subdomain: process.env.NEXT_PUBLIC_OUTSETA_SUBDOMAIN as string,
          accessToken: token,
        });

        const get_user = await clientWith.user.profile.get();

        if (!get_user) {
          return null;
        };

        const User = {
          id: get_user?.Uid,
          name: get_user?.FullName,
          image: get_user.ProfileImageS3Url,
          email: get_user?.Email,
          outseta: { ...get_user }
        };

        return User;

      },
      credentials: undefined
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
      },

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
    async signIn({ credentials, account ,profile }) {

      if(credentials) {
        return true;
      }

      if(account.provider === 'google') {
          console.log('account', account)
          console.log('profile', profile)
          return true;
        
      }


      return true;
    },
    async jwt({ user, token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin


      if(account?.provider == 'google') {
          // console.log('id_token awesome', account.id_token)
          // console.log('email awesome ', token.email)

          const response = await fetch(`https://${process.env.NEXT_PUBLIC_OUTSETA_SUBDOMAIN}.outseta.com/api/v1/tokens`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'GoogleIdToken': account.id_token as string,
            },
            body: `username=${token.email}`,
            
          })

          const access = await response.json();

          if(!access) {
            return null;
          }

          const clientWith = new OutsetaApiClient({
            subdomain: process.env.NEXT_PUBLIC_OUTSETA_SUBDOMAIN as string,
            accessToken: access.access_token,
          });

          const get_user = await clientWith.user.profile.get();

          if (!get_user) {
            return null;
          };

          const user = {
            id: get_user?.Uid,
            name: get_user?.FullName,
            image: get_user.ProfileImageS3Url,
            email: get_user?.Email,
            outseta: { ...get_user }
          };

          token.user = user;

      }

      if(account?.provider === 'credentials') {
          user && (token.user = user)
      }
      
      

      return token
    },

    async session({ session, token, user }) {


      session.user = token.user

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




