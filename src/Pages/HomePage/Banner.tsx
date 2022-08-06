type Props = {};

const Banner = (props: Props) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">HCinimax</p>
          <h1 className="h1 hero-title">
            Unlimited <strong>Movie</strong>, TVs Shows, &amp; More.
          </h1>
          <div className="meta-wrapper">
            <div className="badge-wrapper">
              <div className="badge badge-fill">PG 18</div>
              <div className="badge badge-outline">HD</div>
            </div>
            <div className="ganre-wrapper">
              <a href="#">Romance,</a>
              <a href="#">Drama</a>
            </div>
            <div className="date-time">
              <div>
                {/* <ion-icon name="calendar-outline" /> */}
                <time dateTime={"2022"}>2022</time>
              </div>
              <div>
                {/* <ion-icon name="time-outline" /> */}
                <time dateTime="PT128M">128 min</time>
              </div>
            </div>
          </div>
          <button className="btn btn-primary">
            {/* <ion-icon name="play" /> */}
            <span>Watch now</span>
          </button>
        </div>
      </div>
    </section>

  );
};

export default Banner;
