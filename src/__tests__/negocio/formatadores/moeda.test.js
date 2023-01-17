import {
  formataBrasileiroParaDecimal,
  formataDecimalParaReal
} from "../../../negocio/formatadores/moeda";

describe("negocio/formatadores/moeda", () => {

  describe("formataBrasileiroParaDecimal", () => {
    
    it("Should return 8.59 when the value is '8,59'", () => {
      const result = formataBrasileiroParaDecimal('8,59');
      
      expect(result).toBe(8.59);
    });

  });

  describe("formataDescimalParaReal", () => {

    it("Should return R$ 8,59 when the value is '8.59'", () => {
      const result = formataDecimalParaReal('8.59');

      expect(result).toMatch(/R\$\s8,59/);
    });

  });

});