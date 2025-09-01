// Database connection/configuration import kar rahe hain
import sql from "../configs/db.js";

// 1st User API :

// 1st user controller fun : Get all creations of logged-in user
export const getUserCreations = async (req, res)=> {
  try{

    // we will get all creations for a particular user :

    const {userId} = req.auth()  // for getting user id => Clerk se logged-in user ka userId fetch kar rahe hain

    // SQL query: user ke saare creations fetch karo, latest creation pehle
    // for finding(getting) all creations of a user :
    const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
    // so we will get all creation data from database  for a particular user

    // sending data in response :
    res.json({success:true, creations}); // frontend ko success aur creations ka data bhej rahe hain


  } catch(error){
      res.json({success:false, message:error.message}); // agar error aaye to error message send karo

  }

}



// 2nd User API :

// 2nd user controller fun : Get all published creations

export const getPublishedCreations = async (req, res)=> {
  try{
    
    // we will get all  creations where publish property is true :
    // SQL query: sirf published creations fetch karo, latest pehle
    const creations = await sql`
    SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

    res.json({success:true, creations}); // frontend ko success aur creations ka data bhej rahe hain


  } catch(error){
      res.json({success:false, message:error.message}); // agar query fail ho to error message bhej do

  }

}


// 3rd User API :

// 3rd user controller fun : Toggle like/unlike on a creation

export const toggleLikeCreations = async (req, res)=> {
  try{

    // we will get like and dislike data for a creation for particualr user :

    const {userId} = req.auth(); // logged-in user ka userId
    // frontend se creation ID receive kar rahe hain
    const {id} = req.body; // for getting particular creation id from body to fetch likes & dislikes data

     // SQL query: specific creation fetch kar rahe hain
    // fetching creation using id (from sql query) :
    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`
    
    // if no creation exist for id :
    if(!creation){ // agar creation exist nahi karta
      return res.json({success:false, message: "Creation not found"})
    }

    // if creation exist for id :

    const currentLikes = creation.likes;  // existing likes array fetch kar rahe hain
    const userIdStr = userId.toString();  // userId ko string me convert kar rahe hain, kyunki likes array text[] type ka hai

    let updatedLikes; // updated likes array store karne ke liye
    let message; // response message store karne ke liye


    if(currentLikes.includes(userIdStr)){ // agr user n like kiya th(pehle) aur ab like button ko click kr rha tb dislike k case m us userid ko like array s hta do
      // agar user ne pehle like kiya tha, aur ab click kar raha hai to unlike kar do
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      message = 'Creation Unliked' // message set karna
    }  else{ 
      // agar user ne pehle like nahi kiya, to like kar do
      updatedLikes = [...currentLikes, userIdStr]
      message = 'Creation Liked'  // message set karna
    }
    
    
    const formattedArray = `{${updatedLikes.join(',')}}`  // userid of all user who liked th creation will be stored in likes array
    // PostgreSQL array format me convert kar rahe hain

    // SQL query: updated likes array database me save kar rahe hain
    // storing data in database
    await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id =${id}`;
    


    // sending response
    res.json({success:true, message}); // frontend ko success aur message bhejna


  } catch(error){
      res.json({success:false, message:error.message}); // agar error aaye to message bhej do

  }

}



// create api-end points (route) for this functions in userRoutes.js file


// NOTE : for first two fun we are not getting any data from body(front-end) and in 3rd fun we wre getting creation id from body therfore for this we will use post-method








