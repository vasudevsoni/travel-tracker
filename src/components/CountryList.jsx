import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Countries you've visited will show up here." />;
  return (
    <ul className={styles.countryList}>
      {countries.map(function (country) {
        return <CountryItem key={country.country} country={country} />;
      })}
    </ul>
  );
}

export default CountryList;
