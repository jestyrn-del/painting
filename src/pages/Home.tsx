import { useState } from "react";
import "./Home.css";

import LogoVeteran from "../../public/Assets/Logo-Veteran.svg";

const services = [
  {
    title: "Покрасим ваши изделия",
    description: "От 1 штуки до партий в несколько м².",
    details:
      "Камера 7,2 × 1,4 × 2,5 м, любой цвет RAL и фактура.",
    price: "от 400 ₽/м²",
    link: "Рассчитать стоимость",
  },
  {
    title: "Поставим оборудование",
    description:
      "Камеры нанесения, печи полимеризации, транспортные системы, линии порошковой окраски под ключ.",
    details: "Сами красим на этом оборудовании каждый день.",
    price: "от 300 000 ₽",
    link: "Подобрать оборудование",
  },
  {
    title: "Отгрузим продукцию",
    description:
      "Лофт-мебель, металлокаркасы, бытовки (модульные здания).",
    details: "Можем производить под вашей маркой.",
    price: "партии от 1 шт",
    link: "Посмотреть каталог",
  },
];

const statistics = [
  { value: "7 м", label: "Максимальная длина изделия" },
  { value: "2–3 дня", label: "Стандартный срок окраски" },
  { value: "1 год", label: "Гарантия на отслоение покрытия" },
  { value: "3 линии", label: "Окраски под запуском у клиентов" },
];

const paintingServices = [
  {
    title: "Порошковая окраска металлоконструкций",
    description: "Партии любого объёма, по договору",
  },
  {
    title: "Покраска радиаторов",
    description: "Чугунных, стальных, алюминиевых",
  },
  {
    title: "Крупногабаритная окраска",
    description: "Изделия до 7 × 1,4 × 2,5 м",
  },
  {
    title: "Пескоструйная обработка",
    description: "Очистка до степени Sa 2½",
  },
];

const questions = [
  {
    question: "Есть ли минимальный заказ на окраску?",
    answer:
      "Нет. Красим и одно изделие, и партии. Стоимость зависит от объёма и характеристик заказа.",
  },
  {
    question: "Какое изделие поместится в камеру?",
    answer:
      "Максимальные габариты камеры: 7,2 × 1,4 × 2,5 м.",
  },
  {
    question: "Можно ли привезти свою краску?",
    answer: "Условия использования материалов согласовываются индивидуально.",
  },
  {
    question: "Какая гарантия на покрытие?",
    answer: "Гарантия на отслоение покрытия — 1 год.",
  },
  {
    question: "Как быстро вы делаете оборудование?",
    answer: "Срок зависит от комплектации и объёма заказа.",
  },
];



function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    ["Услуги", "#services"],
    ["Оборудование", "#equipment"],
    ["Продукция", "#products"],
    ["Проекты", "#projects"],
    ["Производство", "#production"],
    ["О компании", "#about"],
    ["Блог", "#blog"],
    ["Контакты", "#contacts"],
  ];

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="header-logo" href="#">
          <img src={LogoVeteran} alt="В" />
        </a>

        <nav className={`header-nav ${menuOpen ? "active" : ""}`}>
          {navigation.map(([title, href]) => (
            <a
              key={title}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {title}
            </a>
          ))}
        </nav>

        <div className="header-contacts">
          <a href="tel:+79282896222">8 928 289 62 22</a>
          <a href="mailto:si@gk-veteran.ru">si@gk-veteran.ru</a>
        </div>

        <a className="button button--orange" href="#contacts">
          Заказать звонок
        </a>

        <button
          className="header-burger"
          type="button"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-advantages">
            <span>Собственное производство</span>
            <span>Камера 7 м</span>
            <span>Отгрузка от 24 часов</span>
          </div>

          <h1>
            Порошковая окраска, окрасочное оборудование
            и металлоизделия
          </h1>

          <h2>Собственное производство в Ростове-на-Дону</h2>

          <a href="#about" className="text-link">
            Узнать больше →
          </a>
        </div>

        <div className="hero-visual image-placeholder">
          <span>Главное изображение</span>
        </div>
      </div>
    </section>
  );
}

function ServicesOverview() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <small>{service.details}</small>
              </div>

              <div className="service-card-image image-placeholder">
                Изображение
              </div>

              <div className="service-card-bottom">
                <strong>{service.price}</strong>
                <a href="#contacts" className="text-link">
                  {service.link} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyStats() {
  return (
    <section className="section" id="about">
      <div className="container stats">
        <div className="stats-list">
          {statistics.map((item) => (
            <div className="stats-item" key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="stats-visual image-placeholder">
          Видео о производстве
        </div>
      </div>
    </section>
  );
}

function CustomerSolutions() {
  const tabs = [
    "Частный заказ",
    "Заводам и подрядчикам",
    "Красим ваши изделия",
    "Продукция",
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="section section--gray">
      <div className="container">
        <h2 className="section-title">
          Чем мы можем быть полезны именно вам
        </h2>

        <div className="tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`tabs-button ${
                activeTab === index ? "active" : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="solutions">
          <div className="solutions-image image-placeholder">
            Изображение направления
          </div>

          <div className="solutions-content">
            <h3>{tabs[activeTab]}</h3>

            <p>
              Подберём решение под ваш заказ, объём производства
              и технические требования.
            </p>

            <a href="#contacts" className="text-link">
              Рассчитать стоимость →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaintingServices() {
  return (
    <section className="section" id="equipment">
      <div className="container">
        <h2 className="section-title">
          Окраска и обработка металла
        </h2>

        <p className="section-description">
          Полный цикл в одном цехе: подготовка поверхности,
          окраска, полимеризация и упаковка.
          Металлоконструкции можем сделать с нуля по вашему чертежу.
        </p>

        <div className="painting-grid">
          {paintingServices.map((service) => (
            <article className="painting-card" key={service.title}>
              <div className="painting-card-image image-placeholder">
                Изображение
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <a href="#contacts" className="text-link">
                Рассчитать стоимость →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manufacturing() {
  return (
    <section className="section section--gray" id="products">
      <div className="container manufacturing">
        <div>
          <h2 className="section-title">Изготовление под ключ</h2>

          <p>
            Металлоконструкция по чертежу, сразу окрашенная.
          </p>

          <a href="#contacts" className="text-link">
            Рассчитать стоимость →
          </a>
        </div>

        <div className="manufacturing-image image-placeholder">
          Изображение металлоконструкций
        </div>
      </div>
    </section>
  );
}

function Production() {
  return (
    <section className="section" id="production">
      <div className="container">
        <h2 className="section-title">Собственное производство</h2>

        <p className="section-description">
          На площадке 600 м² в Ростове-на-Дону у нас работают
          2 окрасочные линии, участок пескоструйной обработки,
          сварочное производство и цех сборки оборудования.
        </p>

        <div className="production-grid">
          <div className="image-placeholder">Производство</div>
          <div className="image-placeholder">Оборудование</div>
          <div className="image-placeholder">Готовая продукция</div>
        </div>

        <div className="production-features">
          <div>
            <h3>Контроль каждой партии</h3>
            <p>Толщиномер, тест на адгезию, протокол к партии.</p>
          </div>

          <div>
            <h3>Сертифицированные материалы</h3>
            <p>Используем материалы для промышленной окраски.</p>
          </div>

          <div>
            <h3>Собственное хранение</h3>
            <p>150 м² для хранения изделий до и после окраски.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section section--gray" id="projects">
      <div className="container">
        <h2 className="section-title">Наши проекты</h2>

        <div className="projects-grid">
          <article className="project-card">
            <div className="image-placeholder">Фото проекта</div>

            <h3>Складской комплекс, Омск</h3>

            <p>
              Окрасили металлоконструкции каркаса склада:
              1 200 м², RAL 7024, подготовка до Sa 2½.
            </p>
          </article>

          <article className="project-card">
            <div className="image-placeholder">Фото проекта</div>

            <h3>Мебельная фабрика «Люкс»</h3>

            <p>
              Ежемесячно поставляем окрашенные подстолья:
              10 шт в месяц, 3 цвета.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Частые вопросы</h2>

        <div className="faq">
          {questions.map((item, index) => (
            <div className="faq-item" key={item.question}>
              <button
                className="faq-question"
                aria-expanded={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                {item.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>

              {openIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="section contact-section" id="contacts">
      <div className="container contact-layout">
        <div>
          <h2 className="section-title">
            Рассчитаем стоимость за 2 часа
          </h2>

          <p>
            Пришлите чертёж или фото, и мы подготовим расчёт.
          </p>

          <div className="contact-layout-image image-placeholder">
            Изображение
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <input type="text" placeholder="Ваше имя" required />

          <input
            type="tel"
            placeholder="Номер телефона"
            required
          />

          <textarea
            placeholder="Напишите уточнения для расчёта"
            rows={5}
          />

          <label className="contact-form-file">
            Прикрепить файлы
            <input type="file" multiple />
          </label>

          <label className="contact-form-agreement">
            <input type="checkbox" required />
            <span>
              Согласен на обработку персональных данных
            </span>
          </label>

          <button className="button button--orange" type="submit">
            Отправить заявку
          </button>

          {submitted && (
            <p role="status">
              Демонстрационная форма. Отправка на сервер пока не настроена.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="blog">
      <div className="container footer-grid">
        <div>
          <h3>Ветеран</h3>

          <p>ООО «Ветеран. Системный инжиниринг»</p>

          <p>ИНН/КПП 6166133197 / 616601001</p>
        </div>

        <div>
          <h3>Контакты</h3>

          <a href="tel:+79282896222">8 928 289 62 22</a>
          <a href="mailto:si@gk-veteran.ru">si@gk-veteran.ru</a>
        </div>

        <div>
          <h3>Производство</h3>

          <p>
            Ростов-на-Дону, Машиностроительный пер., 7/110
          </p>

          <p>Пн–Пт: 9:00–18:00</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <ServicesOverview />
        <CompanyStats />
        <CustomerSolutions />
        <PaintingServices />
        <Manufacturing />
        <Production />
        <Projects />
        <FAQ />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}