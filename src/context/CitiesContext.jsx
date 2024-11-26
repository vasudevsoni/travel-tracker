import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const CitiesContext = createContext();

const URL = "http://localhost:9000";

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
        // console.log(data);
      } catch {
        alert("There was an error fetching the data!!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch {
        alert("There was an error fetching the data!!");
      } finally {
        setIsLoading(false);
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error creating the city!!");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting the city!!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}
