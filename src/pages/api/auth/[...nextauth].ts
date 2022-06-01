import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({ 
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization:{
          params:{
              scope:'read:user',
          }
      }
      
    }),
    // ...add more providers here
  ],
})

//FaunaDB - HTTP

//PostgreeSQL, MongoDB

// 24h (1 conexão)

//1000