import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './HotelSearch.css'; 

function HotelSearch() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: '',
    star_rating: '',
    pool_available: '',
  });

  const fetchHotels = async () => {
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });

    const res = await axios.get('http://localhost:8000/api/hotels/', { params });
    setHotels(res.data);
  };

  useEffect(() => {
    fetchHotels();
  }, [filters]);

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

  const viewDetails = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  const handleBookmarksClick = () => {
    navigate('/bookmarks');
  };

  return (
    <div className="hotel-search">
      <div className="header-row">
        <h2>Search Hotels</h2>
        <button className="bookmark-view-btn" onClick={handleBookmarksClick}>
          Bookmarked Hotels
        </button>
      </div>

      <div className="filters">
        <input
          placeholder="Location"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <select onChange={(e) => setFilters({ ...filters, star_rating: e.target.value })}>
          <option value="">All Ratings</option>
          <option value="3">3-Star</option>
          <option value="4">4-Star</option>
          <option value="5">5-Star</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, pool_available: e.target.value })}>
          <option value="">Pool?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="hotel-list">
        {hotels.map(hotel => (
          <div className="hotel-item" key={hotel.id}>
            <img src={hotel.image_url} alt={hotel.name} className="hotel-image" />
            <div className="hotel-details">
              <h3 className="hotel-name">{hotel.name}</h3>
              <p className="hotel-location">{hotel.location}</p>
              <p className="hotel-description">{hotel.description}</p>
              <div className="hotel-info">
                <p>⭐ {hotel.star_rating} Star | Pool: {hotel.pool_available ? "Yes" : "No"} | {hotel.price}</p>
              </div>
              <div className="buttons">
                <button className="btn btn-primary" onClick={() => viewDetails(hotel.id)}>View Details</button>
                <button className="btn btn-secondary" onClick={() => bookmarkHotel(hotel.id)}>Bookmark</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelSearch;
