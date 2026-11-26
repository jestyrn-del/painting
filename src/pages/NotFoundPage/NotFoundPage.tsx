import { useNavigate } from "react-router-dom";

import "../Home.css";
import '../../index.css';

import "./NotFoundPage.css";

import { Header } from '../../components/Header/Header';

// Background
import Background from '../../../public/Assets/Development-Page.svg';

// Decorations
import Decoration from '../../../public/Assets/Common-Icon.svg';
import Arrow from '../../../public/Assets/Common-Right-Arrow.svg';


function DevelopmentPage() {
  const navigate = useNavigate();

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
              Эта страница находится<br/>в разработке
            </h1>

            <p>
              Мы все время развиваемся и скоро здесь<br/>
              тоже будет красиво! Подождите немного
            </p>
          </div>

          <a className="dev-back-link" onClick={() => navigate(-1)}>
            <img className="dev-back-arrow" src={Arrow}/>
            <span>Назад</span>
          </a>
        </div>

        <img className="dev-message-decoration" src={Decoration}/>
      </section>
    </main>
  );
}

export default DevelopmentPage;