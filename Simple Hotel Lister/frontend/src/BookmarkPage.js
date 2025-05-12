import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './BookmarkPage.css'; 

function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const res = await axios.get('http://localhost:8000/api/bookmarks/', { withCredentials: true });
      setBookmarks(res.data);
    };
    fetchBookmarks();
  }, []);

  const unbookmark = async (hotelId) => {
    try {
      const csrfToken = Cookies.get('csrftoken');
      await axios.post(
        'http://localhost:8000/api/unbookmark/',
        { hotel_id: hotelId },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );
      alert("Hotel unbookmarked successfully!");
      setBookmarks(prev => prev.filter(hotel => hotel.id !== hotelId));
    } catch (error) {
      console.error("Unbookmarking failed:", error);
      alert("Failed to unbookmark hotel. Make sure you are logged in.");
    }
  };

  return (
    <div className="bookmark-container">
      <h2>Your Bookmarked Hotels</h2>
      {bookmarks.map(hotel => (
        <div className="bookmark-card" key={hotel.id}>
          {hotel.image_url && <img src={hotel.image_url} alt={hotel.name} />}
          <div className="bookmark-details">
            <h3>{hotel.name}</h3>
            <p>{hotel.location}</p>
            <p>{hotel.description}</p>
            <p>⭐ {hotel.star_rating} Star | Pool: {hotel.pool_available ? "Yes" : "No"} | ${hotel.price}</p>
            <button onClick={() => unbookmark(hotel.id)}>Remove Bookmark</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookmarkPage;
