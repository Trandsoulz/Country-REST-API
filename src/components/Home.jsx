import { data } from "autoprefixer";
import { Result } from "postcss";
import { useState, useEffect } from "react";
import { ImSpinner8 } from "react-icons/im";

const Home = ({ errorToast }) => {
  const [countryName, setCountryName] = useState("");
  const [country, setCountry] = useState();
  const [errorCountry, setErrorCountry] = useState(false);
  const [processing, setProcessing] = useState(false);
  // const [unknownResult, setUnknownResult] = useState();

  // API-KEY
  const apiKey = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  // Value from input
  const setChangedCountry = (e) => {
    setCountryName(e.target.value);
  };

  // Search function
  const searchCountry = async () => {
    try {
      setProcessing(true);
      if (countryName.length==0){
        setProcessing(false);
        setErrorCountry(true);
        errorToast("Please input a valid country");
        return '';
      }
      setErrorCountry(false);
      const res = await fetch(apiKey);
      const data = await res.json();
      if (data.status===404){
        setProcessing(false);
        setErrorCountry(true);
        errorToast("Please enter a valid country");
        return '';
      }else{
        setProcessing(false);
        setCountry(data[0]);
      }
    } catch (err) {
      setProcessing(false);
      console.err(err);
    }
  };

  // Result of the search
  const result = country && (
    <div className="bg-slate-300 p-4 rounded-b-xl">
      <img
        className=" p-2"
        src={country.flags.png}
        alt={"Picture of " + countryName}
      />
      <h2 className="text-center text-true-gray-400 text-xl font-semibold">
        {country.name.common}
      </h2>

      <h2 className="p-2 text-true-gray-400 font-semibold">
        Capital: <span className="font-medium">{country.capital[0]}</span>
      </h2>
      <h2 className="p-2 text-true-gray-400 font-semibold">
        Continent: <span className="font-medium">{country.continents[0]}</span>
      </h2>
      <h2 className="p-2 text-true-gray-400 font-semibold">
        Currency:{" "}
        <span className="font-medium">
          {country.currencies[Object.keys(country.currencies)].name +
            " - " +
            country.currencies[Object.keys(country.currencies)].symbol}
        </span>
      </h2>
      <h2 className="p-2 text-true-gray-400 font-semibold">
        Common Languages:{" "}
        <span className="font-medium">
          {Object.values(country.languages).toString().split().join(", ")}
        </span>
      </h2>
      <h2 className="p-2 text-true-gray-400 font-semibold">
        Map:{" "}
        <span className="font-medium">
          <a
            className="underline-offset-1 text-blue-700"
            target="_blank"
            href={country.maps.openStreetMaps}
          >
            Click Here
          </a>
        </span>
      </h2>
      <h2 className="p-2 text-true-gray-400 font-semibold">
        Population:{" "}
        <span className="font-medium">
          {country.population.toLocaleString()}
        </span>
      </h2>
    </div>
  );

  useEffect(() => {
    // You no need call searchCountry here
  }, []);

  return (
    <>
      <div className="center-div">
        <div className=" bg-white  rounded-xl ">
          <div className=" p-4">
            <input
              type="text"
              name="Country"
              value={countryName}
              onChange={setChangedCountry}
              // id="CountryName"
              placeholder="Enter a country name here"
              className={`outline-none border-b-2 mx-2  ${errorCountry?'border-[#FF0000] vibrateDiv':'border-[#3d64e6]'}`}
            />
            <button
              type="button"
              className="ml-4 mr-2 bg-[#3d64e6] px-4 py-2 rounded-xl  cursor-pointer text-white spin"
              onClick={searchCountry}
            >
              {processing?<ImSpinner8 />:"Search"}
            </button>
          </div>

          {result}
        </div>
      </div>
    </>
  );
};

export default Home;
