import { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';
import axios from 'axios';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';


export default function AppearanceSettings() {
  const fileInputRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isSidebarVisible,toggleSidebarVisibility } = useOutletContext();

  const [color, setColor] = useState('#3B82F6');
  const [ selectedLogo,setSelectedLogo] =useState(logo);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('isDarkMode');
    if (storedDarkMode !== null) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
  };


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedLogo(imageURL);
  
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const response = await axios.post('/upload-image-endpoint', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',

          },
          
        });
        console.log('Image uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading the image:', error);
      }
    }
  };
  

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='flex w-full'>
    <div className='w-[98%]'>
    <div className="ml-5 w-full">
      <h2 className="text-customBlue900 font-bold mt-3 dark:text-customBlue100">Appearance Information</h2>
      <h2 className="text-customBlue900 font-bold mt-2 dark:text-customBlue100">Team Logo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center space-x-0 md:space-x-3 ml-14">
        <h3 className="text-gray-400">Update your team logo</h3>
        <div className="flex items-center mt-2">
          <img
            className="w-14 h-14 rounded-full mr-5"
            src={selectedLogo}
            alt="Team Logo"
          />
           <input 
          type="file" 
          accept="image/*" 
          id="image" 
          onChange={handleLogoUpload} 
          ref={fileInputRef}
          style={{ display: 'none' }} 
        />
          <button
            type="button"
            className="text-white mt-5 bg-customBlue900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-xs px-4 py-2.5 text-center dark:bg-customBlue600 dark:hover:bg-customBlue300 dark:focus:ring-blue-800 hover:bg-customBlue300"
          onClick={triggerFileInput}
          >
            Replace Logo
          </button>
        </div>
      </div>
        <hr className="bg-customBlue900 mt-10" />
        <h2 className="text-customBlue900 font-bold mt-5 dark:text-customBlue100">Night Mode</h2>
        <div className="flex justify-between items-center space-x-0 md:space-x-3 ml-14">
          <h3 className="text-gray-400">Activate your night mode</h3>
          <div className="flex justify-end">
        <button
          onClick={toggleDarkMode}
          className="px-2 py-1 text-white bg-customBlue900 rounded-lg dark:bg-customBlue600  dark:hover:bg-customBlue300 focus:outline-none hover:bg-customBlue300"
        >
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
        </div>
        <hr className="bg-customBlue900 mt-10" />
        <h2 className="text-customBlue900 font-bold mt-5 dark:text-customBlue100">Transparent Sidebar</h2>
        <div className="flex justify-between items-center space-x-0 md:space-x-3 ml-14">
          <h3 className="text-gray-400">Activate your transparent sidebar</h3>
          <div className="flex justify-end">
          <button
          className="px-2 py-1 mt-4 text-white bg-customBlue900 rounded-lg dark:bg-customBlue600 dark:hover:bg-customBlue300 focus:outline-none hover:bg-customBlue300"
          onClick={toggleSidebarVisibility}
        >
          {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
        </button>
          </div>
        </div>
        <hr className="bg-customBlue900 mt-10" />
        <h2 className="text-customBlue900 font-bold mt-5 dark:text-customBlue100">Sidebar Features</h2>
        <div className="flex justify-between items-center space-x-0 md:space-x-3 ml-14">
          <h3 className="text-gray-400">What shows in the desktop sidebar</h3>
          <div className="flex justify-end">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-customBlue900 hover:bg-customBlue300 focus:ring-4 focus:outline-none dark:bg-customBlue600  dark:hover:bg-customBlue300 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-800"
              type="button"
            >
              Dropdown button{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex justify-end mt-5">
        <button
          type="button"
          className="text-customBlue900 bg-customGray focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-xs px-4 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-300 dark:focus:ring-blue-800 mr-2 dark:text-white hover:bg-gray-500 hover:text-white"
        >
          Cancel
        </button>
        <button 
              type="submit" 
              className="text-white bg-customBlue900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-xs px-4 py-2.5 text-center dark:bg-customBlue600 dark:hover:bg-customBlue300 dark:focus:ring-blue-800 hover:bg-customBlue300"

          
            >
              Save Changes
            </button>
      </div>
    </div>
    </div>
  );
}
