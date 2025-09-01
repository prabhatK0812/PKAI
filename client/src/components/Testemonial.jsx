// 🔹 Apne project ke assets folder se images/icons import kar rahe hain (yahan star icons use honge).
import { assets } from "../assets/assets"

// copy paste from builtin UI website :

// ✅ Functional component banaya hai jiska naam Testemonial rakha hai
const Testemonial = () => {  // updating fun name
    
    // 🔹 Dummy testimonial data create kiya (backend se abhi connect nahi kiya, sirf demo ke liye)
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Marketing Director, TechCorp',
            content: 'ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Content Creator, TechCorp',
            content: 'ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Content Writer, TechCorp',
            content: 'ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 4,
        },
    ]

    return (
        // 🔹 Outer wrapper div – section ka padding set kiya hai
        <div className='px-4 sm:px-20 xl:px-32 py-24'>
            {/* 🔹 Section Heading part */}
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>Loved by Creators</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>Don't just take our word for it. Here's what our users are saying.</p>
            </div>
            {/* 🔹 Testimonials Grid */}
            <div className='flex flex-wrap mt-10 justify-center'>
                {/* Dummy data array ko map kar ke har testimonial ke liye ek card banayenge */}
                {dummyTestimonialData.map((testimonial, index) => (
                    // 🔹 Single testimonial card
                    <div key={index} className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer'>
                        {/* 🔹 Rating stars */}
                        <div className="flex items-center gap-1">

                          {/* #deleted all 5 svg part Now we will add our star icons form asssets & we will display the stars rating on basis of number of stars in the data */}

                          {/*
                           Array(5).fill(0) → ek array banaya [0,0,0,0,0]
                           map ke andar check karte hain:
                             - agar index < testimonial.rating → filled star dikhana (yellow icon)
                             - warna dull star (grey icon)
                          */}

                          {Array(5).fill(0).map((_,index) =>(<img key={index} src={index < testimonial.rating ? assets.star_icon : assets.star_dull_icon} className='w-4 h-4' alt="star"/>))}
                          {/* #understand this line of code & its working */}

                        </div>

                        {/* 🔹 User feedback text */}
                        <p className='text-gray-500 text-sm my-5'>"{testimonial.content}"</p>
                        <hr className='mb-5 border-gray-300' />
                        {/* 🔹 User details (image + name + title) */}
                        <div className='flex items-center gap-4'>
                            <img src={testimonial.image} className='w-12 object-contain rounded-full' alt='' />
                            <div className='text-sm text-gray-600'>
                                <h3 className='font-medium'>{testimonial.name}</h3>
                                <p className='text-xs text-gray-500'>{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// 🔹 Export kar diya taki Home.jsx ya kisi aur page me use kar saken
export default Testemonial
// mount this to home.jsx





