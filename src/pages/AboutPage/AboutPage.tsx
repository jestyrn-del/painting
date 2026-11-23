import "../Home.css";
import '../../index.css';

import "./AboutPage.css";

import { Header } from '../../components/Header/Header';

// Background
import Background from '../../../public/Assets/Development-Page.svg';

// Decorations
import Decoration from '../../../public/Assets/Common-Icon.svg';
import Arrow from '../../../public/Assets/Common-Right-Arrow.svg';


function AboutPage() {
  return (
    <main className="development-page" id="top">
      <Header /> 

      <div className="dev-background">
        <img className="dev-background-image" src={Background} alt=""/>
      </div>

      <section className="dev-message">
        <div className="dev-message-content">
          <div className="dev-message-text">
            <h1>
                "О КОМПАНИИ"<br/>Тут скоро будет новая страница
            </h1>
          </div>

          <a className="dev-back-link" href="/">
            <img className="dev-back-arrow" src={Arrow}/>
            <span>Назад</span>
          </a>
        </div>

        <img className="dev-message-decoration" src={Decoration}/>
      </section>
    </main>
  );
}

export default AboutPage;