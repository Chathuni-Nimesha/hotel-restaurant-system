const mainCourses = [
  {
    name: "Grilled Angus Steak",
    image: "/images/Grilled Angus Steak.jpeg",
    price: "$45",
  },
 
  {
    name: "Royal Seafood Platter",
    image: "/images/Royal Seafood Platter.jpg",
    price: "$50",
  },
  {
    name: "Grilled Salmon",
    image: "/images/Grilled Salmon.jpg",
    price: "$38",
  },
];

const desserts = [
  {
    name: "Chocolate Lava Cake",
    image: "/images/Chocolate Lava Cake.jpeg",
    price: "$12",
  },
  {
    name: "New York Cheesecake",
    image: "/images/New York Cheesecake.jpg",
    price: "$10",
  },
  {
    name: "Classic Tiramisu",
    image: "/images/Tiramisu.jpeg",
    price: "$14",
  }
];

const drinks = [
  {
    name: "Mojito",
    image: "/images/Mojito.jpg",
    price: "$8",
  },
  {
    name: "Cappuccino",
    image: "/images/Cappuccino.jpeg",
    price: "$7",
  },
  {
    name: "Passion Fruit Mocktail",
    image: "/images/Passion Fruit Mocktail.jpg",
    price: "$10",
  }
];

const Menu = () => {
  return (
    <section className="bg-[#0a0a0a] text-white pt-30 pb-10">

      <div className="w-full border-t border-gray-800 mb-4"></div>

      <div className="w-full  px-6">

        {/* Title */}
        <div className="h-16"></div>
        <div className="text-center ">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-12">
            Our Menu
          </h2>

          <p className="text-gray-300 text-lg mb-32">
            Discover our signature dishes and premium selections.
          </p>
        </div>
        <div className="h-8 "></div>

        {/* Main Courses */}
       
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-yellow-500 mb-20 text-center">
            Main Courses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {mainCourses.map((item, index) => (
              <div
                key={index}
                className="
                  bg-[#111]
                  rounded-2xl
                  overflow-hidden
                  border
                  border-gray-800
                  hover:border-yellow-500
                  hover:-translate-y-2
                  hover:shadow-[0_0_25px_rgba(234,179,8,0.2)]
                  transition-all
                  duration-500
                  group
                "
              >
                
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover "
                  />
            

                <div className="p-5 flex justify-between items-center">
                  
                    <h4 className="text-xl font-bold">
                      {item.name}
                    </h4>

                    <span className="text-yellow-500 font-bold">
                      {item.price}
                    </span>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desserts */}
        <div className="h-10"></div>
        <div className="mb-32">

          <h3 className="text-3xl font-bold text-yellow-500  mb-20 text-center">
             Desserts
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {desserts.map((item, index) => (
             <div
               key={index}
               className="
                bg-[#111]
                rounded-2xl
                overflow-hidden
                border
                border-gray-800
                hover:border-yellow-500
                hover:-translate-y-2
                transition-all duration-500
                group
              "
            >
                
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover "
                />
                

                <div className="p-5 flex justify-between items-center">
                  <h4 className="text-xl font-bold">
                    {item.name}
                  </h4>

                  <span className="text-yellow-500 font-bold text-xl">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drinks */}
        <div className="h-10"></div>
        <div className="mb-32" >
          <h3 className="text-3xl font-bold text-yellow-500 mb-20 text-center">
            Signature Drinks
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drinks.map((item, index) => (
              <div
                key={index}
                className="
                  bg-[#111]
                  rounded-2xl
                  overflow-hidden
                  border
                  border-gray-800
                  hover:border-yellow-500
                  hover:-translate-y-2
                  transition-all
                  duration-500
                  group
                "
              >
                 
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover "
                  />
                

                <div className="p-5 flex justify-between items-center">
                  <h4 className="text-xl font-bold">
                    {item.name}
                  </h4>

                  <span className="text-yellow-500 font-bold text-xl">
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Menu;