import { useEffect, useRef, useState } from "react";

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
              <a
                className="dropdown-link"
                href={item.href ?? "/dev"}
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

const navigation = [
  {
    id: "services",
    title: "услуги",
    href: "/dev",
    children: [
      {
        id: "powder-painting",
        title: "порошковая покраска",
        children: [
          // По типу
          {
            id: "radiators",
            title: "радиаторы",
            href: "/dev",
          },
          {
            id: "profile",
            title: "профиль",
            href: "/dev",
          },
          {
            id: "tube",
            title: "трубы",
            href: "/dev",
          },
          {
            id: "metal",
            title: "металлоконструкции",
            href: "/dev",
          },
          {
            id: "fences",
            title: "заборы и ограждения",
            href: "/dev",
          },
          {
            id: "doors",
            title: "двери",
            href: "/dev",
          },
          {
            id: "canopies",
            title: "настилы/навесы",
            href: "/dev",
          },
          {
            id: "tanks",
            title: "емкости",
            href: "/dev",
          },
          {
            id: "stairs",
            title: "лестницы",
            href: "/dev",
          },
          {
            id: "ads",
            title: "рекламные конструкции",
            href: "/dev",
          },
          {
            id: "clips",
            title: "крепеж/метизы",
            href: "/dev",
          },
          {
            id: "aluminium",
            title: "алюминий",
            href: "/dev",
          },
          {
            id: "steanless",
            title: "нержавейка",
            href: "/dev",
          },
          {
            id: "galvanizing",
            title: "оцинковка",
            href: "/dev",
          },
          {
            id: "large",
            title: "крупногабарит",
            href: "/dev",
          },

          // По материалу
          {
            id: "shagreen",
            title: "шагрень",
            href: "/dev",
          },
          {
            id: "moire",
            title: "муар",
            href: "/dev",
          },
          {
            id: "antique",
            title: "антик",
            href: "/dev",
          },
          {
            id: "leather",
            title: "кожа",
            href: "/dev",
          },
          {
            id: "velvet",
            title: "бархат",
            href: "/dev",
          },
          {
            id: "chrome",
            title: "хром",
            href: "/dev",
          },
          {
            id: "varnished",
            title: "лак",
            href: "/dev",
          },
        ],
      },
      {
        id: "sandblasting",
        title: "пескоструйная подготовка",
        href: "/dev",
      },
      {
        id: "metalworking",
        title: "металлообработка и изготовление конструкций",
        children: [
          {
            id: "manufacturing",
            title: "сварка, лазер, гибка, сборка",
            href: "/dev",
          },
          {
            id: "processing",
            title: "изготовление под ключ (по чертежу)",
            href: "/dev",
          },
        ],
      },
      {
        id: "prices",
        title: "цены",
        href: "/dev",
      },
      {
        id: "requirements",
        title: "требования к изделиям",
        href: "/dev",
      },
      {
        id: "ral-catalog",
        title: "каталог RAL",
        href: "/dev",
      },
    ],
  },
  {
    id: "equipment",
    title: "оборудование",
    href: "/dev",
    children: [
      {
        id: "scroll",
        title: "перечень",
        href: "/dev",
        children: [
          {
            id: "booths",
            title: "камеры порошковой окраски",
            href: "/dev",
          },
          {
            id: "ovens",
            title: "печи полимеризации",
            href: "/dev",
          },
          {
            id: "boxes",
            title: "камеры нанесения/окрасочные боксы",
            href: "/dev",
          },
          {
            id: "lines",
            title: "транспортные эстакады и конвейеры",
            href: "/dev",
          },
          {
            id: "aspiration",
            title: "аспирация и системы очистки",
            href: "/dev",
          },
          {
            id: "spray",
            title: "пистолеты, распылители, комплектующие",
            href: "/dev",
          },
        ],
      },
      {
        id: "lines",
        title: "линии «под ключ»",
        href: "/dev",
      },
      {
        id: "selection",
        title: "подбор по задаче",
        href: "/dev",
      },
      {
        id: "configuration",
        title: "комплектации и цены",
        href: "/dev",
      },
      {
        id: "assambly",
        title: "монтаж и пусконаладка",
        href: "/dev",
      },
      {
        id: "cases",
        title: "кейсы поставок",
        href: "/dev",
      },
    ],
  },
  {
    id: "products",
    title: "продукция",
    href: "/dev",
    children: [
      {
        id: "furniture",
        title: "мебель",
        href: "/dev",
        children: [
          {
            id: "furniture",
            title: "лофт",
            href: "/dev",
          },
          {
            id: "metals",
            title: "металлокаркасы",
            href: "/dev",
          },
          {
            id: "tables",
            title: "подстолья",
            href: "/dev",
          },
          {
            id: "ctm",
            title: "ОЕМ / производство под СТМ",
            href: "/dev",
          },
        ],
      },
      {
        id: "modules",
        title: "бытовки и модульные конструкции",
        href: "/dev",
      },
      {
        id: "works",
        title: "как мы работаем",
        href: "/dev",
      },
      {
        id: "logistics",
        title: "логистика и отгрузка",
        href: "/dev",
      },
    ],
  },
  {
    id: "projects",
    title: "проекты",
    href: "/dev",
  },
  {
    id: "production",
    title: "производство",
    href: "/dev",
  },
  {
    id: "about",
    title: "о компании",
    href: "/dev",
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
    href: "/dev",
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
        <a className="header-logo" href="/painting">
          <img src={LogoVeteran} alt="В" />
        </a>

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
