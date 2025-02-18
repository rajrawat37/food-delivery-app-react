import React, { useState, useEffect } from "react";
import "./Header.css";

// const Header = () => {
//   return (
//     <div className="header">
//       <div className="header-contents">
//         <h2>Order your favourite food here</h2>

//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
//           perferendis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
//           Cumque eos eveniet commodi ex alias repellendus placeat facere, vero
//           fuga quo voluptate optio iste, atque possimus veniam explicabo quia.
//           Culpa, facere.
//         </p>

//         <button>View Menu</button>
//       </div>
//     </div>
//   );
// };

import img1 from "../../assets/header_img1.jpg";
import img2 from "../../assets/header_img2.jpg";
import img3 from "../../assets/header_img3.jpg";
import img4 from "../../assets/header_img4.jpg";

const images = [img1, img2, img3, img4];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      <div
        className="header-background"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          perferendis.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
