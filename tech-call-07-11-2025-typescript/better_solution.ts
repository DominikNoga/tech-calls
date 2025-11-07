/**
  Nowe podejście, deklarujemy tylko stałą, która zawiera dostępne podatki VAT dla różnych krajów.
  A następnie wyprowadzamy z niej wszystkie potrzebne typy.
  - Country
  - TaxFor<C>
  - Purchase
  - ValidPurchase
  Dzięki temu dodanie nowego kraju lub zmiana stawek podatkowych wymaga zmiany tylko w jednym miejscu.
*/

namespace TechCall {
  const VAT = {
    PL: [0, 0.05, 0.08, 0.23],
    DE: [0, 0.07, 0.19],
    FR: [0, 0.021, 0.055, 0.1, 0.2],
    UK: [0, 0.05, 0.2],
  } as const satisfies Record<string, number[]>;

  type Country = keyof typeof VAT;

  type TaxFor<C extends Country> = typeof VAT[C][number];
  type TaxPl = TaxFor<'PL'>;

  type PurchaseGeneric<C extends Country = Country> = {
    country: C;
    vatTax: TaxFor<C>;
    name: string;
    netPrice: number;
  };

  type Purchase =
    { [C in Country]: PurchaseGeneric<C> }[Country];

  const purchases: Purchase[] = [
    // not valid tax in Poland
    { country: 'PL', vatTax: 0.07, name: 'dumplings', netPrice: 100 },
    { country: 'DE', vatTax: 0.07, name: 'bavarian beer', netPrice: 200 },
    { country: 'FR', vatTax: 0.055, name: 'frogs', netPrice: 300 },
    { country: 'UK', vatTax: 0.2, name: 'eggs & bacon', netPrice: 400 },
  ];
}
