// Clerk client import kar rahe hain, user authentication & metadata update ke liye
import { clerkClient } from "@clerk/express";

// Middleware to check userId and PremiumPlan :


// async fun :
export const auth = async(req, res, next) => {  // Express middleware function, req, res, next as parameters
  // try catch block :
  try {
     
    // Clerk middleware se userId aur has property get kar rahe hain
    // in this we will get userid & has property from request auth :
    const {userId, has} = await req.auth(); // this auth will be added using clerk middleware => ye Clerk middleware ka built-in auth method hai

    // to check whether user has premiumplan or not :
    const hasPremiumPlan = await has ({plan: 'premium'});  // if user has premium plan it will be true otherwise false

    // to get user data so that their meta data can be updated:
    const user = await clerkClient.users.getUser(userId);

    // Agar user free plan pe hai aur unka free_usage available hai
    if(!hasPremiumPlan && user.privateMetadata.free_usage){  // if user don't have premium plan and the have free useage in their meta data then this free usage will be added in req.
      req.free_usage = user.privateMetadata.free_usage // free usage ko request object me add kar rahe hain
    } else { // when user don't have free usage (free usage khtm ho jyega tb)
      // Agar free usage nahi hai ya khatam ho gaya hai, toh metadata me 0 set kar do
      await clerkClient.users.updateUserMetadata(userId, {  // so when user will have free plan this middleware will add the privatemetad ata where freeusage will be 0.
        privateMetadata:{
          free_usage: 0
        }
      })
      // free usage will be added in req also (agr free usage khtm ho jyega)
      req.free_usage = 0; // req object me bhi 0 set kar do

    }
    
    // User ke plan ko request me add kar rahe hain
    // adding plan property in request :
    req.plan = hasPremiumPlan ? 'premium' : 'free'
    // next middleware ya controller ke liye continue karenge
    next()

  } catch (error) {
    // Agar koi error aaye toh JSON response me bhejenge
    res.json({success: false, message: error.message})

  }
}

// so we have created the middleware using that we can check the user have free plan or premium and we can also get usermeta data

// Ye middleware use karke har route me check kar sakte hain ki user free ya premium hai
// Aur unka free_usage track kar sakte hain