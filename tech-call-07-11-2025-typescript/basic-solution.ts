/**
  Problem: zamodelować typ, który pozwoli na walidację poprawności danych zakupów,
  zależnie od kraju, w którym zakup został dokonany.
*/

const TAXES = [
  { country: 'PL', rates: [0, 0.05, 0.08, 0.23] },
]


namespace TechCall {
  type Country = 'PL' | 'DE' | 'FR' | 'UK'

  type Tax_PL = 0 | 0.05 | 0.08 | 0.23;
  type Tax_DE = 0 | 0.07 | 0.19;
  type Tax_FR = 0 | 0.021 | 0.055 | 0.1 | 0.2;
  type Tax_UK = 0 | 0.05 | 0.20;

  // ten typ jest za szeroki, ponieważ pozwala na połączenie dowolnej stawki podatku z dowolnym krajem
  type Purchase = {
    country: Country
    vatTax: number
    name: string
    netPrice: number
  }

  type BasePurchase = {
    name: string
    netPrice: number
  }

  type ValidPurchase = BasePurchase & (
    | { country: 'PL'; vatTax: Tax_PL }
    | { country: 'DE'; vatTax: Tax_DE }
    | { country: 'FR'; vatTax: Tax_FR }
    | { country: 'UK'; vatTax: Tax_UK });
    

  const purchases: ValidPurchase[] = [{
    country: 'PL',
    vatTax: 0.01,
    name: 'dumplings',
    netPrice: 100,
  }, {
    country: 'DE',
    vatTax: 0.07,
    name: 'bawarian beer',
    netPrice: 200,
  }, {
    country: 'FR',
    vatTax: 0.055,
    name: 'frogs',
    netPrice: 300,
  }, {
    country: 'UK',
    vatTax: 0.2,
    name: 'eggs & bacon',
    netPrice: 400,
  }];
}