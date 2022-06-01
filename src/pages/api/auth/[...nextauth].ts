import { query as q } from "faunadb";

import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        }
      }
    }),
    // ...add more providers here
  ],



  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user

      try {
        await fauna.query(
          q.If( // se  
            q.Not( // nao  
              q.Exists( // se existe o usiario
                q.Match( // no qual realiza um match
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              {data: {email }}
            ),
            q.Get(
              q.Match( // no qual realiza um match
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
            )
          )
        )
        return true
      } catch {
        return false
      }


    },
  }
})

//FaunaDB - HTTP

//PostgreeSQL, MongoDB

// 24h (1 conexão)

//1000