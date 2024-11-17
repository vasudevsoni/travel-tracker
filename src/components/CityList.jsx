import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by selecting it on the map." />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map(function (city) {
        return <CityItem key={city.id} city={city} />;
      })}
    </ul>
  );
}

export default CityList;
