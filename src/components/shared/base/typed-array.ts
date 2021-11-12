import { ParameterlessConstructor } from './parameterless-constructor';

export default class TypedArray<T> extends Array<T> {
   constructor(private ctor: ParameterlessConstructor<T>) {
      super();
   }

   pushNew() {
      this.push(new this.ctor());
   }
}
