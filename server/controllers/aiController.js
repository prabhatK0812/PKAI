
import OpenAI from "openai"; // copy pasted form JS code


import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from 'axios'
// import {v2 as cloudinary} from "cloudinary";  // bhai chat gpt bola
import fs from 'fs'


// chat gpt bola bhai :
import FormData from 'form-data';
import cloudinary from "../configs/cloudinary.js";  // chat gpt bola

// importing pdf from pdf-parse package :
import pdf from 'pdf-parse/lib/pdf-parse.js'

// import FormData from 'form-data'; // make sure this is installed
 

// copy pasted from JS code
const AI = new OpenAI({  // name updated
    // api key from env variable
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"  // no change
});


// 1st API ::

// 1st controller fun  :
export const generateArticle = async (req,res)=> {
  try {  
    
    // in this try statement :
    
    // STEP 1: Clerk authentication se userId nikal lo
    // first we will get data from the user :
    const {userId} = req.auth(); // auth will be added using clerk middleware

    // STEP 2: Client se input prompt aur length (max tokens) le lo
    const {prompt, length} = req.body; // we will get prompt & length form body
    // so when we will call the api we will send the prompt data & length to generate the article

    // STEP 3: Middleware se mila user ka plan aur free usage
    const plan = req.plan; // we will get the plan
    const free_usage = req.free_usage; // we will get the free usage

    // so now we have all the datas and we can generate the article
    
    // STEP 4: Agar user premium nahi hai aur 10 free usage cross ho chuka hai
    // CASE-1: when user has no active plans :
    if(plan !== 'premium' && free_usage >= 10 ) { // if user don't have premium plan and free usage is more than or equal to 10 => this means user is on free plan and used (10)free credits.
      // so in this case user can not generate article.
      return res.json({success: false, message: "Limit reached. Upgrade to continue."})  // status is false & send the message
    }
    // so in free plan user can create only 10 articles => Free users ke liye limit 10 articles tak hi hai


    // CASE-2: When user have premium plan or available free credits :
    
    // STEP 5: AI API ko call karna (Gemini via OpenAI client wrapper)
    // copy-pasted code : from api docs
    const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash", // Gemini ka model
        messages: [
            {
                role: "user",
                content: prompt,  // provide prompt from request body =>  User ka diya hua prompt
            },
        ],
        // other properties :
        temperature: 0.7,     // Randomness level (0.7 => balanced creative)
        max_tokens: length,   // Response ka max length (user input se)

    });

    // STEP 6: AI response se article ka content nikalna
    // response :
    const content = response.choices[0].message.content  // so here we will get response from ai

    // STEP 7: Generated article ko DB me save karna (creations table)
    // now we will store this response in database => so we will write sql query:
    // query for adding data in database :
    await sql`INSERT INTO creations (user_id, prompt, content, type) 
    VALUES (${userId}, ${prompt}, ${content}, 'article')`;
    
    // STEP 8: Agar user premium nahi hai to free_usage count +1 karo
    // we will update free credits or freeusage for for free plans :
    if(plan !== 'premium'){
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata:{
          free_usage: free_usage + 1  // freeusage will be increased (or free credits will be reduced)
        }
      })

    }
    
    // STEP 9: Client ko response bhejna
    // response :
    res.json({success: true, content})  // contend will be send


  } catch (error) {
    // STEP 10: Error handling (console + response)
    console.log(error.message)
    res.json({success: false, message:error.message})

  }

}

// Important Concepts used here :

// req.auth() (Clerk) → user ki authentication info se userId deta hai.
// req.body → client se input (prompt + length).
// req.plan & req.free_usage → middleware ne pehle hi attach kiya hoga har request pe.
// plan = user ka plan (free/premium)
// free_usage = free credits used till now
// Free Plan Limitation → sirf 10 free articles allowed.
// AI API (Gemini via OpenAI SDK)
// temperature randomness control karta hai.
// max_tokens = output ki max length.
// Database Query (Neon/SQL)
// INSERT INTO creations (user_id, prompt, content, type)
// Ye table me ek new row create karta hai with article type.
// Clerk Metadata Update → free users ke liye usage increment hota hai.
// Response → JSON return with success: true aur generated content.





// 2nd API ::

// 2nd controller fun : generateBlogTitle
export const generateBlogTitle = async (req,res)=> {
  try {
    // STEP 1: Clerk authentication se current userId le lo
    const {userId} = req.auth();
    // STEP 2: Request body se prompt (topic) le lo
    const {prompt} = req.body;  // we will get prompt from req body
    // STEP 3: Middleware se user ka plan aur free usage count
    const plan = req.plan;
    const free_usage = req.free_usage;

    // STEP 4: Free user ki limit check karo
    // CASE-1: For free plan
    if(plan !== 'premium' && free_usage >= 10 ) {
      return res.json({success: false, message: "Limit reached. Upgrade to continue."}) 
    }

    // STEP 5: Gemini AI se blog title generate karne ka request bhejna
    const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [{role: "user", content: prompt, } ],
        temperature: 0.7, // zyada creativity ke liye thoda high -> 0.8
        max_tokens: 100,  // 200

    });

    // STEP 6: Response me se titles extract karo
    // response from ai :
    const content = response.choices[0].message.content

    // STEP 7: Database me creation save karo
    // updating response data in neon database:
    await sql`INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;
    
    // STEP 8: Agar free user hai to usage count +1 karna
    if(plan !== 'premium'){
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata:{
          free_usage: free_usage + 1 // increasing free usage
        }
      })

    }
    
    // STEP 9: Client ko response bhejna
    res.json({success: true, content})


  } catch (error) {
    // STEP 10: Error handle
    console.log(error.message)
    res.json({success: false, message:error.message})

  }

}




// 3rd API :
// 3rd controller fun :

export const generateImage = async (req, res) => {
  try {
    // STEP 1: Auth check (Clerk middleware se user already authenticated hoga)
    console.log("STEP 1: Inside generateImage");
    // STEP 2: Request body se "prompt" nikalna
    const { prompt } = req.body;
    if (!prompt) {
      // agar prompt missing h to 400 error bhej do
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    console.log("STEP 2: Prompt Received ->", prompt);
    console.log("STEP 3: Sending to ClipDrop API...");

    // STEP 3: ClipDrop API ko call karke image generate karna => 1.Generate image via ClipDrop
    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1', // API endpoint
      { prompt }, // request body
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY, // auth header
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer', // important to get image buffer => kyunki image buffer form me return hogi
      }
    );

    console.log("STEP 4: Got image buffer, now uploading to Cloudinary...");

    // STEP 4: Buffer ko Base64 me convert karna (Cloudinary upload k liye)   2.Convert buffer to base64 for Cloudinary
    const base64Image = Buffer.from(response.data).toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    // STEP 5: Cloudinary pe upload karna => 3.Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUrl, {
      folder: 'ai-generated-images',
    });

    console.log("STEP 5: Uploaded to Cloudinary ✅");

    // STEP 6: Response bhejna with Cloudinary image URL => 4.Return the normal image URL
    return res.status(200).json({
      success: true,
      image: uploadResult.secure_url,
    });

  } catch (error) {
    // STEP 7: Error handling
    console.error("❌ ERROR:", error.message);
    if (error.response) {
      console.error("❌ ERROR DETAILS:", error.response.data);
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};










// 4th API :

// 4th controller fun : Remove Image Background
export const removeImageBackground = async (req,res)=> {
  try {
    
    // STEP 1: User & image data lena
    const {userId} = req.auth();  // Clerk se userId
    // multer middleware se image file
    const image = req.file; // we will get image from (user) => this image will be added to req.file using a middleware that we will create using multer.
    const plan = req.plan;  // plan info (premium/free)

    // STEP 2: Check plan
    // For no premium plan
    if(plan !== 'premium') {
      return res.json({success: false, message: "This feature is only available for premium subscriptions."}) 
    }

    // STEP 3: Cloudinary me background removal effect lagana
    // for premium plan (we will remove background of image using cloudinary) :
    const {secure_url} = await cloudinary.uploader.upload(image.path, { // here we will upload the image => then it will return a url(secured url)
      transformation:[
        {
          effect : 'background_removal', // effect type
          background_removal: 'remove_the_background' // special option
        }
      ]
    })

    // STEP 4: Database me store karna
    // storing image in database (using sql query):
    await sql`INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

    // STEP 5: Response bhejna
    // sending response :
    res.json({success: true, content: secure_url})  // secureurl is the response


  } catch (error) {
    console.log(error.message)
    res.json({success: false, message:error.message})

  }

}



// 5th API :

// 5th controller fun :  Remove Specific Object from Image
export const removeImageObject = async (req,res)=> {
  try {
    
    // STEP 1: Data extract karna
    // getting data :
    const {userId} = req.auth();  // userid from req.auth
    const {object} = req.body;    // object data from req.body => remove karne wala object name
    const image = req.file;       // image data from req.file
    const plan = req.plan;        // plan data from req.plan

    // STEP 2: Plan check
    // checking user plan detail :

    // with no premium plan :
    if(plan !== 'premium') {
      return res.json({success: false, message: "This feature is only available for premium subscriptions."}) 
    }
 
    // with premium plan :
    // STEP 3: Upload image to Cloudinary
    // for uploading image:
    const {public_id} = await cloudinary.uploader.upload(image.path)  // it will upload image on cloudinary

    // STEP 4: Transformation apply karna (object removal)
    // removing object from uploaded image :
    const imageUrl = cloudinary.url(public_id,{
      transformation: [{effect: `gen_remove:${object}`}],
      resource_type: 'image'
    })

    // STEP 5: Database me save karna
    // storing updated image in database :
    await sql`INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;  // it will save data in neon database

    // STEP 6: Response bhejna
    res.json({success: true, content: imageUrl})


  } catch (error) {
    console.log(error.message)
    res.json({success: false, message:error.message})

  }

}



// 6th API :

// 6th controller fun :  Resume Review using AI
export const resumeReview = async (req,res)=> {
  try {
    
    // STEP 1: Data lena
    const {userId} = req.auth();
    const resume = req.file;
    const plan = req.plan;

    // STEP 2: Plan check
    if(plan !== 'premium') {
      return res.json({success: false, message: "This feature is only available for premium subscriptions."}) 
    }

    // STEP 3: File size validation
    // checking file size of resume :
    if(resume.size >  5* 1024 * 1024){ // 5mb se jyda k liye kaam nhi krega
      return res.json({success:false, message: "Resume file size exceeds allowed size (5MB)."})
    }

    // STEP 4: File read karke buffer banana
    // converting resume into databuffer (if file size is < 5MB):
    const dataBuffer = fs.readFileSync(resume.path)

    // STEP 5: PDF parse karke text extract karna
    // parsing resume to extract it's text :
    const pdfData = await pdf(dataBuffer)
    
    // STEP 6: AI prompt banana
    // generating prompt :
    const  prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement.
    Resume Content:\n\n${pdfData.text}`  // providing resume content

    // STEP 7: Gemini AI API call karna
    // sending prompt in google gemini ai :
    const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [{ role: "user", content: prompt,} ],
        temperature: 0.7,
        max_tokens: 1000,
    });

    // STEP 8: Response extract karna
    // getting response :
    const content = response.choices[0].message.content    


    // STEP 9: Database me store karna
    await sql`INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

    res.json({success: true, content})


   // STEP 10: Response bhejna
  } catch (error) {
    console.log(error.message)
    res.json({success: false, message:error.message})

  }

}


// NOTE : for all fun we are getting some data from body(front-end) therfore for all we will use post-method

// create api end-points for all the fun in 'airoutes.js'





