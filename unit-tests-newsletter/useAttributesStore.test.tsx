import { renderHook, act } from '@testing-library/react';
import {
  Attribute,
  AttributeType,
} from '@worklogs/forge/src/typescript/types/Attribute';
import { useAttributesStore } from './useAttributesStore';

describe('useAttributesStore', () => {
  const mockAttributes: Attribute[] = [
    {
      id: '1',
      name: 'Attribute 1',
      type: AttributeType.CHECKBOX,
      required: false,
    },
    {
      id: '2',
      name: 'Attribute 2',
      type: AttributeType.SELECT,
      required: true,
    },
  ];

  beforeEach(() => {
    // Reset store state before each test
    useAttributesStore.setState({
      attributes: [],
      actions: useAttributesStore.getState().actions,
    });
  });

  describe('Initial state', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useAttributesStore());

      expect(result.current.attributes).toEqual([]);
      expect(result.current.actions).toBeDefined();
    });
  });

  describe('addAttribute', () => {
    it('should add a single attribute to the store', () => {
      const { result } = renderHook(() => useAttributesStore());

      const newAttribute: Attribute = {
        id: '3',
        name: 'New Attribute',
        type: AttributeType.CHECKBOX,
        required: false,
      };

      act(() => {
        result.current.actions.addAttribute(newAttribute);
      });

      expect(result.current.attributes).toEqual([newAttribute]);
    });

    // Ten test nie ma wartości biznesowej, pierwsza asercja tak naprawdę powtarza test z pierwszego przypadku
    // Druga asercja to po prostu powtórzenie tego samego testu, ale z innym atrybutem, co nie wnosi nic nowego do testowania funkcjonalności
    // Patrząc na implementację tej funkcji sprawdzamy tylko czy destrukturyzacja działa poprawnie, a to jest testowane w pierwszym teście, więc ten test jest zbędny
    it('should add multiple attributes sequentially', () => {
      const { result } = renderHook(() => useAttributesStore());

      act(() => {
        result.current.actions.addAttribute(mockAttributes[0]);
      });

      expect(result.current.attributes).toEqual([mockAttributes[0]]);

      act(() => {
        result.current.actions.addAttribute(mockAttributes[1]);
      });

      expect(result.current.attributes).toEqual(mockAttributes);
    });

    // Kolejny test, który zupełnie niczym nie różni się od poprzedniego, a jest nawet gorszy
    // Ponieważ wywołuję również metodę setAttributes, więc jeżeli coś w niej się zepsuje, to ten test również się nie powiedzie
    // A jego nazwa suguruje sprawdzanie zupełnie czegoś innego
    it('should append to existing attributes', () => {
      const { result } = renderHook(() => useAttributesStore());

      // Set initial attributes
      act(() => {
        result.current.actions.setAttributes(mockAttributes);
      });

      const newAttribute: Attribute = {
        id: '3',
        name: 'Additional Attribute',
        type: AttributeType.SELECT,
        required: true,
      };

      act(() => {
        result.current.actions.addAttribute(newAttribute);
      });

      expect(result.current.attributes).toEqual([
        ...mockAttributes,
        newAttribute,
      ]);
    });
  });

  describe('setAttributes', () => {
    it('should set attributes directly', () => {
      const { result } = renderHook(() => useAttributesStore());

      act(() => {
        result.current.actions.setAttributes(mockAttributes);
      });

      expect(result.current.attributes).toEqual(mockAttributes);
    });

    // Ten test jest zupełnie zbędny, ponieważ sprawdza dokładnie to samo co poprzedni, ale z innymi danymi
    // Patrząc na implementację sprawdzamy tylko czy nadpisanie parametru obiektu działa poprawnie, co jest testowaniem
    // mechanizmu języka, a nie funkcjonalności naszej aplikacji, więc ten test jest zupełnie bezwartościowy
    it('should replace existing attributes', () => {
      const { result } = renderHook(() => useAttributesStore());

      // Set initial attributes
      act(() => {
        result.current.actions.setAttributes(mockAttributes);
      });

      const newAttributes: Attribute[] = [
        {
          id: '10',
          name: 'New Set',
          type: AttributeType.CHECKBOX,
          required: false,
        },
      ];

      act(() => {
        result.current.actions.setAttributes(newAttributes);
      });

      expect(result.current.attributes).toEqual(newAttributes);
    });

    // Pusty array to nie jest edge case, ustawienie go w store, jest taką samą operacją jak ustawienie jakiegokolwiek innego arraya, 
    // ten test robi to samo co oba poprzednie, gdyby sprawdzić na UI jak zachowuję się aplikacja dla pustego arraya
    // to faktycznie sprawdzamy edge case i inne wyświetlanie stanu, ale tutaj nie ma to żadnej wartości/
    it('should handle empty array', () => {
      const { result } = renderHook(() => useAttributesStore());

      act(() => {
        result.current.actions.setAttributes(mockAttributes);
      });

      act(() => {
        result.current.actions.setAttributes([]);
      });

      expect(result.current.attributes).toEqual([]);
    });
  });

  describe('reset', () => {
    it('should reset store to initial state', () => {
      const { result } = renderHook(() => useAttributesStore());

      // Modify the state
      act(() => {
        result.current.actions.setAttributes(mockAttributes);
      });

      expect(result.current.attributes).toEqual(mockAttributes);

      // Reset
      act(() => {
        result.current.actions.reset();
      });

      expect(result.current.attributes).toEqual([]);
    });

    // Po raz kolejny sprawdzamy to samo co w poprzednim teście, a dodatkowo powtarzamy asercję z poprzednich testów
    // funkcji 'addAttribute'. Jeśli działa ona zgodnie z oczekiwaniami to wyjdzie to w pierwszym teście, 
    // nie trzeba tego sprawdzać ponownie
    it('should reset after multiple operations', () => {
      const { result } = renderHook(() => useAttributesStore());

      // Perform multiple operations
      act(() => {
        result.current.actions.addAttribute(mockAttributes[0]);
        result.current.actions.addAttribute(mockAttributes[1]);
      });

      expect(result.current.attributes.length).toBe(2);

      // Reset
      act(() => {
        result.current.actions.reset();
      });

      expect(result.current.attributes).toEqual([]);
    });
  });

  // Ten test sprawdza zachowanie Zustanda a nie naszej aplikacji, jest zupełnie niepotrzebny, bo nawet jeżeli coś się zepsuje,
  // to co my z tym zrobimy? Przecież nie przepiszemy biblioteki.
  describe('Store persistence', () => {
    it('should maintain state across multiple hook renders', () => {
      const { result: result1 } = renderHook(() => useAttributesStore());
      const { result: result2 } = renderHook(() => useAttributesStore());

      act(() => {
        result1.current.actions.setAttributes(mockAttributes);
      });

      // Both hooks should see the same state
      expect(result1.current.attributes).toEqual(mockAttributes);
      expect(result2.current.attributes).toEqual(mockAttributes);
    });
  });
});
