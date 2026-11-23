import { useEffect, useRef, useState } from "react";

import "./Home.css";
import '../components/ContactsInputPart/ContactsInputPart.css';

import { Header } from '../components/Header/Header';
import ContactsInput from '../components/ContactsInputPart/ContactsInputPart';
import ContactModal from '../components/ContactModal/ContactModal';

import { Link } from "react-router-dom";

import HlsVideo from "../HlsVideo";
import '../../public/Assets/Fonts/Onest/Onest-use.css';

// Common elements
import LogoVeteran from "../../public/Assets/Common-Logo-Veteran.svg";
import RightArrow from '../../public/Assets/Common-Right-Arrow.svg';
import RightArrowDark from '../../public/Assets/Common-Right-Arrow-Dark.svg';
import CommonComponent from '../../public/Assets/Common-Icon.svg';

import MaxMessanger from '../../public/Assets/Common-max.svg';
import TelegramMessanger from '../../public/Assets/Common-telegram.svg';

// Hero imports
import HeroBgr from '../../public/Assets/Hero-Backgrond.svg';

// Contacts imports
import CommercialDirector from '../../public/Assets/Common-comercial-director.svg';

// Stats rectangle
import StatsRectangle from '../../public/Assets/Stats-rectangle.svg'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const services = [
  {
    id: "painting-service",
    title: "Покрасим ваши изделия",
    description: "От 1 штуки до партий в несколько м².",
    details: (
        <>
        Камера 7,2 × 1,4 × 2,5 м,<br/>
        любой
        {" "} <span className="service-detail-highlight">цвет RAL</span> {" "}
        и фактура.<br/>
        Покраска в день обращения
        </>
    ),
    price: (
      <div>
        <span>от 400 ₽/м²</span>
        <br/>
        <span>от 2 дней</span>
      </div>
    ),
    link: "Рассчитать стоимость",
    form: "Покраска",
  },
  {
    id: "equipment-solutions",
    title: "Поставим оборудование",
    description: 
      <>
        Камеры нанесения, печи<br/>
        полимеризации, транспортные системы,<br/>
        линии порошковой окраски под ключ.
      </>,
    details: "Сами красим на этом оборудовании каждый день.",
    price: (
      <div>
        <span>от 300 000 ₽</span>
        <br/>
        <span>от 4 недель</span>
      </div>
    ),
    link: "Подобрать оборудование",
    form: "Оборудование",
  },
  {
    id: "product-solutions",
    title: "Отгрузим продукцию",
    description:
      <>
        Лофт-мебель, металлокаркасы, бытовки<br/>
        (модульные здания).
      </>,
    details: "Можем производить под вашей маркой.",
    price: (
      <div>
        <span>партии</span><br/>
        <span>от 1 шт</span>
      </div>
    ),
    link: "Посмотреть каталог",
  },
];

const statistics = [
  { value: "7,2 м", label: "Максимальная длина изделия" },
  { value: "2–3 дня", label: "Стандартный срок окраски" },
  { value: "1 год", label: "Гарантия на отслоение покрытия" },
  { value: "3 линии", label: "Окраски под запуском у клиентов" },
];

const serviceCategories = [
  {
    title: "Окраска и обработка металла",
    description:
      "Полный цикл в одном цехе: подготовка поверхности, окраска, полимеризация и упаковка. Металлоконструкции можем сделать с нуля по вашему чертежу.",
    cards: [
      {
        title: "Порошковая окраска металлоконструкций",
        description: "Партии любого объёма, по договору",
        price: "от 400 ₽/м²",
        term: "от 2 дней",
        form: "Покраска",
      },
      {
        title: "Покраска радиаторов",
        description: "Чугунных, стальных, алюминиевых",
        price: "от 4 000 ₽/компл.",
        term: "от 2–3 дней",
        form: "Покраска",
      },
      {
        title: "Крупногабаритная окраска",
        description: "Изделия до 7,2 м × 1,4 × 2,5 м",
        price: "от 10 000 ₽/компл.",
        term: "от 3 дней",
        form: "Покраска",
      },
      {
        title: "Пескоструйная обработка",
        description: "Очистка до степени Sa 2½",
        price: "от 350 ₽/м²",
        term: "от 1 дня",
        form: "Другое",
      },
      {
        title: "Изготовление под ключ",
        description: <>Металлоконструкция по чертежу,<br/>сразу окрашенная</>,
        price: "по смете",
        term: "от 10 дней",
        form: "Покраска",
      },
    ],
  },
  {
    title: "Оборудование",
    description: "Подберём и изготовим оборудование для порошковой окраски под задачи вашего производства.",
    cards: [
      {
        title: "Камеры нанесения",
        description: "Для ручных и автоматических линий окраски",
        price: "по комплектации",
        term: "от 4 недель",
        form: "Оборудование",
      },
      {
        title: "Печи полимеризации",
        description: "Под размеры изделий и параметры процесса",
        price: "по комплектации",
        term: "от 4 недель",
        form: "Оборудование",
      },
      {
        title: "Линии порошковой окраски",
        description: "Комплексное оснащение под ключ",
        price: "от 300 000 ₽",
        term: "от 4 недель",
        form: "Оборудование",
      },
    ],
  },
  {
    title: "Продукция",
    description: "Изготавливаем изделия и металлоконструкции по вашим задачам и чертежам.",
    cards: [
      {
        title: "Лофт-мебель",
        description: "Мебель и металлокаркасы, в том числе под вашей маркой",
        price: "партии от 1 шт.",
        term: "по согласованию",
        form: "Продукция",
      },
      {
        title: "Металлоконструкции",
        description: "Изготовление и окраска по вашему чертежу",
        price: "по смете",
        term: "срок по проекту",
        form: "Продукция",
      },
      {
        title: "Модульные здания",
        description: "Бытовки и модульные здания под заказ",
        price: "по запросу",
        term: "срок по проекту",
        form: "Продукция",
      },
    ],
  },
];

const questions = [
  {
    question: "Есть ли минимальный заказ на окраску?",
    answer:
      "Нет. Красим и одно изделие, и партии. При объёме больше 500 м² цена за м² может быть снижена.",
  },
  {
    question: "Какое изделие поместится в камеру?",
    answer: "В камеру поместится изделие размерами 7,2 × 1,4 × 2,5 м.",
  },
  {
    question: "Можно ли привезти свою краску?",
    answer: "Да. Вы можете привезти свою краску.",
  },
  {
    question: "Какая гарантия на покрытие?",
    answer: "Гарантия на покрытие 12 месяцев.",
  },
  {
    question: "Как быстро вы делаете оборудование?",
    answer:
      "Оборудование производится в течение 4-х недель с момента согласования технического задания и получения аванса.",
  },
];

function Hero() {
  return (
    <section className="hero-section section--gray">
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-advantages">
            <span>Собственное производство</span>
            <span>Камера 7,2 м</span>
            <span>Отгрузка от 24 часов</span>
          </div>

          <div className="hero-somethings">
            <span>Производим и запускаем линии<br/>окраски, лофт-мебель и бытовки<br/>под заказ. Работаем по договору,<br/>с НДС.</span>
            <span>Красим изделия<br/>длиной до 7,2 м за 2–3<br/>рабочих дня</span>
            <div className="messangers-logo">
              <img src={TelegramMessanger}/>
              <img src={MaxMessanger}/>
            </div>
          </div>

          <h1>
            Порошковая окраска,<br/>
            окрасочное<br/>
            оборудование<br/>
            и металлоизделия
          </h1>

          <h2>
            Собственное<br/>
            производство<br/>
            в Ростове-на-Дону
          </h2>

          <Link to="/painting/about" className="button button--orange hero-cta">
            Узнать больше
            <img src={RightArrow} alt="" />
          </Link>
        </div>

      </div>
      <div className="hero-visual">
        <img src={HeroBgr} alt="" />
      </div>
    </section>
  );
}

function ServicesOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState("Окраска");
  const [equipmentType, setEquipmentType] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card" id={service.id} key={service.title}>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <small>{service.details}</small>
              </div>

              <div className="service-card-image">
                <img
                  src={assetUrl(`Assets/Stats-image-${index + 1}.svg`)}
                  alt={service.title}
                />
              </div>

              <div className="service-card-bottom">
                <div className="service-card-price">
                    <img src={CommonComponent} alt="" />
                    {service.price}
                </div>
                {typeof service.form === "string" ? (
                  <button
                    type="button"
                    className="service-card-more text-link"
                    onClick={() => {
                      setDirection(service.form);
                      setIsModalOpen(true);
                    }}
                  >
                    {service.link}
                    <img src={RightArrow} alt="" />
                  </button>
                ) : (
                  <a href="/development" className="service-card-more text-link">
                    {service.link}
                    <img src={RightArrow} alt="" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
          
        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ContactsInput
            direction={direction}
            setDirection={setDirection}
            equipmentType={equipmentType}
            setEquipmentType={setEquipmentType}
            phone={phone}
            setPhone={setPhone}
            showTitle={true}
          />
        </ContactModal>
      </div>
    </section>
  );
}

function CompanyStats() {
  return (
    <section className="section" id="about">
      <div className="container stats">
        <div className="stats-list">
          <div className="stats-item">
            <span>окрашиваем в месяц</span>
          </div>

          {statistics.map((item) => (
            <div className="stats-item" key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="stats-visual">
          <img src={StatsRectangle} className="stats-visual-rectangle" alt="" />

          <div className="stats-visual-image">
            <span>порошковые краски</span>

            <div className="stats-video-preview">
              <HlsVideo
                src={assetUrl("Assets/company-stats-video.mp4")}
                autoPlay
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CustomerSolutions() {
  const tabs = [
    {
        tab: "Частный заказ",
        form: "Покраска",
        title: 
          <>
            Покрасим радиаторы, ворота,<br/>
            мебельный каркас или садовую<br/>
            мебель
          </>,
        description: 
          <div>
              <span>
                Можно привезти одно<br/>
                изделие, без минимального<br/>
                объёма. Цвет подберём<br/>
                по <span>каталогу RAL</span><br/>
                или образцу.
              </span>

              <span>
                Радиаторы — от 4 000 ₽<br/>
                за комплект.<br/>
                Снимем старую краску<br/>
                и ржавчину пескоструем.<br/>
                Выдача через 3–5 дней
              </span>
          </div>,
        image: assetUrl("Assets/Solution-image-1.svg"),
        button: "рассчитать по фото"
    },
    {
        tab: "Заводам и подрядчикам",
        form: "Покраска",
        title: 
        <>
          Красим металлоконструкции партиями<br/>
          до 300 м² в смену. Работаем<br/>
          по договору, с НДС, ЭДО<br/>
          и закрывающими документами. Можем<br/>
          встроиться в ваш производственный<br/>
          график
        </>,
        description: 
          <>
            Фиксированная цена за м² на весь объём.<br/>
            Протокол контроля толщины и адгезии к каждой партии
          </>,
        image: assetUrl("Assets/Solution-image-2.svg"),
        button: "отправить ведомость на расчёт"
    },
    {
        tab: "Красим ваши изделия",
        form: "Покраска",
        title: 
        <>
          Принимаем ваши изделия на окраску<br/>
          по акту и фиксируем их состояние<br/>
          на фото до начала работ. Краска наша<br/>
          или ваша. Отвечаем за изделие<br/>
          с момента приёмки до отгрузки
        </>,
        description:
        <>
          Акт приёмки с фотофиксацией.<br/>
          Хранение на складе до 3 дней бесплатно.<br/>
          Забираем и доставляем своим транспортом
        </>,
        image: assetUrl("Assets/Solution-image-3.svg"),
        button: "как работает схема"
    },
    {
        tab: "Продукция",
        form: "Продукция",
        title:
        <>
          Производим лофт-мебель,<br/>
          металлокаркасы и бытовки. Отгружаем<br/>
          партиями от 1 шт. Красим в своём цехе,<br/>
          поэтому цвет и сроки контролируем сами
        </>,
        description: 
        <>
          3 уровня оптовых цен.<br/>
          Производство под вашей маркой.<br/>
          Доставка по России транспортными компаниями
        </>,
        image: assetUrl("Assets/Solution-image-4.svg"),
        button: "получить оптовые условия"
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const selectedTab = tabs[activeTab];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState("Окраска");
  const [equipmentType, setEquipmentType] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section className="section section--gray">
      <div className="container">
        <h2 className="section-title">
            Чем мы можем быть полезны именно вам
        </h2>

        <div className="tabs">
            {tabs.map((tab, index) => (
            <button
                key={tab.tab}
                className={`tabs-button ${activeTab === index ? "active" : ""}`}
                aria-pressed={activeTab === index}
                onClick={() => setActiveTab(index)}
            >
                {tab.tab}
            </button>
            ))}
        </div>

        <div className="solutions">
          <div className="solutions-image" key={`solution-image-${activeTab}`}>
            <img src={selectedTab.image} alt={selectedTab.tab} />
            <img src={CommonComponent} alt='' />
          </div>

          <div className="solutions-content" key={`solution-content-${activeTab}`}>
              <h3>{selectedTab.title}</h3>
              
              <div className="solutions-description">
                {selectedTab.description}
              </div>

              <button type="button" className="button button--orange-bgr"
                onClick={() => {
                  setDirection(selectedTab.form);
                  setIsModalOpen(true);
                }}
              >
                {selectedTab.button}
              </button>
          </div>
        </div>
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ContactsInput
          direction={direction}
          setDirection={setDirection}
          equipmentType={equipmentType}
          setEquipmentType={setEquipmentType}
          phone={phone}
          setPhone={setPhone}
          showTitle={true}
        />
      </ContactModal>
    </section>
  );
}

function ServicesCatalog() {
  const [activeCategory, setActiveCategory] = useState(0);
  const selectedCategory = serviceCategories[activeCategory];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState("Окраска");
  const [equipmentType, setEquipmentType] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section className="services-catalog" id="service-catalog">
      <div className="container services-catalog-inner">
        <div className="services-catalog-heading">
          <h2>Услуги</h2>
          <span aria-hidden="true" />
        </div>

        <div className="services-catalog-intro">
          <div className="services-catalog-tabs" aria-label="Категории услуг">
            {serviceCategories.map((category, index) => (
              <button
                className={activeCategory === index ? "active" : ""}
                type="button"
                aria-pressed={activeCategory === index}
                key={category.title}
                onClick={() => setActiveCategory(index)}
              >
                {category.title}
              </button>
            ))}
          </div>
          <p>{selectedCategory.description}</p>
        </div>

        <div className="services-catalog-grid">
          {selectedCategory.cards.map((service) => (
            <article className="services-catalog-card" key={service.title}>
              <div className="services-catalog-card-copy">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>

              <div className="services-catalog-card-bottom">
                <p className="services-catalog-price">
                  <span>{service.price}</span>
                  <span>{service.term}</span>
                </p>
                <div className="services-catalog-card-links">
                  <Link to="/development" className="services-catalog-more">
                    Подробнее
                  </Link>

                  <button type="button" className="services-catalog-quote"
                    onClick={() => {
                      setDirection(service.form);
                      setIsModalOpen(true);
                    }}
                  >
                    Рассчитать стоимость
                    <img src={RightArrow} alt="" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ContactsInput
          direction={direction}
          setDirection={setDirection}
          equipmentType={equipmentType}
          setEquipmentType={setEquipmentType}
          phone={phone}
          setPhone={setPhone}
          showTitle={true}
        />
      </ContactModal>
    </section>
  );
}

function Production() {
  const productionFeatures = [
    {
      title: "Контроль каждой партии",
      description:
      <>
        Толщиномер, тест на адгезию, протокол
        <br/>к партии
      </>,
      icon: assetUrl("Assets/aio-icon-1.svg"),
    },
    {
      title: "Порошковая краска",
      description: "Сертифицированные материалы",
      icon: assetUrl("Assets/aio-icon-2.svg"),
    },
    {
      title: "Опыт операторов",
      description: "Средний стаж 5 лет",
      icon: assetUrl("Assets/aio-icon-3.svg"),
    },
    {
      title: "Склад",
      description:
      <>
        150 м² для хранения изделий<br/>
        до и после окраски
      </>,
      icon: assetUrl("Assets/aio-icon-4.svg"),
    },
  ];

  const productionPhotos = [
    { src: assetUrl("Assets/aio-image-1.svg"), alt: "Окрасочное производство" },
    { src: assetUrl("Assets/aio-image-2.svg"), alt: "Специалист готовит изделие к окраске" },
    { src: assetUrl("Assets/aio-image-3.svg"), alt: "Камеры порошковой окраски" },
    { src: assetUrl("Assets/aio-image-4.svg"), alt: "Окрасочная камера" },
    { src: assetUrl("Assets/aio-image-5.svg"), alt: "Металлоконструкция перед окраской" },
    { src: assetUrl("Assets/aio-image-6.svg"), alt: "Внутри камеры нанесения" },
    { src: assetUrl("Assets/aio-image-7.svg"), alt: "Сборка окрасочного оборудования" },
    { src: assetUrl("Assets/aio-image-8.svg"), alt: "Готовые окрашенные изделия" },
    { src: assetUrl("Assets/aio-image-9.svg"), alt: "Окрашенные металлические детали" },
    { src: assetUrl("Assets/aio-image-10.svg"), alt: "Окрашенные металлические детали" },
  ];

  const clientLogos = [
    { name: "Аскона", src: assetUrl("Assets/logo-1.svg") },
    { name: "Corax", src: assetUrl("Assets/logo-2.svg") },
    { name: "Электромеханика", src: assetUrl("Assets/logo-3.svg") },
    { name: "G-BUR", src: assetUrl("Assets/logo-4.svg") },
    { name: "Апрель", src: assetUrl("Assets/logo-5.svg") },
    { name: "РЖД", src: assetUrl("Assets/logo-6.svg") },
    { name: "Турбо Дон", src: assetUrl("Assets/logo-7.svg") },
  ];

  return (
    <section className="section" id="production">
      <div className="container production-content">
        <div className="production-intro">
          <h2 className="section-title">Все в одном цехе</h2>
          <p>
            На площадке 600 м² в Ростове-на-Дону работают 2 окрасочные линии,<br/>
            участок пескоструйной обработки, сварочное производство и цех сборки оборудования.<br/>
            Красим, варим и собираем сами.
          </p>
        </div>

        <div className="production-features">
          {productionFeatures.map((feature) => (
            <article className="production-feature" key={feature.title}>
              <span className="production-feature-mark" aria-hidden="true">
                <img src={feature.icon} alt="" />
              </span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="production-gallery" id="production-gallery">
          {productionPhotos.map((photo) => (
            <div className="production-gallery-item" key={photo.src}>
              <img src={photo.src} alt={photo.alt} />
            </div>
          ))}
        </div>

        <div className="production-actions">
          <Link to="/development" className="button button--navy">
            Смотреть видеотур
          </Link>

          <Link to="/development" className="button button--orange-bgr">
            Приехать на производство
          </Link>
        </div>

        <div className="production-trust">
          <h2 className="section-title">Нам доверяют</h2>
          <div className="production-trust-list" aria-label="Клиенты компании">
            {clientLogos.map((client) => (
              <div
                className="production-client-logo"
                key={client.name}
              >
                <img src={client.src} alt={client.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



const projects = [
  {
    title: "Линия порошковой окраски",
    stats: 
    [
      <>
        Печь полимеризации:<br/>
        54 кВт<br/>
        2,5 × 2,2 × 3,5 м
      </>,

      <>
        Покрасочная камера:<br/>
        2,5 × 3,0 × 3,5 м
      </>,

      <>
        Транспортная эстакада:<br/>
        11 усиленных направляющих
      </>
    ],
    preview: assetUrl("Assets/projects-preview-1.svg"),
    video: assetUrl("Assets/projects-video-1.mp4"),
  },
  {
    title: "Линия порошковой окраски, Подмосковье",
    stats: 
    [
      <>Печь полимеризации открытого типа:<br/>90 кВт</>,
      <>2 камеры нанесения<br/>с фильтровальными модулями</>,
      <>Эстакады</>,
      <>Отстойник</>
    ],
    preview: assetUrl("Assets/projects-preview-2.svg"),
    video: assetUrl("Assets/projects-video-2.mp4"),
  },
];

function Projects() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="section section--gray" id="projects">
      <div className="container">
        <h2 className="section-title">Проекты в цифрах</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              className="project-card"
              key={project.title}
              style={{ backgroundImage: `url(${project.preview})` }}
            >
              <div className="project-card-copy">
                <h3>{project.title}</h3>

                <div>
                  {project.stats.map((stat) => (
                    <span>
                      {stat}
                      <br/>
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="project-video-button"
                type="button"
                aria-label={`Посмотреть видео: ${project.title}`}
                onClick={() => setActiveVideo(project.video)}
              >
                <img src={assetUrl('Assets/common-video-start.svg')}/>
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div
          className="video-modal"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="video-modal-close"
            type="button"
            onClick={() => setActiveVideo(null)}
            aria-label="Закрыть видео"
          >
            ×
          </button>

          <HlsVideo
            src={activeVideo}
            autoPlay
          />
        </div>
      )}
    </section>
  );
}



function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <section className="section section--gray">
      <div className="container">
        <h2 className="section-title">Частые вопросы</h2>

        <div className="faq-layout">
          <div className="faq-visual">
            <img src={assetUrl("Assets/FAQ-Image.svg")} alt="Окрашенные металлические детали" />
          </div>
          
          <div className="faq-panel">
            <div className="faq">
              {questions.map((item, index) => (
                <div className="faq-item" key={item.question}>
                  <button
                    className="faq-question"
                    type="button"
                    aria-expanded={openQuestion === index}
                    onClick={() =>
                      setOpenQuestion((current) =>
                        current === index ? null : index,
                      )
                    }
                  >
                    {item.question}
                    <img
                      className={openQuestion === index ? "is-open" : ""}
                      src={RightArrow}
                      alt=""
                    />
                  </button>

                  {openQuestion === index && (
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="faq-visual-step"/>

        <span className="dark-rectangle" />

      </div>
    </section>
  );
}

function Blog() {
  const blogTrackRef = useRef<HTMLDivElement>(null);

  const articles = [
    {
      date: "01.01.2026",
      category: "Технологии",
      image: assetUrl("Assets/aio-image-4.svg"),
      title: 
      <>
        Как подготовить металл<br/>
        к порошковой окраске
      </>,
      description: 
      <>
        Этапы очистки и подготовки поверхности<br/>
        перед нанесением покрытия.
      </>
    },
    {
      date: "01.01.2026",
      category: "Материалы",
      image: assetUrl("Assets/Common-palette.svg"),
      title: 
      <>
        Как выбрать цвет и фактуру<br/>
        покрытия
      </>,
      description:
      <>
        Что учитывать при выборе оттенка RAL<br/>
        и типа поверхности.
      </>
    },
    {
      date: "01.01.2026",
      category: "Производство",
      image: assetUrl("Assets/aio-image-2.svg"),
      title: 
      <>
        От чего зависит срок окраски изделия
      </>,
      description:
      <>
        Размер партии, габариты изделия<br/>
        и подготовка влияют на сроки работ.
      </>
    },
    {
      date: "01.01.2026",
      category: "Оборудование",
      image: assetUrl("Assets/aio-image-1.svg"),
      title: 
      <>
        Как подобрать линию порошковой окраски
      </>,
      description:
      <>
        С чего начать выбор оборудования<br/>
        для производственной площадки.
      </>
    },
  ];

  const scrollBlog = (direction: -1 | 1) => {
    const track = blogTrackRef.current;
    if (track) {
      track.scrollBy({
        left: direction * track.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section blog-section" id="blog">
      <div className="container">
        <h2 className="section-title">Блог</h2>

        <div className="blog-carousel">
          <button
            className="blog-carousel-control blog-carousel-control--previous"
            type="button"
            onClick={() => scrollBlog(-1)}
          >
            <img src={RightArrowDark} alt="" />
          </button>

          <div className="blog-grid" ref={blogTrackRef}>
            {articles.map((article, index) => (
              <article className="blog-card" key={index}>
                <div className="blog-card-image">
                  <img src={article.image} alt={article.category} />
                </div>

                <div className="blog-card-copy">
                  <div className="blog-card-meta">
                    <span>{article.date}</span>
                    <span>{article.category}</span>
                  </div>

                  <h3>{article.title}</h3>
                  <p>{article.description}</p>

                  <Link to="/development" className="blog-card-link">
                    Читать <img src={RightArrow} alt="" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button
            className="blog-carousel-control blog-carousel-control--next"
            type="button"
            onClick={() => scrollBlog(1)}
          >
            <img src={RightArrowDark} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [direction, setDirection] = useState("Окраска");
  const [equipmentType, setEquipmentType] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <section className="section contact-section" id="contacts">
      <div className="container">
        <div className="contact-title-wrap">
          <h2 className="contact-title">
            {
              direction === "Покраска"
              ? "Пришлите чертёж или фото, и мы рассчитаем стоимость за 2 часа"
              : "Заполните данные и мы с вами свяжемся"
            }
          </h2>

          <img src={CommonComponent}/>
        </div>

        <div className="contact-right-block">
          <ContactsInput
            direction={direction}
            setDirection={setDirection}
            equipmentType={equipmentType}
            setEquipmentType={setEquipmentType}
            phone={phone}
            setPhone={setPhone}
            showTitle={false}
          />

          <aside className="contact-manager">
            <div className="contact-manager-photo">
              <img src={CommercialDirector} alt="Коммерческий директор" />
            </div>
            <div className="contact-manager-details">
              <div className="contact-manager-meta">
                <span>директор</span>
                <strong>Козубенко Алексей<br/>Владмирович</strong>
              </div>
              <div className="contact-manager-meta">
                <span>телефон</span>
                <a href="tel:+79381758777">8 938 175 87 77</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-main">
            <div className="footer-links-block">
              <nav className="footer-navigation" aria-label="Навигация в подвале">
                <div>
                  <h3>Услуги</h3>
                  <Link to="/development">Порошковая окраска</Link>
                  <Link to="/development">Крупногабарит</Link>
                  <Link to="/development">Изделия заказчика</Link>
                  <Link to="/development">Декор</Link>
                  <Link to="/development">Пескоструй</Link>
                  <Link to="/development">Металлообработка</Link>
                  <Link to="/development">Калькулятор</Link>
                  <Link to="/development">Цены</Link>
                </div>
                <div>
                  <h3>Оборудование</h3>
                  <Link to="/development">Камеры</Link>
                  <Link to="/development">Печи</Link>
                  <Link to="/development">Линии под ключ</Link>
                </div>
                <div>
                  <h3>Продукция</h3>
                  <Link to="/development">Мебель</Link>
                  <Link to="/development">Бытовки</Link>
                  <Link to="/development">Производство под вашей маркой</Link>
                  <Link to="/development">Условия</Link>
                  <Link to="/development">Прайс</Link>
                </div>
                <div>
                  <h3>Компания</h3>
                  <Link to="/development">О компании</Link>
                  <Link to="/development">Производство</Link>
                  <Link to="/development">Проекты</Link>
                  <Link to="/development">Документы</Link>
                  <Link to="/development">Реквизиты</Link>
                  <Link to="/development">Вакансии</Link>
                  <a href="/#blog">Блог</a>
                </div>
              </nav>
            </div>

            <div className="footer-side">
              <div className="footer-map-card" aria-label="Карта производства">
                <iframe
                  src="https://yandex.com/map-widget/v1/?ll=39.603370%2C47.208037&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNDg4MTc3MjQ3EmbQoNC-0YHRgdC40Y8sINCg0L7RgdGC0L7Qsi3QvdCwLdCU0L7QvdGDLCDQnNCw0YjQuNC90L7RgdGC0YDQvtC40YLQtdC70YzQvdGL0Lkg0L_QtdGA0LXRg9C70L7QuiwgNy8xMTAiCg3aaR5CFQjVPEI%2C&z=17.23"
                  width="100%"
                  height="100%"
                  frameBorder="1"
                  allowFullScreen
                  style={{ position: "relative", borderRadius : "0.4vw"}}
                  title="Карта - Машиностроительный переулок, 7/110"
                />
              </div>
            </div>

            <div className="footer-veteran">
              <div className="footer-veteran-logo">
                <a href="#top" aria-label="Ветеран, наверх">
                  <img src={LogoVeteran} alt="Ветеран" />
                </a>
                <span>все права защищены</span>
              </div>

              <div className="footer-company-info">
                <p>
                  ООО «Ветеран.<br/>
                  Системный инжиниринг»
                </p>
                
                <p>
                  ИНН/КПП<br/>
                  6166133197 / 616601001
                </p>
                
                <p>
                  ОГРН<br/>
                  1256100017843
                </p>

                <p>
                  Юр адрес<br/>
                  344045 г. Ростов-на-Дону,<br/>
                  ул. Миронова, 2Д, кв. 51
                </p>
              </div>

              <div className="footer-legal-links">
                <Link to="/development">Политика конфиденциальности</Link>
                <Link to="/development">Согласие на получение рассылки</Link>
                <Link to="/development">Согласие на обработку ПД</Link>
              </div>
            </div>
            
            <div className="footer-brand">
              <div className="footer-column-info">
                <p>
                  Адрес производства:<br/>
                  г. Ростов-на-Дону,<br/>
                  Машиностроительный пер.,<br/>
                  7/110
                </p>

                <p>
                  Режим работы:<br/>
                  понедельник-пятница<br/>
                  с 9:00 до 18:00
                </p>
              </div>

              <div className="footer-column-contacts">
                <a href="mailto:si@gk-veteran.ru">si@gk-veteran.ru</a>
                <a href="tel:+79282896222">8 928 289 62 22</a>
              </div>

              <div className="messangers-logo">
                <img src={TelegramMessanger}/>
                <img src={MaxMessanger}/>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateScrollProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        if (scrollProgressRef.current) {
          scrollProgressRef.current.style.transform = `scaleX(${progress})`;
        }
      });
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    updateScrollProgress();

    const sections = document.querySelectorAll("main > .section, main > .services-catalog");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.documentElement.classList.add("has-scroll-reveal");
    sections.forEach((section) => observer.observe(section));

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      observer.disconnect();
      document.documentElement.classList.remove("has-scroll-reveal");
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-bar" ref={scrollProgressRef} />
      </div>
      <div id="top" />
      <Header />

      <main>
        <Hero />
        <ServicesOverview />
        <CompanyStats />
        <CustomerSolutions />
        <ServicesCatalog />
        <Projects />
        <Production />
        <FAQ />
        <Blog />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}