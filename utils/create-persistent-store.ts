import create, { State, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

export const createPersistentStore = ({ name }: { name: string }) => {
  return <T extends State>(
    stateCreator: StateCreator<T, [['zustand/persist', unknown]], [], T>
  ) => {
    return create(
      persist<T>(stateCreator, {
        name,
        getStorage: () => localStorage,
      })
    );
  };
};
