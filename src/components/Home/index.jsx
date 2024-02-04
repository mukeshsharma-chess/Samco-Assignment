import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SideBar from '../shared/sideBar';


const initialValues = {
  selectedCountry: "",
  selectedState: "",
  selectedDistrict: "",
  selectedCity: ""
}

const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const validationSchema = Yup.object().shape({
  selectedCountry: Yup.string().required('Country is required'),
  selectedState: Yup.string().required('State is required'),
  selectedDistrict: Yup.string().required('District is required'),
  selectedCity: Yup.string().required('City is required'),
});

const Posts = () => {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await fetchData('http://localhost:3001/countries');
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (e) => {
    let value = e.target.value;
    setMessage("")
    const data = await fetchData(`http://localhost:3001/states`);
    const newData = data?.filter(item => item.countryId === parseInt(value))
    setStates(newData);
  };

  const handleStateChange = async (e) => {
    let value = e.target.value;
    setMessage("")
    const data = await fetchData(`http://localhost:3001/districts`);
    const newData = data?.filter(item => item.stateId === parseInt(value))
    setDistricts(newData);
  };

  const handleDistrictChange = async (e) => {
    let value = e.target.value;
    setMessage("")
    const data = await fetchData(`http://localhost:3001/cities`);
    const newData = data?.filter(item => item.districtId === parseInt(value))
    setCities(newData);
  };


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("handle on Submit value", values)
      setMessage("Successful Submitted.")
    },
  })

  return (
    <SideBar>
      <h2>Form Velidation with Formik</h2>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="country">Country</label>
            <select
              name="selectedCountry"
              value={values.selectedCountry}
              onChange={(e) => {
                handleChange(e);
                handleCountryChange(e);
              }}
            onBlur={handleBlur}
            >
              <option value="">Select</option>
              {countries.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.selectedCountry && touched.selectedCountry ? (
              <span className='text-danger'>{errors.selectedCountry}</span>
            ) : null}
            
          </div>
          <div className='form-group'>
            <label htmlFor="state">State</label>
            <select
              name="selectedState"
              value={values.selectedState}
              onChange={(e) => {
                handleChange(e);
                handleStateChange(e);
              }}
              onBlur={handleBlur}
            >
              <option value="">Select</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.selectedState && touched.selectedState ? (
              <span className='text-danger'>{errors.selectedState}</span>
            ) : null}
          </div>
          <div className='form-group'>
            <label htmlFor="district">District</label>
            <select
              name="selectedDistrict"
              value={values.selectedDistrict}
              onChange={(e) => {
                handleChange(e);
                handleDistrictChange(e);
              }}
            onBlur={handleBlur}
            >
              <option value="">Select</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.selectedDistrict && touched.selectedDistrict ? (
              <span className='text-danger'>{errors.selectedDistrict}</span>
            ) : null}
          </div>
          <div className='form-group'>
            <label htmlFor="city">City</label>
            <select
              name="selectedCity"
              value={values.selectedCity}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.selectedCity && touched.selectedCity ? (
              <span className='text-danger'>{errors.selectedCity}</span>
            ) : null}
          </div>
          <div className='form-group'>
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
        {<span className='text-success'>{message}</span>}
      </div>
    </SideBar>
  );
};

export default Posts;
