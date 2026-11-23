import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import './Header.css';

// Common elements
import LogoVeteran from "../../../public/Assets/Common-Logo-Veteran.svg";
import DownArrow from '../../../public/Assets/Header-arrow-down.svg';

import ContactModal from "../ContactModal/ContactModal";
import ContactsInput from "../ContactsInputPart/ContactsInputPart";

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
              <Link className="dropdown-link" to={item.href ?? "/development"}>
                {item.title}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const navigation = [
  {
    id: "services",
    title: "услуги",
    href: "/development",
    children: [
      {
        id: "powder-painting",
        title: "порошковая покраска",
        children: [
          // По типу
          {
            id: "radiators",
            title: "радиаторы",
            href: "/development",
          },
          {
            id: "profile",
            title: "профиль",
            href: "/development",
          },
          {
            id: "tube",
            title: "трубы",
            href: "/development",
          },
          {
            id: "metal",
            title: "металлоконструкции",
            href: "/development",
          },
          {
            id: "fences",
            title: "заборы и ограждения",
            href: "/development",
          },
          {
            id: "doors",
            title: "двери",
            href: "/development",
          },
          {
            id: "canopies",
            title: "настилы/навесы",
            href: "/development",
          },
          {
            id: "tanks",
            title: "емкости",
            href: "/development",
          },
          {
            id: "stairs",
            title: "лестницы",
            href: "/development",
          },
          {
            id: "ads",
            title: "рекламные конструкции",
            href: "/development",
          },
          {
            id: "clips",
            title: "крепеж/метизы",
            href: "/development",
          },
          {
            id: "aluminium",
            title: "алюминий",
            href: "/development",
          },
          {
            id: "steanless",
            title: "нержавейка",
            href: "/development",
          },
          {
            id: "galvanizing",
            title: "оцинковка",
            href: "/development",
          },
          {
            id: "large",
            title: "крупногабарит",
            href: "/development",
          },

          // По материалу
          {
            id: "shagreen",
            title: "шагрень",
            href: "/development",
          },
          {
            id: "moire",
            title: "муар",
            href: "/development",
          },
          {
            id: "antique",
            title: "антик",
            href: "/development",
          },
          {
            id: "leather",
            title: "кожа",
            href: "/development",
          },
          {
            id: "velvet",
            title: "бархат",
            href: "/development",
          },
          {
            id: "chrome",
            title: "хром",
            href: "/development",
          },
          {
            id: "varnished",
            title: "лак",
            href: "/development",
          },
        ],
      },
      {
        id: "sandblasting",
        title: "пескоструйная подготовка",
        href: "/development",
      },
      {
        id: "metalworking",
        title: "металлообработка и изготовление конструкций",
        children: [
          {
            id: "manufacturing",
            title: "сварка, лазер, гибка, сборка",
            href: "/development",
          },
          {
            id: "processing",
            title: "изготовление под ключ (по чертежу)",
            href: "/development",
          },
        ],
      },
      {
        id: "prices",
        title: "цены",
        href: "/development",
      },
      {
        id: "requirements",
        title: "требования к изделиям",
        href: "/development",
      },
      {
        id: "ral-catalog",
        title: "каталог RAL",
        href: "/development",
      },
    ],
  },
  {
    id: "equipment",
    title: "оборудование",
    href: "/development",
    children: [
      {
        id: "scroll",
        title: "перечень",
        href: "/development",
        children: [
          {
            id: "booths",
            title: "камеры порошковой окраски",
            href: "/development",
          },
          {
            id: "ovens",
            title: "печи полимеризации",
            href: "/development",
          },
          {
            id: "boxes",
            title: "камеры нанесения/окрасочные боксы",
            href: "/development",
          },
          {
            id: "lines",
            title: "транспортные эстакады и конвейеры",
            href: "/development",
          },
          {
            id: "aspiration",
            title: "аспирация и системы очистки",
            href: "/development",
          },
          {
            id: "spray",
            title: "пистолеты, распылители, комплектующие",
            href: "/development",
          },
        ],
      },
      {
        id: "lines",
        title: "линии «под ключ»",
        href: "/development",
      },
      {
        id: "selection",
        title: "подбор по задаче",
        href: "/development",
      },
      {
        id: "configuration",
        title: "комплектации и цены",
        href: "/development",
      },
      {
        id: "assambly",
        title: "монтаж и пусконаладка",
        href: "/development",
      },
      {
        id: "cases",
        title: "кейсы поставок",
        href: "/development",
      },
    ],
  },
  {
    id: "products",
    title: "продукция",
    href: "/development",
    children: [
      {
        id: "furniture",
        title: "мебель",
        href: "/development",
        children: [
          {
            id: "furniture",
            title: "лофт",
            href: "/development",
          },
          {
            id: "metals",
            title: "металлокаркасы",
            href: "/development",
          },
          {
            id: "tables",
            title: "подстолья",
            href: "/development",
          },
          {
            id: "ctm",
            title: "ОЕМ / производство под СТМ",
            href: "/development",
          },
        ],
      },
      {
        id: "modules",
        title: "бытовки и модульные конструкции",
        href: "/development",
      },
      {
        id: "works",
        title: "как мы работаем",
        href: "/development",
      },
      {
        id: "logistics",
        title: "логистика и отгрузка",
        href: "/development",
      },
    ],
  },
  {
    id: "projects",
    title: "проекты",
    href: "/development",
  },
  {
    id: "production",
    title: "производство",
    href: "/development",
  },
  {
    id: "about",
    title: "о компании",
    href: "/development",
  },
  {
    id: "blog",
    title: "блог",
    href: "/#blog",
  },
  {
    id: "contacts",
    title: "контакты",
    href: "/#contacts",
  },
  {
    id: "paint",
    title: "купить краску",
    href: "/development",
  },
];

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openPath, setOpenPath] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState("Окраска");
  const [equipmentType, setEquipmentType] = useState("");
  const [phone, setPhone] = useState("");


  // Полностью закрыть меню
  const closeMenu = () => {
    setActiveDropdown(null);
    setOpenPath([]);
    setMobileMenuOpen(false);
  };

  // Открыть или закрыть вложенный пункт
  const toggleNestedMenu = (id: string, level: number) => {
    setOpenPath((prev) => {
      const next = [...prev];

      if (next[level] === id) {
        return next.slice(0, level);
      }

      next[level] = id;
      return next.slice(0, level + 1);
    });
  };

  // Закрытие при клике за пределами навигации
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target as HTMLElement;

      // Кнопка мобильного меню обрабатывается отдельно
      if (target.closest(".mobile-menu-toggle")) return;

      if (
        navigationRef.current &&
        !navigationRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="header-logo" to="/">
          <img src={LogoVeteran} alt="В" />
        </Link>

        <div
          className="header-navigation-wrap"
          ref={navigationRef}
        >
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
                >
                  {hasChildren ? (
                    <>
                      <button
                        className="header-nav-trigger"
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => {
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
                    <Link className="header-nav-link" to={item.href} onClick={closeMenu}>
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="header-contacts">
          <a href="tel:+79282896222">8 928 289 62 22</a>
          <a href="mailto:si@gk-veteran.ru">si@gk-veteran.ru</a>
        </div>

        <a
          className="button button--orange-bgr"
          onClick={() => {
            setDirection("Другое");
            setIsModalOpen(true);
          }}
        >
          заказать звонок
        </a>

        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-navigation"
          onClick={() => {
            setMobileMenuOpen((prev) => {
              if (prev) {
                setActiveDropdown(null);
                setOpenPath([]);
              }

              return !prev;
            });
          }}
        >
          <span aria-hidden="true" />
        </button>
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
    </header>
  );
}
