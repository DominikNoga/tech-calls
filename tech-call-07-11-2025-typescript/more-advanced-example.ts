namespace Homework6 {
  const SCHEMA = {
    book: {
      cover: ['hard', 'soft'],
      language: ['pl', 'en', 'de', 'fr'],
      pages: [64, 128, 256, 512],
    },
    laptop: {
      cpu: ['i5', 'i7', 'ryzen5', 'ryzen7'],
      ram: [8, 16, 32],
      os: ['win', 'linux', 'macos'],
    },
    food: {
      organic: [true, false],
      allergens: ['gluten', 'lactose', 'nuts', 'none'],
    },
  } as const;

  type ProductCategory = keyof typeof SCHEMA;
  type ProductAttributes<C extends ProductCategory> = keyof typeof SCHEMA[C];
  type FoodAttributes = ProductAttributes<'food'>;
  // type ProductAttributesValuesBad<C extends ProductCategory, A extends ProductAttributes<C>> = typeof SCHEMA[C][A][number];
  type ProductAttributesValues<C extends ProductCategory, A extends ProductAttributes<C>> =
    typeof SCHEMA[C][A] extends readonly (infer Value)[] ? Value : never;

  type FoodAllergens = ProductAttributesValues<'food', 'allergens'>;
  type CatalogItem<C extends ProductCategory> = {
    id: string;
    name: string;
    category: C;
    attrs: {
      [K in ProductAttributes<C>]?: ProductAttributesValues<C, K>;
    };
  };

  type LaptopItem = CatalogItem<'laptop'>;
  const laptops: LaptopItem[] = [
    {
      id: 'L-1',
      name: 'DevBook',
      category: 'laptop',
      attrs: {
        cpu: 'i5',
        os: 'linux',
        ram: 32
      }
    }, {
      id: 'L-2',
      name: 'WrongLaptop',
      category: 'laptop',
      attrs: {
        organic: true,
        allergens: 'none'
      }
    }
  ];

  type ValidCategoryItem = {
    [C in ProductCategory]: CatalogItem<C>;
  }[ProductCategory];

  const products: ValidCategoryItem[] = [
    {
      id: 'L-1',
      name: 'DevBook',
      category: 'laptop',
      attrs: {
        cpu: 'i5',
        os: 'linux',
        ram: 32
      }
    },
    {
      id: 'Food-1',
      name: 'Organic Bananas',
      category: 'food',
      // Error, cover is not a valid attribute for food
      attrs: {
        cover: 'soft',
        organic: true,
        allergens: 'none'
      }
    },
    {
      id: 'Book-1',
      name: 'Kfo wadis',
      category: 'book',
      attrs: {
        cover: 'hard',
        language: 'de',
        pages: 256,
      },
    }
  ];
}
