import React from 'react'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className='bg-black h-[500px] flex items-center justify-between px-16 overflow-hidden'>
        {/* Left Side: Text Content */}
        <div className='max-w-xl'>
          <h1 className='font-extrabold text-white text-6xl leading-tight mb-6'>
            Discover the <br /> 
            <span className="text-blue-500">Galaxy S24 Ultra</span>
          </h1>
          <p className='text-gray-400 text-lg mb-8'>
            Experience the next era of Mobile AI with the new Galaxy S series.
          </p>
          <button className='bg-white px-8 py-3 rounded-full text-black font-bold hover:bg-gray-200 transition-all'>
            Shop Latest Devices
          </button>
        </div>

        {/* Right Side: Image */}
        <div className='h-full flex items-center'>
          <img 
            className='h-[450px] object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]' 
            src='https://images.samsung.com/is/image/samsung/p6pim/in/s2602/gallery/in-galaxy-s26-ultra-s948-sm-s948bzwcins-550793975?imbypass=true' 
            alt="Galaxy S24 Ultra"
          />
        </div>
      </div>

     
      {/* Featured Categories Section */}
<div className="py-16 px-10 bg-white">
  <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Featured Categories</h2>
  
  {/* Grid Container */}
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
    
    {/* Category Card Template */}
    {[
      { name: 'Smartphones', icon: '📱' },
      { name: 'Tablets', icon: '平板' }, // Tablet icon placeholder
      { name: 'Laptops', icon: '💻' },
      { name: 'Audio', icon: '🎧' },
      { name: 'Appliances', icon: '🏠' },
      { name: 'Wearables', icon: '⌚' }
    ].map((cat, index) => (
      <div key={index} className=' flex flex-col item-center p-6 bg-gray-50 rounded-2xl border-transparent  hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group '>
        <div className='text-4xl mb-4 group-hover:scale-110 transition-transform'>{cat.icon}</div>
        <p className='font-semibold text-gray-700 text-sm'>{cat.name}</p>
      </div>
    ))}

  </div>
</div>
{/* Top deails section */}
<h2>TOP DEALS</h2>
{/* grid container */}
<div>
{
  [
    { img : "📺" , name : "" , detail : "" , price: "$20,000" },
    { img : "📱" , name : "" , detail : "" , price: "$30,000" },
    { img : "📸" , name : "" , detail : "" , price: "$10,000" }
  ].map((ele , index)=>{
    <div key={index}>
      <div>{ele.img}</div>
      <h3>{ele.name}</h3>
      <p>{ele.detail}</p>
      <h2>{ele.price}</h2>

      </div>
  })
}
</div>
<div>

</div>
    </div>
  )
}

export default Home