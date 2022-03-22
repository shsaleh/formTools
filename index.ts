type Telement =
  | HTMLSelectElement
  | HTMLInputElement
  | HTMLTextAreaElement
  | null;

export default class formTools {
  inputs: Array<{
    element: Telement;
    rules: Array<Function>;
  }> = [];

  errors: {
    [key: string]: string;
  } = {};

  validate = () => {
    this.errors = {};
    this.inputs.forEach((input, i) => {
      if (input.rules) {
        for (let i = 0; i < input.rules.length; i++) {
          if (input.element) {
            let r = input.rules[i](input.element.value);
            if (r !== true) {
              this.errors[input.element.name] = r;
              break;
            }
          }
        }
      }
    });

    if (Object.keys(this.errors).length == 0) {
      return true;
    } else {
      return false;
    }
  };

  clearErrors = (errorName?: string) => {
    if (errorName) {
      delete this.errors[errorName];
    } else {
      this.errors = {};
    }
    return this.errors;
  };

  registerInputs = (
    element: HTMLFormElement,
    rules?: { [key: string]: Array<Function> }
  ) => {
    let inp;
    if (rules) {
      inp = Object.keys(rules).map((key) => {
        let e: Telement = element.querySelector(`[name='${key}']`);
        if (e) {
          this.inputs.push({
            element: e,
            rules: rules ? rules[key] : [],
          });
        }
      });
    }
  };
}