import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './BookmarkPage.css';

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      const res = await axios.get('http://localhost:8000/api/hotels/');
      const foundHotel = res.data.find(h => h.id === parseInt(id));
      setHotel(foundHotel);
    };
    fetchHotel();
  }, [id]);

  if (!hotel) return <p>Loading...</p>;

  const bookmarkHotel = async (hotelId) => {
    try {
      const csrfToken = Cookies.get('csrftoken');
      await axios.post(
        'http://localhost:8000/api/bookmark/',
        { hotel_id: hotelId },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );
      alert("Hotel bookmarked successfully!");
    } catch (error) {
      console.error("Bookmarking failed:", error);
      alert("Failed to bookmark hotel. Make sure you are logged in.");
    }
  };

  return (
    <div className="bookmark-container">
      <h2>Hotel Details</h2>
      <div className="bookmark-card" key={hotel.id}>
        {hotel.image_url && <img src={hotel.image_url} alt={hotel.name} />}
        <div className="bookmark-details">
          <h3>{hotel.name}</h3>
          <p>{hotel.location}</p>
          <p>{hotel.description}</p>
          <p>⭐ {hotel.star_rating} Star | Pool: {hotel.pool_available ? "Yes" : "No"} | ${hotel.price}</p>
          <button onClick={() => bookmarkHotel(hotel.id)}>Bookmark</button>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
