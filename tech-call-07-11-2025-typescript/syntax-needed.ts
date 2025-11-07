// Keyof - pozwala na uzyskanie unii kluczy z danego typu obiektu

namespace SyntaxExamples {
  const obj = {
    a: 1,
    b: 'hello',
    c: true,
  };

  type ObjKeys = keyof typeof obj; // "a" | "b" | "c"

  // Typy warunkowe - pozwalają na tworzenie nowych typów w zależności od warunków
  type PrefixedString<T> = T extends string ? `prefix_${T}` : never;

  type Test1 = PrefixedString<'test'>;
  type Test2 = PrefixedString<number>; // never

  // Infer - pozwala na wyodrębnienie typów z innych typów, korzystając z typów warunkowych
  // Przykład: wyodrębnienie typu zwracanego z funkcji
  // Co może być lepiej?
  type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never;
  function exampleFunction(x: number): string {
    return x.toString();
  }
  
  type ExampleReturnType = MyReturnType<typeof exampleFunction>; // string
  type ExampleReturnType3 = MyReturnType<string>; // never
  type ExampleReturnType2 = ReturnType<typeof exampleFunction>; // string

  // Typy mapowane - pozwalają na tworzenie nowych typów na podstawie istniejących typów obiektów
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };

  type Obj = {
    a: number;
    b: string;
  };

  type ReadonlyObj = Readonly<Obj>;

  const readonlyObj: Readonly<Obj> = { a: 10, b: 'test' };

  readonlyObj.a = 20; // Błąd: nie można przypisać do 'a' ponieważ jest to właściwość tylko do odczytu
  readonlyObj.b = 'changed';

  type State = {
    loading: {
      isLoading: boolean;
    },
    error: {
      message: string;
    };
    success: {
      data: string[];
    };
  }

  // Zmiana typu obiektowego na unię
  type ObjToUnion<T> = { [K in keyof T]: { key: K; value: T[K] } }[keyof T];

  type ObjUnion = ObjToUnion<State>;
  // Przykład użycia:
  function handleState(item: ObjUnion) {
    if (item.key === 'error') {
      // item.value is number here
      console.error(`Key: ${item.key}, Value (error message): ${item.value.message}`);
    } else if (item.key === 'success') {
      // item.value is string here
      // Handle success case
      console.log(`Key: ${item.key}, : ${item.value.data.join(', ')}`);
    }
    else if (item.key === 'loading') {
      // item.value is boolean here
      // Handle loading case
      console.log(`Key: ${item.key}, Is Loading: ${item.value.isLoading}`);
    }
  }

  // Result: { key: "a"; value: number } | { key: "b"; value: string }
}
