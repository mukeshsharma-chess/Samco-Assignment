import React, { useState, useEffect } from 'react';
// import * as Yup from 'yup';
import SideBar from '../shared/sideBar';

const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// const validationSchema = Yup.object().shape({
//   country: Yup.string().required('Country is required'),
//   state: Yup.string().required('State is required'),
//   district: Yup.string().required('District is required'),
//   city: Yup.string().required('City is required'),
// });

const Home = () => {

  let hasError = false;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [errors, setErrors] = useState({
    errCountry: "",
    errState: "",
    errDistric: "",
    errCity: "",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await fetchData('http://localhost:3001/countries');
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (name, value) => {
    console.log("handleError", name, value)
    setSelectedCountry(value);  
    const data = await fetchData(`http://localhost:3001/states`);
    const newData = data?.filter(item => item.countryId === parseInt(value))
    setStates(newData);
    handleError(name, value)
  };

  const handleStateChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSelectedState(value);

    const data = await fetchData(`http://localhost:3001/districts`);
    const newData = data?.filter(item => item.stateId === parseInt(value))
    setDistricts(newData);
    handleError(name, value)
  };

  const handleDistrictChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSelectedDistrict(value);

    const data = await fetchData(`http://localhost:3001/cities`);
    const newData = data?.filter(item => item.districtId === parseInt(value))
    setCities(newData);
    handleError(name, value)
  };

  const handleCityChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSelectedCity(value)
    handleError(name, value)
  }

  const handleError = (name, value) => {

    let allState = errors;

    if (name === "selectedCountry") {
      if (!value.length) {
        allState["errCountry"] = "Select country."
      } else {
        allState["errCountry"] = ""
      }
    }
    if (name === "selectedState") {
      if (!value.length) {
        allState["errState"] = "Select state."
      } else {
        allState["errState"] = ""
      }
    }
    if (name === "selectedDistrict") {
      if (!value.length) {
        allState["errDistric"] = "Select distric."
      } else {
        allState["errDistric"] = ""
      }
    }
    if (name === "selectedCity") {
      if (!value.length) {
        allState["errCity"] = "Select city."
      } else {
        allState["errCity"] = ""
      }
    }
    setErrors(prevError => ({
      ...prevError,
      ...allState
    }))
  }


  const checkValidation = () => {
    hasError = false;
    let allState = errors;

    if (!selectedCountry.length) {
      allState["errCountry"] = "Select country."
      hasError = true;
    } else {
      allState["errCountry"] = ""
    }
    if (!selectedState.length) {
      allState["errState"] = "Select state."
      hasError = true;
    } else {
      allState["errState"] = ""
    }
    if (!selectedDistrict.length) {
      allState["errDistric"] = "Select distric."
      hasError = true;
    } else {
      allState["errDistric"] = ""
    }
    if (!selectedCity.length) {
      allState["errCity"] = "Select city."
      hasError = true;
    } else {
      allState["errCity"] = ""
    }
    setErrors(prevError => ({
      ...prevError,
      ...allState
    }))
    return hasError
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!checkValidation()) {
      const data = {
        selectedCountry,
        selectedState,
        selectedDistrict,
        selectedCity
      }
      console.log(data)
      alert("Submited...")
    }
  }

  return (
    <SideBar>
      <h2>Form</h2>
      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor="country">Country</label>
            <select
              name="selectedCountry"
              value={selectedCountry}
              onChange={(e) => handleCountryChange("selectedCountry", e.target.value)}
              onBlur={handleError}
            >
              <option value="">Select</option>
              {countries.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {<span className='text-danger'>{errors["errCountry"]}</span>}
          </div>
          <div className='form-group'>
            <label htmlFor="state">State</label>
            <select
              name="selectedState"
              value={selectedState}
              onChange={handleStateChange}
              onBlur={handleError}
            >
              <option value="">Select</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {<span className='text-danger'>{errors["errState"]}</span>}
          </div>
          <div className='form-group'>
            <label htmlFor="district">District</label>
            <select
              name="selectedDistrict"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              onBlur={handleError}
            >
              <option value="">Select</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {<span className='text-danger'>{errors["errDistric"]}</span>}
          </div>
          <div className='form-group'>
            <label htmlFor="city">City</label>
            <select
              name="selectedCity"
              value={selectedCity}
              onBlur={handleError}
              onChange={handleCityChange}
            >
              <option value="">Select</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {<span className='text-danger'>{errors["errCity"]}</span>}
          </div>
          <div className='form-group'>
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </SideBar>
  );
};

export default Home;
