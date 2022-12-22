const { ApolloServer, gql } = require("apollo-server-express")
const express=require("express")
require("./db-connection");

//apollo server
//typedefs -> graphql type definitions
//resolvers -> how do we resolve queries and mutations


async function startServer(){
    const app=express()
    const apollosServer=new ApolloServer({
      typeDefs: require("./typeDefs"),
      resolvers: require("./resolver"),
    })

    await apollosServer.start()
    apollosServer.applyMiddleware({app: app, /*path: '/truly'*/ })

    app.use((req,res)=>{
        res.send("Hlo frm express apollo server")
    })

    app.listen(4000,()=>{
        console.log("Server is running at 4000");
    })
}

startServer();

