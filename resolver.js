const Post = require("./models/Post.models");

const resolvers={
    Query:
    {
        hello:()=>{
          return "Hello World"
        },
        getAllPosts: async() => {
          const posts= await Post.find()
          return posts
        },
        getPost: async(_, {id}) =>{
          return await Post.findById(id)
        }
    },
    Mutation:
    {
      createPost: async(parent, args, context, info)=>{
        const {title, description}= args.post
        const post= new Post({title, description})
        await post.save()
        return post
      },
      deletePost: async(parent,args)=>{
        const id=args.id
        const post =await Post.findByIdAndDelete(id)
        return post
      },
      updatePost: async(parent, args)=>{
        const {id}= args
        const {title, description}= args.post

        const post= Post.findByIdAndUpdate(id, {title, description}, {new: true})
        return post
      }
    }
}

module.exports=resolvers;

// query{
//   getAllPosts{
//     id
//     title
//     description
//   }
//   getPost(id: "63825462b7c080bb9fe896be") {
//     id
//     title
//   }
// }

// mutation{
//   createPost (post:{
//   title: "efg", 
//   description: "efg"
//   }) {
//     id
//     title
//     description
//   } 
//   deletePost(id: "63825338cd1dc81239dcf45c") {
//     id
//     title
//     description
//   }
//   updatePost(id:"63825325cd1dc81239dcf45a",post: {
//      title: "new post 1"
//     # description: "updated desc new" 
//   }) {
//     id
//     title
//     description
//   }
// }