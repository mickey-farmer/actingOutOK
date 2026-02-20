"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";

const NAV_ITEMS = [
  { href: "/casting-calls", label: "Casting Calls" },
  { href: "/resources", label: "Resources" },
  {
    label: "Directory",
    submenu: [
      { href: "/directory/cast", label: "Cast" },
      { href: "/directory/crew", label: "Crew" },
    ],
  },
  { href: "https://news.actingoutok.com", label: "News", external: true },
];

const LABEL_BY_PATH: Record<string, string> = {
  "/casting-calls": "Casting Calls",
  "/resources": "Resources",
  "/directory": "Directory",
  "/directory/cast": "Directory",
  "/directory/crew": "Directory",
};

export default function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentLabel =
    LABEL_BY_PATH[pathname ?? ""] ??
    (pathname?.startsWith("/casting-call") ? "Casting Calls" : "Resources");

  const closeDropdown = useCallback(() => setDropdownOpen(false), []);
  const toggleDropdown = useCallback(() => setDropdownOpen((o) => !o), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((o) => !o), []);

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="site-logo" aria-label="Acting Out OK home">
            <Image
              src="/images/logo.png"
              alt="Acting Out OK"
              width={180}
              height={56}
              priority
              style={{ maxHeight: 96, width: "auto", height: "auto", objectFit: "contain" }}
            />
          </Link>
          <div className="site-nav-wrap">
            <div className="nav-dropdown">
              <button
                type="button"
                className="nav-dropdown-trigger"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-controls="nav-dropdown-menu"
                id="nav-dropdown-trigger"
                onClick={toggleDropdown}
              >
                <span className="nav-dropdown-label">{currentLabel}</span>
                <span className="nav-dropdown-arrow" aria-hidden>
                  ▼
                </span>
              </button>
              <ul
                className="nav-dropdown-menu"
                id="nav-dropdown-menu"
                role="menu"
                hidden={!dropdownOpen}
              >
                {NAV_ITEMS.map((item) => {
                  if ("submenu" in item && item.submenu) {
                    const isActive = item.submenu.some(
                      (s) => pathname === s.href
                    );
                    return (
                      <li
                        key={item.label}
                        className="nav-dropdown-item-with-submenu"
                        role="none"
                      >
                        <span
                          className="nav-dropdown-submenu-trigger"
                          role="menuitem"
                          aria-haspopup="true"
                          aria-expanded={isActive}
                        >
                          {item.label}
                        </span>
                        <ul
                          className="nav-dropdown-submenu"
                          role="menu"
                          aria-label={`${item.label} submenu`}
                        >
                          {item.submenu.map((sub) => (
                            <li key={sub.href} role="none">
                              <Link
                                href={sub.href}
                                role="menuitem"
                                aria-current={
                                  pathname === sub.href ? "page" : undefined
                                }
                                onClick={closeDropdown}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }
                  const href = "href" in item ? item.href : "";
                  const external = "external" in item && item.external;
                  return (
                    <li key={href || item.label} role="none">
                      {external ? (
                        <a
                          href={href}
                          role="menuitem"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          role="menuitem"
                          aria-current={
                            pathname === href ? "page" : undefined
                          }
                          onClick={closeDropdown}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <button
            type="button"
            className="nav-mobile-toggle"
            aria-expanded={drawerOpen}
            aria-controls="nav-drawer"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            id="nav-mobile-toggle"
            onClick={toggleDrawer}
          >
            ☰
          </button>
        </div>
      </header>

      <div
        className={`nav-drawer-backdrop ${drawerOpen ? "is-open" : ""}`}
        id="nav-drawer-backdrop"
        aria-hidden={!drawerOpen}
        onClick={toggleDrawer}
      />
      <aside
        className={`nav-drawer ${drawerOpen ? "is-open" : ""}`}
        id="nav-drawer"
        aria-label="Main navigation"
      >
        <Link href="/" className="site-logo" onClick={toggleDrawer}>
          <Image
            src="/images/logo.png"
            alt="Acting Out OK"
            width={180}
            height={56}
            style={{ maxHeight: 56, width: "auto", height: "auto", objectFit: "contain" }}
          />
        </Link>
        <ul className="nav-drawer-nav">
          {NAV_ITEMS.map((item) => {
            if ("submenu" in item && item.submenu) {
              return (
                <li key={item.label}>
                  <span className="nav-drawer-group-label">{item.label}</span>
                  <ul className="nav-drawer-sublist">
                    {item.submenu.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={toggleDrawer}
                          aria-current={
                            pathname === sub.href ? "page" : undefined
                          }
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            const href = "href" in item ? item.href : "";
            const external = "external" in item && item.external;
            return (
              <li key={href || item.label}>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={toggleDrawer}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    onClick={toggleDrawer}
                    aria-current={pathname === href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="nav-drawer-footer">
          <Link href="/about" onClick={toggleDrawer}>
            About
          </Link>
          <Link href="/privacy" onClick={toggleDrawer}>
            Privacy
          </Link>
          <Link href="/terms" onClick={toggleDrawer}>
            Terms
          </Link>
        </div>
      </aside>
    </>
  );
}
