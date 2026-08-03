"use client";

import { Button } from "@/components/ui/Button";
import { MenuGridSkeleton } from "@/components/ui/Skeleton";
import { useMenus } from "@/hooks/useMenus";
import {
  formatMenuPrice,
  groupMenusByCategory,
  MENU_PLACEHOLDER_IMAGE,
} from "@/lib/menu-utils";
import type { MenuItem } from "@/types/menu";

interface MenuItemCardProps {
  item: MenuItem;
  showShadow?: boolean;
}

function MenuItemCard({ item, showShadow = false }: MenuItemCardProps) {
  return (
    <article
      className={`
        group
        overflow-hidden
        rounded-2xl
        border
        border-gray-800
        bg-[#111]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-yellow-500
        ${showShadow ? "hover:shadow-[0_0_25px_rgba(234,179,8,0.2)]" : ""}
      `}
    >
      <img
        src={item.image || MENU_PLACEHOLDER_IMAGE}
        alt={item.name}
        loading="lazy"
        decoding="async"
        className="h-64 w-full object-cover"
      />

      <div className="flex items-center justify-between p-5">
        <h4 className="text-xl font-bold">{item.name}</h4>
        <span className="font-bold text-yellow-500">
          {formatMenuPrice(item.price)}
        </span>
      </div>
    </article>
  );
}

const Menu = () => {
  const { menus, isLoading, error, refetch } = useMenus();
  const groupedMenus = groupMenusByCategory(menus);

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="landing-section bg-[#0a0a0a] text-white"
    >
      <div className="section-container">
        <div className="section-divider landing-section-divider" aria-hidden="true" />

        <header className="section-heading-gap text-center">
          <h2
            id="menu-heading"
            className="mb-4 text-4xl font-bold text-yellow-500 md:text-5xl"
          >
            Our Menu
          </h2>
          <p className="text-lg text-gray-300">
            Discover our signature dishes and premium selections.
          </p>
        </header>

        {isLoading && (
          <div role="status" aria-live="polite" aria-busy="true">
            <p className="sr-only">Loading menu items</p>
            <div className="section-block-gap">
              <MenuGridSkeleton count={3} />
            </div>
            <MenuGridSkeleton count={3} />
          </div>
        )}

        {!isLoading && error && (
          <div
            role="alert"
            aria-live="assertive"
            className="rounded-2xl border border-red-800/60 bg-red-950/30 p-8 text-center"
          >
            <p className="mb-6 text-lg text-red-300">{error}</p>
            <Button variant="secondary" onClick={refetch}>
              Try Again
            </Button>
          </div>
        )}

        {!isLoading && !error && groupedMenus.length === 0 && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-gray-800 bg-[#111] p-10 text-center"
          >
            <h3 className="mb-3 text-2xl font-bold text-yellow-500">
              Menu Coming Soon
            </h3>
            <p className="text-gray-400">
              Our chefs are preparing new selections. Please check back shortly
              or contact us for today&apos;s specials.
            </p>
          </div>
        )}

        {!isLoading &&
          !error &&
          groupedMenus.map((group, groupIndex) => (
            <div
              key={group.category}
              className={
                groupIndex < groupedMenus.length - 1
                  ? "section-block-gap"
                  : undefined
              }
            >
              <h3 className="mb-6 text-center text-3xl font-bold text-yellow-500 md:mb-8">
                {group.category}
              </h3>

              <ul
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                role="list"
              >
                {group.items.map((item) => (
                  <li key={item._id}>
                    <MenuItemCard
                      item={item}
                      showShadow={groupIndex === 0}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Menu;
