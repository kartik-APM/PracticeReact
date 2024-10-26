import Day from "./Day";

function Weather({ location, weather }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;
  return (
    <div>
      <h2>{location}</h2>
      <ul className="weather">
        {dates.map((date, idx) => (
          <Day
            key={date}
            date={date}
            max={max[idx]}
            min={min[idx]}
            code={codes[idx]}
            isToday={idx === 0}
          />
        ))}
      </ul>
    </div>
  );
}

export default Weather;
