/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type FavoriteItem = {
  compoundSlug: any;
  id: string;
  slug?: string;
  type: "property" | "compound";
};

type Favorites = {
  properties: FavoriteItem[];
  compounds: FavoriteItem[];
};

interface FavoritesContextType {
  favorites: Favorites;
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string, type: "property" | "compound") => void;
  isFavorite: (id: string, type: "property" | "compound") => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Favorites>({
    properties: [],
    compounds: [],
  });

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const collection = item.type === "property" ? "properties" : "compounds";

      // Check if item already exists
      if (prev[collection].some((favItem) => favItem.id === item.id)) {
        return prev;
      }

      return {
        ...prev,
        [collection]: [...prev[collection], item],
      };
    });
  };

  const removeFromFavorites = (id: string, type: "property" | "compound") => {
    setFavorites((prev) => {
      const collection = type === "property" ? "properties" : "compounds";
      return {
        ...prev,
        [collection]: prev[collection].filter((item) => item.id !== id),
      };
    });
  };

  const isFavorite = (id: string, type: "property" | "compound") => {
    const collection = type === "property" ? "properties" : "compounds";
    return favorites[collection].some((item) => item.id === id);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id, item.type)) {
      removeFromFavorites(item.id, item.type);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
