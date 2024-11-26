import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../context/CitiesContext";
import Spinner from "./Spinner";
import Button from "./Button";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, date, notes } = currentCity;

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div>
        <BackButton />
      </div>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>{cityName}</h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <a
        href={`https://en.wikipedia.org/wiki/${cityName}`}
        target="_blank"
        rel="noreferrer"
      >
        Wikipedia: {cityName} &rarr;
      </a>
    </div>
  );
}

export default City;
