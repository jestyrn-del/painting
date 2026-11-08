import { useEffect, useRef, useState } from "react";
import "./Home.css";

// Common elements
import LogoVeteran from "../../public/Assets/Common-Logo-Veteran.svg";
import DownArrow from '../../public/Assets/Header-arrow-down.svg';
import RightArrow from '../../public/Assets/Common-Right-Arrow.svg';
import RightArrowDark from '../../public/Assets/Common-Right-Arrow-Dark.svg';
import CommonComponent from '../../public/Assets/Common-Icon.svg';

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
        любой {" "}
        <span className="service-detail-highlight">цвет RAL</span> и фактура.<br/>
        Покраска в день обращения
        </>
    ),
    price: (
      <div>
        <span>от 400 ₽/м²</span><br/>
        <span>от 2 дней</span>
      </div>
    ),
    link: "Рассчитать стоимость",
  },
  {
    id: "equipment-solutions",
    title: "Поставим оборудование",
    description: "Камеры нанесения, печи полимеризации, транспортные системы, линии порошковой окраски под ключ.",
    details: "Сами красим на этом оборудовании каждый день.",
    price: (
      <div>
        <span>от 300 000 ₽</span><br/>
        <span>от 4 недель</span>
      </div>
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
      <div>
        <span>партии</span><br/>
        <span>от 1 шт</span>
      </div>
    ),
    link: "Посмотреть каталог",
  },
];

const navigation = [
  {
    id: "services",
    title: "услуги",
    href: "#service-catalog",
    children: [
      {
        id: "powder-painting",
        title: "порошковая покраска",
        children: [
          // По типу
          {
            id: "radiators",
            title: "радиаторы",
            href: "#",
          },
          {
            id: "profile",
            title: "профиль",
            href: "#",
          },
          {
            id: "tube",
            title: "трубы",
            href: "#",
          },
          {
            id: "metal",
            title: "металлоконструкции",
            href: "#",
          },
          {
            id: "fences",
            title: "заборы и ограждения",
            href: "#",
          },
          {
            id: "doors",
            title: "Двери",
            href: "#",
          },
          {
            id: "canopies",
            title: "настилы/навесы",
            href: "#",
          },
          {
            id: "tanks",
            title: "емкости",
            href: "#",
          },
          {
            id: "stairs",
            title: "лестницы",
            href: "#",
          },
          {
            id: "ads",
            title: "рекламные конструкции",
            href: "#",
          },
          {
            id: "clips",
            title: "крепеж/метизы",
            href: "#",
          },
          {
            id: "aluminium",
            title: "алюминий",
            href: "#",
          },
          {
            id: "steanless",
            title: "нержавейка",
            href: "#",
          },
          {
            id: "galvanizing",
            title: "оцинковка",
            href: "#",
          },
          {
            id: "large",
            title: "крупногабарит",
            href: "#",
          },

          // По материалу
          {
            id: "shagreen",
            title: "шагрень",
            href: "#",
          },
          {
            id: "moire",
            title: "муар",
            href: "#",
          },
          {
            id: "antique",
            title: "антик",
            href: "#",
          },
          {
            id: "leather",
            title: "кожа",
            href: "#",
          },
          {
            id: "velvet",
            title: "бархат",
            href: "#",
          },
          {
            id: "chrome",
            title: "хром",
            href: "#",
          },
          {
            id: "varnished",
            title: "лак",
            href: "#",
          },
        ],
      },
      {
        id: "sandblasting",
        title: "пескоструйная подготовка",
        href: "#service-catalog",
      },
      {
        id: "metalworking",
        title: "металлообработка и изготовление конструкций",
        children: [
          {
            id: "manufacturing",
            title: "Сварка, лазер, гибка, сборка",
            href: "#service-catalog",
          },
          {
            id: "processing",
            title: "Изготовление под ключ (по чертежу)",
            href: "#service-catalog",
          },
        ],
      },
      {
        id: "prices",
        title: "цены",
        href: "#service-catalog",
      },
      {
        id: "requirements",
        title: "требования к изделиям",
        href: "#service-catalog",
      },
      {
        id: "ral-catalog",
        title: "каталог RAL",
        href: "#service-catalog",
      },
    ],
  },
  {
    id: "equipment",
    title: "оборудование",
    href: "#equipment-solutions",
    children: [
      {
        id: "scroll",
        title: "перечень",
        href: "#equipment-solutions",
        children: [
          {
            id: "booths",
            title: "камеры порошковой окраски",
            href: "#",
          },
          {
            id: "ovens",
            title: "печи полимеризации",
            href: "#",
          },
          {
            id: "boxes",
            title: "камеры нанесения/окрасочные боксы",
            href: "#",
          },
          {
            id: "lines",
            title: "транспортные эстакады и конвейеры",
            href: "#",
          },
          {
            id: "aspiration",
            title: "аспирация и системы очистки",
            href: "#",
          },
          {
            id: "spray",
            title: "пистолеты, распылители, комплектующие",
            href: "#",
          },
        ],
      },
      {
        id: "lines",
        title: "линии «под ключ»",
        href: "#equipment-solutions",
      },
      {
        id: "selection",
        title: "подбор по задаче",
        href: "#equipment-solutions",
      },
      {
        id: "configuration",
        title: "комплектации и цены",
        href: "#equipment-solutions",
      },
      {
        id: "assambly",
        title: "монтаж и пусконаладка",
        href: "#equipment-solutions",
      },
      {
        id: "cases",
        title: "кейсы поставок",
        href: "#equipment-solutions",
      },
    ],
  },
  {
    id: "products",
    title: "продукция",
    href: "#product-solutions",
    children: [
      {
        id: "furniture",
        title: "мебель",
        href: "#",
        children: [
          {
            id: "furniture",
            title: "лофт",
            href: "#",
          },
          {
            id: "metals",
            title: "металлокаркасы",
            href: "#",
          },
          {
            id: "tables",
            title: "подстолья",
            href: "#",
          },
          {
            id: "ctm",
            title: "ОЕМ / Производство под СТМ",
            href: "#",
          },
        ],
      },
      {
        id: "modules",
        title: "бытовки и модульные конструкции",
        href: "#",
      },
      {
        id: "works",
        title: "как мы работаем",
        href: "#",
      },
      {
        id: "logistics",
        title: "логистика и отгрузка",
        href: "#",
      },
    ],
  },
  {
    id: "projects",
    title: "проекты",
    href: "#projects",
  },
  {
    id: "production",
    title: "производство",
    href: "#production",
  },
  {
    id: "about",
    title: "о компании",
    href: "#about",
  },
  {
    id: "blog",
    title: "блог",
    href: "#blog",
  },
  {
    id: "contacts",
    title: "контакты",
    href: "#contacts",
  },
  {
    id: "paint",
    title: "купить краску",
    href: "#service-catalog",
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



type NavigationItem = {
  id: string;
  title: string;
  href?: string;
  description?: string;
  children?: NavigationItem[];
};

type DropdownItemsProps = {
  items: NavigationItem[];
  openPath: string[];
  onToggle: (id: string, level: number) => void;
  onNavigate: () => void;
  level?: number;
};

const DropdownItems = ({
  items,
  openPath,
  onToggle,
  onNavigate,
  level = 0,
}: DropdownItemsProps) => {
  return (
    <ul className={`dropdown-list dropdown-list--level-${level}`}>
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isOpen = openPath[level] === item.id;

        return (
          <li
            key={item.id}
            className={`
              dropdown-item
              ${hasChildren ? "dropdown-item--has-children" : "dropdown-item--leaf"}
              ${isOpen ? "is-open" : ""}
            `}
          >
            {hasChildren ? (
              <>
                <button
                  className="dropdown-trigger"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => onToggle(item.id, level)}
                >
                  <span>{item.title}</span>

                  <img
                    src={DownArrow}
                    alt=""
                    className="dropdown-arrow"
                  />
                </button>

                {isOpen && (
                  <DropdownItems
                    items={item.children ?? []}
                    openPath={openPath}
                    onToggle={onToggle}
                    onNavigate={onNavigate}
                    level={level + 1}
                  />
                )}
              </>
            ) : (
              <a
                className="dropdown-link"
                href={item.href ?? "#"}
                onClick={onNavigate}
              >
                {item.title}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};





function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openPath, setOpenPath] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleNestedMenu = (id: string, level: number) => {
    setOpenPath((prev) => {
      const next = prev.slice(0, level);

      if (prev[level] !== id) {
        next[level] = id;
      }

      return next;
    });
  };

  const closeMenu = () => {
    setActiveDropdown(null);
    setOpenPath([]);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="header-logo" href="#top">
          <img src={LogoVeteran} alt="В" />
        </a>

        <nav
          className={`header-nav ${mobileMenuOpen ? "is-mobile-open" : ""}`}
          id="main-navigation"
        >
          {navigation.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = activeDropdown === item.id;

            return (
              <div
                className={`header-nav-item ${isOpen ? "is-open" : ""}`}
                key={item.id}
                onMouseEnter={() => {
                  setActiveDropdown(item.id);
                  setOpenPath([]);
                }}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setOpenPath([]);
                }}
              >
                {hasChildren ? (
                  <>
                    <button
                      className="header-nav-trigger"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => {
                        // На устройствах с мышью открытием управляет hover
                        const isHoverDevice = window.matchMedia(
                          "(hover: hover) and (pointer: fine)"
                        ).matches;

                        if (isHoverDevice) return;

                        setActiveDropdown(isOpen ? null : item.id);
                        setOpenPath([]);
                      }}
                    >
                      {item.title}
                      <img src={DownArrow} alt="" />
                    </button>

                    {isOpen && (
                      <div className="header-dropdown">
                        <DropdownItems
                          items={item.children!}
                          openPath={openPath}
                          onToggle={toggleNestedMenu}
                          onNavigate={closeMenu}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    className="header-nav-link"
                    href={item.href}
                    onClick={closeMenu}
                  >
                    {item.title}
                  </a>
                )}
              </div>
            );
          })}
        </nav>

        <div className="header-contacts">
          <a href="tel:+79282896222">8 928 289 62 22</a>
          <a href="mailto:si@gk-veteran.ru">si@gk-veteran.ru</a>
        </div>

        <a className="button button--orange-bgr" href="#contacts">
          заказать звонок
        </a>

        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
        >
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

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
            <span>Красим изделия<br/>длиной до 7 м за 2–3<br/>рабочих дня</span>
          </div>

          <h1>
            Порошковая окраска, окрасочное оборудование
            и металлоизделия
          </h1>

          <h2>Собственное производство<br/>в Ростове-на-Дону</h2>

          <a href="#about" className="button button--orange hero-cta">
            Узнать больше
            <img src={RightArrow} alt="" />
          </a>
        </div>

      </div>
      <div className="hero-visual">
        <img src={HeroBgr} alt="" />
      </div>
    </section>
  );
}

function ServicesOverview() {
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

                <a href="#contacts" className="service-card-more text-link">
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
          <div className="stats-item">
            <span>окрашиваем в месяц</span>
          </div>

          {
            statistics.map((item) => (
              <div className="stats-item" key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))
          }

        </div>

        <div className="stats-visual">
          <img src={StatsRectangle} className="stats-visual-rectangle"/>

          <div className="stats-visual-image">
              <span>порошковые краски</span>
              <div className="stats-video-preview">
                <img src={assetUrl("Assets/Stats-preview-video.svg")} alt="Окрасочная камера на производстве" />
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
            title: "Покрасим радиаторы, ворота, мебельный каркас или садовую мебель",
            description: 
            <>
                <div>
                    <span>Можно привезти одно изделие, без минимального объёма. Цвет подберём по<span> каталогу RAL </span>или образцу.</span>
                    <span>Радиаторы — от 4 000 ₽ за комплект<br/>Снимем старую краску и ржавчину пескоструем.<br/>Выдача через 3–5 дней</span>
                </div>
            </>,
            image: assetUrl("Assets/Solution-image-1.svg"),
            button: "рассчитать по фото"
        },
        {
            tab: "Заводам и подрядчикам",
            title: "Красим металлоконструкции партиями до 300 м² в смену. Работаем по договору, с НДС, ЭДО и закрывающими документами. Можем встроиться в ваш производственный график",
            description: <>Фиксированная цена за м² на весь объём<br/>Протокол контроля толщины и адгезии к каждой партии</>,
            image: assetUrl("Assets/Solution-image-2.svg"),
            button: "отправить ведомость на расчёт"
        },
        {
            tab: "Красим ваши изделия",
            title: "Принимаем ваши изделия на окраску по акту и фиксируем их состояние на фото до начала работ. Краска наша или ваша. Отвечаем за изделие с момента приёмки до отгрузки",
            description: <>Акт приёмки с фотофиксацией<br/>Хранение на складе до 3 дней бесплатно<br/>Забираем и доставляем своим транспортом</>,
            image: assetUrl("Assets/Solution-image-3.svg"),
            button: "как работает схема"
        },
        {
            tab: "Продукция",
            title: "Производим лофт-мебель, металлокаркасы и бытовки. Отгружаем партиями от 1 шт. Красим в своём цехе, поэтому цвет и сроки контролируем сами",
            description: <>3 уровня оптовых цен<br/>Производство под вашей маркой<br/>Доставка по России транспортными компаниями</>,
            image: assetUrl("Assets/Solution-image-4.svg"),
            button: "получить оптовые условия"
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
                  <img src={selectedTab.image} alt={selectedTab.title} />
                  <img src={CommonComponent} alt='' />
                </div>

                <div className="solutions-content" key={`solution-content-${activeTab}`}>
                    <h3>{selectedTab.title}</h3>
                    
                    <div className="solutions-description">
                      {selectedTab.description}
                    </div>
                    
                    <a href="#contacts" className="button button--orange-bgr">
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
      </div>
    </section>
  );
}

function Production() {
  const productionFeatures = [
    {
      title: "Контроль каждой партии",
      description: "Толщиномер, тест на адгезию, протокол к партии",
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
      description: "150 м² для хранения изделий до и после окраски",
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
            На площадке 600 м² в Ростове-на-Дону работают 2 окрасочные линии,
            участок пескоструйной обработки, сварочное производство и цех сборки
            оборудования. Красим, варим и собираем сами.
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
          <a className="button button--navy" href="#contacts">
            Смотреть видеотур
          </a>
          <a className="button button--orange-bgr" href="#contacts">
            Приехать на производство
          </a>
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

function Projects() {
  return (
    <section className="section section--gray" id="projects">
      <div className="container">
        <h2 className="section-title">Проекты в цифрах</h2>

        <div className="projects-grid">
          <article className="project-card">
            <div className="project-card-copy">
              <h3>Складской комплекс, Омск</h3>
              <p>
                Окрасили металлоконструкции каркаса склада: RAL 7024,
                подготовка до Sa 2½.
              </p>
              <strong>1 200 м²<br />6 дней<br />0 рекламаций</strong>
              <a href="#contacts" className="project-card-link">
                подробнее <img src={RightArrow} alt="" />
              </a>
            </div>
          </article>

          <article className="project-card">
            <div className="project-card-copy">
              <h3>Мебельная фабрика «Люкс»</h3>
              <p>Поставляем окрашенные подстолья в трёх цветах.</p>
              <strong>10 шт. в месяц<br />5 месяцев сотрудничества<br />98% отгрузок в срок</strong>
              <a href="#contacts" className="project-card-link">
                подробнее <img src={RightArrow} alt="" />
              </a>
            </div>
          </article>
        </div>
      </div>
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
      title: "Как подготовить металл к порошковой окраске",
      description: "Этапы очистки и подготовки поверхности перед нанесением покрытия.",
    },
    {
      date: "01.01.2026",
      category: "Материалы",
      image: assetUrl("Assets/Common-palette.svg"),
      title: "Как выбрать цвет и фактуру покрытия",
      description: "Что учитывать при выборе оттенка RAL и типа поверхности.",
    },
    {
      date: "01.01.2026",
      category: "Производство",
      image: assetUrl("Assets/aio-image-2.svg"),
      title: "От чего зависит срок окраски изделия",
      description: "Размер партии, габариты изделия и подготовка влияют на сроки работ.",
    },
    {
      date: "01.01.2026",
      category: "Оборудование",
      image: assetUrl("Assets/aio-image-1.svg"),
      title: "Как подобрать линию порошковой окраски",
      description: "С чего начать выбор оборудования для производственной площадки.",
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
            aria-label="Предыдущие статьи"
            onClick={() => scrollBlog(-1)}
          >
            <img src={RightArrowDark} alt="" />
          </button>
          <div className="blog-grid" ref={blogTrackRef}>
            {articles.map((article) => (
              <article className="blog-card" key={article.title}>
                <div className="blog-card-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="blog-card-copy">
                  <div className="blog-card-meta">
                    <span>{article.date}</span>
                    <span>{article.category}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <a href="#contacts" className="blog-card-link">
                    Читать <img src={RightArrow} alt="" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <button
            className="blog-carousel-control blog-carousel-control--next"
            type="button"
            aria-label="Следующие статьи"
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
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState("Окраска");

  return (
    <section className="section contact-section" id="contacts">
      <div className="container">
        <div className="contact-title-wrap">
          <h2 className="contact-title">
            {direction === "Другое"
              ? "Заполните данные и мы рассчитаем стоимость за 2 часа"
              : "Пришлите чертёж или фото, и мы рассчитаем стоимость за 2 часа"}
          </h2>
        </div>
 
        <div className="contact-layout">
          <form
            className="contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="contact-fields-grid">
              <label className="contact-field">
                <span>направление</span>
                <select value={direction} onChange={(e) => setDirection(e.target.value)}>
                  <option value="Покраска">Покраска</option>
                  <option value="Оборудование">Оборудование</option>
                  <option value="Мебель">Мебель</option>
                  <option value="Другое">Другое</option>
                </select>
              </label>
              <label className="contact-field">
                <span>имя</span>
                <input type="text" placeholder="Ваше имя" required />
              </label>
              <label className="contact-field">
                <span>телефон</span>
                <div className="phone-input-wrap">
                  <span className="phone-flag" aria-hidden="true" />
                  <input type="tel" placeholder="+7 (999) 999 99 99" required />
                </div>
              </label>
              <label className="contact-field">
                <span>e-mail</span>
                <input type="email" placeholder="Ваша почта" />
              </label>
            </div>

            <label className="contact-field-full">
              <span>комментарий</span>
              <textarea placeholder="Напишите любые уточнения для расчёта" rows={3} />
            </label>

            <label className="contact-form-file">
              <span>прикрепить файлы (чертеж/фото/ведомость)</span>
              <span className="contact-form-file-picker">
                <span className="contact-form-file-meta">добавить (DWG, PDF, JPG до 20 МБ)</span>
                <span className="contact-form-file-arrow" aria-hidden="true">→</span>
                <input type="file" accept=".dwg,.pdf,.jpg,.jpeg,.png" multiple />
              </span>
            </label>

            <div className="contact-submit-row">
              <label className="contact-form-agreement">
                <input type="checkbox" required />
                <span>
                    <p>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.</p>
                </span>
              </label>
              <button className="button button--orange-bgr" type="submit">
                получить расчёт
              </button>
            </div>

            {submitted && (
              <p role="status">
                Демонстрационная форма. Отправка на сервер пока не настроена.
              </p>
            )}
          </form>

          <aside className="contact-manager">
            <div className="contact-manager-photo">
              <img src={CommercialDirector} alt="Коммерческий директор" />
            </div>
            <div className="contact-manager-details">
              <div className="contact-manager-meta">
                <span>коммерческий директор</span>
                <strong>Варич Елена Сергеевна</strong>
              </div>
              <div className="contact-manager-meta">
                <span>телефон</span>
                <a href="tel:+79282896222">8 928 289 62 22</a>
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
                        <a href="#service-catalog">Порошковая окраска</a>
                        <a href="#service-catalog">Крупногабарит</a>
                        <a href="#service-catalog">Изделия заказчика</a>
                        <a href="#service-catalog">Декор</a>
                        <a href="#service-catalog">Пескоструй</a>
                        <a href="#service-catalog">Металлообработка</a>
                        <a href="#service-catalog">Калькулятор</a>
                        <a href="#contacts">Цены</a>
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
                        <a href="#contacts">Условия</a>
                        <a href="#contacts">Прайс</a>
                        </div>
                        <div>
                        <h3>Компания</h3>
                        <a href="#about">О компании</a>
                        <a href="#production">Производство</a>
                        <a href="#projects">Проекты</a>
                        <a href="#blog">Документы</a>
                        <a href="#contacts">Реквизиты</a>
                        <a href="#contacts">Вакансии</a>
                        <a href="#blog">Блог</a>
                        </div>
                    </nav>

                    <div className="footer-right-down">
                        <div className="footer-brand">
                            <a href="#top" aria-label="Ветеран, наверх">
                                <img src={LogoVeteran} alt="Ветеран" />
                            </a>
                            <span>все права защищены</span>
                        </div>

                        <div className="footer-company-info">
                            <p>ООО «Ветеран. Системный инжиниринг»</p>
                            <p>ИНН/КПП 6166133197 / 616601001</p>
                            <p>ОГРН 1256100017843</p>
                            <p>Юр адрес 344045 г. Ростов-на-Дону, ул. Миронова, 2Д, кв. 51</p>
                        </div>

                        <div className="footer-legal-links">
                            <a href="#contacts">Политика конфиденциальности</a>
                            <a href="#contacts">Согласие на получение рассылки</a>
                            <a href="#contacts">Согласие на обработку ПД</a>
                        </div>
                    </div>
                </div>

                <div className="footer-side">
                    <div className="footer-map-card" aria-label="Карта производства">
                    <div className="footer-map-label">карта</div>
                    </div>

                    <div className="footer-contact-details">
                    <p>Адрес производства: г. Ростов-на-Дону, Машиностроительный пер., 7/110</p>
                    <p>Режим работы: понедельник-пятница с 9:00 до 18:00</p>
                    <a href="mailto:si@gk-veteran.ru">si@gk-veteran.ru</a>
                    <a href="tel:+79282896222">8 928 289 62 22</a>
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