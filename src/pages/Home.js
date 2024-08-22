import { useState, useEffect } from "react";
import { colleges as collegesData } from "../data";
import "../App.css";
import { FaArrowRight } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { MdOutlineCompareArrows } from "react-icons/md";
const Home = () => {
  const [displayedColleges, setDisplayedColleges] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const rowsToLoad = 10;

  // console.log(searchTerm);

  useEffect(() => {
    loadMoreRows();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const filteredColleges = collegesData.filter((college) => {
      return college.name.toUpperCase().includes(searchTerm.toUpperCase());
    });
    if (sortConfig) {
      filteredColleges.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    setDisplayedColleges(filteredColleges.slice(0, currentIndex));
  }, [searchTerm, sortConfig, currentIndex]);

  const loadMoreRows = () => {
    setCurrentIndex((prevIndex) => prevIndex + rowsToLoad);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      loadMoreRows();
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  return (
    <>
      <div className="search-box">
        <input
          type="text"
          id="search-input"
          placeholder="Search by college name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table id="college-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("cdRank")}>CD Rank</th>
              <th onClick={() => handleSort("name")}>Colleges</th>
              <th onClick={() => handleSort("fees")}>Course Fees</th>
              <th onClick={() => handleSort("placement")}>Placement</th>
              <th onClick={() => handleSort("userReview")}>User Reviews</th>
              <th onClick={() => handleSort("ranking")}>Ranking</th>
            </tr>
          </thead>
          <tbody id="college-tbody">
            {displayedColleges.map((college, index) => {
              return (
                <tr>
                  <td className="cd-rank">{`#${college.cdRank}`}</td>
                  <td className="colleges">
                    <div>
                      <p className="college-name">{`${college.name}`}</p>
                      <p className="college-location">
                        {`${
                          college.address.distict +
                          ", " +
                          college.address.state +
                          " | " +
                          college.approvedBY
                        }`}
                      </p>
                      <select>
                        <option>B.Tech Computer Engineering</option>
                        <option>
                          B.Tech Information Technology Engineering
                        </option>
                        <option>
                          B.Tech Electronics And Communication Engineering
                        </option>
                        <option>B.Tech Electrical Engineering</option>
                      </select>
                    </div>
                    <div className="colleges-button">
                      <div className="apply-btn-box">
                        <FaArrowRight />
                        <button className="apply-btn">Apply Now</button>
                      </div>
                      <div className="download-brochure-box">
                        <IoMdDownload />
                        <button className="download-brochure-btn">
                          Download Brochure
                        </button>
                      </div>
                      <div className="add-to-compare-box">
                        <button className="add-to-compare-btn">
                          Add To Compare
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="fees-box">
                    <p className="fees">{`${college.fees}`}</p>
                    <p>BE/B.Tech</p>
                    <p>-1st Year Fees</p>
                    <div className="compare-fee">
                      <MdOutlineCompareArrows />
                      <button>Compare Fees</button>
                    </div>
                  </td>
                  <td className="placement-box">
                    <p className="placement-fees">{`${college.placement[0]}`}</p>
                    <p>Average Package</p>
                    <p className="placement-fees">{`${college.placement[1]}`}</p>
                    <p>Highest Package</p>
                    <div className="compare-placement-fee">
                      <MdOutlineCompareArrows />
                      <button>Compare Placement</button>
                    </div>
                  </td>
                  <td className="user-reviews">
                    <p className="rating">{`${college.userReview}`} / 10</p>
                    <p>Based on {`${college.totalUser}`} User Review</p>
                    <select>
                      <option className="option">Best in Social Life</option>
                    </select>
                  </td>
                  <td className="ranking">
                    <p>
                      {`#${college.ranking}/${college.totalCollege}`} in India
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;

// import React, { useState, useEffect } from 'react';
// import './CollegeTable.css';

// const collegesData = [
//     { name: 'College A', rating: 4.5, fees: 100000, userReview: 4.7, featured: true },
//     { name: 'College B', rating: 4.0, fees: 120000, userReview: 4.5, featured: false },
//     { name: 'College C', rating: 3.5, fees: 90000, userReview: 4.2, featured: true },
//     // Add more dummy college data...
// ];

// const CollegeTable = () => {
//     const [displayedColleges, setDisplayedColleges] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortConfig, setSortConfig] = useState(null);
//     const rowsToLoad = 10;

//     useEffect(() => {
//         loadMoreRows();
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     useEffect(() => {
//         const filteredColleges = collegesData.filter(college =>
//             college.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         if (sortConfig) {
//             filteredColleges.sort((a, b) => {
//                 if (a[sortConfig.key] < b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? -1 : 1;
//                 }
//                 if (a[sortConfig.key] > b[sortConfig.key]) {
//                     return sortConfig.direction === 'ascending' ? 1 : -1;
//                 }
//                 return 0;
//             });
//         }
//         setDisplayedColleges(filteredColleges.slice(0, currentIndex));
//     }, [searchTerm, sortConfig, currentIndex]);

//     const loadMoreRows = () => {
//         setCurrentIndex(prevIndex => prevIndex + rowsToLoad);
//     };

//     const handleScroll = () => {
//         if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
//             loadMoreRows();
//         }
//     };

//     const handleSort = (key) => {
//         let direction = 'ascending';
//         if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
//             direction = 'descending';
//         }
//         setSortConfig({ key, direction });
//     };

//     return (
//         <div className="table-container">
//             <input
//                 type="text"
//                 id="search-input"
//                 placeholder="Search by college name"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//             />

//             <table>
//                 <thead>
//                     <tr>
//                         <th onClick={() => handleSort('name')}>College Name</th>
//                         <th onClick={() => handleSort('rating')}>Rating</th>
//                         <th onClick={() => handleSort('fees')}>Fees</th>
//                         <th onClick={() => handleSort('userReview')}>User Review</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {displayedColleges.map((college, index) => (
//                         <tr key={index} className={college.featured ? 'featured' : ''}>
//                             <td>{college.name}</td>
//                             <td>{college.rating}</td>
//                             <td>{college.fees}</td>
//                             <td>{college.userReview}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default CollegeTable;
