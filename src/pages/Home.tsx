import { useState } from "react";
import "./Home.css";

// Common elements
import LogoVeteran from "../../public/Assets/Common-Logo-Veteran.svg";
import DownArrow from '../../public/Assets/Header-arrow-down.svg';
import RightArrow from '../../public/Assets/Common-Right-Arrow.svg';
import CommonComponent from '../../public/Assets/Common-Icon.svg';

// Hero imports
import HeroBgr from '../../public/Assets/Hero-Backgrond.svg';

const services = [
  {
    id: "painting-service",
    title: "Покрасим ваши изделия",
    description: "От 1 штуки до партий в несколько м².",
    details: (
        <>
        Камера 7,2 × 1,4 × 2,5 м,<br/>
        любой {" "}
        <span className="service-detail-highlight">цвет RAL</span> и фактура.<br/>
        Покраска в день обращения
        </>
    ),
    price: (
        <>
            <div>
                <span>от 400 ₽/м²</span><br/>
                <span>от 2 дней</span>
            </div>
        </>
    ),
    link: "Рассчитать стоимость",
  },
  {
    id: "equipment-solutions",
    title: "Поставим оборудование",
    description: "Камеры нанесения, печи полимеризации, транспортные системы, линии порошковой окраски под ключ.",
    details: "Сами красим на этом оборудовании каждый день.",
    price: (
        <>
            <div>
                <span>от 300 000 ₽</span><br/>
                <span>от 4 недель</span>
            </div>
        </>
    ),
    link: "Подобрать оборудование",
  },
  {
    id: "product-solutions",
    title: "Отгрузим продукцию",
    description:
      "Лофт-мебель, металлокаркасы, бытовки (модульные здания).",
    details: "Можем производить под вашей маркой.",
    price: (
        <>
            <div>
                <span>партии</span><br/>
                <span>от 1 шт</span>
            </div>
        </>
    ),
    link: "Посмотреть каталог",
  },
];

const statistics = [
  { value: "7 м", label: "Максимальная длина изделия" },
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
      },
      {
        title: "Покраска радиаторов",
        description: "Чугунных, стальных, алюминиевых",
        price: "от 4 000 ₽/компл.",
        term: "от 2–3 дней",
      },
      {
        title: "Крупногабаритная окраска",
        description: "Изделия до 7 × 1,4 × 2,5 м",
        price: "от 10 000 ₽/компл.",
        term: "от 3 дней",
      },
      {
        title: "Пескоструйная обработка",
        description: "Очистка до степени Sa 2½",
        price: "от 350 ₽/м²",
        term: "от 1 дня",
      },
      {
        title: "Изготовление под ключ",
        description: "Металлоконструкция по чертежу, сразу окрашенная",
        price: "по смете",
        term: "от 10 дней",
      },
    ],
  },
  {
    title: "Оборудование",
    description:
      "Подберём и изготовим оборудование для порошковой окраски под задачи вашего производства.",
    cards: [
      {
        title: "Камеры нанесения",
        description: "Для ручных и автоматических линий окраски",
        price: "по комплектации",
        term: "от 4 недель",
      },
      {
        title: "Печи полимеризации",
        description: "Под размеры изделий и параметры процесса",
        price: "по комплектации",
        term: "от 4 недель",
      },
      {
        title: "Линии порошковой окраски",
        description: "Комплексное оснащение под ключ",
        price: "от 300 000 ₽",
        term: "от 4 недель",
      },
    ],
  },
  {
    title: "Продукция",
    description:
      "Изготавливаем изделия и металлоконструкции по вашим задачам и чертежам.",
    cards: [
      {
        title: "Лофт-мебель",
        description: "Мебель и металлокаркасы, в том числе под вашей маркой",
        price: "партии от 1 шт.",
        term: "по согласованию",
      },
      {
        title: "Металлоконструкции",
        description: "Изготовление и окраска по вашему чертежу",
        price: "по смете",
        term: "срок по проекту",
      },
      {
        title: "Модульные здания",
        description: "Бытовки и модульные здания под заказ",
        price: "по запросу",
        term: "срок по проекту",
      },
    ],
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigation: {
    title: string;
    href: string;
    description?: string;
    links?: { title: string; href: string }[];
  }[] = [
    {
      title: "услуги",
      href: "#service-catalog",
      description: "Окраска и подготовка поверхности",
      links: [
        { title: "Порошковая окраска", href: "#service-catalog" },
        { title: "Покраска радиаторов", href: "#service-catalog" },
        { title: "Крупногабаритная окраска", href: "#service-catalog" },
        { title: "Пескоструйная обработка", href: "#service-catalog" },
      ],
    },
    {
      title: "оборудование",
      href: "#equipment-solutions",
      description: "Комплектация линий под производство",
      links: [
        { title: "Камеры нанесения", href: "#equipment-solutions" },
        { title: "Печи полимеризации", href: "#equipment-solutions" },
        { title: "Транспортные системы", href: "#equipment-solutions" },
        { title: "Линии порошковой окраски", href: "#equipment-solutions" },
      ],
    },
    {
      title: "продукция",
      href: "#product-solutions",
      description: "Изделия и конструкции под ваш проект",
      links: [
        { title: "Лофт-мебель", href: "#product-solutions" },
        { title: "Металлоконструкции", href: "#products" },
        { title: "Модульные здания", href: "#product-solutions" },
        { title: "Выполненные проекты", href: "#projects" },
      ],
    },
    { title: "проекты", href: "#projects" },
    { title: "производство", href: "#production" },
    { title: "о компании", href: "#about" },
    { title: "блог", href: "#blog" },
    { title: "контакты", href: "#contacts" },
  ];

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="header-logo" href="#top">
          <img src={LogoVeteran} alt="В" />
        </a>

        <nav className="header-nav" id="main-navigation">
          {navigation.map((item) => (
            <div className={`header-nav-item ${activeDropdown === item.title ? "is-open" : ""}`} key={item.title}>
              {item.links ? (
                <>
                  <button className="header-nav-trigger" type="button"
                    aria-expanded={activeDropdown === item.title}
                    aria-controls={`menu-${item.title}`}
                    onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title,) }
                  >
                    {item.title}
                    <img src={DownArrow} alt="" />
                  </button>
                  <div className="header-dropdown" id={`menu-${item.title}`}>
                    <p className="header-dropdown-description">
                      {item.description}
                    </p>
                    {item.links.map((link) => (
                      <a href={link.href} key={link.title}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a className="header-nav-link" href={item.href}>
                  {item.title}
                </a>
              )}
            </div>
          ))}
        </nav>

        <div className="header-contacts">
          <a href="tel:+79282896222">8 928 289 62 22</a>
          <a href="mailto:si@gk-veteran.ru">si@gk-veteran.ru</a>
        </div>

        <a className="button button--orange" href="#contacts">
          заказать звонок
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="sectoion section--gray">
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

          <h2>Собственное производство<br/>в Ростове-на-Дону</h2>

          <a href="#about" className="text-link">
            Узнать больше
            <img src={RightArrow}/>
          </a>
        </div>

        <div className="hero-visual image-placeholder">
          <img src={HeroBgr} alt=""/>
        </div>
      </div>
    </section>
  );
}

function ServicesOverview() {
  return (
    <section className="section" id="services" style={{ marginTop: 80 }}>
      <div className="container">
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" id={service.id} key={service.title}>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <small>{service.details}</small>
              </div>

              <div className="service-card-image image-placeholder">
                Изображение
              </div>

              <div className="service-card-bottom">
                <strong>
                    <img src={CommonComponent}/>
                    {service.price}
                </strong>

                <a href="#contacts" className="text-link">
                  {service.link}
                  <img src={RightArrow}/>
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
            <div className="stats-item" key="0">
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
            <span>порошковые краски</span>
            <div className="image-placeholder">
                Видео о производстве
            </div>
        </div>
      </div>
    </section>
  );
}

function CustomerSolutions() {
    const tabs = [
        {
            title: "Частный заказ",
            description: 
            <>
                <div>
                    <span>Можно привезти одно изделие, без минимального объёма. Цвет подберём по<span> каталогу RAL </span>или образцу.</span>
                    <span>Радиаторы — от 4 000 ₽ за комплект<br/>Снимем старую краску и ржавчину пескоструем.<br/>Выдача через 3–5 дней</span>
                </div>
            </>,
            image: "Картинка частного заказа",
            button: "рассчитать по фото"
        },
        {
            title: "Заводам и подрядчикам",
            description: "описание для вкладки Заводам и подрядчикам, здесь можно посмотреть что-то интересное, например, что мы можем предложить заводам и подрядчикам ))))",
            image: "Картинка для заводов и подрядчиков",
            button: "заказать"
        },
        {
            title: "Красим ваши изделия",
            description: "описание для вкладки Красим ваши изделия, здесь можно посмотреть что-то интересное, например, что мы можем предложить тарифы, цены, сроки и т.д",
            image: "Картинка для кастома",
            button: "консультация"
        },
        {
            title: "Продукция",
            description: "описание для вкладки Продукция, здесь можно посмотреть что-то интересное, например, что мы можем предложить по ассортименту продукции, которую мы производим )))))",
            image: "Картинка для продукции",
            button: "ассортимент"
        },
    ];

    const [activeTab, setActiveTab] = useState(0);
    const selectedTab = tabs[activeTab];

    return (
        <section className="section section--gray">
            <div className="container">
            <h2 className="section-title">
                Чем мы можем быть полезны именно вам
            </h2>

            <div className="tabs">
                {tabs.map((tab, index) => (
                <button
                    key={tab.title}
                    className={`tabs-button ${activeTab === index ? "active" : ""}`}
                    aria-pressed={activeTab === index}
                    onClick={() => setActiveTab(index)}
                >
                    {tab.title}
                </button>
                ))}
            </div>

            <div className="solutions">
                <div className="solutions-image image-placeholder">
                    {selectedTab.image}
                </div>

                <div className="solutions-content">
                    <h3>{selectedTab.title}</h3>
                    <p>{selectedTab.description}</p>

                    <a href="#contacts" className="button button--orange">
                        {selectedTab.button}
                    </a>
                </div>
            </div>
            </div>
        </section>
    );
}

function ServicesCatalog() {
  const [activeCategory, setActiveCategory] = useState(0);
  const selectedCategory = serviceCategories[activeCategory];

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
                  <a href="#contacts" className="services-catalog-more">
                    Подробнее
                  </a>
                  <a href="#contacts" className="services-catalog-quote">
                    Рассчитать стоимость
                    <img src={RightArrow} alt="" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <a href="#contacts" className="services-catalog-all button">
          все услуги и цены
        </a>
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
  const productionFeatures = [
    {
      title: "Контроль каждой партии",
      description: "Толщиномер, тест на адгезию, протокол к партии",
    },
    {
      title: "Порошковая краска",
      description: "Сертифицированные материалы",
    },
    {
      title: "Опыт операторов",
      description: "Средний стаж 5 лет",
    },
    {
      title: "Склад",
      description: "150 м² для хранения изделий до и после окраски",
    },
  ];

  const productionPhotos = [
    "Участок окраски",
    "Подготовка изделий",
    "Окрасочная линия",
    "Порошковые краски",
    "Печь полимеризации",
    "Сварочный участок",
    "Сборка оборудования",
    "Готовые изделия",
  ];

  return (
    <section className="section" id="production">
      <div className="container production-content">
        <div className="production-intro">
          <h2 className="section-title">Все в одном цехе</h2>
          <p>
            На площадке 600 м² в Ростове-на-Дону работают 2 окрасочные линии,
            участок пескоструйной обработки, сварочное производство и цех сборки
            оборудования. Красим, варим и собираем сами.
          </p>
        </div>

        <div className="production-features">
          {productionFeatures.map((feature) => (
            <article className="production-feature" key={feature.title}>
              <span className="production-feature-mark" aria-hidden="true" />
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="production-gallery" id="production-gallery">
          {productionPhotos.map((photo) => (
            <div className="production-gallery-item image-placeholder" key={photo}>
              {photo}
            </div>
          ))}
        </div>

        <div className="production-actions">
          <a className="button button--navy" href="#contacts">
            Смотреть видеотур
          </a>
          <a className="button button--orange" href="#contacts">
            Приехать на производство
          </a>
        </div>

        <div className="production-trust">
          <h2 className="section-title">Нам доверяют</h2>
          <div className="production-trust-list">
            <span>Складской комплекс, Омск</span>
            <span>Мебельная фабрика «Люкс»</span>
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
        <h2 className="section-title">Проекты в цифрах</h2>

        <div className="projects-grid">
          <article className="project-card project-card--warehouse">
            <div className="project-card-copy">
              <h3>Складской комплекс, Омск</h3>
              <p>
                Окрасили металлоконструкции каркаса склада: RAL 7024,
                подготовка до Sa 2½.
              </p>
              <strong>1 200 м²<br />6 дней<br />0 рекламаций</strong>
              <a href="#contacts" className="project-card-link">
                Подробнее <img src={RightArrow} alt="" />
              </a>
            </div>
          </article>

          <article className="project-card project-card--furniture">
            <div className="project-card-copy">
              <h3>Мебельная фабрика «Люкс»</h3>
              <p>Поставляем окрашенные подстолья в трёх цветах.</p>
              <strong>10 шт. в месяц<br />5 месяцев сотрудничества<br />98% отгрузок в срок</strong>
              <a href="#contacts" className="project-card-link">
                Подробнее <img src={RightArrow} alt="" />
              </a>
            </div>
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

function Blog() {
  const articles = [
    {
      category: "Технологии",
      title: "Как подготовить металл к порошковой окраске",
      description: "Этапы очистки и подготовки поверхности перед нанесением покрытия.",
    },
    {
      category: "Материалы",
      title: "Как выбрать цвет и фактуру покрытия",
      description: "Что учитывать при выборе оттенка RAL и типа поверхности.",
    },
    {
      category: "Производство",
      title: "От чего зависит срок окраски изделия",
      description: "Размер партии, габариты изделия и подготовка влияют на сроки работ.",
    },
  ];

  return (
    <section className="section blog-section" id="blog">
      <div className="container">
        <h2 className="section-title">Блог</h2>
        <div className="blog-grid">
          {articles.map((article) => (
            <article className="blog-card" key={article.title}>
              <div className="blog-card-image image-placeholder">
                {article.category}
              </div>
              <div className="blog-card-copy">
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href="#contacts" className="blog-card-link">
                  Читать <img src={RightArrow} alt="" />
                </a>
              </div>
            </article>
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
      <div className="container">
        <h2 className="contact-title">
          Пришлите чертёж или фото, и мы рассчитаем стоимость за 2 часа
        </h2>

        <div className="contact-layout">
        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="contact-fields-grid">
            <label>
              Направление
              <select defaultValue="Окраска">
                <option>Окраска</option>
                <option>Оборудование</option>
                <option>Продукция</option>
              </select>
            </label>
            <label>
              Имя
              <input type="text" placeholder="Ваше имя" required />
            </label>
            <label>
              Телефон
              <input type="tel" placeholder="+7 (999) 999 99 99" required />
            </label>
            <label>
              E-mail
              <input type="email" placeholder="Ваша почта" />
            </label>
          </div>

          <label className="contact-field-full">
            Комментарий
            <textarea placeholder="Напишите любые уточнения для расчёта" rows={3} />
          </label>

          <label className="contact-form-file">
            Прикрепить файлы (чертёж / фото / ведомость)
            <span>Добавить файлы: DWG, PDF, JPG до 20 МБ</span>
            <input type="file" accept=".dwg,.pdf,.jpg,.jpeg,.png" multiple />
          </label>

          <div className="contact-submit-row">
            <label className="contact-form-agreement">
              <input type="checkbox" required />
              <span>Согласен на обработку персональных данных</span>
            </label>
            <button className="button button--orange" type="submit">
              Получить расчёт
            </button>
          </div>

          {submitted && (
            <p role="status">
              Демонстрационная форма. Отправка на сервер пока не настроена.
            </p>
          )}
        </form>

          <aside className="contact-manager">
            <div className="contact-manager-photo image-placeholder">
              Коммерческий директор
            </div>
            <div className="contact-manager-details">
              <span>Коммерческий директор</span>
              <strong>Варич Елена Сергеевна</strong>
              <span>Телефон</span>
              <a href="tel:+79282896222">8 928 289 62 22</a>
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
          <nav className="footer-navigation" aria-label="Навигация в подвале">
            <div>
              <h3>Услуги</h3>
              <a href="#service-catalog">Порошковая окраска</a>
              <a href="#service-catalog">Крупногабаритная окраска</a>
              <a href="#service-catalog">Изделия заказчика</a>
              <a href="#service-catalog">Пескоструй</a>
              <a href="#contacts">Цены и расчёт</a>
            </div>
            <div>
              <h3>Оборудование</h3>
              <a href="#equipment-solutions">Камеры</a>
              <a href="#equipment-solutions">Печи</a>
              <a href="#equipment-solutions">Линии под ключ</a>
            </div>
            <div>
              <h3>Продукция</h3>
              <a href="#product-solutions">Мебель</a>
              <a href="#product-solutions">Бытовки</a>
              <a href="#product-solutions">Производство под вашей маркой</a>
              <a href="#products">Металлоконструкции</a>
            </div>
            <div>
              <h3>Компания</h3>
              <a href="#about">О компании</a>
              <a href="#production">Производство</a>
              <a href="#projects">Проекты</a>
              <a href="#blog">Блог</a>
            </div>
          </nav>

          <div className="footer-location">
            <a
              className="footer-map"
              href="https://yandex.ru/maps/?text=Ростов-на-Дону%2C%20Машиностроительный%20переулок%2C%207%2F110"
              target="_blank"
              rel="noreferrer"
            >
              Карта производства
            </a>
            <div className="footer-contact-details">
              <p>Адрес производства: Ростов-на-Дону, Машиностроительный пер., 7/110</p>
              <p>Пн–Пт: 9:00–18:00</p>
              <a href="mailto:si@gk-veteran.ru">si@gk-veteran.ru</a>
              <a href="tel:+79282896222">8 928 289 62 22</a>
            </div>
          </div>
        </div>

        <div className="footer-legal">
          <a className="footer-brand" href="#top" aria-label="Ветеран, наверх">
            <img src={LogoVeteran} alt="Ветеран" />
            <span>Все права защищены</span>
          </a>
          <div>
            <p>ООО «Ветеран. Системный инжиниринг»</p>
            <p>ИНН/КПП 6166133197 / 616601001</p>
          </div>
          <div>
            <a href="#contacts">Политика конфиденциальности</a>
            <a href="#contacts">Согласие на обработку персональных данных</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <div id="top" />
      <Header />

      <main>
        <Hero />
        <ServicesOverview />
        <CompanyStats />
        <CustomerSolutions />
        <ServicesCatalog />
        <Manufacturing />
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