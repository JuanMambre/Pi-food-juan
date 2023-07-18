import { NavLink } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  return (
    <main
      class='landing_main'
      style={{ backgroundImage: 'url(/images/landing-bg.png)' }}
    >
      {/* <section class='landing_left'></section> */}
      <section class='landing_right'>
        <h1 class='landing_title'>Welcome to my food&apos;s page</h1>
        <NavLink to='/home'>
          <button class='landing_button'>Let&apos; get started!</button>
        </NavLink>
      </section>
    </main>
  );
};

export default Landing;
